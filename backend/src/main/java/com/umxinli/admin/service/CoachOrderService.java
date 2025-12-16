package com.umxinli.admin.service;

import com.umxinli.admin.dto.PageRequest;
import com.umxinli.admin.dto.PageResponse;

import java.util.List;
import java.util.Map;

/**
 * 教练订单服务接口
 */
public interface CoachOrderService {

    /**
     * 获取教练的订单列表
     */
    PageResponse getOrderList(PageRequest request, Long counselorId, Integer status);

    /**
     * 获取教练的收益统计
     * @param counselorId 教练ID
     * @param days 天数 (7, 30, 365)
     */
    Map<String, Object> getEarningsStats(Long counselorId, int days);

    /**
     * 获取教练指定时间段内的订单明细
     */
    List<Map<String, Object>> getEarningsDetail(Long counselorId, int days, int page, int pageSize);
}

