package com.umxinli.admin.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.GlobalSettings;
import com.umxinli.service.SettingsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/settings")
@CrossOrigin
public class AdminSettingsController {

    private static final Logger log = LoggerFactory.getLogger(AdminSettingsController.class);

    @Autowired
    private SettingsService settingsService;

    /**
     * 获取所有设置
     * GET /admin/settings
     */
    @GetMapping
    public ApiResponse getAllSettings() {
        log.info("Get all settings");
        try {
            List<GlobalSettings> settings = settingsService.getAllSettings();
            Map<String, Object> result = new HashMap<>();
            for (GlobalSettings setting : settings) {
                String value = setting.getValue();
                // 处理布尔值
                if ("true".equalsIgnoreCase(value) || "1".equals(value)) {
                    result.put(setting.getKeyName(), true);
                } else if ("false".equalsIgnoreCase(value) || "0".equals(value)) {
                    result.put(setting.getKeyName(), false);
                } else {
                    result.put(setting.getKeyName(), value);
                }
            }
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("Error getting settings", e);
            return ApiResponse.error("获取设置失败");
        }
    }

    /**
     * 保存设置
     * POST /admin/settings
     */
    @PostMapping
    public ApiResponse saveSetting(@RequestBody Map<String, Object> payload) {
        log.info("Save setting: {}", payload);
        try {
            String key = (String) payload.get("key");
            Object value = payload.get("value");
            
            if (key == null || key.isEmpty()) {
                return ApiResponse.error("key不能为空");
            }
            
            String valueStr = value != null ? value.toString() : "";
            settingsService.saveSetting(key, valueStr);
            
            return ApiResponse.success("保存成功");
        } catch (Exception e) {
            log.error("Error saving setting", e);
            return ApiResponse.error("保存设置失败");
        }
    }
}

