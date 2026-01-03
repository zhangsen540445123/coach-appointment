package com.umxinli.service;

import com.umxinli.entity.StudioBooking;

import java.util.List;
import java.util.Map;

public interface StudioBookingService {

    /**
     * 预约活动
     * @param studioId 活动ID
     * @param userId 用户ID
     * @return 预约结果（免费活动直接成功，收费活动返回支付参数）
     */
    Map<String, Object> bookStudio(Long studioId, Long userId, String clientIp) throws Exception;

    /**
     * 查询用户对某活动的预约状态
     */
    StudioBooking getBookingStatus(Long studioId, Long userId);

    /**
     * 取消预约
     */
    boolean cancelBooking(Long bookingId, Long userId) throws Exception;

    /**
     * 获取用户的所有预约记录
     */
    List<StudioBooking> getUserBookings(Long userId);

    /**
     * 获取活动的预约列表（管理端）
     */
    List<StudioBooking> getStudioBookings(Long studioId, int page, int pageSize);

    /**
     * 获取活动的预约数量
     */
    int getBookingCount(Long studioId);

    /**
     * 活动预约支付
     */
    Map<String, Object> payBooking(Long bookingId, String clientIp) throws Exception;

    /**
     * 处理活动预约支付回调
     */
    boolean handleBookingPayNotify(String orderNo) throws Exception;
}

