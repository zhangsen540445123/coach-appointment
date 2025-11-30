package com.umxinli.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.umxinli.dto.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/global")
@CrossOrigin
public class GlobalController {

    @GetMapping("/settings")
    public ApiResponse<Object> getSettings() {
        log.info("Get global settings request");
        try {
            Map<String, Object> data = new HashMap<>();
            Map<String, Object> concatSysAgentSettings = new HashMap<>();
            concatSysAgentSettings.put("qrCodeImageUrl", "https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20211115/351753974260_.pic_hd.jpg");
            concatSysAgentSettings.put("showAtMp", "1");
            data.put("concatSysAgentSettings", concatSysAgentSettings);
            
            return ApiResponse.success(data);
        } catch (Exception e) {
            log.error("Error getting global settings", e);
            return ApiResponse.error("Failed to get global settings");
        }
    }
}
