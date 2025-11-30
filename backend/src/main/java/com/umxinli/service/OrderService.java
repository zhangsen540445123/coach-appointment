package com.umxinli.service;

import com.umxinli.entity.Order;

public interface OrderService {
    Order getOrderById(Long id);
    int cancelOrder(Long id);
}
