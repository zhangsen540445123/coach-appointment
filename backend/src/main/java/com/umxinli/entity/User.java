package com.umxinli.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String phone;
    private String name;
    private String avatar;
    private Integer gender;
    private String city;
    private String province;
}
