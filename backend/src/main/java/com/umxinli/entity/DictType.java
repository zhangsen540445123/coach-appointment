package com.umxinli.entity;

import java.util.Date;

/**
 * 数据字典类型
 */
public class DictType extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String code;        // 字典类型编码，如 qualification, school, direction
    private String name;        // 字典类型名称，如 资质认证、受训流派、擅长方向
    private String description; // 描述
    private Integer sortOrder;  // 排序
    private Integer enabled;    // 是否启用 0-禁用 1-启用
    private Date createdAt;
    private Date updatedAt;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public Integer getEnabled() { return enabled; }
    public void setEnabled(Integer enabled) { this.enabled = enabled; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }
}

