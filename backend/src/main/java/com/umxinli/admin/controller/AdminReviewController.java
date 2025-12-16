package com.umxinli.admin.controller;

import com.umxinli.admin.dto.PageRequest;
import com.umxinli.admin.dto.PageResponse;
import com.umxinli.admin.entity.AdminUser;
import com.umxinli.admin.service.AdminAuthService;
import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.OrderReview;
import com.umxinli.service.OrderReviewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 管理员评价管理控制器
 */
@RestController
@RequestMapping("/admin/review")
@CrossOrigin
public class AdminReviewController {

    private static final Logger log = LoggerFactory.getLogger(AdminReviewController.class);

    @Autowired
    private AdminAuthService adminAuthService;

    @Autowired
    private OrderReviewService orderReviewService;

    /**
     * 获取所有评价列表（按订单维度）
     */
    @PostMapping("/list")
    public ApiResponse getList(@RequestBody Map<String, Object> payload,
                               @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            AdminUser user = getCurrentUser(token);
            if (user == null) return ApiResponse.error(401, "未登录");
            if (!user.isAdmin()) return ApiResponse.error(403, "无权限访问");
            
            int page = (Integer) payload.getOrDefault("page", 1);
            int pageSize = (Integer) payload.getOrDefault("pageSize", 10);
            Long counselorId = payload.get("counselorId") != null ? 
                    Long.valueOf(payload.get("counselorId").toString()) : null;
            Integer isVisible = payload.get("isVisible") != null ? 
                    (Integer) payload.get("isVisible") : null;
            
            PageRequest request = new PageRequest(page, pageSize);
            PageResponse response = orderReviewService.getList(request, counselorId, null, isVisible);
            return ApiResponse.success(response);
        } catch (Exception e) {
            log.error("获取评价列表失败", e);
            return ApiResponse.error("获取评价列表失败");
        }
    }

    /**
     * 按教练分组统计评价
     */
    @GetMapping("/byCounselor")
    public ApiResponse getByCounselor(@RequestHeader(value = "Authorization", required = false) String token) {
        try {
            AdminUser user = getCurrentUser(token);
            if (user == null) return ApiResponse.error(401, "未登录");
            if (!user.isAdmin()) return ApiResponse.error(403, "无权限访问");
            
            List<Map<String, Object>> list = orderReviewService.countByCounselor();
            return ApiResponse.success(list);
        } catch (Exception e) {
            log.error("获取教练评价统计失败", e);
            return ApiResponse.error("获取教练评价统计失败");
        }
    }

    /**
     * 获取评价详情
     */
    @GetMapping("/{id}")
    public ApiResponse getById(@PathVariable Long id,
                               @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            AdminUser user = getCurrentUser(token);
            if (user == null) return ApiResponse.error(401, "未登录");
            if (!user.isAdmin()) return ApiResponse.error(403, "无权限访问");
            
            OrderReview review = orderReviewService.getById(id);
            return review != null ? ApiResponse.success(review) : ApiResponse.error("评价不存在");
        } catch (Exception e) {
            log.error("获取评价详情失败", e);
            return ApiResponse.error("获取评价详情失败");
        }
    }

    /**
     * 设置评价显示/隐藏状态
     */
    @PostMapping("/{id}/visible")
    public ApiResponse setVisible(@PathVariable Long id, @RequestBody Map<String, Integer> payload,
                                  @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            AdminUser user = getCurrentUser(token);
            if (user == null) return ApiResponse.error(401, "未登录");
            if (!user.isAdmin()) return ApiResponse.error(403, "无权限访问");
            
            Integer isVisible = payload.get("isVisible");
            boolean result = orderReviewService.updateIsVisible(id, isVisible);
            return result ? ApiResponse.success("操作成功") : ApiResponse.error("操作失败");
        } catch (Exception e) {
            log.error("设置评价显示状态失败", e);
            return ApiResponse.error("操作失败");
        }
    }

    /**
     * 删除评价
     */
    @DeleteMapping("/{id}")
    public ApiResponse delete(@PathVariable Long id,
                              @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            AdminUser user = getCurrentUser(token);
            if (user == null) return ApiResponse.error(401, "未登录");
            if (!user.isAdmin()) return ApiResponse.error(403, "无权限访问");
            
            boolean result = orderReviewService.delete(id);
            return result ? ApiResponse.success("删除成功") : ApiResponse.error("删除失败");
        } catch (Exception e) {
            log.error("删除评价失败", e);
            return ApiResponse.error("删除失败");
        }
    }

    private AdminUser getCurrentUser(String token) {
        if (token == null || token.isEmpty()) return null;
        if (token.startsWith("Bearer ")) token = token.substring(7);
        return adminAuthService.getCurrentUser(token);
    }
}

