package com.umxinli.service.impl;

import com.umxinli.entity.Order;
import com.umxinli.entity.PaymentRecord;
import com.umxinli.entity.User;
import com.umxinli.entity.WxPayConfig;
import com.umxinli.mapper.OrderMapper;
import com.umxinli.mapper.PaymentRecordMapper;
import com.umxinli.mapper.UserMapper;
import com.umxinli.mapper.WxPayConfigMapper;
import com.umxinli.service.PayService;
import com.umxinli.util.WxPayUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

@Service
public class PayServiceImpl implements PayService {

    private static final Logger log = LoggerFactory.getLogger(PayServiceImpl.class);
    private static final String UNIFIED_ORDER_URL = "https://api.mch.weixin.qq.com/pay/unifiedorder";
    private static final String ORDER_QUERY_URL = "https://api.mch.weixin.qq.com/pay/orderquery";

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private WxPayConfigMapper wxPayConfigMapper;

    @Autowired
    private PaymentRecordMapper paymentRecordMapper;

    @Autowired
    private UserMapper userMapper;

    @Override
    public Map getPrice(Long counselorId, Integer consultType, Integer consultWay) {
        log.info("Getting price for counselor: {}, type: {}, way: {}", counselorId, consultType, consultWay);

        Map result = new HashMap();
        BigDecimal basePrice = new BigDecimal("200.00");
        BigDecimal discount = new BigDecimal("1.0");
        BigDecimal finalPrice = basePrice.multiply(discount);

        result.put("basePrice", basePrice);
        result.put("discount", discount);
        result.put("finalPrice", finalPrice);
        result.put("currency", "CNY");

        return result;
    }

    @Override
    @Transactional
    public Map toPay(Long orderId, String clientIp) throws Exception {
        log.info("Processing payment for order: {}, clientIp: {}", orderId, clientIp);

        Order order = orderMapper.selectById(orderId);
        if (order == null) {
            throw new Exception("订单不存在");
        }

        // 获取用户信息以获取 openid
        User user = userMapper.selectById(order.getUserId());
        if (user == null) {
            throw new Exception("用户不存在");
        }
        String openid = user.getOpenid();
        if (openid == null || openid.isEmpty()) {
            throw new Exception("用户未绑定微信，无法支付");
        }

        // 获取微信支付配置
        WxPayConfig config = wxPayConfigMapper.selectEnabled();
        if (config == null) {
            throw new Exception("微信支付未配置");
        }

        // 支付金额（分）
        BigDecimal amount = order.getPrice() != null ? order.getPrice() : BigDecimal.ZERO;
        int totalFee = amount.multiply(new BigDecimal("100")).intValue();

        // 生成商户订单号
        String outTradeNo = WxPayUtil.generateOutTradeNo();

        // 客户端IP处理
        String spbillCreateIp = (clientIp != null && !clientIp.isEmpty()) ? clientIp : "127.0.0.1";
        // 处理多级代理情况，取第一个IP
        if (spbillCreateIp.contains(",")) {
            spbillCreateIp = spbillCreateIp.split(",")[0].trim();
        }

        // 构建统一下单参数
        Map<String, String> params = new HashMap<>();
        params.put("appid", config.getAppId());
        params.put("mch_id", config.getMchId());
        params.put("nonce_str", WxPayUtil.generateNonceStr());
        params.put("body", "教练预约-咨询服务");
        params.put("out_trade_no", outTradeNo);
        params.put("total_fee", String.valueOf(totalFee));
        params.put("spbill_create_ip", spbillCreateIp);
        params.put("notify_url", config.getNotifyUrl());
        params.put("trade_type", "JSAPI");
        params.put("openid", openid);

        // 生成签名
        String sign = WxPayUtil.signMD5(params, config.getApiKey());
        params.put("sign", sign);

        // 调用微信统一下单API
        String xmlRequest = WxPayUtil.mapToXml(params);
        log.info("Unified order request: {}", xmlRequest);

        String xmlResponse = WxPayUtil.httpPost(UNIFIED_ORDER_URL, xmlRequest);
        log.info("Unified order response: {}", xmlResponse);

        Map<String, String> responseMap = WxPayUtil.xmlToMap(xmlResponse);

        if (!"SUCCESS".equals(responseMap.get("return_code"))) {
            throw new Exception("微信支付请求失败: " + responseMap.get("return_msg"));
        }

        if (!"SUCCESS".equals(responseMap.get("result_code"))) {
            throw new Exception("微信支付下单失败: " + responseMap.get("err_code_des"));
        }

        String prepayId = responseMap.get("prepay_id");

        // 创建支付记录
        PaymentRecord record = new PaymentRecord();
        record.setOrderId(orderId);
        record.setOrderNo(order.getOrderNo());
        record.setOutTradeNo(outTradeNo);
        record.setAmount(amount);
        record.setStatus(0);
        paymentRecordMapper.insert(record);

        // 生成小程序调起支付的参数
        Map<String, String> payParams = new HashMap<>();
        payParams.put("appId", config.getAppId());
        payParams.put("timeStamp", String.valueOf(System.currentTimeMillis() / 1000));
        payParams.put("nonceStr", WxPayUtil.generateNonceStr());
        payParams.put("package", "prepay_id=" + prepayId);
        payParams.put("signType", "MD5");

        String paySign = WxPayUtil.signMD5(payParams, config.getApiKey());

        Map result = new HashMap();
        result.put("appId", payParams.get("appId"));
        result.put("timeStamp", payParams.get("timeStamp"));
        result.put("nonceStr", payParams.get("nonceStr"));
        result.put("packageValue", payParams.get("package"));
        result.put("signType", payParams.get("signType"));
        result.put("paySign", paySign);
        result.put("paymentAmount", amount);
        result.put("outTradeNo", outTradeNo);

        return result;
    }

