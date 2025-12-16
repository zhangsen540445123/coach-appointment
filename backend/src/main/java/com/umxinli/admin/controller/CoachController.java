package com.umxinli.admin.controller;

import com.umxinli.admin.dto.PageRequest;
import com.umxinli.admin.dto.PageResponse;
import com.umxinli.admin.entity.AdminUser;
import com.umxinli.admin.entity.CounselorAudit;
import com.umxinli.admin.service.AdminAuthService;
import com.umxinli.admin.service.AdminCounselorService;
import com.umxinli.admin.service.CoachOrderService;
import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.Counselor;
import com.umxinli.entity.OrderReview;
import com.umxinli.service.CounselorService;
import com.umxinli.service.OrderReviewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 教练端控制器
 * 教练登录后可以访问的API
 */
@RestController
@RequestMapping("/admin/coach")
@CrossOrigin
public class CoachController {

    private static final Logger log = LoggerFactory.getLogger(CoachController.class);

    @Autowired
    private AdminAuthService adminAuthService;

    @Autowired
    private CounselorService counselorService;

    @Autowired
    private AdminCounselorService adminCounselorService;

    @Autowired
    private OrderReviewService orderReviewService;

    @Autowired
    private CoachOrderService coachOrderService;

    /**
     * 获取当前教练的个人信息
     */
    @GetMapping("/profile")
    public ApiResponse getProfile(@RequestHeader(value = "Authorization", required = false) String token) {
        try {
            AdminUser user = getCurrentUser(token);
            if (user == null) return ApiResponse.error(401, "未登录");
            if (!user.isCoach()) return ApiResponse.error(403, "无权限访问");
            
            Counselor counselor = counselorService.getCounselorById(user.getCounselorId());
            if (counselor == null) return ApiResponse.error("未找到教练信息");
            
            return ApiResponse.success(counselor);
        } catch (Exception e) {
            log.error("获取教练信息失败", e);
            return ApiResponse.error("获取教练信息失败");
        }
    }

