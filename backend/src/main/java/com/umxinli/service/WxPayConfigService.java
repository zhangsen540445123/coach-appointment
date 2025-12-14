package com.umxinli.service;

import com.umxinli.entity.WxPayConfig;

/**
 * 微信支付配置服务接口
 */
public interface WxPayConfigService {
    
    /**
     * 获取启用的支付配置
     */
    WxPayConfig getEnabledConfig();
    
    /**
     * 根据ID获取配置
     */
    WxPayConfig getById(Long id);
    
    /**
     * 保存或更新配置
     */
    WxPayConfig saveOrUpdate(WxPayConfig config);
    
    /**
     * 删除配置
     */
    boolean delete(Long id);
}

