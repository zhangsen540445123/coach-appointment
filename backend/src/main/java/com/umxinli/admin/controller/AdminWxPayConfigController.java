package com.umxinli.admin.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.WxPayConfig;
import com.umxinli.service.WxPayConfigService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 管理后台 - 微信支付配置 Controller
 */
@RestController
@RequestMapping("/admin/wxpay/config")
@CrossOrigin
public class AdminWxPayConfigController {

    private static final Logger log = LoggerFactory.getLogger(AdminWxPayConfigController.class);

    @Autowired
    private WxPayConfigService wxPayConfigService;

    /**
     * 获取当前支付配置
     * GET /admin/wxpay/config
     */
    @GetMapping
    public ApiResponse getConfig() {
        log.info("Get wx pay config");
        try {
            WxPayConfig config = wxPayConfigService.getEnabledConfig();
            if (config != null) {
                // 隐藏敏感信息的部分内容
                Map<String, Object> result = new HashMap<>();
                result.put("id", config.getId());
                result.put("appId", config.getAppId());
                result.put("mchId", config.getMchId());
                result.put("apiKey", maskSensitive(config.getApiKey()));
                result.put("apiV3Key", maskSensitive(config.getApiV3Key()));
                result.put("certPath", config.getCertPath());
                result.put("privateKeyPath", config.getPrivateKeyPath());
                result.put("notifyUrl", config.getNotifyUrl());
                result.put("status", config.getStatus());
                return ApiResponse.success(result);
            }
            return ApiResponse.success(null);
        } catch (Exception e) {
            log.error("Error getting wx pay config", e);
            return ApiResponse.error("获取配置失败");
        }
    }

    /**
     * 保存支付配置
     * POST /admin/wxpay/config
     */
    @PostMapping
    public ApiResponse saveConfig(@RequestBody Map<String, Object> payload) {
        log.info("Save wx pay config: {}", payload);
        try {
            WxPayConfig config = new WxPayConfig();
            
            if (payload.get("id") != null) {
                config.setId(Long.valueOf(payload.get("id").toString()));
            }
            config.setAppId((String) payload.get("appId"));
            config.setMchId((String) payload.get("mchId"));
            
            // 只有非掩码值才更新
            String apiKey = (String) payload.get("apiKey");
            if (apiKey != null && !apiKey.contains("****")) {
                config.setApiKey(apiKey);
            }
            
            String apiV3Key = (String) payload.get("apiV3Key");
            if (apiV3Key != null && !apiV3Key.contains("****")) {
                config.setApiV3Key(apiV3Key);
            }
            
            config.setCertPath((String) payload.get("certPath"));
            config.setPrivateKeyPath((String) payload.get("privateKeyPath"));
            config.setNotifyUrl((String) payload.get("notifyUrl"));
            
            if (payload.get("status") != null) {
                config.setStatus(Integer.valueOf(payload.get("status").toString()));
            }
            
            WxPayConfig saved = wxPayConfigService.saveOrUpdate(config);
            return ApiResponse.success(saved.getId());
        } catch (Exception e) {
            log.error("Error saving wx pay config", e);
            return ApiResponse.error("保存配置失败: " + e.getMessage());
        }
    }

    /**
     * 删除支付配置
     * DELETE /admin/wxpay/config/{id}
     */
    @DeleteMapping("/{id}")
    public ApiResponse deleteConfig(@PathVariable Long id) {
        log.info("Delete wx pay config: {}", id);
        try {
            boolean result = wxPayConfigService.delete(id);
            if (result) {
                return ApiResponse.success("删除成功");
            }
            return ApiResponse.error("配置不存在");
        } catch (Exception e) {
            log.error("Error deleting wx pay config", e);
            return ApiResponse.error("删除配置失败");
        }
    }

    /**
     * 掩盖敏感信息
     */
    private String maskSensitive(String value) {
        if (value == null || value.length() <= 8) {
            return "****";
        }
        return value.substring(0, 4) + "****" + value.substring(value.length() - 4);
    }
}

