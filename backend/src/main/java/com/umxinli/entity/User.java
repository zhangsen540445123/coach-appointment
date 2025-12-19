package com.umxinli.entity;

public class User extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String phone;
    private String name;
    private String avatar;
    private Integer gender;
    private String city;
    private String province;
    private String openid;
    private Integer status;  // 0-禁用, 1-正常
    private java.util.Date createdAt;

    public User() {}

    public User(Long id, String phone, String name, String avatar, Integer gender, String city, String province) {
        this.id = id;
        this.phone = phone;
        this.name = name;
        this.avatar = avatar;
        this.gender = gender;
        this.city = city;
        this.province = province;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public java.util.Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(java.util.Date createdAt) {
        this.createdAt = createdAt;
    }
}
