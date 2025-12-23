package com.umxinli.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class ConsultStudio {
    private Long id;
    private String studioName;
    private Integer studioType; // 0-线下工作室 1-线上工作室
    private String studioCoverImgList; // JSON字符串
    private String studioOpenTime;
    private String studioDetail;
    private String summaryAddress;
    private String fullAddress;
    private BigDecimal locationLongitude;
    private BigDecimal locationLatitude;
    private String concatPhone;
    private String qrCodeUrl;
    private Integer sortOrder;
    private Integer enabled;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    // 小程序端兼容字段，返回studioId作为id的别名
    public Long getStudioId() { return id; }

    public String getStudioName() { return studioName; }
    public void setStudioName(String studioName) { this.studioName = studioName; }

    public Integer getStudioType() { return studioType; }
    public void setStudioType(Integer studioType) { this.studioType = studioType; }

    public String getStudioCoverImgList() { return studioCoverImgList; }
    public void setStudioCoverImgList(String studioCoverImgList) { this.studioCoverImgList = studioCoverImgList; }

    public String getStudioOpenTime() { return studioOpenTime; }
    public void setStudioOpenTime(String studioOpenTime) { this.studioOpenTime = studioOpenTime; }

    public String getStudioDetail() { return studioDetail; }
    public void setStudioDetail(String studioDetail) { this.studioDetail = studioDetail; }

    public String getSummaryAddress() { return summaryAddress; }
    public void setSummaryAddress(String summaryAddress) { this.summaryAddress = summaryAddress; }

    public String getFullAddress() { return fullAddress; }
    public void setFullAddress(String fullAddress) { this.fullAddress = fullAddress; }

    public BigDecimal getLocationLongitude() { return locationLongitude; }
    public void setLocationLongitude(BigDecimal locationLongitude) { this.locationLongitude = locationLongitude; }

    public BigDecimal getLocationLatitude() { return locationLatitude; }
    public void setLocationLatitude(BigDecimal locationLatitude) { this.locationLatitude = locationLatitude; }

    public String getConcatPhone() { return concatPhone; }
    public void setConcatPhone(String concatPhone) { this.concatPhone = concatPhone; }

    public String getQrCodeUrl() { return qrCodeUrl; }
    public void setQrCodeUrl(String qrCodeUrl) { this.qrCodeUrl = qrCodeUrl; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public Integer getEnabled() { return enabled; }
    public void setEnabled(Integer enabled) { this.enabled = enabled; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

