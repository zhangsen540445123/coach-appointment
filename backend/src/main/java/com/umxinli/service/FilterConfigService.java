package com.umxinli.service;

import com.umxinli.entity.TopicDirection;
import com.umxinli.entity.SortOption;

import java.util.List;
import java.util.Map;

/**
 * 筛选配置服务接口
 * 提供话题方向和排序选项的管理功能
 */
public interface FilterConfigService {
    
    // ==================== 话题方向 ====================
    
    /**
     * 获取所有话题方向
     */
    List<TopicDirection> getAllTopicDirections();
    
    /**
     * 获取启用的话题方向（供小程序端使用）
     */
    List<TopicDirection> getEnabledTopicDirections();
    
    /**
     * 根据ID获取话题方向
     */
    TopicDirection getTopicDirectionById(Long id);
    
    /**
     * 分页获取话题方向列表（供管理后台使用）
     */
    Map<String, Object> getTopicDirectionList(int page, int pageSize, String keyword);
    
    /**
     * 新增话题方向
     */
    int addTopicDirection(TopicDirection topicDirection);
    
    /**
     * 更新话题方向
     */
    int updateTopicDirection(TopicDirection topicDirection);
    
    /**
     * 删除话题方向
     */
    int deleteTopicDirection(Long id);
    
    /**
     * 更新话题方向启用状态
     */
    int updateTopicDirectionEnabled(Long id, Integer enabled);
    
    // ==================== 排序选项 ====================
    
    /**
     * 获取所有排序选项
     */
    List<SortOption> getAllSortOptions();
    
    /**
     * 获取启用的排序选项（供小程序端使用）
     */
    List<SortOption> getEnabledSortOptions();
    
    /**
     * 根据ID获取排序选项
     */
    SortOption getSortOptionById(Long id);
    
    /**
     * 分页获取排序选项列表（供管理后台使用）
     */
    Map<String, Object> getSortOptionList(int page, int pageSize, String keyword);
    
    /**
     * 新增排序选项
     */
    int addSortOption(SortOption sortOption);
    
    /**
     * 更新排序选项
     */
    int updateSortOption(SortOption sortOption);
    
    /**
     * 删除排序选项
     */
    int deleteSortOption(Long id);
    
    /**
     * 更新排序选项启用状态
     */
    int updateSortOptionEnabled(Long id, Integer enabled);
    
    // ==================== 组合接口 ====================
    
    /**
     * 获取小程序端筛选配置（包含话题方向和排序选项）
     */
    Map<String, Object> getFilterConfig();
}

