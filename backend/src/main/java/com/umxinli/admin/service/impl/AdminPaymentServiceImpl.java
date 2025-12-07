package com.umxinli.admin.service.impl;

import com.umxinli.admin.dto.PageRequest;
import com.umxinli.admin.dto.PageResponse;
import com.umxinli.admin.service.AdminPaymentService;
import com.umxinli.entity.Order;
import com.umxinli.mapper.OrderMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class AdminPaymentServiceImpl implements AdminPaymentService {

    private static final Logger log = LoggerFactory.getLogger(AdminPaymentServiceImpl.class);

    @Autowired
    private OrderMapper orderMapper;

    @Override
    public PageResponse getList(PageRequest request, Integer status) {
        // 使用订单数据模拟支付记录
        List orders = orderMapper.selectList(request.getOffset(), request.getPageSize(), status);
        int total = orderMapper.countByStatus(status);
        
        // 转换为支付记录格式
        List paymentList = new ArrayList();
        for (Object obj : orders) {
            Order order = (Order) obj;
            Map payment = new HashMap();
            payment.put("id", order.getId());
            payment.put("orderNo", order.getOrderNo());
            payment.put("amount", order.getPrice());
            payment.put("status", order.getStatus() >= 1 ? 1 : 0); // 1=已支付, 0=未支付
            payment.put("paymentTime", order.getPaymentTime());
            payment.put("userId", order.getUserId());
            paymentList.add(payment);
        }
        
        return new PageResponse(paymentList, total, request.getPage(), request.getPageSize());
    }

    @Override
    public Map getByOrderId(Long orderId) {
        Order order = orderMapper.selectById(orderId);
        if (order != null) {
            Map payment = new HashMap();
            payment.put("orderId", order.getId());
            payment.put("orderNo", order.getOrderNo());
            payment.put("amount", order.getPrice());
            payment.put("status", order.getStatus() >= 1 ? "已支付" : "未支付");
            payment.put("paymentTime", order.getPaymentTime());
            return payment;
        }
        return null;
    }

    @Override
    public boolean refund(Long orderId, String reason) throws Exception {
        Order order = orderMapper.selectById(orderId);
        if (order == null) {
            throw new Exception("订单不存在");
        }
        if (order.getStatus() < 1) {
            throw new Exception("该订单未支付，无法退款");
        }
        
        // 更新订单状态为已退款（假设状态5为已退款）
        orderMapper.updateStatus(orderId, 5);
        log.info("订单 {} 已退款，原因: {}", orderId, reason);
        return true;
    }

    @Override
    public Map getStatistics() {
        Map stats = new HashMap();
        
        // 模拟统计数据
        stats.put("totalAmount", new BigDecimal("50000.00"));
        stats.put("todayAmount", new BigDecimal("1500.00"));
        stats.put("monthAmount", new BigDecimal("25000.00"));
        stats.put("refundAmount", new BigDecimal("2000.00"));
        stats.put("totalCount", 150);
        stats.put("todayCount", 5);
        
        return stats;
    }
}

