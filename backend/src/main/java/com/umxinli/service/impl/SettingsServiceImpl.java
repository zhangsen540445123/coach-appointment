package com.umxinli.service.impl;

import com.umxinli.entity.GlobalSettings;
import com.umxinli.mapper.SettingsMapper;
import com.umxinli.service.SettingsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class SettingsServiceImpl implements SettingsService {

    @Autowired
    private SettingsMapper settingsMapper;

    @Override
    @Cacheable(value = "settings", key = "#keyName")
    public GlobalSettings getSettingByKey(String keyName) {
        log.info("Getting setting by key: {}", keyName);
        return settingsMapper.selectByKey(keyName);
    }
}
