package com.umxinli.admin.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.TopicDirection;
import com.umxinli.entity.SortOption;
import com.umxinli.service.FilterConfigService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 筛选配置管理控制器 - 管理后台
 * 提供话题方向和排序选项的CRUD接口
 */
@RestController
@RequestMapping("/admin/filterConfig")
@CrossOrigin
public class AdminFilterConfigController {

    private static final Logger log = LoggerFactory.getLogger(AdminFilterConfigController.class);

    @Autowired
    private FilterConfigService filterConfigService;

    // ==================== 话题方向管理 ====================

    /**
     * 获取话题方向列表（分页）
     */
    @GetMapping("/topicDirections")
    public ApiResponse getTopicDirectionList(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize,
            @RequestParam(required = false) String keyword) {
        log.info("Get topic direction list - page: {}, pageSize: {}, keyword: {}", page, pageSize, keyword);
        try {
            Map<String, Object> result = filterConfigService.getTopicDirectionList(page, pageSize, keyword);
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("Error getting topic direction list", e);
            return ApiResponse.error("获取话题方向列表失败");
        }
    }

    /**
     * 获取话题方向详情
     */
    @GetMapping("/topicDirections/{id}")
    public ApiResponse getTopicDirection(@PathVariable Long id) {
        log.info("Get topic direction - id: {}", id);
        try {
            TopicDirection td = filterConfigService.getTopicDirectionById(id);
            return td != null ? ApiResponse.success(td) : ApiResponse.error("话题方向不存在");
        } catch (Exception e) {
            log.error("Error getting topic direction", e);
            return ApiResponse.error("获取话题方向失败");
        }
    }

    /**
     * 新增话题方向
     */
    @PostMapping("/topicDirections")
    public ApiResponse addTopicDirection(@RequestBody TopicDirection topicDirection) {
        log.info("Add topic direction - name: {}", topicDirection.getName());
        try {
            if (topicDirection.getEnabled() == null) {
                topicDirection.setEnabled(1);
            }
            int result = filterConfigService.addTopicDirection(topicDirection);
            return result > 0 ? ApiResponse.success(topicDirection) : ApiResponse.error("新增失败");
        } catch (Exception e) {
            log.error("Error adding topic direction", e);
            return ApiResponse.error("新增话题方向失败");
        }
    }

    /**
     * 更新话题方向
     */
    @PutMapping("/topicDirections/{id}")
    public ApiResponse updateTopicDirection(@PathVariable Long id, @RequestBody TopicDirection topicDirection) {
        log.info("Update topic direction - id: {}", id);
        try {
            topicDirection.setId(id);
            int result = filterConfigService.updateTopicDirection(topicDirection);
            return result > 0 ? ApiResponse.success(null) : ApiResponse.error("更新失败");
        } catch (Exception e) {
            log.error("Error updating topic direction", e);
            return ApiResponse.error("更新话题方向失败");
        }
    }

    /**
     * 删除话题方向
     */
    @DeleteMapping("/topicDirections/{id}")
    public ApiResponse deleteTopicDirection(@PathVariable Long id) {
        log.info("Delete topic direction - id: {}", id);
        try {
            int result = filterConfigService.deleteTopicDirection(id);
            return result > 0 ? ApiResponse.success(null) : ApiResponse.error("删除失败");
        } catch (Exception e) {
            log.error("Error deleting topic direction", e);
            return ApiResponse.error("删除话题方向失败");
        }
    }

    /**
     * 更新话题方向启用状态
     */
    @PutMapping("/topicDirections/{id}/enabled")
    public ApiResponse updateTopicDirectionEnabled(@PathVariable Long id, @RequestBody Map<String, Integer> body) {
        log.info("Update topic direction enabled - id: {}, enabled: {}", id, body.get("enabled"));
        try {
            int result = filterConfigService.updateTopicDirectionEnabled(id, body.get("enabled"));
            return result > 0 ? ApiResponse.success(null) : ApiResponse.error("更新状态失败");
        } catch (Exception e) {
            log.error("Error updating topic direction enabled", e);
            return ApiResponse.error("更新状态失败");
        }
    }

    // ==================== 排序选项管理 ====================

    /**
     * 获取排序选项列表（分页）
     */
    @GetMapping("/sortOptions")
    public ApiResponse getSortOptionList(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize,
            @RequestParam(required = false) String keyword) {
        log.info("Get sort option list - page: {}, pageSize: {}, keyword: {}", page, pageSize, keyword);
        try {
            Map<String, Object> result = filterConfigService.getSortOptionList(page, pageSize, keyword);
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("Error getting sort option list", e);
            return ApiResponse.error("获取排序选项列表失败");
        }
    }

    /**
     * 获取排序选项详情
     */
    @GetMapping("/sortOptions/{id}")
    public ApiResponse getSortOption(@PathVariable Long id) {
        log.info("Get sort option - id: {}", id);
        try {
            SortOption so = filterConfigService.getSortOptionById(id);
            return so != null ? ApiResponse.success(so) : ApiResponse.error("排序选项不存在");
        } catch (Exception e) {
            log.error("Error getting sort option", e);
            return ApiResponse.error("获取排序选项失败");
        }
    }

    /**
     * 新增排序选项
     */
    @PostMapping("/sortOptions")
    public ApiResponse addSortOption(@RequestBody SortOption sortOption) {
        log.info("Add sort option - name: {}", sortOption.getName());
        try {
            if (sortOption.getEnabled() == null) {
                sortOption.setEnabled(1);
            }
            int result = filterConfigService.addSortOption(sortOption);
            return result > 0 ? ApiResponse.success(sortOption) : ApiResponse.error("新增失败");
        } catch (Exception e) {
            log.error("Error adding sort option", e);
            return ApiResponse.error("新增排序选项失败");
        }
    }

    /**
     * 更新排序选项
     */
    @PutMapping("/sortOptions/{id}")
    public ApiResponse updateSortOption(@PathVariable Long id, @RequestBody SortOption sortOption) {
        log.info("Update sort option - id: {}", id);
        try {
            sortOption.setId(id);
            int result = filterConfigService.updateSortOption(sortOption);
            return result > 0 ? ApiResponse.success(null) : ApiResponse.error("更新失败");
        } catch (Exception e) {
            log.error("Error updating sort option", e);
            return ApiResponse.error("更新排序选项失败");
        }
    }

    /**
     * 删除排序选项
     */
    @DeleteMapping("/sortOptions/{id}")
    public ApiResponse deleteSortOption(@PathVariable Long id) {
        log.info("Delete sort option - id: {}", id);
        try {
            int result = filterConfigService.deleteSortOption(id);
            return result > 0 ? ApiResponse.success(null) : ApiResponse.error("删除失败");
        } catch (Exception e) {
            log.error("Error deleting sort option", e);
            return ApiResponse.error("删除排序选项失败");
        }
    }

    /**
     * 更新排序选项启用状态
     */
    @PutMapping("/sortOptions/{id}/enabled")
    public ApiResponse updateSortOptionEnabled(@PathVariable Long id, @RequestBody Map<String, Integer> body) {
        log.info("Update sort option enabled - id: {}, enabled: {}", id, body.get("enabled"));
        try {
            int result = filterConfigService.updateSortOptionEnabled(id, body.get("enabled"));
            return result > 0 ? ApiResponse.success(null) : ApiResponse.error("更新状态失败");
        } catch (Exception e) {
            log.error("Error updating sort option enabled", e);
            return ApiResponse.error("更新状态失败");
        }
    }
}

