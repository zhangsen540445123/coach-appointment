package com.umxinli.service.impl;

import com.umxinli.dto.OrderDTO;
import com.umxinli.entity.Order;
import com.umxinli.mapper.OrderMapper;
import com.umxinli.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private static final Logger log = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Autowired
    private OrderMapper orderMapper;

    @Override
    @Cacheable(value = "order", key = "#id")
    public Order getOrderById(Long id) {
        log.info("Getting order by id: {}", id);
        return orderMapper.selectById(id);
    }

    @Override
    public Order createOrder(Order order) {
        log.info("Creating order: {}", order);
        try {
            // 生成订单号
            String orderNo = "ORD" + System.currentTimeMillis();
            order.setOrderNo(orderNo);
            order.setStatus(0); // 0 = 待支付
            orderMapper.insert(order);
            return order;
        } catch (Exception e) {
            log.error("Error creating order", e);
            return null;
        }
    }

    @Override
    public int cancelOrder(Long id) {
        log.info("Cancelling order with id: {}", id);
        return orderMapper.updateStatus(id, 4); // 4 represents the 'cancelled' status
    }

    @Override
    public List<Order> getOrderList(Integer page, Integer pageSize, Integer status) {
        log.info("Getting order list - page: {}, pageSize: {}, status: {}", page, pageSize, status);
        try {
            int offset = (page - 1) * pageSize;
            return orderMapper.selectList(offset, pageSize, status);
        } catch (Exception e) {
            log.error("Error getting order list", e);
            return Collections.emptyList();
        }
    }

    @Override
    public List<OrderDTO> getOrderListWithCounselor(Integer page, Integer pageSize, Integer status, Long userId) {
        log.info("Getting order list with counselor - page: {}, pageSize: {}, status: {}, userId: {}", page, pageSize, status, userId);
        try {
            int offset = (page - 1) * pageSize;
            return orderMapper.selectListWithCounselor(offset, pageSize, status, userId);
        } catch (Exception e) {
            log.error("Error getting order list with counselor", e);
            return Collections.emptyList();
        }
    }

    @Override
    public int countOrders(Integer status) {
        log.info("Counting orders with status: {}", status);
        try {
            return orderMapper.countByStatus(status);
        } catch (Exception e) {
            log.error("Error counting orders", e);
            return 0;
        }
    }

    @Override
    public int updateConsultTime(Long orderId, String consultTime) {
        log.info("Updating consult time for order: {} to {}", orderId, consultTime);
        try {
            return orderMapper.updateConsultTime(orderId, consultTime);
        } catch (Exception e) {
            log.error("Error updating consult time", e);
            return 0;
        }
    }

    @Override
    public int bindVisitor(Long orderId, Long visitorId) {
        log.info("Binding visitor {} to order {}", visitorId, orderId);
        try {
            return orderMapper.bindVisitor(orderId, visitorId);
        } catch (Exception e) {
            log.error("Error binding visitor", e);
            return 0;
        }
    }
}
