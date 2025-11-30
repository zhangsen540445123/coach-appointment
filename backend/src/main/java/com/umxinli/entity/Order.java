package com.umxinli.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String orderNo;
    private Long userId;
    private Long counselorId;
    private Integer consultType;
    private Integer consultWay;
    private BigDecimal price;
    private Integer status;
    private Date paymentTime;
    private Date consultTime;
}
