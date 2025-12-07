package com.umxinli.admin.service;

import com.umxinli.admin.dto.AdminLoginRequest;
import com.umxinli.admin.dto.AdminLoginResponse;
import com.umxinli.admin.entity.AdminUser;

public interface AdminAuthService {
    
    /**
     * 管理员登录
     */
    AdminLoginResponse login(AdminLoginRequest request, String clientIp) throws Exception;
    
    /**
     * 根据token获取当前用户
     */
    AdminUser getCurrentUser(String token);
    
    /**
     * 验证token
     */
    boolean validateToken(String token);
    
    /**
     * 修改密码
     */
    boolean changePassword(Long userId, String oldPassword, String newPassword) throws Exception;
}

