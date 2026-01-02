package com.umxinli.entity;

import java.math.BigDecimal;
import java.util.Date;

public class Order extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String orderNo;
    private Long userId;
    private Long counselorId;
    private Integer consultType;
    private Integer consultWay;
    private BigDecimal price;
    private Integer status;
    private Date paymentTime;
    private Date consultTime;

    // 关联查询字段
    private String userName;
    private String counselorName;

    public Order() {}

    public Order(Long id, String orderNo, Long userId, Long counselorId, Integer consultType, Integer consultWay, BigDecimal price, Integer status, Date paymentTime, Date consultTime) {
        this.id = id;
        this.orderNo = orderNo;
        this.userId = userId;
        this.counselorId = counselorId;
        this.consultType = consultType;
        this.consultWay = consultWay;
        this.price = price;
        this.status = status;
        this.paymentTime = paymentTime;
        this.consultTime = consultTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCounselorId() {
        return counselorId;
    }

    public void setCounselorId(Long counselorId) {
        this.counselorId = counselorId;
    }

    public Integer getConsultType() {
        return consultType;
    }

    public void setConsultType(Integer consultType) {
        this.consultType = consultType;
    }

    public Integer getConsultWay() {
        return consultWay;
    }

    public void setConsultWay(Integer consultWay) {
        this.consultWay = consultWay;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getPaymentTime() {
        return paymentTime;
    }

    public void setPaymentTime(Date paymentTime) {
        this.paymentTime = paymentTime;
    }

    public Date getConsultTime() {
        return consultTime;
    }

    public void setConsultTime(Date consultTime) {
        this.consultTime = consultTime;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getCounselorName() {
        return counselorName;
    }

    public void setCounselorName(String counselorName) {
        this.counselorName = counselorName;
    }
}
