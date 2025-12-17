package com.umxinli.admin.dto;

import java.util.Date;

/**
 * 报表查询请求
 */
public class ReportRequest {
    private Date startDate;
    private Date endDate;
    private String dimension; // day, week, month, year
    private Long counselorId; // 可选，按教练筛选

    public Date getStartDate() { return startDate; }
    public void setStartDate(Date startDate) { this.startDate = startDate; }

    public Date getEndDate() { return endDate; }
    public void setEndDate(Date endDate) { this.endDate = endDate; }

    public String getDimension() { return dimension; }
    public void setDimension(String dimension) { this.dimension = dimension; }

    public Long getCounselorId() { return counselorId; }
    public void setCounselorId(Long counselorId) { this.counselorId = counselorId; }
}