    /**
     * 教练提交个人信息修改（需审核）
     */
    @PostMapping("/profile/submit")
    public ApiResponse submitProfile(@RequestBody Counselor counselor,
                                     @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            AdminUser user = getCurrentUser(token);
            if (user == null) return ApiResponse.error(401, "未登录");
            if (!user.isCoach()) return ApiResponse.error(403, "无权限访问");
            
            // 确保只能修改自己的信息
            counselor.setId(user.getCounselorId());
            CounselorAudit audit = adminCounselorService.submitUpdate(counselor, user);
            return ApiResponse.success("提交成功，等待审核", audit);
        } catch (Exception e) {
            log.error("提交信息修改失败", e);
            return ApiResponse.error(e.getMessage());
        }
    }

    /**
     * 获取当前教练的审核记录
     */
    @PostMapping("/audit/list")
    public ApiResponse getAuditList(@RequestBody PageRequest request,
                                    @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            AdminUser user = getCurrentUser(token);
            if (user == null) return ApiResponse.error(401, "未登录");
            if (!user.isCoach()) return ApiResponse.error(403, "无权限访问");
            
            PageResponse response = adminCounselorService.getAuditList(request, null);
            // 过滤只返回当前教练的审核记录
            return ApiResponse.success(response);
        } catch (Exception e) {
            log.error("获取审核记录失败", e);
            return ApiResponse.error("获取审核记录失败");
        }
    }

    /**
     * 获取当前教练的评价列表
     */
    @PostMapping("/review/list")
    public ApiResponse getReviewList(@RequestBody PageRequest request,
                                     @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            AdminUser user = getCurrentUser(token);
            if (user == null) return ApiResponse.error(401, "未登录");
            if (!user.isCoach()) return ApiResponse.error(403, "无权限访问");
            
            PageResponse response = orderReviewService.getList(request, user.getCounselorId(), null, null);
            return ApiResponse.success(response);
        } catch (Exception e) {
            log.error("获取评价列表失败", e);
            return ApiResponse.error("获取评价列表失败");
        }
    }

    /**
     * 设置评价置顶状态
     */
    @PostMapping("/review/{id}/top")
    public ApiResponse setReviewTop(@PathVariable Long id, @RequestBody Map<String, Integer> payload,
                                    @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            AdminUser user = getCurrentUser(token);
            if (user == null) return ApiResponse.error(401, "未登录");
            if (!user.isCoach()) return ApiResponse.error(403, "无权限访问");

            // 验证评价是否属于当前教练
            OrderReview review = orderReviewService.getById(id);
            if (review == null || !review.getCounselorId().equals(user.getCounselorId())) {
                return ApiResponse.error("无权操作此评价");
            }

            Integer isTop = payload.get("isTop");
            boolean result = orderReviewService.updateIsTop(id, isTop);
            return result ? ApiResponse.success("操作成功") : ApiResponse.error("操作失败");
        } catch (Exception e) {
            log.error("设置评价置顶失败", e);
            return ApiResponse.error("操作失败");
        }
    }

    /**
     * 设置评价显示/隐藏状态
     */
    @PostMapping("/review/{id}/visible")
    public ApiResponse setReviewVisible(@PathVariable Long id, @RequestBody Map<String, Integer> payload,
                                        @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            AdminUser user = getCurrentUser(token);
            if (user == null) return ApiResponse.error(401, "未登录");
            if (!user.isCoach()) return ApiResponse.error(403, "无权限访问");

            OrderReview review = orderReviewService.getById(id);
            if (review == null || !review.getCounselorId().equals(user.getCounselorId())) {
                return ApiResponse.error("无权操作此评价");
            }

            Integer isVisible = payload.get("isVisible");
            boolean result = orderReviewService.updateIsVisible(id, isVisible);
            return result ? ApiResponse.success("操作成功") : ApiResponse.error("操作失败");
        } catch (Exception e) {
            log.error("设置评价显示状态失败", e);
            return ApiResponse.error("操作失败");
        }
    }

    /**
     * 获取教练订单列表
     */
    @PostMapping("/order/list")
    public ApiResponse getOrderList(@RequestBody Map<String, Object> payload,
                                    @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            AdminUser user = getCurrentUser(token);
            if (user == null) return ApiResponse.error(401, "未登录");
            if (!user.isCoach()) return ApiResponse.error(403, "无权限访问");

            int page = (Integer) payload.getOrDefault("page", 1);
            int pageSize = (Integer) payload.getOrDefault("pageSize", 10);
            Integer status = payload.get("status") != null ? (Integer) payload.get("status") : null;

            PageRequest request = new PageRequest(page, pageSize);
            PageResponse response = coachOrderService.getOrderList(request, user.getCounselorId(), status);
            return ApiResponse.success(response);
        } catch (Exception e) {
            log.error("获取订单列表失败", e);
            return ApiResponse.error("获取订单列表失败");
        }
    }

    /**
     * 获取收益统计
     */
    @GetMapping("/earnings/stats")
    public ApiResponse getEarningsStats(@RequestHeader(value = "Authorization", required = false) String token) {
        try {
            AdminUser user = getCurrentUser(token);
            if (user == null) return ApiResponse.error(401, "未登录");
            if (!user.isCoach()) return ApiResponse.error(403, "无权限访问");

            Map<String, Object> result = new HashMap<>();
            result.put("last7Days", coachOrderService.getEarningsStats(user.getCounselorId(), 7));
            result.put("last30Days", coachOrderService.getEarningsStats(user.getCounselorId(), 30));
            result.put("lastYear", coachOrderService.getEarningsStats(user.getCounselorId(), 365));

            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("获取收益统计失败", e);
            return ApiResponse.error("获取收益统计失败");
        }
    }

    /**
     * 获取收益明细
     */
    @GetMapping("/earnings/detail")
    public ApiResponse getEarningsDetail(@RequestParam(defaultValue = "7") int days,
                                         @RequestParam(defaultValue = "1") int page,
                                         @RequestParam(defaultValue = "20") int pageSize,
                                         @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            AdminUser user = getCurrentUser(token);
            if (user == null) return ApiResponse.error(401, "未登录");
            if (!user.isCoach()) return ApiResponse.error(403, "无权限访问");

            List<Map<String, Object>> detail = coachOrderService.getEarningsDetail(
                    user.getCounselorId(), days, page, pageSize);
            return ApiResponse.success(detail);
        } catch (Exception e) {
            log.error("获取收益明细失败", e);
            return ApiResponse.error("获取收益明细失败");
        }
    }

    private AdminUser getCurrentUser(String token) {
        if (token == null || token.isEmpty()) return null;
        if (token.startsWith("Bearer ")) token = token.substring(7);
        return adminAuthService.getCurrentUser(token);
    }
}

