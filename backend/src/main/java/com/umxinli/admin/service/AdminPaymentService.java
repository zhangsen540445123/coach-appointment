package com.umxinli.admin.service;

import com.umxinli.admin.dto.PageRequest;
import com.umxinli.admin.dto.PageResponse;

import java.util.Map;

public interface AdminPaymentService {
    
    /**
     * 获取支付记录列表
     */
    PageResponse getList(PageRequest request, Integer status);
    
    /**
     * 根据订单ID获取支付信息
     */
    Map getByOrderId(Long orderId);
    
    /**
     * 退款
     */
    boolean refund(Long orderId, String reason) throws Exception;
    
    /**
     * 获取支付统计
     */
    Map getStatistics();
}

