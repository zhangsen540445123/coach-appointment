package com.umxinli.controller;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.GlobalSettings;
import com.umxinli.entity.Order;
import com.umxinli.entity.VisitorInfo;
import com.umxinli.entity.Coupon;
import com.umxinli.entity.CouponCode;
import com.umxinli.entity.UserCoupon;
import com.umxinli.entity.UserFeedback;
import com.umxinli.mapper.VisitorInfoMapper;
import com.umxinli.mapper.CouponMapper;
import com.umxinli.mapper.CouponCodeMapper;
import com.umxinli.mapper.UserCouponMapper;
import com.umxinli.mapper.UserFeedbackMapper;
import com.umxinli.service.OrderService;
import com.umxinli.service.SettingsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Collections;
import java.util.ArrayList;

@RestController
@RequestMapping("/visitor")
@CrossOrigin
public class VisitorController {

    private static final Logger log = LoggerFactory.getLogger(VisitorController.class);

    @Autowired
    private SettingsService settingsService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private VisitorInfoMapper visitorInfoMapper;

    @Autowired
    private CouponMapper couponMapper;

    @Autowired
    private CouponCodeMapper couponCodeMapper;

    @Autowired
    private UserCouponMapper userCouponMapper;

    @Autowired
    private UserFeedbackMapper userFeedbackMapper;

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

    /**
     * 提交订单
     * POST /visitor/order/submit
     */
    @PostMapping("/order/submit")
    public ApiResponse submitOrder(@RequestBody Map<String, Object> payload) {
        log.info("Submit order request: {}", payload);
        try {
            Order order = new Order();

            // 解析请求参数
            if (payload.get("counselorId") != null) {
                order.setCounselorId(Long.valueOf(payload.get("counselorId").toString()));
            }
            if (payload.get("consultType") != null) {
                order.setConsultType(Integer.valueOf(payload.get("consultType").toString()));
            }
            if (payload.get("consultWay") != null) {
                order.setConsultWay(Integer.valueOf(payload.get("consultWay").toString()));
            }
            if (payload.get("price") != null) {
                order.setPrice(new java.math.BigDecimal(payload.get("price").toString()));
            }
            if (payload.get("consultTime") != null) {
                // 解析咨询时间
                String consultTimeStr = payload.get("consultTime").toString();
                java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm");
                order.setConsultTime(sdf.parse(consultTimeStr));
            }

            // 创建订单
            Order createdOrder = orderService.createOrder(order);
            if (createdOrder != null) {
                Map<String, Object> result = new HashMap<>();
                result.put("orderId", createdOrder.getId());
                result.put("orderNo", createdOrder.getOrderNo());
                result.put("orderAmount", createdOrder.getPrice() != null ? createdOrder.getPrice().doubleValue() : 0);
                return ApiResponse.success(result);
            } else {
                return ApiResponse.error("Failed to create order");
            }
        } catch (Exception e) {
            log.error("Error submitting order", e);
            return ApiResponse.error("Failed to submit order: " + e.getMessage());
        }
    }

    /**
     * 获取订单列表
     * POST /visitor/order/getList
     */
    @PostMapping("/order/getList")
    public ApiResponse getOrderList(@RequestBody Map<String, Object> payload) {
        log.info("Get order list request: {}", payload);
        try {
            // 解析分页参数
            Map<String, Object> pager = (Map<String, Object>) payload.get("pager");
            Integer page = 1;
            Integer pageSize = 20;
            if (pager != null) {
                page = (Integer) pager.getOrDefault("index", 1);
                pageSize = (Integer) pager.getOrDefault("size", 20);
            }

            // 解析状态参数 - 前端 orderStatus: 0全部, 1待支付, 2进行中, 3已完成
            Integer status = null;
            if (payload.get("orderStatus") != null) {
                status = Integer.valueOf(payload.get("orderStatus").toString());
            }

            // 解析用户ID
            Long userId = null;
            if (payload.get("visitoruserId") != null) {
                userId = Long.valueOf(payload.get("visitoruserId").toString());
            }

            log.info("Parsed params - page: {}, pageSize: {}, status: {}, userId: {}", page, pageSize, status, userId);

            // 使用新的联表查询方法获取订单列表（包含教练信息）
            var orders = orderService.getOrderListWithCounselor(page, pageSize, status, userId);
            int total = orderService.countOrders(status == 0 ? null : status);
            int pages = (int) Math.ceil((double) total / pageSize);

            Map<String, Object> result = new HashMap<>();
            result.put("list", orders);
            result.put("total", total);
            result.put("pages", pages);
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("Error getting order list", e);
            return ApiResponse.error("Failed to get order list");
        }
    }

