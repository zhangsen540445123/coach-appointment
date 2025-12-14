package com.umxinli.service.impl;

import com.umxinli.entity.WxPayConfig;
import com.umxinli.mapper.WxPayConfigMapper;
import com.umxinli.service.WxPayConfigService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WxPayConfigServiceImpl implements WxPayConfigService {

    private static final Logger log = LoggerFactory.getLogger(WxPayConfigServiceImpl.class);

    @Autowired
    private WxPayConfigMapper wxPayConfigMapper;

    @Override
    public WxPayConfig getEnabledConfig() {
        return wxPayConfigMapper.selectEnabled();
    }

    @Override
    public WxPayConfig getById(Long id) {
        return wxPayConfigMapper.selectById(id);
    }

    @Override
    public WxPayConfig saveOrUpdate(WxPayConfig config) {
        if (config.getId() == null) {
            // 新增配置，默认启用
            if (config.getStatus() == null) {
                config.setStatus(1);
            }
            wxPayConfigMapper.insert(config);
            log.info("Created new WxPayConfig with id: {}", config.getId());
        } else {
            // 更新配置
            wxPayConfigMapper.update(config);
            log.info("Updated WxPayConfig with id: {}", config.getId());
        }
        return config;
    }

    @Override
    public boolean delete(Long id) {
        int rows = wxPayConfigMapper.deleteById(id);
        return rows > 0;
    }
}

