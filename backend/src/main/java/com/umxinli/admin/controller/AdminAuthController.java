package com.umxinli.admin.controller;

import com.umxinli.admin.dto.AdminLoginRequest;
import com.umxinli.admin.dto.AdminLoginResponse;
import com.umxinli.admin.entity.AdminUser;
import com.umxinli.admin.service.AdminAuthService;
import com.umxinli.dto.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * 管理员认证控制器
 * 处理管理员登录、登出、密码修改等认证相关操作
 */
@RestController
@RequestMapping("/admin/auth")
@CrossOrigin
public class AdminAuthController {

    private static final Logger log = LoggerFactory.getLogger(AdminAuthController.class);

    @Autowired
    private AdminAuthService adminAuthService;

    /**
     * 管理员登录
     * POST /admin/auth/login
     */
    @PostMapping("/login")
    public ApiResponse<AdminLoginResponse> login(
            @RequestBody AdminLoginRequest request,
            HttpServletRequest httpRequest) {
        log.info("Admin login request for user: {}", request.getUsername());
        try {
            String clientIp = getClientIp(httpRequest);
            AdminLoginResponse response = adminAuthService.login(request, clientIp);
            return ApiResponse.success(response);
        } catch (Exception e) {
            log.error("Admin login failed", e);
            return ApiResponse.error(401, e.getMessage());
        }
    }

    /**
     * 获取当前登录用户信息
     * GET /admin/auth/current
     */
    @GetMapping("/current")
    public ApiResponse<AdminUser> getCurrentUser(
            @RequestHeader(value = "Authorization", required = false) String token) {
        log.info("Get current admin user");
        try {
            if (token == null || token.isEmpty()) {
                return ApiResponse.error(401, "未登录");
            }
            // 去掉 Bearer 前缀
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            AdminUser user = adminAuthService.getCurrentUser(token);
            if (user == null) {
                return ApiResponse.error(401, "登录已过期");
            }
            // 不返回密码
            user.setPassword(null);
            return ApiResponse.success(user);
        } catch (Exception e) {
            log.error("Get current user failed", e);
            return ApiResponse.error("获取用户信息失败");
        }
    }

    /**
     * 修改密码
     * POST /admin/auth/changePassword
     */
    @PostMapping("/changePassword")
    public ApiResponse<String> changePassword(
            @RequestBody Map<String, String> payload,
            @RequestHeader(value = "Authorization", required = false) String token) {
        log.info("Change password request");
        try {
            if (token == null || token.isEmpty()) {
                return ApiResponse.error(401, "未登录");
            }
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            AdminUser currentUser = adminAuthService.getCurrentUser(token);
            if (currentUser == null) {
                return ApiResponse.error(401, "登录已过期");
            }

            String oldPassword = payload.get("oldPassword");
            String newPassword = payload.get("newPassword");
            
            boolean result = adminAuthService.changePassword(
                currentUser.getId(), oldPassword, newPassword);
            if (result) {
                return ApiResponse.success("密码修改成功");
            } else {
                return ApiResponse.error("密码修改失败");
            }
        } catch (Exception e) {
            log.error("Change password failed", e);
            return ApiResponse.error(e.getMessage());
        }
    }

    /**
     * 验证token有效性
     * GET /admin/auth/validate
     */
    @GetMapping("/validate")
    public ApiResponse<Boolean> validateToken(
            @RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || token.isEmpty()) {
            return ApiResponse.success(false);
        }
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        boolean valid = adminAuthService.validateToken(token);
        return ApiResponse.success(valid);
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
}

