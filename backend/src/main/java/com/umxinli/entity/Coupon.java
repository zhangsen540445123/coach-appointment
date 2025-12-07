package com.umxinli.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 优惠券模板
 */
public class Coupon {
    private Long id;
    private String name;
    private Integer type;
    private BigDecimal discountAmount;
    private BigDecimal minAmount;
    private Integer coachScope;
    private List<String> coachIds;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static final int TYPE_FULL_REDUCTION = 1;
    public static final int TYPE_DIRECT_DISCOUNT = 2;
    public static final int SCOPE_ALL_COACH = 1;
    public static final int SCOPE_SPECIFIC_COACH = 2;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getType() { return type; }
    public void setType(Integer type) { this.type = type; }
    public BigDecimal getDiscountAmount() { return discountAmount; }
    public void setDiscountAmount(BigDecimal discountAmount) { this.discountAmount = discountAmount; }
    public BigDecimal getMinAmount() { return minAmount; }
    public void setMinAmount(BigDecimal minAmount) { this.minAmount = minAmount; }
    public Integer getCoachScope() { return coachScope; }
    public void setCoachScope(Integer coachScope) { this.coachScope = coachScope; }
    public List<String> getCoachIds() { return coachIds; }
    public void setCoachIds(List<String> coachIds) { this.coachIds = coachIds; }
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public Integer getStatus() { return status; }
    public void setStatus(Integer status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public String getTypeName() {
        if (type == null) return "";
        return type == TYPE_FULL_REDUCTION ? "满减券" : "抵扣券";
    }

    public String getDescription() {
        if (type == null || discountAmount == null) return "";
        if (type == TYPE_FULL_REDUCTION) {
            return "满" + (minAmount != null ? minAmount.intValue() : 0) + "减" + discountAmount.intValue();
        } else {
            return "立减" + discountAmount.intValue() + "元";
        }
    }

    public boolean isValid() {
        if (status == null || status != 1) return false;
        LocalDateTime now = LocalDateTime.now();
        if (startTime != null && now.isBefore(startTime)) return false;
        if (endTime != null && now.isAfter(endTime)) return false;
        return true;
    }

    public boolean isApplicableToCoach(String coachId) {
        if (coachScope == null || coachScope == SCOPE_ALL_COACH) return true;
        if (coachIds == null || coachIds.isEmpty()) return false;
        return coachIds.contains(coachId);
    }
}

