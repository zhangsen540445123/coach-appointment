package com.umxinli.mapper;

import com.umxinli.entity.SortOption;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SortOptionMapper {
    
    /**
     * 查询所有排序选项（按排序序号排序）
     */
    List<SortOption> selectAll();
    
    /**
     * 查询启用的排序选项
     */
    List<SortOption> selectEnabled();
    
    /**
     * 根据ID查询
     */
    SortOption selectById(@Param("id") Long id);
    
    /**
     * 分页查询
     */
    List<SortOption> selectList(@Param("offset") int offset, @Param("limit") int limit, @Param("keyword") String keyword);
    
    /**
     * 统计总数
     */
    int count(@Param("keyword") String keyword);
    
    /**
     * 新增
     */
    int insert(SortOption sortOption);
    
    /**
     * 更新
     */
    int update(SortOption sortOption);
    
    /**
     * 删除
     */
    int deleteById(@Param("id") Long id);
    
    /**
     * 更新启用状态
     */
    int updateEnabled(@Param("id") Long id, @Param("enabled") Integer enabled);
}

