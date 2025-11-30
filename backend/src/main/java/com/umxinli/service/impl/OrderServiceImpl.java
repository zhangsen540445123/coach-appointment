package com.umxinli.service.impl;

import com.umxinli.entity.Order;
import com.umxinli.mapper.OrderMapper;
import com.umxinli.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderMapper orderMapper;

    @Override
    @Cacheable(value = "order", key = "#id")
    public Order getOrderById(Long id) {
        log.info("Getting order by id: {}", id);
        return orderMapper.selectById(id);
    }

    @Override
    public int cancelOrder(Long id) {
        log.info("Cancelling order with id: {}", id);
        return orderMapper.updateStatus(id, 4); // 4 represents the 'cancelled' status
    }
}
