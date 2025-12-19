package com.umxinli.controller.admin;

import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.ConsultStudio;
import com.umxinli.entity.Counselor;
import com.umxinli.service.ConsultStudioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 工作室管理控制器（后台管理端API）
 */
@RestController
@RequestMapping("/admin/studio")
public class AdminStudioController {
    
    private static final Logger log = LoggerFactory.getLogger(AdminStudioController.class);
    
    @Autowired
    private ConsultStudioService studioService;

    /**
     * 获取所有工作室列表
     */
    @GetMapping("/list")
    public ApiResponse<List<ConsultStudio>> getList() {
        log.info("Admin get all studios");
        try {
            List<ConsultStudio> list = studioService.getAllStudios();
            return ApiResponse.success(list);
        } catch (Exception e) {
            log.error("Error getting studio list", e);
            return ApiResponse.error("获取工作室列表失败");
        }
    }

    /**
     * 获取工作室详情
     */
    @GetMapping("/{id}")
    public ApiResponse<ConsultStudio> getById(@PathVariable Long id) {
        log.info("Admin get studio by id: {}", id);
        try {
            ConsultStudio studio = studioService.getStudioById(id);
            if (studio == null) {
                return ApiResponse.error("工作室不存在");
            }
            return ApiResponse.success(studio);
        } catch (Exception e) {
            log.error("Error getting studio", e);
            return ApiResponse.error("获取工作室详情失败");
        }
    }

    /**
     * 创建工作室
     */
    @PostMapping
    public ApiResponse<ConsultStudio> create(@RequestBody ConsultStudio studio) {
        log.info("Admin create studio: {}", studio.getStudioName());
        try {
            int result = studioService.createStudio(studio);
            if (result > 0) {
                return ApiResponse.success(studio);
            }
            return ApiResponse.error("创建工作室失败");
        } catch (Exception e) {
            log.error("Error creating studio", e);
            return ApiResponse.error("创建工作室失败: " + e.getMessage());
        }
    }

    /**
     * 更新工作室
     */
    @PutMapping("/{id}")
    public ApiResponse<Void> update(@PathVariable Long id, @RequestBody ConsultStudio studio) {
        log.info("Admin update studio: {}", id);
        try {
            studio.setId(id);
            int result = studioService.updateStudio(studio);
            if (result > 0) {
                return ApiResponse.success(null);
            }
            return ApiResponse.error("更新工作室失败");
        } catch (Exception e) {
            log.error("Error updating studio", e);
            return ApiResponse.error("更新工作室失败: " + e.getMessage());
        }
    }

    /**
     * 删除工作室
     */
    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        log.info("Admin delete studio: {}", id);
        try {
            int result = studioService.deleteStudio(id);
            if (result > 0) {
                return ApiResponse.success(null);
            }
            return ApiResponse.error("删除工作室失败");
        } catch (Exception e) {
            log.error("Error deleting studio", e);
            return ApiResponse.error("删除工作室失败: " + e.getMessage());
        }
    }

    /**
     * 切换启用状态
     */
    @PostMapping("/{id}/toggle")
    public ApiResponse<Void> toggleEnabled(@PathVariable Long id) {
        log.info("Admin toggle studio enabled: {}", id);
        try {
            int result = studioService.toggleEnabled(id);
            if (result > 0) {
                return ApiResponse.success(null);
            }
            return ApiResponse.error("操作失败");
        } catch (Exception e) {
            log.error("Error toggling studio", e);
            return ApiResponse.error("操作失败: " + e.getMessage());
        }
    }

    /**
     * 获取工作室关联的教练
     */
    @GetMapping("/{id}/counselors")
    public ApiResponse<List<Counselor>> getCounselors(@PathVariable Long id) {
        log.info("Admin get studio counselors: {}", id);
        try {
            List<Counselor> counselors = studioService.getStudioCounselors(id);
            return ApiResponse.success(counselors);
        } catch (Exception e) {
            log.error("Error getting studio counselors", e);
            return ApiResponse.error("获取教练列表失败");
        }
    }

    /**
     * 绑定教练到工作室
     */
    @PostMapping("/{id}/counselors")
    public ApiResponse<Void> bindCounselors(@PathVariable Long id, @RequestBody Map<String, List<Long>> request) {
        log.info("Admin bind counselors to studio: {}", id);
        try {
            List<Long> counselorIds = request.get("counselorIds");
            if (counselorIds == null || counselorIds.isEmpty()) {
                return ApiResponse.error("请选择教练");
            }
            studioService.bindCounselors(id, counselorIds);
            return ApiResponse.success(null);
        } catch (Exception e) {
            log.error("Error binding counselors", e);
            return ApiResponse.error("绑定教练失败: " + e.getMessage());
        }
    }
}

