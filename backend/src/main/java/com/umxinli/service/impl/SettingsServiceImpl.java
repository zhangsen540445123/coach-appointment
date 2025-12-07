package com.umxinli.service.impl;

import com.umxinli.entity.GlobalSettings;
import com.umxinli.mapper.SettingsMapper;
import com.umxinli.service.SettingsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SettingsServiceImpl implements SettingsService {

    private static final Logger log = LoggerFactory.getLogger(SettingsServiceImpl.class);

    @Autowired
    private SettingsMapper settingsMapper;

    @Override
    @Cacheable(value = "settings", key = "#keyName")
    public GlobalSettings getSettingByKey(String keyName) {
        log.info("Getting setting by key: {}", keyName);
        return settingsMapper.selectByKey(keyName);
    }

    @Override
    public List<GlobalSettings> getAllSettings() {
        log.info("Getting all settings");
        return settingsMapper.selectAll();
    }

    @Override
    @CacheEvict(value = "settings", key = "#keyName")
    public void saveSetting(String keyName, String value) {
        log.info("Saving setting: {} = {}", keyName, value);
        GlobalSettings existing = settingsMapper.selectByKey(keyName);
        if (existing != null) {
            settingsMapper.updateByKey(keyName, value);
        } else {
            GlobalSettings newSetting = new GlobalSettings();
            newSetting.setKeyName(keyName);
            newSetting.setValue(value);
            settingsMapper.insert(newSetting);
        }
    }
}
