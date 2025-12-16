package com.umxinli.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.OrderReview;
import com.umxinli.entity.User;
import com.umxinli.mapper.UserMapper;
import com.umxinli.service.OrderReviewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 订单评价控制器（小程序端）
 */
@RestController
@RequestMapping("/order/review")
@CrossOrigin
public class OrderReviewController {

    private static final Logger log = LoggerFactory.getLogger(OrderReviewController.class);

    @Autowired
    private OrderReviewService orderReviewService;

    @Autowired
    private UserMapper userMapper;

    /**
     * 提交订单评价
     * POST /order/review/submit
     */
    @PostMapping("/submit")
    public ApiResponse submitReview(@RequestBody Map<String, Object> payload,
                                    @RequestHeader(value = "X-User-Openid", required = false) String openid) {
        log.info("Submit review request, openid: {}", openid);
        try {
            if (openid == null || openid.isEmpty()) {
                return ApiResponse.error(401, "请先登录");
            }

            // 通过openid获取用户ID
            User user = userMapper.selectByOpenid(openid);
            if (user == null) {
                return ApiResponse.error(401, "用户不存在");
            }

            Long orderId = Long.valueOf(payload.get("orderId").toString());
            Integer rating = (Integer) payload.get("rating");
            String content = (String) payload.get("content");
            List<String> images = (List<String>) payload.get("images");
            Integer isAnonymous = payload.get("isAnonymous") != null ? (Integer) payload.get("isAnonymous") : 0;

            // 验证参数
            if (orderId == null) {
                return ApiResponse.error("订单ID不能为空");
            }
            if (rating == null || rating < 1 || rating > 5) {
                return ApiResponse.error("评分必须在1-5之间");
            }

            OrderReview review = orderReviewService.submitReview(orderId, user.getId(), rating, content, images, isAnonymous);
            return ApiResponse.success("评价成功", review);
        } catch (Exception e) {
            log.error("提交评价失败", e);
            return ApiResponse.error(e.getMessage());
        }
    }

    /**
     * 获取订单的评价
     * GET /order/review/{orderId}
     */
    @GetMapping("/{orderId}")
    public ApiResponse getByOrderId(@PathVariable Long orderId) {
        try {
            OrderReview review = orderReviewService.getByOrderId(orderId);
            return ApiResponse.success(review);
        } catch (Exception e) {
            log.error("获取评价失败", e);
            return ApiResponse.error("获取评价失败");
        }
    }

    /**
     * 检查订单是否已评价
     * GET /order/review/check/{orderId}
     */
    @GetMapping("/check/{orderId}")
    public ApiResponse checkReviewed(@PathVariable Long orderId) {
        try {
            OrderReview review = orderReviewService.getByOrderId(orderId);
            return ApiResponse.success(review != null);
        } catch (Exception e) {
            log.error("检查评价状态失败", e);
            return ApiResponse.error("检查失败");
        }
    }

    /**
     * 获取教练的评价列表（小程序端显示）
     * GET /order/review/counselor/{counselorId}
     */
    @GetMapping("/counselor/{counselorId}")
    public ApiResponse getCounselorReviews(@PathVariable Long counselorId,
                                           @RequestParam(defaultValue = "1") int page,
                                           @RequestParam(defaultValue = "10") int pageSize) {
        try {
            com.umxinli.admin.dto.PageRequest request = new com.umxinli.admin.dto.PageRequest(page, pageSize);
            // 只返回显示的评价
            com.umxinli.admin.dto.PageResponse response = orderReviewService.getList(request, counselorId, null, 1);
            return ApiResponse.success(response);
        } catch (Exception e) {
            log.error("获取教练评价失败", e);
            return ApiResponse.error("获取评价失败");
        }
    }

    /**
     * 获取教练的评价统计
     * GET /order/review/counselor/{counselorId}/stats
     */
    @GetMapping("/counselor/{counselorId}/stats")
    public ApiResponse getCounselorStats(@PathVariable Long counselorId) {
        try {
            Map<String, Object> stats = orderReviewService.getCounselorStats(counselorId);
            return ApiResponse.success(stats);
        } catch (Exception e) {
            log.error("获取评价统计失败", e);
            return ApiResponse.error("获取统计失败");
        }
    }

    /**
     * 获取我的评价列表
     * GET /order/review/my
     */
    @GetMapping("/my")
    public ApiResponse getMyReviews(@RequestHeader(value = "X-User-Openid", required = false) String openid,
                                    @RequestParam(defaultValue = "1") int page,
                                    @RequestParam(defaultValue = "10") int pageSize) {
        log.info("Get my reviews request, openid: {}", openid);
        try {
            if (openid == null || openid.isEmpty()) {
                return ApiResponse.error(401, "请先登录");
            }

            // 通过openid获取用户ID
            User user = userMapper.selectByOpenid(openid);
            if (user == null) {
                return ApiResponse.error(401, "用户不存在");
            }

            com.umxinli.admin.dto.PageRequest request = new com.umxinli.admin.dto.PageRequest(page, pageSize);
            com.umxinli.admin.dto.PageResponse response = orderReviewService.getList(request, null, user.getId(), null);
            return ApiResponse.success(response);
        } catch (Exception e) {
            log.error("获取我的评价失败", e);
            return ApiResponse.error("获取评价失败");
        }
    }

    /**
     * 删除我的评价
     * DELETE /order/review/{id}
     */
    @DeleteMapping("/{id}")
    public ApiResponse deleteMyReview(@PathVariable Long id,
                                      @RequestHeader(value = "X-User-Openid", required = false) String openid) {
        log.info("Delete my review request, id: {}, openid: {}", id, openid);
        try {
            if (openid == null || openid.isEmpty()) {
                return ApiResponse.error(401, "请先登录");
            }

            // 通过openid获取用户ID
            User user = userMapper.selectByOpenid(openid);
            if (user == null) {
                return ApiResponse.error(401, "用户不存在");
            }

            // 检查评价是否存在且属于该用户
            OrderReview review = orderReviewService.getById(id);
            if (review == null) {
                return ApiResponse.error("评价不存在");
            }
            if (!review.getUserId().equals(user.getId())) {
                return ApiResponse.error(403, "无权删除此评价");
            }

            boolean result = orderReviewService.delete(id);
            return result ? ApiResponse.success("删除成功") : ApiResponse.error("删除失败");
        } catch (Exception e) {
            log.error("删除评价失败", e);
            return ApiResponse.error("删除失败");
        }
    }
}

