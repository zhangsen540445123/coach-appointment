package com.umxinli.admin.service.impl;

import com.umxinli.admin.dto.PageRequest;
import com.umxinli.admin.dto.PageResponse;
import com.umxinli.admin.service.AdminOrderService;
import com.umxinli.entity.Order;
import com.umxinli.mapper.OrderMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminOrderServiceImpl implements AdminOrderService {

    private static final Logger log = LoggerFactory.getLogger(AdminOrderServiceImpl.class);

    @Autowired
    private OrderMapper orderMapper;

    @Override
    public PageResponse getList(PageRequest request, Integer status, Long counselorId) {
        List list = orderMapper.selectList(request.getOffset(), request.getPageSize(), status);
        int total = orderMapper.countByStatus(status);
        return new PageResponse(list, total, request.getPage(), request.getPageSize());
    }

    @Override
    public Order getById(Long id) {
        return orderMapper.selectById(id);
    }

    @Override
    public boolean updateStatus(Long id, Integer status) throws Exception {
        Order order = orderMapper.selectById(id);
        if (order == null) {
            throw new Exception("订单不存在");
        }
        return orderMapper.updateStatus(id, status) > 0;
    }

    @Override
    public boolean cancel(Long id, String reason) throws Exception {
        Order order = orderMapper.selectById(id);
        if (order == null) {
            throw new Exception("订单不存在");
        }
        // 4 = 已取消
        return orderMapper.updateStatus(id, 4) > 0;
    }

    @Override
    public Map getStatistics(Long counselorId) {
        Map stats = new HashMap();
        
        // 模拟统计数据
        stats.put("totalOrders", orderMapper.countByStatus(null));
        stats.put("pendingOrders", orderMapper.countByStatus(0));
        stats.put("paidOrders", orderMapper.countByStatus(1));
        stats.put("completedOrders", orderMapper.countByStatus(3));
        stats.put("cancelledOrders", orderMapper.countByStatus(4));
        
        return stats;
    }
}

