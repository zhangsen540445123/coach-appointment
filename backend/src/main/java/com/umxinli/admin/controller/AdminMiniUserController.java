package com.umxinli.admin.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.User;
import com.umxinli.mapper.UserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 小程序用户管理控制器
 * 管理 user 表（小程序用户）的增删改查
 */
@RestController
@RequestMapping("/admin/miniuser")
@CrossOrigin
public class AdminMiniUserController {

    private static final Logger log = LoggerFactory.getLogger(AdminMiniUserController.class);

    @Autowired
    private UserMapper userMapper;

    /**
     * 获取小程序用户列表（分页）
     * POST /admin/miniuser/list
     */
    @PostMapping("/list")
    public ApiResponse getList(@RequestBody Map<String, Object> params) {
        int page = params.get("page") != null ? (Integer) params.get("page") : 1;
        int pageSize = params.get("pageSize") != null ? (Integer) params.get("pageSize") : 10;
        String keyword = params.get("keyword") != null ? (String) params.get("keyword") : "";
        
        log.info("Get mini user list, page: {}, pageSize: {}, keyword: {}", page, pageSize, keyword);
        
        try {
            int offset = (page - 1) * pageSize;
            List<User> list = userMapper.selectList(offset, pageSize, keyword);
            int total = userMapper.count(keyword);
            
            // 转换为前端需要的格式
            List<Map<String, Object>> resultList = new java.util.ArrayList<>();
            for (User user : list) {
                Map<String, Object> item = new HashMap<>();
                item.put("id", user.getId());
                item.put("nickname", user.getName());  // 前端使用 nickname
                item.put("avatar", user.getAvatar());
                item.put("phone", user.getPhone());
                item.put("gender", user.getGender());
                item.put("city", user.getCity());
                item.put("province", user.getProvince());
                item.put("status", user.getStatus() != null ? user.getStatus() : 1);
                item.put("createTime", user.getCreatedAt());
                resultList.add(item);
            }
            
            Map<String, Object> data = new HashMap<>();
            data.put("list", resultList);
            data.put("total", total);
            data.put("page", page);
            data.put("pageSize", pageSize);
            
            return ApiResponse.success(data);
        } catch (Exception e) {
            log.error("Error getting mini user list", e);
            return ApiResponse.error("获取用户列表失败");
        }
    }

    /**
     * 获取用户详情
     * GET /admin/miniuser/{id}
     */
    @GetMapping("/{id}")
    public ApiResponse getById(@PathVariable Long id) {
        log.info("Get mini user by id: {}", id);
        try {
            User user = userMapper.selectById(id);
            if (user == null) {
                return ApiResponse.error(404, "用户不存在");
            }
            return ApiResponse.success(user);
        } catch (Exception e) {
            log.error("Error getting mini user", e);
            return ApiResponse.error("获取用户信息失败");
        }
    }

    /**
     * 切换用户状态（禁用/启用）
     * POST /admin/miniuser/{id}/toggleStatus
     */
    @PostMapping("/{id}/toggleStatus")
    public ApiResponse toggleStatus(@PathVariable Long id) {
        log.info("Toggle mini user status, id: {}", id);
        try {
            User user = userMapper.selectById(id);
            if (user == null) {
                return ApiResponse.error(404, "用户不存在");
            }
            // 切换状态：1->0 或 0->1
            int currentStatus = user.getStatus() != null ? user.getStatus() : 1;
            int newStatus = currentStatus == 1 ? 0 : 1;
            userMapper.updateStatus(id, newStatus);
            return ApiResponse.success("状态更新成功");
        } catch (Exception e) {
            log.error("Error toggling user status", e);
            return ApiResponse.error("状态更新失败");
        }
    }

    /**
     * 删除用户
     * DELETE /admin/miniuser/{id}
     */
    @DeleteMapping("/{id}")
    public ApiResponse delete(@PathVariable Long id) {
        log.info("Delete mini user, id: {}", id);
        try {
            User user = userMapper.selectById(id);
            if (user == null) {
                return ApiResponse.error(404, "用户不存在");
            }
            userMapper.delete(id);
            return ApiResponse.success("删除成功");
        } catch (Exception e) {
            log.error("Error deleting mini user", e);
            return ApiResponse.error("删除用户失败");
        }
    }
}

