package com.umxinli.admin.service;

import com.umxinli.admin.dto.PageRequest;
import com.umxinli.admin.dto.PageResponse;
import com.umxinli.entity.Order;

import java.util.Map;

public interface AdminOrderService {
    
    /**
     * 获取订单列表
     */
    PageResponse getList(PageRequest request, Integer status, Long counselorId);
    
    /**
     * 根据ID获取订单
     */
    Order getById(Long id);
    
    /**
     * 更新订单状态
     */
    boolean updateStatus(Long id, Integer status) throws Exception;
    
    /**
     * 取消订单
     */
    boolean cancel(Long id, String reason) throws Exception;
    
    /**
     * 获取订单统计
     */
    Map getStatistics(Long counselorId);
}