    /**
     * 获取系统订单列表
     * POST /visitor/order/getSysOrderList
     */
    @PostMapping("/order/getSysOrderList")
    public ApiResponse getSysOrderList(@RequestBody Map<String, Object> payload) {
        log.info("Get sys order list request: {}", payload);
        try {
            Map<String, Object> result = new HashMap<>();
            result.put("list", Collections.emptyList());
            result.put("total", 0);
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("Error getting sys order list", e);
            return ApiResponse.error("Failed to get sys order list");
        }
    }

    /**
     * 更新咨询时间
     * POST /visitor/order/updateConsultTime
     */
    @PostMapping("/order/updateConsultTime")
    public ApiResponse updateConsultTime(@RequestBody Map<String, Object> payload) {
        Long orderId = Long.valueOf(payload.get("orderId").toString());
        String consultTime = (String) payload.get("consultTime");
        log.info("Update consult time request - orderId: {}, consultTime: {}", orderId, consultTime);
        try {
            int result = orderService.updateConsultTime(orderId, consultTime);
            if (result > 0) {
                return ApiResponse.success("Consult time updated successfully");
            } else {
                return ApiResponse.error("Failed to update consult time");
            }
        } catch (Exception e) {
            log.error("Error updating consult time", e);
            return ApiResponse.error("Failed to update consult time");
        }
    }

    /**
     * 绑定访客到订单
     * POST /visitor/order/bind_visitor
     */
    @PostMapping("/order/bind_visitor")
    public ApiResponse bindVisitor(@RequestBody Map<String, Object> payload) {
        Long orderId = Long.valueOf(payload.get("orderId").toString());
        Long visitorId = Long.valueOf(payload.get("visitorId").toString());
        log.info("Bind visitor request - orderId: {}, visitorId: {}", orderId, visitorId);
        try {
            int result = orderService.bindVisitor(orderId, visitorId);
            if (result > 0) {
                return ApiResponse.success("Visitor bound successfully");
            } else {
                return ApiResponse.error("Failed to bind visitor");
            }
        } catch (Exception e) {
            log.error("Error binding visitor", e);
            return ApiResponse.error("Failed to bind visitor");
        }
    }

    /**
     * 修改IP
     * POST /visitor/user/changeIP
     */
    @PostMapping("/user/changeIP")
    public ApiResponse changeIP(@RequestBody Map<String, Object> payload) {
        log.info("Change IP request: {}", payload);
        try {
            return ApiResponse.success("IP changed successfully");
        } catch (Exception e) {
            log.error("Error changing IP", e);
            return ApiResponse.error("Failed to change IP");
        }
    }

    /**
     * 请求删除账号
     * POST /visitor/user/requestDeleteAccount
     */
    @PostMapping("/user/requestDeleteAccount")
    public ApiResponse requestDeleteAccount(@RequestBody Map<String, Object> payload) {
        log.info("Request delete account: {}", payload);
        try {
            return ApiResponse.success("Delete account request submitted");
        } catch (Exception e) {
            log.error("Error requesting delete account", e);
            return ApiResponse.error("Failed to request delete account");
        }
    }

    /**
     * 获取消息列表
     * POST /visitor/user/getMessageList
     */
    @PostMapping("/user/getMessageList")
    public ApiResponse getMessageList(@RequestBody Map<String, Object> payload) {
        log.info("Get message list request: {}", payload);
        try {
            Map<String, Object> result = new HashMap<>();
            result.put("list", Collections.emptyList());
            result.put("total", 0);
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("Error getting message list", e);
            return ApiResponse.error("Failed to get message list");
        }
    }

