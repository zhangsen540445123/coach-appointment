package com.umxinli.admin.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.ConsultGuide;
import com.umxinli.service.ConsultGuideService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 管理后台 - 咨询指南管理 Controller
 */
@RestController
@RequestMapping("/admin/consult-guide")
@CrossOrigin
public class AdminConsultGuideController {

    private static final Logger log = LoggerFactory.getLogger(AdminConsultGuideController.class);

    @Autowired
    private ConsultGuideService consultGuideService;

    /**
     * 获取咨询指南列表
     * GET /admin/consult-guide/list
     */
    @GetMapping("/list")
    public ApiResponse<List<ConsultGuide>> getList() {
        log.info("Get consult guide list");
        try {
            List<ConsultGuide> list = consultGuideService.getAll();
            log.info("Found {} consult guides", list.size());
            return ApiResponse.success(list);
        } catch (Exception e) {
            log.error("Error getting consult guide list", e);
            return ApiResponse.error("获取咨询指南列表失败");
        }
    }

    /**
     * 创建咨询指南
     * POST /admin/consult-guide/create
     */
    @PostMapping("/create")
    public ApiResponse<String> create(@RequestBody ConsultGuide consultGuide) {
        log.info("Create consult guide: {}", consultGuide.getTitle());
        try {
            consultGuideService.add(consultGuide);
            log.info("Consult guide created successfully");
            return ApiResponse.success("创建成功");
        } catch (Exception e) {
            log.error("Error creating consult guide", e);
            return ApiResponse.error("创建咨询指南失败");
        }
    }

    /**
     * 更新咨询指南
     * PUT /admin/consult-guide/{id}
     */
    @PutMapping("/{id}")
    public ApiResponse<String> update(@PathVariable Long id, @RequestBody ConsultGuide consultGuide) {
        log.info("Update consult guide: {}", id);
        try {
            consultGuide.setId(id);
            consultGuideService.update(consultGuide);
            log.info("Consult guide updated successfully");
            return ApiResponse.success("更新成功");
        } catch (Exception e) {
            log.error("Error updating consult guide", e);
            return ApiResponse.error("更新咨询指南失败");
        }
    }

    /**
     * 删除咨询指南
     * DELETE /admin/consult-guide/{id}
     */
    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(@PathVariable Long id) {
        log.info("Delete consult guide: {}", id);
        try {
            consultGuideService.delete(id);
            log.info("Consult guide deleted successfully");
            return ApiResponse.success("删除成功");
        } catch (Exception e) {
            log.error("Error deleting consult guide", e);
            return ApiResponse.error("删除咨询指南失败");
        }
    }

    /**
     * 切换咨询指南状态
     * POST /admin/consult-guide/{id}/toggle
     */
    @PostMapping("/{id}/toggle")
    public ApiResponse<String> toggle(@PathVariable Long id) {
        log.info("Toggle consult guide status: {}", id);
        try {
            ConsultGuide consultGuide = consultGuideService.getById(id);
            if (consultGuide == null) {
                return ApiResponse.error("咨询指南不存在");
            }
            consultGuide.setStatus(consultGuide.getStatus() == 1 ? 0 : 1);
            consultGuideService.update(consultGuide);
            log.info("Consult guide status toggled successfully");
            return ApiResponse.success("操作成功");
        } catch (Exception e) {
            log.error("Error toggling consult guide status", e);
            return ApiResponse.error("切换状态失败");
        }
    }
}
