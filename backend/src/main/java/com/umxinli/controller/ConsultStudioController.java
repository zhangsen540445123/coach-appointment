package com.umxinli.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.ConsultStudio;
import com.umxinli.entity.Counselor;
import com.umxinli.service.ConsultStudioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 咨询工作室控制器（小程序端API）
 */
@RestController
@RequestMapping("/consultStudio")
public class ConsultStudioController {
    
    private static final Logger log = LoggerFactory.getLogger(ConsultStudioController.class);
    
    @Autowired
    private ConsultStudioService studioService;
    
    @Value("${app.base-url:}")
    private String baseUrl;

    /**
     * 获取工作室列表
     * POST /consultStudio/list
     */
    @PostMapping("/list")
    public ApiResponse<Map<String, Object>> getList(@RequestBody Map<String, Object> request) {
        log.info("Get studio list request: {}", request);
        try {
            Map<String, Object> pager = (Map<String, Object>) request.get("pager");
            int page = pager != null ? (int) pager.getOrDefault("index", 1) : 1;
            int size = pager != null ? (int) pager.getOrDefault("size", 100) : 100;
            
            Map<String, Object> result = studioService.getStudioList(page, size);
            
            // 为图片URL添加baseUrl前缀
            List<ConsultStudio> list = (List<ConsultStudio>) result.get("list");
            for (ConsultStudio studio : list) {
                // studioCoverImgList 已经是完整URL或相对路径的JSON数组
            }
            
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("Error getting studio list", e);
            return ApiResponse.error("获取工作室列表失败");
        }
    }

    /**
     * 获取工作室详情
     * POST /consultStudio/info
     */
    @PostMapping("/info")
    public ApiResponse<Map<String, Object>> getInfo(@RequestBody Map<String, Object> request) {
        log.info("Get studio info request: {}", request);
        try {
            Long studioId = Long.valueOf(String.valueOf(request.get("studioId")));
            ConsultStudio studio = studioService.getStudioById(studioId);
            
            if (studio == null) {
                return ApiResponse.error("工作室不存在");
            }
            
            Map<String, Object> result = new HashMap<>();
            result.put("consultStudio", studio);
            
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("Error getting studio info", e);
            return ApiResponse.error("获取工作室详情失败");
        }
    }

    /**
     * 获取工作室下的教练列表
     * POST /consultStudio/counselorList
     */
    @PostMapping("/counselorList")
    public ApiResponse<Map<String, Object>> getCounselorList(@RequestBody Map<String, Object> request) {
        log.info("Get studio counselor list request: {}", request);
        try {
            Long studioId = Long.valueOf(String.valueOf(request.get("studioId")));
            List<Counselor> counselors = studioService.getStudioCounselors(studioId);

            // 添加baseUrl前缀
            for (Counselor c : counselors) {
                if (c.getHeadUrl() != null && !c.getHeadUrl().startsWith("http")) {
                    c.setHeadUrl(baseUrl + c.getHeadUrl());
                }
                if (c.getHeadUrlSquare() != null && !c.getHeadUrlSquare().startsWith("http")) {
                    c.setHeadUrlSquare(baseUrl + c.getHeadUrlSquare());
                }
            }

            // 返回格式与小程序端预期一致：{counselorList: [...]}
            Map<String, Object> result = new HashMap<>();
            result.put("counselorList", counselors);

            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("Error getting studio counselor list", e);
            return ApiResponse.error("获取教练列表失败");
        }
    }
}

