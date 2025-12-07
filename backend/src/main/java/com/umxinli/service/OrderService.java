package com.umxinli.service;

import com.umxinli.entity.Order;
import java.util.List;

public interface OrderService {
    Order getOrderById(Long id);
    Order createOrder(Order order);
    int cancelOrder(Long id);
    List<Order> getOrderList(Integer page, Integer pageSize, Integer status);
    int countOrders(Integer status);
    int updateConsultTime(Long orderId, String consultTime);
    int bindVisitor(Long orderId, Long visitorId);
}
