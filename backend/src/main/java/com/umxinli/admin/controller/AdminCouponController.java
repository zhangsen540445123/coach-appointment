package com.umxinli.admin.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.Coupon;
import com.umxinli.entity.CouponCode;
import com.umxinli.entity.Counselor;
import com.umxinli.entity.User;
import com.umxinli.entity.UserCoupon;
import com.umxinli.mapper.CouponCodeMapper;
import com.umxinli.mapper.CouponMapper;
import com.umxinli.mapper.CounselorMapper;
import com.umxinli.mapper.UserCouponMapper;
import com.umxinli.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/admin/coupon")
@CrossOrigin
public class AdminCouponController {

    @Autowired
    private CouponMapper couponMapper;
    @Autowired
    private UserCouponMapper userCouponMapper;
    @Autowired
    private CouponCodeMapper couponCodeMapper;
    @Autowired
    private CounselorMapper counselorMapper;
    @Autowired
    private UserMapper userMapper;

    // ==================== 优惠券模板管理 ====================

    @GetMapping("/coaches")
    public ApiResponse<?> getCoachList() {
        try {
            List<Counselor> coaches = counselorMapper.selectAll();
            // 只返回 id 和 name，减少数据传输
            List<Map<String, Object>> result = new java.util.ArrayList<>();
            for (Counselor c : coaches) {
                Map<String, Object> item = new HashMap<>();
                item.put("id", c.getId());
                item.put("name", c.getName());
                result.add(item);
            }
            return ApiResponse.success(result);
        } catch (Exception e) {
            return ApiResponse.error(500, "获取教练列表失败: " + e.getMessage());
        }
    }

