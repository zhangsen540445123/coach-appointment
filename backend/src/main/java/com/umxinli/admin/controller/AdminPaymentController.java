package com.umxinli.admin.controller;

import com.umxinli.admin.dto.PageRequest;
import com.umxinli.admin.dto.PageResponse;
import com.umxinli.admin.service.AdminPaymentService;
import com.umxinli.dto.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 支付管理控制器
 * 提供支付记录查询、退款、统计等管理功能
 */
@RestController
@RequestMapping("/admin/payment")
@CrossOrigin
public class AdminPaymentController {

    private static final Logger log = LoggerFactory.getLogger(AdminPaymentController.class);

    @Autowired
    private AdminPaymentService adminPaymentService;

    /**
     * 获取支付记录列表（分页）
     * POST /admin/payment/list
     */
    @PostMapping("/list")
    public ApiResponse getList(
            @RequestBody PageRequest request,
            @RequestParam(required = false) Integer status) {
        log.info("Get payment list, page: {}, pageSize: {}, status: {}", 
            request.getPage(), request.getPageSize(), status);
        try {
            PageResponse response = adminPaymentService.getList(request, status);
            return ApiResponse.success(response);
        } catch (Exception e) {
            log.error("Error getting payment list", e);
            return ApiResponse.error("获取支付记录失败");
        }
    }

    /**
     * 根据订单ID获取支付详情
     * GET /admin/payment/order/{orderId}
     */
    @GetMapping("/order/{orderId}")
    public ApiResponse getByOrderId(@PathVariable Long orderId) {
        log.info("Get payment by order id: {}", orderId);
        try {
            Map payment = adminPaymentService.getByOrderId(orderId);
            if (payment == null) {
                return ApiResponse.error(404, "支付记录不存在");
            }
            return ApiResponse.success(payment);
        } catch (Exception e) {
            log.error("Error getting payment", e);
            return ApiResponse.error("获取支付信息失败");
        }
    }

    /**
     * 发起退款
     * POST /admin/payment/refund/{orderId}
     */
    @PostMapping("/refund/{orderId}")
    public ApiResponse refund(
            @PathVariable Long orderId, 
            @RequestBody Map payload) {
        log.info("Refund order: {}", orderId);
        try {
            String reason = (String) payload.get("reason");
            boolean result = adminPaymentService.refund(orderId, reason);
            if (result) {
                return ApiResponse.success("退款成功");
            } else {
                return ApiResponse.error("退款失败");
            }
        } catch (Exception e) {
            log.error("Error processing refund", e);
            return ApiResponse.error(e.getMessage());
        }
    }

    /**
     * 获取支付统计数据
     * GET /admin/payment/statistics
     */
    @GetMapping("/statistics")
    public ApiResponse getStatistics() {
        log.info("Get payment statistics");
        try {
            Map stats = adminPaymentService.getStatistics();
            return ApiResponse.success(stats);
        } catch (Exception e) {
            log.error("Error getting payment statistics", e);
            return ApiResponse.error("获取支付统计失败");
        }
    }
}

