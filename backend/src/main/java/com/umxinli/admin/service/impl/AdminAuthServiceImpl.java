package com.umxinli.admin.service.impl;

import com.umxinli.admin.dto.AdminLoginRequest;
import com.umxinli.admin.dto.AdminLoginResponse;
import com.umxinli.admin.entity.AdminUser;
import com.umxinli.admin.mapper.AdminUserMapper;
import com.umxinli.admin.service.AdminAuthService;
import com.umxinli.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

@Service
public class AdminAuthServiceImpl implements AdminAuthService {

    private static final Logger log = LoggerFactory.getLogger(AdminAuthServiceImpl.class);

    @Autowired
    private AdminUserMapper adminUserMapper;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public AdminLoginResponse login(AdminLoginRequest request, String clientIp) throws Exception {
        log.info("Admin login attempt - username: {}", request.getUsername());
        
        AdminUser user = adminUserMapper.selectByUsername(request.getUsername());
        if (user == null) {
            throw new Exception("用户名或密码错误");
        }
        
        if (user.getStatus() != 1) {
            throw new Exception("账号已被禁用");
        }
        
        // 验证密码（MD5加密）
        String encryptedPassword = DigestUtils.md5DigestAsHex(request.getPassword().getBytes());
        if (!encryptedPassword.equals(user.getPassword())) {
            throw new Exception("用户名或密码错误");
        }
        
        // 更新登录信息
        adminUserMapper.updateLastLogin(user.getId(), clientIp);
        
        // 生成token
        String token = jwtUtil.generateToken(String.valueOf(user.getId()));
        
        // 构建响应
        AdminLoginResponse response = new AdminLoginResponse();
        response.setUserId(user.getId());
        response.setUsername(user.getUsername());
        response.setRealName(user.getRealName());
        response.setAvatar(user.getAvatar());
        response.setRole(user.getRole());
        response.setCounselorId(user.getCounselorId());
        response.setToken(token);
        
        return response;
    }

    @Override
    public AdminUser getCurrentUser(String token) {
        try {
            String userId = jwtUtil.getUserIdFromToken(token);
            if (userId != null) {
                return adminUserMapper.selectById(Long.parseLong(userId));
            }
        } catch (Exception e) {
            log.error("Error getting current user from token", e);
        }
        return null;
    }

    @Override
    public boolean validateToken(String token) {
        return jwtUtil.validateToken(token);
    }

    @Override
    public boolean changePassword(Long userId, String oldPassword, String newPassword) throws Exception {
        AdminUser user = adminUserMapper.selectById(userId);
        if (user == null) {
            throw new Exception("用户不存在");
        }
        
        String encryptedOldPassword = DigestUtils.md5DigestAsHex(oldPassword.getBytes());
        if (!encryptedOldPassword.equals(user.getPassword())) {
            throw new Exception("原密码错误");
        }
        
        user.setPassword(DigestUtils.md5DigestAsHex(newPassword.getBytes()));
        return adminUserMapper.update(user) > 0;
    }
}

