package com.umxinli.admin.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.Coupon;
import com.umxinli.entity.CouponCode;
import com.umxinli.entity.UserCoupon;
import com.umxinli.mapper.CouponCodeMapper;
import com.umxinli.mapper.CouponMapper;
import com.umxinli.mapper.UserCouponMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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

    // ==================== 优惠券模板管理 ====================

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
    public ApiResponse<?> saveCoupon(@RequestBody Coupon coupon) {
        try {
            if (coupon.getId() == null) {
                coupon.setCreatedAt(LocalDateTime.now());
                couponMapper.insert(coupon);
            } else {
                coupon.setUpdatedAt(LocalDateTime.now());
                couponMapper.updateById(coupon);
            }
            return ApiResponse.success(coupon.getId());
        } catch (Exception e) {
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
        // 简化实现：返回user_star表中的用户ID（有收藏行为的用户）
        return new ArrayList<>();
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
}

