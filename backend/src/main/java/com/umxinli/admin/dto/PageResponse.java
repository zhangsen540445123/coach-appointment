package com.umxinli.admin.dto;

import java.util.List;

/**
 * 分页响应
 */
public class PageResponse<T> {
    private List<T> list;
    private Integer total;
    private Integer page;
    private Integer pageSize;
    private Integer pages;

    public PageResponse() {}

    public PageResponse(List<T> list, Integer total, Integer page, Integer pageSize) {
        this.list = list;
        this.total = total;
        this.page = page;
        this.pageSize = pageSize;
        this.pages = (total + pageSize - 1) / pageSize;
    }

    public List<T> getList() { return list; }
    public void setList(List<T> list) { this.list = list; }
    public Integer getTotal() { return total; }
    public void setTotal(Integer total) { this.total = total; }
    public Integer getPage() { return page; }
    public void setPage(Integer page) { this.page = page; }
    public Integer getPageSize() { return pageSize; }
    public void setPageSize(Integer pageSize) { this.pageSize = pageSize; }
    public Integer getPages() { return pages; }
    public void setPages(Integer pages) { this.pages = pages; }
}

