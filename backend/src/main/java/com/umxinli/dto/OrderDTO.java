package com.umxinli.dto;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 订单DTO - 用于小程序端显示
 * 包含前端期望的所有字段
 */
public class OrderDTO {
    
    // 订单ID
    private Long orderId;
    
    // 订单号
    private String orderNo;
    
    // 订单状态 0-待支付 1-待服务 2-进行中 3-已完成 4-已取消
    private Integer orderStatus;
    
    // 教练ID
    private Long counselorId;
    
    // 教练名称
    private String counselorName;
    
    // 教练头像
    private String counselorHeadUrl;
    
    // 头像（兼容字段）
    private String headUrl;
    
    // 名称（兼容字段）
    private String name;
    
    // 咨询类型 0-网络 1-低价 2-地面 3-青少年父母 4-其他
    private Integer consultType;
    
    // 咨询方式
    private Integer consultWay;
    
    // 咨询日期（格式化后的字符串）
    private String consultDate;
    
    // 咨询时间
    private Date consultTime;
    
    // 订单金额
    private BigDecimal payAmount;
    
    // 价格（兼容字段）
    private BigDecimal price;
    
    // 支付剩余时间（分钟）
    private Integer paymentAvailableMinutes;
    
    // 创建时间
    private Date createTime;

    // 用户ID
    private Long userId;

    // 来访者名称
    private String visitorName;
    
    // 咨询阶段
    private Integer consultStage;
    
    // 创建者类型
    private Integer creatorType;

    // Getters and Setters
    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public String getOrderNo() { return orderNo; }
    public void setOrderNo(String orderNo) { this.orderNo = orderNo; }

    public Integer getOrderStatus() { return orderStatus; }
    public void setOrderStatus(Integer orderStatus) { this.orderStatus = orderStatus; }

    public Long getCounselorId() { return counselorId; }
    public void setCounselorId(Long counselorId) { this.counselorId = counselorId; }

    public String getCounselorName() { return counselorName; }
    public void setCounselorName(String counselorName) { this.counselorName = counselorName; }

    public String getCounselorHeadUrl() { return counselorHeadUrl; }
    public void setCounselorHeadUrl(String counselorHeadUrl) { this.counselorHeadUrl = counselorHeadUrl; }

    public String getHeadUrl() { return headUrl; }
    public void setHeadUrl(String headUrl) { this.headUrl = headUrl; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getConsultType() { return consultType; }
    public void setConsultType(Integer consultType) { this.consultType = consultType; }

    public Integer getConsultWay() { return consultWay; }
    public void setConsultWay(Integer consultWay) { this.consultWay = consultWay; }

    public String getConsultDate() { return consultDate; }
    public void setConsultDate(String consultDate) { this.consultDate = consultDate; }

    public Date getConsultTime() { return consultTime; }
    public void setConsultTime(Date consultTime) { this.consultTime = consultTime; }

    public BigDecimal getPayAmount() { return payAmount; }
    public void setPayAmount(BigDecimal payAmount) { this.payAmount = payAmount; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getPaymentAvailableMinutes() { return paymentAvailableMinutes; }
    public void setPaymentAvailableMinutes(Integer paymentAvailableMinutes) { this.paymentAvailableMinutes = paymentAvailableMinutes; }

    public Date getCreateTime() { return createTime; }
    public void setCreateTime(Date createTime) { this.createTime = createTime; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getVisitorName() { return visitorName; }
    public void setVisitorName(String visitorName) { this.visitorName = visitorName; }

    public Integer getConsultStage() { return consultStage; }
    public void setConsultStage(Integer consultStage) { this.consultStage = consultStage; }

    public Integer getCreatorType() { return creatorType; }
    public void setCreatorType(Integer creatorType) { this.creatorType = creatorType; }
}

