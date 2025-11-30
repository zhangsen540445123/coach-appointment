package com.umxinli.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.GlobalSettings;
import com.umxinli.entity.Order;
import com.umxinli.service.OrderService;
import com.umxinli.service.SettingsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Collections;

@Slf4j
@RestController
@RequestMapping("/visitor")
@CrossOrigin
public class VisitorController {

    @Autowired
    private SettingsService settingsService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/user/hasMessage")
    public ApiResponse<Object> hasMessage() {
        log.info("Check visitor has message request");
        try {
            Map<String, Object> data = new HashMap<>();
            data.put("hasMessage", false);
            return ApiResponse.success(data);
        } catch (Exception e) {
            log.error("Error checking visitor message", e);
            return ApiResponse.error("Failed to check visitor message");
        }
    }

    @GetMapping("/user/getBindMpUrl")
    public ApiResponse<Object> getBindMpUrl() {
        log.info("Get bind MP URL request");
        try {
            GlobalSettings setting = settingsService.getSettingByKey("concat_sys_agent_settings");
            if (setting != null) {
                JSONObject value = JSON.parseObject(setting.getValue());
                String qrCodeImageUrl = value.getString("qrCodeImageUrl");
                return ApiResponse.success(qrCodeImageUrl);
            } else {
                return ApiResponse.error("Setting not found");
            }
        } catch (Exception e) {
            log.error("Error getting bind MP URL", e);
            return ApiResponse.error("Failed to get bind MP URL");
        }
    }

    @PostMapping("/order/getOrderInfo")
    public ApiResponse<Object> getOrderInfo(@RequestBody Map<String, Long> payload) {
        Long orderId = payload.get("orderId");
        log.info("Get order info request for orderId: {}", orderId);
        if (orderId == null) {
            return ApiResponse.error("orderId is required");
        }
        try {
            Order order = orderService.getOrderById(orderId);
            if (order != null) {
                return ApiResponse.success(order);
            } else {
                return ApiResponse.error("Order not found");
            }
        } catch (Exception e) {
            log.error("Error getting order info", e);
            return ApiResponse.error("Failed to get order info");
        }
    }

    @GetMapping("/order/getCanRefundHour")
    public ApiResponse<Object> getCanRefundHour() {
        log.info("Get can refund hour request");
        try {
            GlobalSettings setting = settingsService.getSettingByKey("order_can_refund_hour");
            if (setting != null) {
                return ApiResponse.success(Integer.parseInt(setting.getValue()));
            } else {
                return ApiResponse.success(24); // Default value if not set
            }
        } catch (Exception e) {
            log.error("Error getting can refund hour", e);
            return ApiResponse.error("Failed to get can refund hour");
        }
    }

    @PostMapping("/order/cancel")
    public ApiResponse<Object> cancelOrder(@RequestBody Map<String, Long> payload) {
        Long orderId = payload.get("orderId");
        log.info("Cancel order request for orderId: {}", orderId);
        if (orderId == null) {
            return ApiResponse.error("orderId is required");
        }
        try {
            int result = orderService.cancelOrder(orderId);
            if (result > 0) {
                return ApiResponse.success("Order cancelled successfully");
            } else {
                return ApiResponse.error("Failed to cancel order or order not found");
            }
        } catch (Exception e) {
            log.error("Error cancelling order", e);
            return ApiResponse.error("Failed to cancel order");
        }
    }
}
