package com.umxinli.entity;

import java.util.Date;

/**
 * 话题方向实体类
 * 用于小程序首页筛选教练的话题分类
 */
public class TopicDirection {
    
    private Long id;
    
    /**
     * 显示名称（如：身心健康、人际关系）
     */
    private String name;
    
    /**
     * 选项值（可为null表示"全部"）
     */
    private String value;
    
    /**
     * 图标URL
     */
    private String iconUrl;
    
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

    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }

    public String getIconUrl() { return iconUrl; }
    public void setIconUrl(String iconUrl) { this.iconUrl = iconUrl; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public Integer getEnabled() { return enabled; }
    public void setEnabled(Integer enabled) { this.enabled = enabled; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }
}

