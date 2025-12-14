package com.umxinli.entity;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 支付记录实体
 */
public class PaymentRecord extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Long id;
    private Long orderId;           // 订单ID
    private String orderNo;         // 订单号
    private String transactionId;   // 微信支付交易号
    private String outTradeNo;      // 商户订单号
    private BigDecimal amount;      // 支付金额
    private Integer status;         // 状态 0-待支付 1-支付成功 2-支付失败 3-已退款
    private Date payTime;           // 支付时间
    private String notifyData;      // 回调数据
    private Date createdAt;
    private Date updatedAt;

    public PaymentRecord() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public String getOrderNo() { return orderNo; }
    public void setOrderNo(String orderNo) { this.orderNo = orderNo; }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    public String getOutTradeNo() { return outTradeNo; }
    public void setOutTradeNo(String outTradeNo) { this.outTradeNo = outTradeNo; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public Integer getStatus() { return status; }
    public void setStatus(Integer status) { this.status = status; }

    public Date getPayTime() { return payTime; }
    public void setPayTime(Date payTime) { this.payTime = payTime; }

    public String getNotifyData() { return notifyData; }
    public void setNotifyData(String notifyData) { this.notifyData = notifyData; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }
}

