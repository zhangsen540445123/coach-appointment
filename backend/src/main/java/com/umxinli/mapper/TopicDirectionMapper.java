package com.umxinli.mapper;

import com.umxinli.entity.TopicDirection;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TopicDirectionMapper {
    
    /**
     * 查询所有话题方向（按排序序号排序）
     */
    List<TopicDirection> selectAll();
    
    /**
     * 查询启用的话题方向
     */
    List<TopicDirection> selectEnabled();
    
    /**
     * 根据ID查询
     */
    TopicDirection selectById(@Param("id") Long id);
    
    /**
     * 分页查询
     */
    List<TopicDirection> selectList(@Param("offset") int offset, @Param("limit") int limit, @Param("keyword") String keyword);
    
    /**
     * 统计总数
     */
    int count(@Param("keyword") String keyword);
    
    /**
     * 新增
     */
    int insert(TopicDirection topicDirection);
    
    /**
     * 更新
     */
    int update(TopicDirection topicDirection);
    
    /**
     * 删除
     */
    int deleteById(@Param("id") Long id);
    
    /**
     * 更新启用状态
     */
    int updateEnabled(@Param("id") Long id, @Param("enabled") Integer enabled);
}

