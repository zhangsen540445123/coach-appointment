package com.umxinli.admin.service;

import com.umxinli.admin.dto.PageRequest;
import com.umxinli.admin.dto.PageResponse;
import com.umxinli.entity.Order;

import java.util.List;
import java.util.Map;

public interface AdminOrderService {

    /**
     * 获取订单列表（支持多状态筛选）
     */
    PageResponse getList(PageRequest request, List<Integer> statusList, String keyword, Long counselorId);
    
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