    /**
     * 获取访客信息
     * GET /visitor/visitorInfo/showUserVisitorInfoByUserid
     */
    @GetMapping("/visitorInfo/showUserVisitorInfoByUserid")
    public ApiResponse getVisitorInfo(@RequestParam(required = false) Long userId,
                                       @RequestParam(required = false) Integer type) {
        log.info("Get visitor info request for userId: {}, type: {}", userId, type);
        try {
            if (userId == null) {
                return ApiResponse.success(Collections.emptyList());
            }
            VisitorInfo info = visitorInfoMapper.selectByUserId(userId);
            if (info != null) {
                List<VisitorInfo> list = new ArrayList<>();
                list.add(info);
                return ApiResponse.success(list);
            }
            return ApiResponse.success(Collections.emptyList());
        } catch (Exception e) {
            log.error("Error getting visitor info", e);
            return ApiResponse.error("Failed to get visitor info");
        }
    }

    /**
     * 根据ID获取访客信息
     * GET /visitor/visitorInfo/showUserVisitorInfoById/{id}
     */
    @GetMapping("/visitorInfo/showUserVisitorInfoById/{id}")
    public ApiResponse getVisitorInfoById(@PathVariable Long id) {
        log.info("Get visitor info by id: {}", id);
        try {
            VisitorInfo info = visitorInfoMapper.selectById(id);
            if (info != null) {
                return ApiResponse.success(info);
            }
            return ApiResponse.error("Visitor info not found");
        } catch (Exception e) {
            log.error("Error getting visitor info by id", e);
            return ApiResponse.error("Failed to get visitor info");
        }
    }

    /**
     * 保存或更新客户信息
     * POST /visitor/visitorInfo/save
     */
    @PostMapping("/visitorInfo/save")
    public ApiResponse saveVisitorInfo(@RequestBody VisitorInfo visitorInfo) {
        log.info("Save visitor info request: {}", visitorInfo);
        try {
            if (visitorInfo.getUserId() == null) {
                return ApiResponse.error("userId is required");
            }

            VisitorInfo existing = visitorInfoMapper.selectByUserId(visitorInfo.getUserId());
            int result;
            if (existing != null) {
                visitorInfo.setId(existing.getId());
                result = visitorInfoMapper.update(visitorInfo);
            } else {
                result = visitorInfoMapper.insert(visitorInfo);
            }

            if (result > 0) {
                return ApiResponse.success(visitorInfo);
            }
            return ApiResponse.error("Failed to save visitor info");
        } catch (Exception e) {
            log.error("Error saving visitor info", e);
            return ApiResponse.error("Failed to save visitor info: " + e.getMessage());
        }
    }

    /**
     * 更新成人客户信息（小程序使用）
     * POST /visitor/visitorInfo/updateAdultsInfo
     */
    @PostMapping("/visitorInfo/updateAdultsInfo")
    public ApiResponse updateAdultsInfo(@RequestBody VisitorInfo visitorInfo) {
        log.info("Update adults info request: {}", visitorInfo);
        try {
            if (visitorInfo.getUserId() == null) {
                return ApiResponse.error("userId is required");
            }

            VisitorInfo existing = visitorInfoMapper.selectByUserId(visitorInfo.getUserId());
            int result;
            if (existing != null) {
                visitorInfo.setId(existing.getId());
                result = visitorInfoMapper.update(visitorInfo);
            } else {
                result = visitorInfoMapper.insert(visitorInfo);
            }

            if (result > 0) {
                return ApiResponse.success(visitorInfo);
            }
            return ApiResponse.error("保存失败");
        } catch (Exception e) {
            log.error("Error updating adults info", e);
            return ApiResponse.error("保存失败: " + e.getMessage());
        }
    }

    /**
     * 删除访客
     * POST /visitor/visitorInfo/deleteVisitor
     */
    @PostMapping("/visitorInfo/deleteVisitor")
    public ApiResponse deleteVisitor(@RequestBody Map<String, Object> payload) {
        Long visitorId = Long.valueOf(payload.get("visitorId").toString());
        log.info("Delete visitor request for visitorId: {}", visitorId);
        try {
            int result = visitorInfoMapper.deleteById(visitorId);
            if (result > 0) {
                return ApiResponse.success("Visitor deleted successfully");
            }
            return ApiResponse.error("Failed to delete visitor");
        } catch (Exception e) {
            log.error("Error deleting visitor", e);
            return ApiResponse.error("Failed to delete visitor");
        }
    }

