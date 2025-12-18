package com.umxinli.entity;

import java.util.Date;

/**
 * 数据字典项
 */
public class DictItem extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Long id;
    private Long typeId;        // 字典类型ID
    private String typeCode;    // 字典类型编码（冗余字段，方便查询）
    private String label;       // 显示标签
    private String value;       // 值
    private Integer sortOrder;  // 排序
    private Integer enabled;    // 是否启用 0-禁用 1-启用
    private Date createdAt;
    private Date updatedAt;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTypeId() { return typeId; }
    public void setTypeId(Long typeId) { this.typeId = typeId; }

    public String getTypeCode() { return typeCode; }
    public void setTypeCode(String typeCode) { this.typeCode = typeCode; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public Integer getEnabled() { return enabled; }
    public void setEnabled(Integer enabled) { this.enabled = enabled; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }
}

