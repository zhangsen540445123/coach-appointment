package com.umxinli.entity;

public class City extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Integer id;
    private String name;
    private String province;
    private String value;

    public City() {}

    public City(Integer id, String name, String province, String value) {
        this.id = id;
        this.name = name;
        this.province = province;
        this.value = value;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
