package com.umxinli.admin.controller;

import com.umxinli.admin.dto.PageRequest;
import com.umxinli.admin.dto.PageResponse;
import com.umxinli.admin.service.AdminOrderService;
import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.Order;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 订单管理控制器
 * 提供订单的查询、状态更新、取消等管理功能
 */
@RestController
@RequestMapping("/admin/order")
@CrossOrigin
public class AdminOrderController {

    private static final Logger log = LoggerFactory.getLogger(AdminOrderController.class);

    @Autowired
    private AdminOrderService adminOrderService;

    /**
     * 获取订单列表（分页）
     * POST /admin/order/list
     */
    @PostMapping("/list")
    public ApiResponse getList(
            @RequestBody PageRequest request,
            @RequestParam(required = false) Integer status,
            @RequestParam(required = false) Long counselorId) {
        log.info("Get order list, page: {}, pageSize: {}, status: {}, counselorId: {}", 
            request.getPage(), request.getPageSize(), status, counselorId);
        try {
            PageResponse response = adminOrderService.getList(request, status, counselorId);
            return ApiResponse.success(response);
        } catch (Exception e) {
            log.error("Error getting order list", e);
            return ApiResponse.error("获取订单列表失败");
        }
    }

    /**
     * 根据ID获取订单详情
     * GET /admin/order/{id}
     */
    @GetMapping("/{id}")
    public ApiResponse getById(@PathVariable Long id) {
        log.info("Get order by id: {}", id);
        try {
            Order order = adminOrderService.getById(id);
            if (order == null) {
                return ApiResponse.error(404, "订单不存在");
            }
            return ApiResponse.success(order);
        } catch (Exception e) {
            log.error("Error getting order", e);
            return ApiResponse.error("获取订单信息失败");
        }
    }

    /**
     * 更新订单状态
     * POST /admin/order/{id}/status
     * 状态说明：
     *   0 - 待支付
     *   1 - 已支付
     *   2 - 服务中
     *   3 - 已完成
     *   4 - 已取消
     *   5 - 已退款
     */
    @PostMapping("/{id}/status")
    public ApiResponse updateStatus(@PathVariable Long id, @RequestBody Map payload) {
        log.info("Update order status: {}", id);
        try {
            Integer status = (Integer) payload.get("status");
            boolean result = adminOrderService.updateStatus(id, status);
            if (result) {
                return ApiResponse.success("状态更新成功");
            } else {
                return ApiResponse.error("状态更新失败");
            }
        } catch (Exception e) {
            log.error("Error updating order status", e);
            return ApiResponse.error(e.getMessage());
        }
    }

    /**
     * 取消订单
     * POST /admin/order/{id}/cancel
     */
    @PostMapping("/{id}/cancel")
    public ApiResponse cancel(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        log.info("Cancel order: {}", id);
        try {
            String reason = payload.get("reason");
            boolean result = adminOrderService.cancel(id, reason);
            if (result) {
                return ApiResponse.success("订单已取消");
            } else {
                return ApiResponse.error("取消失败");
            }
        } catch (Exception e) {
            log.error("Error cancelling order", e);
            return ApiResponse.error(e.getMessage());
        }
    }

    /**
     * 获取订单统计数据
     * GET /admin/order/statistics
     */
    @GetMapping("/statistics")
    public ApiResponse getStatistics(@RequestParam(required = false) Long counselorId) {
        log.info("Get order statistics, counselorId: {}", counselorId);
        try {
            Map stats = adminOrderService.getStatistics(counselorId);
            return ApiResponse.success(stats);
        } catch (Exception e) {
            log.error("Error getting order statistics", e);
            return ApiResponse.error("获取订单统计失败");
        }
    }
}

