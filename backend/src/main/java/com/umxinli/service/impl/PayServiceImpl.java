package com.umxinli.service.impl;

import com.umxinli.entity.Order;
import com.umxinli.mapper.OrderMapper;
import com.umxinli.service.PayService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class PayServiceImpl implements PayService {

    private static final Logger log = LoggerFactory.getLogger(PayServiceImpl.class);

    @Value("${wx.pay.mchId:}")
    private String mchId;

    @Value("${wx.pay.apiKey:}")
    private String apiKey;

    @Autowired
    private OrderMapper orderMapper;

    @Override
    public Map getPrice(Long counselorId, Integer consultType, Integer consultWay) {
        log.info("Getting price for counselor: {}, type: {}, way: {}", counselorId, consultType, consultWay);
        
        Map result = new HashMap();
        
        // 模拟价格计算逻辑
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
    public Map toPay(Long orderId) throws Exception {
        log.info("Processing payment for order: {}", orderId);
        
        Order order = orderMapper.selectById(orderId);
        if (order == null) {
            throw new Exception("Order not found");
        }
        
        // 模拟微信支付参数（实际需要调用微信支付API）
        Map payParams = new HashMap();
        payParams.put("appId", "wxacaabacf49f8e4c1");
        payParams.put("timeStamp", String.valueOf(System.currentTimeMillis() / 1000));
        payParams.put("nonceStr", UUID.randomUUID().toString().replace("-", ""));
        payParams.put("package", "prepay_id=wx" + System.currentTimeMillis());
        payParams.put("signType", "MD5");
        payParams.put("paySign", generatePaySign(payParams));
        
        return payParams;
    }

    @Override
    public Map toBatchPay(List orderIds) throws Exception {
        log.info("Processing batch payment for orders: {}", orderIds);
        
        if (orderIds == null || orderIds.isEmpty()) {
            throw new Exception("No orders to pay");
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
        
        // 模拟微信支付参数
        Map payParams = new HashMap();
        payParams.put("appId", "wxacaabacf49f8e4c1");
        payParams.put("timeStamp", String.valueOf(System.currentTimeMillis() / 1000));
        payParams.put("nonceStr", UUID.randomUUID().toString().replace("-", ""));
        payParams.put("package", "prepay_id=wx" + System.currentTimeMillis());
        payParams.put("signType", "MD5");
        payParams.put("paySign", generatePaySign(payParams));
        payParams.put("totalAmount", totalAmount);
        payParams.put("orderCount", orderIds.size());
        
        return payParams;
    }

    @Override
    public boolean handlePayNotify(String xmlData) throws Exception {
        log.info("Handling pay notify: {}", xmlData);
        
        // 解析XML并验证签名（实际需要完整实现）
        // 更新订单状态为已支付
        
        return true;
    }

    @Override
    public Map queryPayStatus(Long orderId) {
        log.info("Querying pay status for order: {}", orderId);
        
        Order order = orderMapper.selectById(orderId);
        
        Map result = new HashMap();
        if (order != null) {
            result.put("orderId", orderId);
            result.put("status", order.getStatus());
            result.put("isPaid", order.getStatus() != null && order.getStatus() >= 2);
        } else {
            result.put("orderId", orderId);
            result.put("status", -1);
            result.put("isPaid", false);
        }
        
        return result;
    }

    private String generatePaySign(Map params) {
        // 简化版签名生成（实际需要按微信支付规范实现）
        StringBuilder sb = new StringBuilder();
        params.keySet().stream().sorted().forEach(key -> {
            if (!"paySign".equals(key) && params.get(key) != null) {
                sb.append(key).append("=").append(params.get(key)).append("&");
            }
        });
        sb.append("key=").append(apiKey);
        
        // 实际应该使用MD5加密
        return UUID.randomUUID().toString().replace("-", "").toUpperCase();
    }
}