    @Override
    @Transactional
    public Map toBatchPay(List orderIds, String clientIp) throws Exception {
        log.info("Processing batch payment for orders: {}", orderIds);

        if (orderIds == null || orderIds.isEmpty()) {
            throw new Exception("没有要支付的订单");
        }

        // 计算总金额
        BigDecimal totalAmount = BigDecimal.ZERO;
        for (Object obj : orderIds) {
            Long orderId = Long.valueOf(obj.toString());
            Order order = orderMapper.selectById(orderId);
            if (order != null && order.getPrice() != null) {
                totalAmount = totalAmount.add(order.getPrice());
            }
        }

        // 使用第一个订单ID发起支付
        Long firstOrderId = Long.valueOf(orderIds.get(0).toString());
        Map result = toPay(firstOrderId, clientIp);
        result.put("totalAmount", totalAmount);
        result.put("orderCount", orderIds.size());

        return result;
    }

    @Override
    @Transactional
    public boolean handlePayNotify(String xmlData) throws Exception {
        log.info("Handling pay notify: {}", xmlData);

        // 获取微信支付配置
        WxPayConfig config = wxPayConfigMapper.selectEnabled();
        if (config == null) {
            log.error("微信支付未配置");
            throw new Exception("微信支付未配置");
        }

        // 解析XML
        Map<String, String> notifyData = WxPayUtil.xmlToMap(xmlData);

        // 验证签名
        String sign = notifyData.get("sign");
        notifyData.remove("sign");
        String calculatedSign = WxPayUtil.signMD5(notifyData, config.getApiKey());

        if (!calculatedSign.equals(sign)) {
            log.error("签名验证失败, 收到的签名: {}, 计算的签名: {}", sign, calculatedSign);
            return false;
        }

        // 检查支付结果
        if (!"SUCCESS".equals(notifyData.get("return_code")) ||
            !"SUCCESS".equals(notifyData.get("result_code"))) {
            log.error("支付结果异常: return_code={}, result_code={}, err_code={}",
                    notifyData.get("return_code"),
                    notifyData.get("result_code"),
                    notifyData.get("err_code"));
            return false;
        }

        String outTradeNo = notifyData.get("out_trade_no");
        String transactionId = notifyData.get("transaction_id");
        String totalFeeStr = notifyData.get("total_fee");

        // 查询支付记录
        PaymentRecord record = paymentRecordMapper.selectByOutTradeNo(outTradeNo);
        if (record == null) {
            log.error("支付记录不存在: outTradeNo={}", outTradeNo);
            return false;
        }

        // 幂等性检查：已处理过的不再处理
        if (record.getStatus() != null && record.getStatus() == 1) {
            log.info("支付已处理，跳过重复回调: outTradeNo={}, transactionId={}", outTradeNo, record.getTransactionId());
            return true;
        }

        // 验证支付金额（防止篡改）
        if (totalFeeStr != null && record.getAmount() != null) {
            int notifyTotalFee = Integer.parseInt(totalFeeStr);
            int expectedTotalFee = record.getAmount().multiply(new BigDecimal("100")).intValue();
            if (notifyTotalFee != expectedTotalFee) {
                log.error("支付金额不匹配: 回调金额={}分, 订单金额={}分, outTradeNo={}",
                        notifyTotalFee, expectedTotalFee, outTradeNo);
                return false;
            }
        }

        // 更新支付记录
        record.setTransactionId(transactionId);
        record.setStatus(1);
        record.setPayTime(new Date());
        record.setNotifyData(xmlData);
        paymentRecordMapper.update(record);

        // 更新订单状态为已支付
        Order order = orderMapper.selectById(record.getOrderId());
        if (order != null) {
            order.setStatus(1); // 已支付
            order.setPaymentTime(new Date());
            orderMapper.updateById(order);
            log.info("订单支付成功: orderId={}, orderNo={}, transactionId={}, amount={}元",
                    record.getOrderId(), record.getOrderNo(), transactionId, record.getAmount());
        } else {
            log.warn("订单不存在，但支付记录已更新: orderId={}, outTradeNo={}", record.getOrderId(), outTradeNo);
        }

        return true;
    }

    @Override
    public Map queryPayStatus(Long orderId) {
        log.info("Querying pay status for order: {}", orderId);

        Order order = orderMapper.selectById(orderId);
        PaymentRecord record = paymentRecordMapper.selectByOrderId(orderId);

        Map result = new HashMap();
        if (order != null) {
            result.put("orderId", orderId);
            result.put("orderStatus", order.getStatus());
            result.put("isPaid", order.getStatus() != null && order.getStatus() >= 1);
        } else {
            result.put("orderId", orderId);
            result.put("orderStatus", -1);
            result.put("isPaid", false);
        }

        if (record != null) {
            result.put("paymentStatus", record.getStatus());
            result.put("transactionId", record.getTransactionId());
            result.put("payTime", record.getPayTime());
        }

        return result;
    }
}
