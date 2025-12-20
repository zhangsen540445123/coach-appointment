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
    public ApiResponse<Map<String, Object>> getAllSettings() {
        log.info("Get all settings");
        try {
            List<GlobalSettings> settings = settingsService.getAllSettings();
            log.info("Found {} settings", settings.size());
            Map<String, Object> result = new HashMap<>();
            for (GlobalSettings setting : settings) {
                String value = setting.getValue();
                log.debug("Setting: {} = {}", setting.getKeyName(), value);
                // 处理布尔值
                if ("true".equalsIgnoreCase(value) || "1".equals(value)) {
                    result.put(setting.getKeyName(), true);
                } else if ("false".equalsIgnoreCase(value) || "0".equals(value)) {
                    result.put(setting.getKeyName(), false);
                } else {
                    result.put(setting.getKeyName(), value);
                }
            }
            log.info("Returning settings map with {} entries", result.size());
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
    public ApiResponse<String> saveSetting(@RequestBody Map<String, Object> payload) {
        log.info("Save setting: {}", payload);
        try {
            String key = (String) payload.get("key");
            Object value = payload.get("value");

            if (key == null || key.isEmpty()) {
                log.warn("Save setting failed: key is empty");
                return ApiResponse.error("key不能为空");
            }

            String valueStr = value != null ? value.toString() : "";
            log.info("Saving setting: {} = {}", key, valueStr);
            settingsService.saveSetting(key, valueStr);
            log.info("Setting saved successfully: {}", key);

            return ApiResponse.success("保存成功");
        } catch (Exception e) {
            log.error("Error saving setting", e);
            return ApiResponse.error("保存设置失败: " + e.getMessage());
        }
    }
}

