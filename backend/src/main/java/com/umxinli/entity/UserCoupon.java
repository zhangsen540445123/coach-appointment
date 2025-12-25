package com.umxinli.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 用户优惠券
 * 对应数据库表 user_coupon
 */
public class UserCoupon {
    private Long id;
    private Long userId;
    private Long couponId;
    private Integer status;       // 状态 0-未使用 1-已使用 2-已过期
    private Integer receiveType;  // 领取方式 1-推送 2-兑换码
    private LocalDateTime usedAt; // 使用时间
    private Long orderId;         // 使用的订单ID
    private LocalDateTime createdAt;

    // 非数据库字段 - 关联查询
    private String couponName;
    private BigDecimal discountAmount;
    private BigDecimal minAmount;
    private Integer couponType;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer coachScope;
    private String coachIds;

    public static final int STATUS_UNUSED = 0;
    public static final int STATUS_USED = 1;
    public static final int STATUS_EXPIRED = 2;
    public static final int RECEIVE_TYPE_PUSH = 1;
    public static final int RECEIVE_TYPE_EXCHANGE = 2;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Long getCouponId() { return couponId; }
    public void setCouponId(Long couponId) { this.couponId = couponId; }
    public Integer getStatus() { return status; }
    public void setStatus(Integer status) { this.status = status; }
    public Integer getReceiveType() { return receiveType; }
    public void setReceiveType(Integer receiveType) { this.receiveType = receiveType; }
    public LocalDateTime getUsedAt() { return usedAt; }
    public void setUsedAt(LocalDateTime usedAt) { this.usedAt = usedAt; }
    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public String getCouponName() { return couponName; }
    public void setCouponName(String couponName) { this.couponName = couponName; }
    public BigDecimal getDiscountAmount() { return discountAmount; }
    public void setDiscountAmount(BigDecimal discountAmount) { this.discountAmount = discountAmount; }
    public BigDecimal getMinAmount() { return minAmount; }
    public void setMinAmount(BigDecimal minAmount) { this.minAmount = minAmount; }
    public Integer getCouponType() { return couponType; }
    public void setCouponType(Integer couponType) { this.couponType = couponType; }
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public Integer getCoachScope() { return coachScope; }
    public void setCoachScope(Integer coachScope) { this.coachScope = coachScope; }
    public String getCoachIds() { return coachIds; }
    public void setCoachIds(String coachIds) { this.coachIds = coachIds; }
}

