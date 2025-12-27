package com.umxinli.admin.controller;

import com.umxinli.admin.dto.PageRequest;
import com.umxinli.admin.dto.PageResponse;
import com.umxinli.admin.entity.AdminUser;
import com.umxinli.admin.entity.CounselorAudit;
import com.umxinli.admin.mapper.AdminUserMapper;
import com.umxinli.admin.service.AdminAuthService;
import com.umxinli.admin.service.AdminCounselorService;
import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.Counselor;
import com.umxinli.mapper.UserStarMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 教练管理控制器
 * 提供教练信息的增删改查管理功能
 */
@RestController
@RequestMapping("/admin/counselor")
@CrossOrigin
public class AdminCounselorController {

    private static final Logger log = LoggerFactory.getLogger(AdminCounselorController.class);

    @Autowired
    private AdminCounselorService adminCounselorService;

    @Autowired
    private AdminAuthService adminAuthService;

    @Autowired
    private AdminUserMapper adminUserMapper;

    @Autowired
    private UserStarMapper userStarMapper;

    /**
     * 获取教练列表（分页）- 包含账号和收藏信息
     * POST /admin/counselor/list
     */
    @PostMapping("/list")
    public ApiResponse getList(@RequestBody PageRequest request) {
        log.info("Get counselor list, page: {}, pageSize: {}", request.getPage(), request.getPageSize());
        try {
            PageResponse response = adminCounselorService.getList(request);
            // 为每个教练添加账号信息和收藏数
            List<Map<String, Object>> enrichedList = new java.util.ArrayList<>();
            for (Object obj : response.getList()) {
                Counselor c = (Counselor) obj;
                Map<String, Object> item = new HashMap<>();
                item.put("id", c.getId());
                item.put("name", c.getName());
                item.put("headUrl", c.getHeadUrl());
                item.put("cityName", c.getCityName());
                item.put("consultPrice", c.getConsultPrice());
                item.put("canConsult", c.getCanConsult());
                item.put("isTop", c.getIsTop() != null ? c.getIsTop() : 0);
                item.put("sortOrder", c.getSortOrder() != null ? c.getSortOrder() : 0);
                // 获取关联账号
                AdminUser account = adminUserMapper.selectByCounselorId(c.getId());
                if (account != null) {
                    item.put("accountId", account.getId());
                    item.put("accountUsername", account.getUsername());
                    item.put("accountStatus", account.getStatus());
                }
                // 获取收藏数
                int starCount = userStarMapper.countStarUsersByCounselorId(c.getId());
                item.put("starCount", starCount);
                enrichedList.add(item);
            }
            response.setList(enrichedList);
            return ApiResponse.success(response);
        } catch (Exception e) {
            log.error("Error getting counselor list", e);
            return ApiResponse.error("获取教练列表失败");
        }
    }

    /**
     * 根据ID获取教练详情
     * GET /admin/counselor/{id}
     */
    @GetMapping("/{id}")
    public ApiResponse getById(@PathVariable Long id) {
        log.info("Get counselor by id: {}", id);
        try {
            Counselor counselor = adminCounselorService.getById(id);
            if (counselor == null) {
                return ApiResponse.error(404, "教练不存在");
            }
            return ApiResponse.success(counselor);
        } catch (Exception e) {
            log.error("Error getting counselor", e);
            return ApiResponse.error("获取教练信息失败");
        }
    }

    /**
     * 创建教练
     * POST /admin/counselor/create
     */
    @PostMapping("/create")
    public ApiResponse create(@RequestBody Counselor counselor) {
        log.info("Create counselor: {}", counselor.getName());
        try {
            Counselor created = adminCounselorService.create(counselor);
            return ApiResponse.success("创建成功", created);
        } catch (Exception e) {
            log.error("Error creating counselor", e);
            return ApiResponse.error(e.getMessage());
        }
    }

    /**
     * 更新教练信息（管理员直接更新，无需审核）
     * PUT /admin/counselor/{id}
     */
    @PutMapping("/{id}")
    public ApiResponse update(@PathVariable Long id, @RequestBody Counselor counselor) {
        log.info("Update counselor: {}, directions: {}", id, counselor.getDirections());
        try {
            counselor.setId(id);
            Counselor updated = adminCounselorService.updateByAdmin(counselor);
            log.info("Counselor updated successfully, directions saved: {}", updated.getDirections());
            return ApiResponse.success("更新成功", updated);
        } catch (Exception e) {
            log.error("Error updating counselor", e);
            return ApiResponse.error(e.getMessage());
        }
    }