    @GetMapping("/list")
    public ApiResponse<?> getCouponList(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Integer type,
            @RequestParam(required = false) Integer status) {
        try {
            int offset = (page - 1) * size;
            List<Map<String, Object>> list = couponMapper.selectCouponList(keyword, type, status, offset, size);
            int total = couponMapper.countCouponList(keyword, type, status);
            Map<String, Object> result = new HashMap<>();
            result.put("list", list);
            result.put("total", total);
            result.put("page", page);
            result.put("size", size);
            return ApiResponse.success(result);
        } catch (Exception e) {
            return ApiResponse.error(500, "获取优惠券列表失败: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getCoupon(@PathVariable Long id) {
        try {
            Coupon coupon = couponMapper.selectById(id);
            return coupon != null ? ApiResponse.success(coupon) : ApiResponse.error(404, "优惠券不存在");
        } catch (Exception e) {
            return ApiResponse.error(500, "获取优惠券失败: " + e.getMessage());
        }
    }

    @PostMapping("/save")
    public ApiResponse<?> saveCoupon(@RequestBody Map<String, Object> requestData) {
        try {
            Coupon coupon = new Coupon();

            // 基本字段
            if (requestData.get("id") != null) {
                coupon.setId(Long.parseLong(requestData.get("id").toString()));
            }
            coupon.setName((String) requestData.get("name"));
            coupon.setType((Integer) requestData.get("type"));
            coupon.setDiscountAmount(new BigDecimal(requestData.get("discountAmount").toString()));
            coupon.setMinAmount(new BigDecimal(requestData.get("minAmount").toString()));
            coupon.setCoachScope((Integer) requestData.get("coachScope"));
            coupon.setStatus((Integer) requestData.get("status"));

            // 处理 coachIds - 将 Long 数组转换为 String 数组
            if (requestData.get("coachIds") != null) {
                List<?> coachIdList = (List<?>) requestData.get("coachIds");
                List<String> coachIds = new ArrayList<>();
                for (Object id : coachIdList) {
                    coachIds.add(id.toString());
                }
                coupon.setCoachIds(coachIds);
            }

            // 处理时间字段 - 支持 ISO 8601 格式（如 2025-12-21T16:00:00.000Z）
            if (requestData.get("startTime") != null) {
                coupon.setStartTime(parseDateTime(requestData.get("startTime").toString()));
            }
            if (requestData.get("endTime") != null) {
                coupon.setEndTime(parseDateTime(requestData.get("endTime").toString()));
            }

            if (coupon.getId() == null) {
                coupon.setCreatedAt(LocalDateTime.now());
                couponMapper.insert(coupon);
            } else {
                coupon.setUpdatedAt(LocalDateTime.now());
                couponMapper.updateById(coupon);
            }
            return ApiResponse.success(coupon.getId());
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.error(500, "保存优惠券失败: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteCoupon(@PathVariable Long id) {
        try {
            couponMapper.deleteById(id);
            return ApiResponse.success("删除成功");
        } catch (Exception e) {
            return ApiResponse.error(500, "删除优惠券失败: " + e.getMessage());
        }
    }

    @PostMapping("/{id}/toggle-status")
    public ApiResponse<?> toggleStatus(@PathVariable Long id) {
        try {
            Coupon coupon = couponMapper.selectById(id);
            if (coupon == null) return ApiResponse.error(404, "优惠券不存在");
            coupon.setStatus(coupon.getStatus() == 1 ? 0 : 1);
            couponMapper.updateById(coupon);
            return ApiResponse.success("状态更新成功");
        } catch (Exception e) {
            return ApiResponse.error(500, "更新状态失败: " + e.getMessage());
        }
    }

    // ==================== 优惠券推送 ====================

    @PostMapping("/push")
    public ApiResponse<?> pushCoupon(@RequestBody Map<String, Object> params) {
        try {
            Long couponId = Long.parseLong(params.get("couponId").toString());
            String pushType = params.get("pushType") != null ? params.get("pushType").toString() : null;
            @SuppressWarnings("unchecked")
            List<?> userIdList = (List<?>) params.get("userIds");

            Coupon coupon = couponMapper.selectById(couponId);
            if (coupon == null) return ApiResponse.error(404, "优惠券不存在");

            List<UserCoupon> toInsert = new ArrayList<>();
            if ("all".equals(pushType)) {
                // 全员推送 - 获取所有用户ID
                List<Long> allUserIds = getAllUserIds();
                for (Long userId : allUserIds) {
                    UserCoupon uc = createUserCoupon(userId, couponId, UserCoupon.RECEIVE_TYPE_PUSH);
                    toInsert.add(uc);
                }
            } else if (userIdList != null && !userIdList.isEmpty()) {
                for (Object userIdObj : userIdList) {
                    Long userId = Long.parseLong(userIdObj.toString());
                    UserCoupon uc = createUserCoupon(userId, couponId, UserCoupon.RECEIVE_TYPE_PUSH);
                    toInsert.add(uc);
                }
            }

            if (!toInsert.isEmpty()) {
                userCouponMapper.batchInsertUserCoupon(toInsert);
            }
            return ApiResponse.success("推送成功，共推送给 " + toInsert.size() + " 位用户");
        } catch (Exception e) {
            return ApiResponse.error(500, "推送优惠券失败: " + e.getMessage());
        }
    }

    // ==================== 发放记录 ====================

    @GetMapping("/distribution/{couponId}")
    public ApiResponse<?> getDistributionList(
            @PathVariable Long couponId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            int offset = (page - 1) * size;
            List<Map<String, Object>> list = userCouponMapper.selectCouponDistributionList(couponId, offset, size);
            int total = userCouponMapper.countCouponDistribution(couponId);
            Map<String, Object> result = new HashMap<>();
            result.put("list", list);
            result.put("total", total);
            return ApiResponse.success(result);
        } catch (Exception e) {
            return ApiResponse.error(500, "获取发放记录失败: " + e.getMessage());
        }
    }

    private UserCoupon createUserCoupon(Long userId, Long couponId, int receiveType) {
        UserCoupon uc = new UserCoupon();
        uc.setUserId(userId);
        uc.setCouponId(couponId);
        uc.setStatus(UserCoupon.STATUS_UNUSED);
        uc.setReceiveType(receiveType);
        return uc;
    }

    private List<Long> getAllUserIds() {
        // 获取所有用户ID
        List<User> allUsers = userMapper.selectAll();
        List<Long> userIds = new ArrayList<>();
        for (User user : allUsers) {
            userIds.add(user.getId());
        }
        return userIds;
    }

    // ==================== 兑换码管理 ====================

    @GetMapping("/code/list")
    public ApiResponse<?> getCodeList(
            @RequestParam(required = false) Long couponId,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            int offset = (page - 1) * size;
            List<Map<String, Object>> list = couponCodeMapper.selectCouponCodeList(couponId, keyword, offset, size);
            int total = couponCodeMapper.countCouponCodeList(couponId, keyword);
            Map<String, Object> result = new HashMap<>();
            result.put("list", list);
            result.put("total", total);
            return ApiResponse.success(result);
        } catch (Exception e) {
            return ApiResponse.error(500, "获取兑换码列表失败: " + e.getMessage());
        }
    }

    @PostMapping("/code/generate")
    public ApiResponse<?> generateCode(@RequestBody Map<String, Object> params) {
        try {
            Long couponId = Long.parseLong(params.get("couponId").toString());
            int count = params.get("count") != null ? Integer.parseInt(params.get("count").toString()) : 1;
            int quantity = params.get("quantity") != null ? Integer.parseInt(params.get("quantity").toString()) : 1;

            Coupon coupon = couponMapper.selectById(couponId);
            if (coupon == null) return ApiResponse.error(404, "优惠券不存在");

            List<String> codes = new ArrayList<>();
            for (int i = 0; i < count; i++) {
                String code = generateUniqueCode();
                CouponCode cc = new CouponCode();
                cc.setCode(code);
                cc.setCouponId(couponId);
                cc.setTotalCount(quantity);
                cc.setUsedCount(0);
                cc.setStatus(1);
                cc.setCreatedAt(LocalDateTime.now());
                couponCodeMapper.insert(cc);
                codes.add(code);
            }
            return ApiResponse.success(codes);
        } catch (Exception e) {
            return ApiResponse.error(500, "生成兑换码失败: " + e.getMessage());
        }
    }

    @DeleteMapping("/code/{id}")
    public ApiResponse<?> deleteCode(@PathVariable Long id) {
        try {
            couponCodeMapper.deleteById(id);
            return ApiResponse.success("删除成功");
        } catch (Exception e) {
            return ApiResponse.error(500, "删除兑换码失败: " + e.getMessage());
        }
    }

    @PostMapping("/code/{id}/toggle-status")
    public ApiResponse<?> toggleCodeStatus(@PathVariable Long id) {
        try {
            CouponCode code = couponCodeMapper.selectById(id);
            if (code == null) return ApiResponse.error(404, "兑换码不存在");
            code.setStatus(code.getStatus() == 1 ? 0 : 1);
            couponCodeMapper.updateById(code);
            return ApiResponse.success("状态更新成功");
        } catch (Exception e) {
            return ApiResponse.error(500, "更新状态失败: " + e.getMessage());
        }
    }

    private String generateUniqueCode() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 8; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }

    /**
     * 解析日期时间字符串，支持多种格式：
     * - ISO 8601 带时区: 2025-12-21T16:00:00.000Z
     * - ISO 8601 不带时区: 2025-12-21T16:00:00
     */
    private LocalDateTime parseDateTime(String dateTimeStr) {
        if (dateTimeStr == null || dateTimeStr.isEmpty()) {
            return null;
        }
        try {
            // 尝试解析 ISO 8601 带 Z 时区的格式
            if (dateTimeStr.endsWith("Z")) {
                Instant instant = Instant.parse(dateTimeStr);
                return LocalDateTime.ofInstant(instant, ZoneId.of("Asia/Shanghai"));
            }
            // 尝试解析标准 LocalDateTime 格式
            return LocalDateTime.parse(dateTimeStr);
        } catch (Exception e) {
            // 尝试解析其他格式
            try {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS");
                return LocalDateTime.parse(dateTimeStr, formatter);
            } catch (Exception e2) {
                throw new RuntimeException("无法解析日期时间: " + dateTimeStr);
            }
        }
    }
}

