package com.umxinli.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.StudioBooking;
import com.umxinli.service.StudioBookingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * 活动预约控制器（用户端）
 */
@RestController
@RequestMapping("/api/studio")
@CrossOrigin
public class StudioBookingController {

    private static final Logger log = LoggerFactory.getLogger(StudioBookingController.class);

    @Autowired
    private StudioBookingService bookingService;

    /**
     * 预约活动
     * POST /api/studio/{id}/book
     */
    @PostMapping("/{id}/book")
    public ApiResponse<Map<String, Object>> bookStudio(@PathVariable Long id,
                                                        @RequestAttribute(value = "userId", required = false) Long userId,
                                                        HttpServletRequest request) {
        log.info("Book studio request: studioId={}, userId={}", id, userId);
        try {
            if (userId == null) {
                return ApiResponse.error("请先登录");
            }

            String clientIp = getClientIp(request);
            Map<String, Object> result = bookingService.bookStudio(id, userId, clientIp);
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("Error booking studio", e);
            return ApiResponse.error(e.getMessage());
        }
    }

    /**
     * 查询预约状态
     * GET /api/studio/{id}/booking-status
     */
    @GetMapping("/{id}/booking-status")
    public ApiResponse<StudioBooking> getBookingStatus(@PathVariable Long id,
                                                        @RequestAttribute(value = "userId", required = false) Long userId) {
        log.info("Get booking status: studioId={}, userId={}", id, userId);
        try {
            if (userId == null) {
                return ApiResponse.error("请先登录");
            }

            StudioBooking booking = bookingService.getBookingStatus(id, userId);
            return ApiResponse.success(booking);
        } catch (Exception e) {
            log.error("Error getting booking status", e);
            return ApiResponse.error(e.getMessage());
        }
    }

    /**
     * 取消预约
     * POST /api/studio/booking/{bookingId}/cancel
     */
    @PostMapping("/booking/{bookingId}/cancel")
    public ApiResponse<Boolean> cancelBooking(@PathVariable Long bookingId,
                                               @RequestAttribute(value = "userId", required = false) Long userId) {
        log.info("Cancel booking: bookingId={}, userId={}", bookingId, userId);
        try {
            if (userId == null) {
                return ApiResponse.error("请先登录");
            }

            boolean result = bookingService.cancelBooking(bookingId, userId);
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("Error canceling booking", e);
            return ApiResponse.error(e.getMessage());
        }
    }

    /**
     * 获取我的预约列表
     * GET /api/studio/my-bookings
     */
    @GetMapping("/my-bookings")
    public ApiResponse<List<StudioBooking>> getMyBookings(@RequestAttribute(value = "userId", required = false) Long userId) {
        log.info("Get my bookings: userId={}", userId);
        try {
            if (userId == null) {
                return ApiResponse.error("请先登录");
            }

            List<StudioBooking> bookings = bookingService.getUserBookings(userId);
            return ApiResponse.success(bookings);
        } catch (Exception e) {
            log.error("Error getting my bookings", e);
            return ApiResponse.error(e.getMessage());
        }
    }

    /**
     * 活动预约支付
     * POST /api/studio/booking/{bookingId}/pay
     */
    @PostMapping("/booking/{bookingId}/pay")
    public ApiResponse<Map<String, Object>> payBooking(@PathVariable Long bookingId,
                                                        @RequestAttribute(value = "userId", required = false) Long userId,
                                                        HttpServletRequest request) {
        log.info("Pay booking: bookingId={}, userId={}", bookingId, userId);
        try {
            if (userId == null) {
                return ApiResponse.error("请先登录");
            }

            String clientIp = getClientIp(request);
            Map<String, Object> payParams = bookingService.payBooking(bookingId, clientIp);
            return ApiResponse.success(payParams);
        } catch (Exception e) {
            log.error("Error paying booking", e);
            return ApiResponse.error(e.getMessage());
        }
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
}

