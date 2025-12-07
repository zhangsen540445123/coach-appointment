package com.umxinli.admin.dto;

/**
 * 分页请求基类
 */
public class PageRequest {
    private Integer page = 1;
    private Integer pageSize = 10;
    private String keyword;
    private String orderBy;
    private String orderDir = "DESC";

    public PageRequest() {}

    public Integer getPage() { return page; }
    public void setPage(Integer page) { this.page = page; }
    public Integer getPageSize() { return pageSize; }
    public void setPageSize(Integer pageSize) { this.pageSize = pageSize; }
    public String getKeyword() { return keyword; }
    public void setKeyword(String keyword) { this.keyword = keyword; }
    public String getOrderBy() { return orderBy; }
    public void setOrderBy(String orderBy) { this.orderBy = orderBy; }
    public String getOrderDir() { return orderDir; }
    public void setOrderDir(String orderDir) { this.orderDir = orderDir; }

    public int getOffset() {
        return (page - 1) * pageSize;
    }
}

