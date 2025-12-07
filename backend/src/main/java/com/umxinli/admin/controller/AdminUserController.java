package com.umxinli.admin.controller;

import com.umxinli.admin.dto.PageRequest;
import com.umxinli.admin.dto.PageResponse;
import com.umxinli.admin.entity.AdminUser;
import com.umxinli.admin.service.AdminUserService;
import com.umxinli.dto.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 用户管理控制器
 * 提供用户的增删改查管理功能
 */
@RestController
@RequestMapping("/admin/user")
@CrossOrigin
public class AdminUserController {

    private static final Logger log = LoggerFactory.getLogger(AdminUserController.class);

    @Autowired
    private AdminUserService adminUserService;

    /**
     * 获取用户列表（分页）
     * POST /admin/user/list
     */
    @PostMapping("/list")
    public ApiResponse getList(@RequestBody PageRequest request,
                                              @RequestParam(required = false) Integer role) {
        log.info("Get admin user list, page: {}, pageSize: {}, role: {}", 
            request.getPage(), request.getPageSize(), role);
        try {
            PageResponse response = adminUserService.getList(request, role);
            return ApiResponse.success(response);
        } catch (Exception e) {
            log.error("Error getting user list", e);
            return ApiResponse.error("获取用户列表失败");
        }
    }

    /**
     * 根据ID获取用户详情
     * GET /admin/user/{id}
     */
    @GetMapping("/{id}")
    public ApiResponse getById(@PathVariable Long id) {
        log.info("Get admin user by id: {}", id);
        try {
            AdminUser user = adminUserService.getById(id);
            if (user == null) {
                return ApiResponse.error(404, "用户不存在");
            }
            // 不返回密码
            user.setPassword(null);
            return ApiResponse.success(user);
        } catch (Exception e) {
            log.error("Error getting user", e);
            return ApiResponse.error("获取用户信息失败");
        }
    }

    /**
     * 创建用户
     * POST /admin/user/create
     */
    @PostMapping("/create")
    public ApiResponse create(@RequestBody AdminUser user) {
        log.info("Create admin user: {}", user.getUsername());
        try {
            AdminUser created = adminUserService.create(user);
            created.setPassword(null);
            return ApiResponse.success("创建成功", created);
        } catch (Exception e) {
            log.error("Error creating user", e);
            return ApiResponse.error(e.getMessage());
        }
    }

    /**
     * 更新用户
     * PUT /admin/user/{id}
     */
    @PutMapping("/{id}")
    public ApiResponse update(@PathVariable Long id, @RequestBody AdminUser user) {
        log.info("Update admin user: {}", id);
        try {
            user.setId(id);
            AdminUser updated = adminUserService.update(user);
            updated.setPassword(null);
            return ApiResponse.success("更新成功", updated);
        } catch (Exception e) {
            log.error("Error updating user", e);
            return ApiResponse.error(e.getMessage());
        }
    }

    /**
     * 删除用户
     * DELETE /admin/user/{id}
     */
    @DeleteMapping("/{id}")
    public ApiResponse delete(@PathVariable Long id) {
        log.info("Delete admin user: {}", id);
        try {
            boolean result = adminUserService.delete(id);
            if (result) {
                return ApiResponse.success("删除成功");
            } else {
                return ApiResponse.error("删除失败");
            }
        } catch (Exception e) {
            log.error("Error deleting user", e);
            return ApiResponse.error("删除用户失败");
        }
    }

    /**
     * 切换用户状态（启用/禁用）
     * POST /admin/user/{id}/toggleStatus
     */
    @PostMapping("/{id}/toggleStatus")
    public ApiResponse toggleStatus(@PathVariable Long id, @RequestBody Map payload) {
        log.info("Toggle user status: {}", id);
        try {
            Integer status = (Integer) payload.get("status");
            boolean result = adminUserService.toggleStatus(id, status);
            if (result) {
                return ApiResponse.success(status == 1 ? "已启用" : "已禁用");
            } else {
                return ApiResponse.error("操作失败");
            }
        } catch (Exception e) {
            log.error("Error toggling user status", e);
            return ApiResponse.error("操作失败");
        }
    }
}

