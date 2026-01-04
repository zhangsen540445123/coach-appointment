package com.umxinli.entity;

public class ConsultGuide extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Long id;
    private Integer category; // 0=预约需知, 1=常见问题
    private String title;
    private String content;
    private Integer sortOrder;
    private Integer status; // 0=禁用, 1=启用

    public ConsultGuide() {
    }

    public ConsultGuide(Long id, Integer category, String title, String content, Integer sortOrder, Integer status) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.content = content;
        this.sortOrder = sortOrder;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
