package com.umxinli.entity;

import lombok.Data;
import java.io.Serializable;
import java.util.Date;

@Data
public class BaseEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    private Date createdAt;
    private Date updatedAt;
}
