package com.umxinli.entity;

public class Carousel extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String title;
    private String imageUrl;
    private String linkUrl;
    private Integer sortOrder;
    private Integer status;

    public Carousel() {}

    public Carousel(Long id, String title, String imageUrl, String linkUrl, Integer sortOrder, Integer status) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.linkUrl = linkUrl;
        this.sortOrder = sortOrder;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getLinkUrl() {
        return linkUrl;
    }

    public void setLinkUrl(String linkUrl) {
        this.linkUrl = linkUrl;
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
