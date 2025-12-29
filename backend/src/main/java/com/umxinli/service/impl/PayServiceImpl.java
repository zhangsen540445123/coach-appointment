package com.umxinli.service.impl;

import com.umxinli.entity.Coupon;
import com.umxinli.entity.Order;
import com.umxinli.entity.PaymentRecord;
import com.umxinli.entity.User;
import com.umxinli.entity.UserCoupon;
import com.umxinli.entity.WxPayConfig;
import com.umxinli.mapper.CouponMapper;
import com.umxinli.mapper.OrderMapper;
import com.umxinli.mapper.PaymentRecordMapper;
import com.umxinli.mapper.UserCouponMapper;
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
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class PayServiceImpl implements PayService {

    private static final Logger log = LoggerFactory.getLogger(PayServiceImpl.class);
    private static final String UNIFIED_ORDER_URL = "https://api.mch.weixin.qq.com/pay/unifiedorder";
    private static final String ORDER_QUERY_URL = "https://api.mch.weixin.qq.com/pay/orderquery";
    private static final String REFUND_URL = "https://api.mch.weixin.qq.com/secapi/pay/refund";

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private WxPayConfigMapper wxPayConfigMapper;

    @Autowired
    private PaymentRecordMapper paymentRecordMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserCouponMapper userCouponMapper;

    @Autowired
    private CouponMapper couponMapper;

    @Override
    public Map calculateOrderPrice(Long orderId, Long userCouponId) {
        log.info("Calculating order price for orderId: {}, userCouponId: {}", orderId, userCouponId);

        Map result = new HashMap();

        try {
            // 1. 查询订单信息
            Order order = orderMapper.selectById(orderId);
            if (order == null) {
                throw new Exception("订单不存在");
            }

            // 2. 获取订单原价
            BigDecimal originalPrice = order.getPrice() != null ? order.getPrice() : BigDecimal.ZERO;
            result.put("originalPrice", originalPrice);
            result.put("basePrice", originalPrice); // 兼容旧字段

            // 3. 初始化优惠金额和最终价格
            BigDecimal discountAmount = BigDecimal.ZERO;
            BigDecimal finalPrice = originalPrice;
            String couponName = null;

            // 4. 如果使用了优惠券，计算优惠
            if (userCouponId != null) {
                UserCoupon userCoupon = userCouponMapper.selectById(userCouponId);

                if (userCoupon == null) {
                    log.warn("User coupon not found: {}", userCouponId);
                } else if (userCoupon.getStatus() != null && userCoupon.getStatus() != 0) {
                    log.warn("User coupon is not available, status: {}", userCoupon.getStatus());
                } else {
                    // 查询优惠券模板
                    Coupon coupon = couponMapper.selectById(userCoupon.getCouponId());

                    if (coupon == null) {
                        log.warn("Coupon template not found: {}", userCoupon.getCouponId());
                        result.put("couponError", "优惠券不存在");
                    } else if (!coupon.isValid()) {
                        log.warn("Coupon is not valid: {}", coupon.getId());
                        result.put("couponError", "优惠券已失效");
                    } else {
                        // 检查优惠券是否适用于该教练
                        String coachId = order.getCounselorId() != null ? order.getCounselorId().toString() : null;
                        if (!coupon.isApplicableToCoach(coachId)) {
                            log.warn("Coupon is not applicable to coach: {}", coachId);
                            result.put("couponError", "该优惠券不适用于当前教练");
                        } else {
                            // 计算优惠金额
                            if (coupon.getType() == Coupon.TYPE_FULL_REDUCTION) {
                                // 满减券：检查是否满足最低消费
                                BigDecimal minAmount = coupon.getMinAmount() != null ? coupon.getMinAmount() : BigDecimal.ZERO;
                                if (originalPrice.compareTo(minAmount) >= 0) {
                                    discountAmount = coupon.getDiscountAmount() != null ? coupon.getDiscountAmount() : BigDecimal.ZERO;
                                    couponName = coupon.getName();
                                } else {
                                    log.warn("Order price {} is less than coupon min amount {}", originalPrice, minAmount);
                                }
                            } else if (coupon.getType() == Coupon.TYPE_DIRECT_DISCOUNT) {
                                // 直接抵扣券
                                discountAmount = coupon.getDiscountAmount() != null ? coupon.getDiscountAmount() : BigDecimal.ZERO;
                                couponName = coupon.getName();
                            }

                            // 确保优惠金额不超过订单金额
                            if (discountAmount.compareTo(originalPrice) > 0) {
                                discountAmount = originalPrice;
                            }

                            // 计算最终价格
                            finalPrice = originalPrice.subtract(discountAmount);
                            if (finalPrice.compareTo(BigDecimal.ZERO) < 0) {
                                finalPrice = BigDecimal.ZERO;
                            }
                        }
                    }
                }
            }

            // 5. 设置返回结果
            result.put("discountAmount", discountAmount.setScale(2, RoundingMode.HALF_UP));
            result.put("discount", discountAmount.setScale(2, RoundingMode.HALF_UP)); // 兼容旧字段
            result.put("finalPrice", finalPrice.setScale(2, RoundingMode.HALF_UP));
            result.put("price", finalPrice.setScale(2, RoundingMode.HALF_UP)); // 前端期望的字段
            result.put("currency", "CNY");

            if (couponName != null) {
                result.put("couponName", couponName);
            }

            log.info("Price calculation result: originalPrice={}, discountAmount={}, finalPrice={}",
                     originalPrice, discountAmount, finalPrice);

        } catch (Exception e) {
            log.error("Error calculating order price", e);
            // 发生错误时返回订单原价
            result.put("originalPrice", BigDecimal.ZERO);
            result.put("basePrice", BigDecimal.ZERO);
            result.put("discountAmount", BigDecimal.ZERO);
            result.put("discount", BigDecimal.ZERO);
            result.put("finalPrice", BigDecimal.ZERO);
            result.put("price", BigDecimal.ZERO);
            result.put("currency", "CNY");
            result.put("error", e.getMessage());
        }

        return result;
    }

    /** 订单支付超时时间（分钟） */
    private static final int ORDER_TIMEOUT_MINUTES = 30;

    @Override
    @Transactional
    public Map toPay(Long orderId, String clientIp) throws Exception {
        log.info("Processing payment for order: {}, clientIp: {}", orderId, clientIp);

        Order order = orderMapper.selectById(orderId);
        if (order == null) {
            throw new Exception("订单不存在");
        }

        // 检查订单状态
        if (order.getStatus() != null && order.getStatus() != 0) {
            if (order.getStatus() == 4) {
                throw new Exception("订单已取消，无法支付");
            } else if (order.getStatus() >= 1) {
                throw new Exception("订单已支付，请勿重复支付");
            }
        }

        // 检查订单是否已超时（在发起支付前检查）
        int cancelled = orderMapper.cancelIfTimeout(orderId, ORDER_TIMEOUT_MINUTES);
        if (cancelled > 0) {
            log.warn("Order {} was cancelled due to timeout when trying to pay", orderId);
            throw new Exception("订单已超时，请重新下单");
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
            // 检查订单是否已被取消（边界情况：支付回调到达时订单刚好被超时取消）
            if (order.getStatus() != null && order.getStatus() == 4) {
                log.warn("订单已被取消，但收到支付回调，需要触发退款流程: orderId={}, transactionId={}",
                        record.getOrderId(), transactionId);
                // 触发自动退款流程
                autoRefund(record.getOrderId(), transactionId, record.getAmount(), "订单超时取消后支付，自动退款");
                return true; // 仍返回成功，避免微信重复回调
            }

            // 正常情况：更新订单状态为已支付
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

    @Override
    @Transactional
    public boolean autoRefund(Long orderId, String transactionId, BigDecimal refundAmount, String reason) {
        log.info("Processing auto refund for order: {}, transactionId: {}, amount: {}, reason: {}",
                orderId, transactionId, refundAmount, reason);

        try {
            // 1. 获取支付记录
            PaymentRecord record = paymentRecordMapper.selectByOrderId(orderId);
            if (record == null) {
                log.error("Payment record not found for order: {}", orderId);
                return false;
            }

            // 2. 检查是否已退款
            if (record.getStatus() != null && record.getStatus() == 3) {
                log.info("Order {} already refunded, skipping", orderId);
                return true;
            }

            // 3. 获取微信支付配置
            WxPayConfig config = wxPayConfigMapper.selectEnabled();
            if (config == null) {
                log.error("微信支付未配置，无法执行退款");
                return false;
            }

            // 4. 计算退款金额（分）
            int totalFee = record.getAmount().multiply(new BigDecimal("100")).intValue();
            int refundFee = refundAmount.multiply(new BigDecimal("100")).intValue();

            // 5. 生成退款单号
            String outRefundNo = "REF" + System.currentTimeMillis();

            // 6. 构建退款请求参数
            Map<String, String> params = new HashMap<>();
            params.put("appid", config.getAppId());
            params.put("mch_id", config.getMchId());
            params.put("nonce_str", WxPayUtil.generateNonceStr());
            params.put("transaction_id", transactionId);
            params.put("out_trade_no", record.getOutTradeNo());
            params.put("out_refund_no", outRefundNo);
            params.put("total_fee", String.valueOf(totalFee));
            params.put("refund_fee", String.valueOf(refundFee));
            params.put("refund_desc", reason != null ? reason : "订单超时取消自动退款");

            // 7. 生成签名
            String sign = WxPayUtil.signMD5(params, config.getApiKey());
            params.put("sign", sign);

            // 8. 调用微信退款API
            // 注意：微信退款API需要双向证书，这里使用简化处理
            // 实际生产环境需要配置SSL证书
            String xmlRequest = WxPayUtil.mapToXml(params);
            log.info("Refund request: {}", xmlRequest);

            // 检查是否配置了证书
            if (config.getCertPath() == null || config.getCertPath().isEmpty()) {
                log.warn("微信支付证书未配置，退款将在后台手动处理。订单ID: {}, 交易号: {}, 退款金额: {}元",
                        orderId, transactionId, refundAmount);
                // 更新支付记录状态为待退款（需要人工处理）
                record.setStatus(4); // 4 = 待人工退款
                paymentRecordMapper.update(record);
                // 更新订单状态为待退款
                orderMapper.updateStatus(orderId, 6); // 6 = 待退款
                return true; // 标记为处理成功，等待人工处理
            }

            // 调用退款API（需要双向证书，这里仅作示例）
            String xmlResponse = WxPayUtil.postWithCert(REFUND_URL, xmlRequest, config.getCertPath(), config.getMchId());
            log.info("Refund response: {}", xmlResponse);

            Map<String, String> responseMap = WxPayUtil.xmlToMap(xmlResponse);
            if ("SUCCESS".equals(responseMap.get("return_code")) && "SUCCESS".equals(responseMap.get("result_code"))) {
                // 退款成功
                record.setStatus(3); // 3 = 已退款
                paymentRecordMapper.update(record);
                orderMapper.updateStatus(orderId, 5); // 5 = 已退款
                log.info("退款成功: orderId={}, transactionId={}, refundAmount={}元", orderId, transactionId, refundAmount);
                return true;
            } else {
                log.error("退款失败: return_code={}, result_code={}, err_code={}, err_code_des={}",
                        responseMap.get("return_code"), responseMap.get("result_code"),
                        responseMap.get("err_code"), responseMap.get("err_code_des"));
                return false;
            }
        } catch (Exception e) {
            log.error("Error processing auto refund for order: {}", orderId, e);
            return false;
        }
    }
}
