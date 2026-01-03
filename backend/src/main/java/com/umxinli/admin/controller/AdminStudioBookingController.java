package com.umxinli.admin.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.StudioBooking;
import com.umxinli.service.StudioBookingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 活动预约管理控制器（管理端）
 */
@RestController
@RequestMapping("/admin/studio")
@CrossOrigin
public class AdminStudioBookingController {

    private static final Logger log = LoggerFactory.getLogger(AdminStudioBookingController.class);

    @Autowired
    private StudioBookingService bookingService;

    /**
     * 获取活动的预约列表
     * GET /admin/studio/{id}/bookings
     */
    @GetMapping("/{id}/bookings")
    public ApiResponse<Map<String, Object>> getStudioBookings(@PathVariable Long id,
                                                               @RequestParam(defaultValue = "1") int page,
                                                               @RequestParam(defaultValue = "10") int pageSize) {
        log.info("Get studio bookings: studioId={}, page={}, pageSize={}", id, page, pageSize);
        try {
            List<StudioBooking> bookings = bookingService.getStudioBookings(id, page, pageSize);
            int total = bookingService.getBookingCount(id);

            Map<String, Object> result = new HashMap<>();
            result.put("list", bookings);
            result.put("total", total);
            result.put("page", page);
            result.put("pageSize", pageSize);

            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("Error getting studio bookings", e);
            return ApiResponse.error("获取预约列表失败");
        }
    }
}

