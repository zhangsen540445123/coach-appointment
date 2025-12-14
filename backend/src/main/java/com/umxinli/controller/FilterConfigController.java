package com.umxinli.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.service.FilterConfigService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * 筛选配置控制器 - 小程序端
 * 提供话题方向和排序选项的查询接口
 */
@RestController
@RequestMapping("/filter")
@CrossOrigin
public class FilterConfigController {

    private static final Logger log = LoggerFactory.getLogger(FilterConfigController.class);

    @Autowired
    private FilterConfigService filterConfigService;

    /**
     * 获取筛选配置（话题方向 + 排序选项）
     * GET /filter/config
     * 
     * 返回格式与前端现有数据结构兼容：
     * {
     *   "topicDirections": [...],  // 话题方向列表
     *   "sortOptions": [...],      // 排序选项列表
     *   "filterData": [...]        // 组装好的筛选下拉数据（HM-filterDropdown 组件格式）
     * }
     */
    @GetMapping("/config")
    public ApiResponse getFilterConfig() {
        log.info("Get filter config request");
        try {
            Map<String, Object> config = filterConfigService.getFilterConfig();
            
            // 组装 HM-filterDropdown 组件需要的数据格式
            List<Map<String, Object>> filterData = buildFilterData(
                (List<?>) config.get("topicDirections"),
                (List<?>) config.get("sortOptions")
            );
            config.put("filterData", filterData);
            
            return ApiResponse.success(config);
        } catch (Exception e) {
            log.error("Error getting filter config", e);
            return ApiResponse.error("获取筛选配置失败");
        }
    }

    /**
     * 获取话题方向列表
     * GET /filter/topicDirections
     */
    @GetMapping("/topicDirections")
    public ApiResponse getTopicDirections() {
        log.info("Get topic directions request");
        try {
            return ApiResponse.success(filterConfigService.getEnabledTopicDirections());
        } catch (Exception e) {
            log.error("Error getting topic directions", e);
            return ApiResponse.error("获取话题方向失败");
        }
    }

    /**
     * 获取排序选项列表
     * GET /filter/sortOptions
     */
    @GetMapping("/sortOptions")
    public ApiResponse getSortOptions() {
        log.info("Get sort options request");
        try {
            return ApiResponse.success(filterConfigService.getEnabledSortOptions());
        } catch (Exception e) {
            log.error("Error getting sort options", e);
            return ApiResponse.error("获取排序选项失败");
        }
    }

    /**
     * 构建 HM-filterDropdown 组件需要的数据格式
     */
    private List<Map<String, Object>> buildFilterData(List<?> topicDirections, List<?> sortOptions) {
        List<Map<String, Object>> result = new ArrayList<>();
        
        // 话题方向
        Map<String, Object> topicMenu = new HashMap<>();
        topicMenu.put("name", "话题方向");
        topicMenu.put("type", "radio");
        
        List<Map<String, Object>> topicSubmenu = new ArrayList<>();
        Map<String, Object> topicGroup = new HashMap<>();
        topicGroup.put("name", "话题方向");
        topicGroup.put("hideName", true);
        
        List<Map<String, Object>> topicItems = new ArrayList<>();
        for (Object item : topicDirections) {
            if (item instanceof com.umxinli.entity.TopicDirection) {
                com.umxinli.entity.TopicDirection td = (com.umxinli.entity.TopicDirection) item;
                Map<String, Object> topicItem = new HashMap<>();
                topicItem.put("name", td.getName());
                topicItem.put("value", td.getValue());
                topicItems.add(topicItem);
            }
        }
        topicGroup.put("submenu", topicItems);
        topicSubmenu.add(topicGroup);
        topicMenu.put("submenu", topicSubmenu);
        result.add(topicMenu);
        
        // 排序选项
        Map<String, Object> sortMenu = new HashMap<>();
        sortMenu.put("name", "排序");
        sortMenu.put("type", "radio");
        
        List<Map<String, Object>> sortSubmenu = new ArrayList<>();
        Map<String, Object> sortGroup = new HashMap<>();
        sortGroup.put("name", "排序方式");
        sortGroup.put("hideName", true);
        
        List<Map<String, Object>> sortItems = new ArrayList<>();
        for (Object item : sortOptions) {
            if (item instanceof com.umxinli.entity.SortOption) {
                com.umxinli.entity.SortOption so = (com.umxinli.entity.SortOption) item;
                Map<String, Object> sortItem = new HashMap<>();
                sortItem.put("name", so.getName());
                sortItem.put("value", so.getValue());
                sortItems.add(sortItem);
            }
        }
        sortGroup.put("submenu", sortItems);
        sortSubmenu.add(sortGroup);
        sortMenu.put("submenu", sortSubmenu);
        result.add(sortMenu);
        
        return result;
    }
}

