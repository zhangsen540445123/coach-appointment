package com.umxinli.entity;

import java.io.Serializable;
import java.util.Date;

public class BaseEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    private Date createdAt;
    private Date updatedAt;

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
