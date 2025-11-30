package com.umxinli.service;

import com.umxinli.entity.GlobalSettings;

public interface SettingsService {
    GlobalSettings getSettingByKey(String keyName);
}