    /**
     * 获取用户优惠券列表
     * GET /visitor/coupon/list
     */
    @GetMapping("/coupon/list")
    public ApiResponse getCouponList(@RequestParam Long userId, @RequestParam(defaultValue = "1") Integer valid) {
        log.info("Get coupon list for userId: {}, valid: {}", userId, valid);
        try {
            // valid: 0=可使用, 1=已使用/过期
            Integer status = valid == 1 ? 0 : null; // 0=未使用
            List<Map<String, Object>> list = userCouponMapper.selectUserCouponList(userId, status, 0, 100);

            // 转换为小程序期望的格式
            List<Map<String, Object>> result = new ArrayList<>();
            for (Map<String, Object> item : list) {
                Map<String, Object> couponItem = new HashMap<>();
                couponItem.put("couponDetailId", item.get("id"));
                couponItem.put("couponId", item.get("couponId"));
                couponItem.put("couponName", item.get("couponName"));
                couponItem.put("amount", item.get("discountAmount"));
                couponItem.put("minAmount", item.get("minAmount"));
                couponItem.put("couponType", item.get("couponType"));
                couponItem.put("beginTime", item.get("startTime"));
                couponItem.put("endTime", item.get("endTime"));
                couponItem.put("used", item.get("status"));
                couponItem.put("coachScope", item.get("coachScope"));
                couponItem.put("coachIds", item.get("coachIds"));
                result.add(couponItem);
            }
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("Error getting coupon list", e);
            return ApiResponse.error("Failed to get coupon list");
        }
    }

    /**
     * 兑换优惠券
     * POST /visitor/coupon/exchange
     */
    @PostMapping("/coupon/exchange")
    public ApiResponse exchangeCoupon(@RequestBody Map<String, Object> payload) {
        String code = (String) payload.get("code");
        Long userId = Long.valueOf(payload.get("userId").toString());
        log.info("Exchange coupon code: {} for userId: {}", code, userId);
        try {
            // 查找兑换码
            CouponCode couponCode = couponCodeMapper.selectByCode(code);
            if (couponCode == null) {
                return ApiResponse.error("兑换码无效");
            }
            if (couponCode.getStatus() != 1) {
                return ApiResponse.error("兑换码已停用");
            }
            if (couponCode.getUsedCount() >= couponCode.getTotalCount()) {
                return ApiResponse.error("兑换码已被领完");
            }

            // 查找对应的优惠券模板
            Coupon coupon = couponMapper.selectById(couponCode.getCouponId());
            if (coupon == null || !coupon.isValid()) {
                return ApiResponse.error("该优惠券已失效");
            }

            // 创建用户优惠券
            UserCoupon userCoupon = new UserCoupon();
            userCoupon.setUserId(userId);
            userCoupon.setCouponId(coupon.getId());
            userCoupon.setStatus(UserCoupon.STATUS_UNUSED);
            userCoupon.setReceiveType(UserCoupon.RECEIVE_TYPE_EXCHANGE);
            userCouponMapper.insert(userCoupon);

            // 增加兑换码使用次数
            couponCodeMapper.incrementUsedCount(couponCode.getId());

            return ApiResponse.success("兑换成功");
        } catch (Exception e) {
            log.error("Error exchanging coupon", e);
            return ApiResponse.error("兑换失败: " + e.getMessage());
        }
    }

    /**
     * 提交用户反馈
     * POST /visitor/feedback/submit
     */
    @PostMapping("/feedback/submit")
    public ApiResponse submitFeedback(@RequestBody Map<String, Object> payload) {
        log.info("Submit feedback request: {}", payload);
        try {
            Long userId = Long.valueOf(payload.get("userId").toString());
            String content = (String) payload.get("content");
            String userName = (String) payload.getOrDefault("userName", "");

            if (content == null || content.trim().isEmpty()) {
                return ApiResponse.error("反馈内容不能为空");
            }

            UserFeedback feedback = new UserFeedback();
            feedback.setUserId(userId);
            feedback.setUserName(userName);
            feedback.setContent(content);
            userFeedbackMapper.insert(feedback);

            return ApiResponse.success("提交成功");
        } catch (Exception e) {
            log.error("Error submitting feedback", e);
            return ApiResponse.error("提交失败: " + e.getMessage());
        }
    }
}
