package com.umxinli.entity;

import java.util.Date;

/**
 * 排序选项实体类
 * 用于小程序首页教练列表的排序方式
 */
public class SortOption {
    
    private Long id;
    
    /**
     * 显示名称（如：推荐排序、低价优先）
     */
    private String name;
    
    /**
     * 选项值（0=推荐排序, 1=低价优先, 2=高价优先, 3=近期可预约优先）
     */
    private Integer value;
    
    /**
     * 排序序号（越小越靠前）
     */
    private Integer sortOrder;
    
    /**
     * 是否启用 0-禁用 1-启用
     */
    private Integer enabled;
    
    /**
     * 创建时间
     */
    private Date createdAt;
    
    /**
     * 更新时间
     */
    private Date updatedAt;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getValue() { return value; }
    public void setValue(Integer value) { this.value = value; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public Integer getEnabled() { return enabled; }
    public void setEnabled(Integer enabled) { this.enabled = enabled; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }
}

