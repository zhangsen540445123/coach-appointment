package com.umxinli.admin.dto;

/**
 * 管理后台登录响应
 */
public class AdminLoginResponse {
    private Long userId;
    private String username;
    private String realName;
    private String avatar;
    private Integer role;
    private Long counselorId;
    private String token;

    public AdminLoginResponse() {}

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getRealName() { return realName; }
    public void setRealName(String realName) { this.realName = realName; }
    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    public Integer getRole() { return role; }
    public void setRole(Integer role) { this.role = role; }
    public Long getCounselorId() { return counselorId; }
    public void setCounselorId(Long counselorId) { this.counselorId = counselorId; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}

