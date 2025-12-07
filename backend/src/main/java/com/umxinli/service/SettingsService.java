package com.umxinli.service;

import com.umxinli.entity.GlobalSettings;

import java.util.List;

public interface SettingsService {
    GlobalSettings getSettingByKey(String keyName);
    List<GlobalSettings> getAllSettings();
    void saveSetting(String keyName, String value);
}