    /**
     * 教练提交资料修改（需审核）
     * POST /admin/counselor/{id}/submit
     */
    @PostMapping("/{id}/submit")
    public ApiResponse submitUpdate(
            @PathVariable Long id, 
            @RequestBody Counselor counselor,
            @RequestHeader(value = "Authorization", required = false) String token) {
        log.info("Submit counselor update for audit: {}", id);
        try {
            AdminUser currentUser = getCurrentUser(token);
            if (currentUser == null) {
                return ApiResponse.error(401, "未登录");
            }
            counselor.setId(id);
            CounselorAudit audit = adminCounselorService.submitUpdate(counselor, currentUser);
            return ApiResponse.success("提交成功，等待审核", audit);
        } catch (Exception e) {
            log.error("Error submitting counselor update", e);
            return ApiResponse.error(e.getMessage());
        }
    }

    /**
     * 删除教练
     * DELETE /admin/counselor/{id}
     */
    @DeleteMapping("/{id}")
    public ApiResponse delete(@PathVariable Long id) {
        log.info("Delete counselor: {}", id);
        try {
            boolean result = adminCounselorService.delete(id);
            if (result) {
                return ApiResponse.success("删除成功");
            } else {
                return ApiResponse.error("删除失败");
            }
        } catch (Exception e) {
            log.error("Error deleting counselor", e);
            return ApiResponse.error("删除教练失败");
        }
    }

    /**
     * 切换教练状态（启用/禁用）
     * POST /admin/counselor/{id}/toggleStatus
     */
    @PostMapping("/{id}/toggleStatus")
    public ApiResponse toggleStatus(@PathVariable Long id, @RequestBody Map payload) {
        log.info("Toggle counselor status: {}", id);
        try {
            Integer canConsult = (Integer) payload.get("canConsult");
            boolean result = adminCounselorService.toggleStatus(id, canConsult);
            if (result) {
                return ApiResponse.success(canConsult == 1 ? "已启用" : "已禁用");
            } else {
                return ApiResponse.error("操作失败");
            }
        } catch (Exception e) {
            log.error("Error toggling counselor status", e);
            return ApiResponse.error("操作失败");
        }
    }

    /**
     * 设置教练置顶状态
     * POST /admin/counselor/{id}/setTop
     */
    @PostMapping("/{id}/setTop")
    public ApiResponse setTop(@PathVariable Long id, @RequestBody Map payload) {
        log.info("Set counselor top status: {}", id);
        try {
            Integer isTop = (Integer) payload.get("isTop");
            boolean result = adminCounselorService.setTop(id, isTop);
            if (result) {
                return ApiResponse.success(isTop == 1 ? "已置顶" : "已取消置顶");
            } else {
                return ApiResponse.error("操作失败");
            }
        } catch (Exception e) {
            log.error("Error setting counselor top status", e);
            return ApiResponse.error("操作失败");
        }
    }

    /**
     * 获取待审核列表
     * POST /admin/counselor/audit/list
     */
    @PostMapping("/audit/list")
    public ApiResponse getAuditList(
            @RequestBody PageRequest request,
            @RequestParam(required = false) Integer status) {
        log.info("Get counselor audit list, status: {}", status);
        try {
            PageResponse response = adminCounselorService.getAuditList(request, status);
            return ApiResponse.success(response);
        } catch (Exception e) {
            log.error("Error getting audit list", e);
            return ApiResponse.error("获取审核列表失败");
        }
    }

    /**
     * 审核教练资料修改
     * POST /admin/counselor/audit/{auditId}
     */
    @PostMapping("/audit/{auditId}")
    public ApiResponse audit(
            @PathVariable Long auditId,
            @RequestBody Map payload,
            @RequestHeader(value = "Authorization", required = false) String token) {
        log.info("Audit counselor update: {}", auditId);
        try {
            AdminUser currentUser = getCurrentUser(token);
            if (currentUser == null) {
                return ApiResponse.error(401, "未登录");
            }
            Integer status = (Integer) payload.get("status");
            String remark = (String) payload.get("remark");

            boolean result = adminCounselorService.audit(auditId, status, remark, currentUser);
            if (result) {
                return ApiResponse.success(status == 1 ? "审核通过" : "审核拒绝");
            } else {
                return ApiResponse.error("审核操作失败");
            }
        } catch (Exception e) {
            log.error("Error auditing counselor update", e);
            return ApiResponse.error(e.getMessage());
        }
    }

    private AdminUser getCurrentUser(String token) {
        if (token == null || token.isEmpty()) return null;
        if (token.startsWith("Bearer ")) token = token.substring(7);
        return adminAuthService.getCurrentUser(token);
    }
}

