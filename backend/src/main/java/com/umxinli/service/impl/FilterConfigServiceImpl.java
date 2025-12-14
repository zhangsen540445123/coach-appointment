package com.umxinli.service.impl;

import com.umxinli.entity.TopicDirection;
import com.umxinli.entity.SortOption;
import com.umxinli.mapper.TopicDirectionMapper;
import com.umxinli.mapper.SortOptionMapper;
import com.umxinli.service.FilterConfigService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FilterConfigServiceImpl implements FilterConfigService {

    private static final Logger log = LoggerFactory.getLogger(FilterConfigServiceImpl.class);

    @Autowired
    private TopicDirectionMapper topicDirectionMapper;

    @Autowired
    private SortOptionMapper sortOptionMapper;

    // ==================== 话题方向 ====================

    @Override
    public List<TopicDirection> getAllTopicDirections() {
        return topicDirectionMapper.selectAll();
    }

    @Override
    @Cacheable(value = "filterConfig", key = "'topicDirections'")
    public List<TopicDirection> getEnabledTopicDirections() {
        return topicDirectionMapper.selectEnabled();
    }

    @Override
    public TopicDirection getTopicDirectionById(Long id) {
        return topicDirectionMapper.selectById(id);
    }

    @Override
    public Map<String, Object> getTopicDirectionList(int page, int pageSize, String keyword) {
        int offset = (page - 1) * pageSize;
        List<TopicDirection> list = topicDirectionMapper.selectList(offset, pageSize, keyword);
        int total = topicDirectionMapper.count(keyword);
        
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        result.put("total", total);
        result.put("pages", (int) Math.ceil((double) total / pageSize));
        return result;
    }

    @Override
    @CacheEvict(value = "filterConfig", key = "'topicDirections'")
    public int addTopicDirection(TopicDirection topicDirection) {
        return topicDirectionMapper.insert(topicDirection);
    }

    @Override
    @CacheEvict(value = "filterConfig", key = "'topicDirections'")
    public int updateTopicDirection(TopicDirection topicDirection) {
        return topicDirectionMapper.update(topicDirection);
    }

    @Override
    @CacheEvict(value = "filterConfig", key = "'topicDirections'")
    public int deleteTopicDirection(Long id) {
        return topicDirectionMapper.deleteById(id);
    }

    @Override
    @CacheEvict(value = "filterConfig", key = "'topicDirections'")
    public int updateTopicDirectionEnabled(Long id, Integer enabled) {
        return topicDirectionMapper.updateEnabled(id, enabled);
    }

    // ==================== 排序选项 ====================

    @Override
    public List<SortOption> getAllSortOptions() {
        return sortOptionMapper.selectAll();
    }

    @Override
    @Cacheable(value = "filterConfig", key = "'sortOptions'")
    public List<SortOption> getEnabledSortOptions() {
        return sortOptionMapper.selectEnabled();
    }

    @Override
    public SortOption getSortOptionById(Long id) {
        return sortOptionMapper.selectById(id);
    }

    @Override
    public Map<String, Object> getSortOptionList(int page, int pageSize, String keyword) {
        int offset = (page - 1) * pageSize;
        List<SortOption> list = sortOptionMapper.selectList(offset, pageSize, keyword);
        int total = sortOptionMapper.count(keyword);
        
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        result.put("total", total);
        result.put("pages", (int) Math.ceil((double) total / pageSize));
        return result;
    }

    @Override
    @CacheEvict(value = "filterConfig", key = "'sortOptions'")
    public int addSortOption(SortOption sortOption) {
        return sortOptionMapper.insert(sortOption);
    }

    @Override
    @CacheEvict(value = "filterConfig", key = "'sortOptions'")
    public int updateSortOption(SortOption sortOption) {
        return sortOptionMapper.update(sortOption);
    }

    @Override
    @CacheEvict(value = "filterConfig", key = "'sortOptions'")
    public int deleteSortOption(Long id) {
        return sortOptionMapper.deleteById(id);
    }

    @Override
    @CacheEvict(value = "filterConfig", key = "'sortOptions'")
    public int updateSortOptionEnabled(Long id, Integer enabled) {
        return sortOptionMapper.updateEnabled(id, enabled);
    }

    // ==================== 组合接口 ====================

    @Override
    public Map<String, Object> getFilterConfig() {
        Map<String, Object> result = new HashMap<>();
        result.put("topicDirections", getEnabledTopicDirections());
        result.put("sortOptions", getEnabledSortOptions());
        return result;
    }
}

