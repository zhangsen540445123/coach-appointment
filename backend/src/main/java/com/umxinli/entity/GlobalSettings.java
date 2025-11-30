package com.umxinli.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GlobalSettings extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Integer id;
    private String keyName;
    private String value;
    private String description;
}
