package com.umxinli.mapper;

import com.umxinli.entity.WxPayConfig;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface WxPayConfigMapper {
    
    /**
     * 获取启用的支付配置
     */
    WxPayConfig selectEnabled();
    
    /**
     * 根据ID查询
     */
    WxPayConfig selectById(@Param("id") Long id);
    
    /**
     * 插入配置
     */
    int insert(WxPayConfig config);
    
    /**
     * 更新配置
     */
    int update(WxPayConfig config);
    
    /**
     * 删除配置
     */
    int deleteById(@Param("id") Long id);
}

