package com.umxinli.admin.entity;

import com.umxinli.entity.BaseEntity;
import java.util.Date;

/**
 * 教练资料审核记录实体
 */
public class CounselorAudit extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Long id;
    private Long counselorId;
    private String beforeData; // 修改前的数据JSON
    private String afterData;  // 修改后的数据JSON
    private Integer auditStatus; // 0-待审核, 1-审核通过, 2-审核拒绝
    private Long submittedBy; // 提交人ID
    private Date submittedAt; // 提交时间
    private Long auditedBy; // 审核人ID
    private Date auditedAt; // 审核时间
    private String auditRemark; // 审核备注
    private Date createdAt;
    private Date updatedAt;

    public CounselorAudit() {}

    // 审核状态常量
    public static final int STATUS_PENDING = 0;
    public static final int STATUS_APPROVED = 1;
    public static final int STATUS_REJECTED = 2;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getCounselorId() { return counselorId; }
    public void setCounselorId(Long counselorId) { this.counselorId = counselorId; }
    public String getBeforeData() { return beforeData; }
    public void setBeforeData(String beforeData) { this.beforeData = beforeData; }
    public String getAfterData() { return afterData; }
    public void setAfterData(String afterData) { this.afterData = afterData; }
    public Integer getAuditStatus() { return auditStatus; }
    public void setAuditStatus(Integer auditStatus) { this.auditStatus = auditStatus; }
    public Long getSubmittedBy() { return submittedBy; }
    public void setSubmittedBy(Long submittedBy) { this.submittedBy = submittedBy; }
    public Date getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(Date submittedAt) { this.submittedAt = submittedAt; }
    public Long getAuditedBy() { return auditedBy; }
    public void setAuditedBy(Long auditedBy) { this.auditedBy = auditedBy; }
    public Date getAuditedAt() { return auditedAt; }
    public void setAuditedAt(Date auditedAt) { this.auditedAt = auditedAt; }
    public String getAuditRemark() { return auditRemark; }
    public void setAuditRemark(String auditRemark) { this.auditRemark = auditRemark; }
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }
}

