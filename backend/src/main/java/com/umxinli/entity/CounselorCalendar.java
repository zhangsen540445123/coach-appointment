package com.umxinli.entity;

import java.util.Date;

/**
 * 教练可预约时间表
 */
public class CounselorCalendar extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Long id;
    private Long counselorId;
    private String date;       // 日期 yyyy-MM-dd
    private String startTime;  // 开始时间 HH:mm
    private Integer consultWay; // 咨询方式: 1-视频, 2-语音, 3-面询
    private Integer consultType; // 咨询类型
    private Integer status;    // 状态: 0-可预约, 1-已预约, 2-不可用
    private Date createdAt;
    private Date updatedAt;

    public CounselorCalendar() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCounselorId() { return counselorId; }
    public void setCounselorId(Long counselorId) { this.counselorId = counselorId; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }

    public Integer getConsultWay() { return consultWay; }
    public void setConsultWay(Integer consultWay) { this.consultWay = consultWay; }

    public Integer getConsultType() { return consultType; }
    public void setConsultType(Integer consultType) { this.consultType = consultType; }

    public Integer getStatus() { return status; }
    public void setStatus(Integer status) { this.status = status; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }
}

