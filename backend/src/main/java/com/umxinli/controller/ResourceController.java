package com.umxinli.controller;

import com.umxinli.dto.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 资源映射控制器
 * 提供图片资源的本地化映射
 */
@RestController
@RequestMapping("/resource")
@CrossOrigin
public class ResourceController {

    private static final Logger log = LoggerFactory.getLogger(ResourceController.class);

    @Value("${app.base-url:http://localhost:8081}")
    private String baseUrl;

    /**
     * 获取所有图片资源的本地URL映射
     * GET /resource/images
     */
    @GetMapping("/images")
    public ApiResponse<Map<String, String>> getImageResources() {
        log.info("Get image resources mapping");
        try {
            Map<String, String> resources = new HashMap<>();
            String imageBaseUrl = baseUrl + "/api/images/";
            
            // 首页相关图片
            resources.put("home_01_jq", imageBaseUrl + "01_jq@3x.png");
            resources.put("home_02_dj", imageBaseUrl + "02_dj@3x.png");
            resources.put("home_03_xx", imageBaseUrl + "03_xx@3x.png");
            resources.put("home_04_qsn", imageBaseUrl + "04_qsn@3x.png");
            resources.put("home_05_gzs", imageBaseUrl + "05_gzs@3x.png");
            resources.put("home_zxs_tx", imageBaseUrl + "zxs_tx@3x.png");
            resources.put("home_logo", imageBaseUrl + "logo.png");
            resources.put("home_zxgw", imageBaseUrl + "咨询顾问@3x.png");
            
            // 咨询师相关图片
            resources.put("counselor_grcc", imageBaseUrl + "个人成长@3x.png");
            resources.put("counselor_qzjy", imageBaseUrl + "亲子教育@3x.png");
            resources.put("counselor_rjgx", imageBaseUrl + "人际关系@3x.png");
            resources.put("counselor_hyly", imageBaseUrl + "婚姻恋爱@3x.png");
            resources.put("counselor_xyzc", imageBaseUrl + "学业职场@3x.png");
            resources.put("counselor_jtkr", imageBaseUrl + "家庭困扰@3x.png");
            resources.put("counselor_xxl", imageBaseUrl + "性心理@3x.png");
            resources.put("counselor_qxkr", imageBaseUrl + "情绪困扰@3x.png");
            resources.put("counselor_sxjk", imageBaseUrl + "身心健康@3x.png");
            
            // 分享相关图片
            resources.put("share_bg", imageBaseUrl + "BG@3x.png");
            resources.put("share_pyq", imageBaseUrl + "pyq@3x.png");
            resources.put("share_save", imageBaseUrl + "save@3x.png");
            resources.put("share_wx_gf", imageBaseUrl + "wx_gf@3x.png");
            
            // 其他图片
            resources.put("bitmap", imageBaseUrl + "位图.png");
            resources.put("rectangle", imageBaseUrl + "矩形_2.png");
            resources.put("zxgw_dialog", imageBaseUrl + "咨询顾问弹框@3x.png");
            resources.put("zxjy_bg", imageBaseUrl + "咨询寄语bg@3x.png");
            resources.put("zxjy_exp_bg", imageBaseUrl + "咨询经验_bg@3x.png");
            resources.put("location", imageBaseUrl + "定位@3x.png");
            resources.put("navigation", imageBaseUrl + "导航@3x.png");
            resources.put("phone", imageBaseUrl + "电话@3x.png");
            resources.put("bg_mask", imageBaseUrl + "背景蒙版@3x.png");
            resources.put("home_bg", imageBaseUrl + "首页-2@3x.jpg");
            
            return ApiResponse.success(resources);
        } catch (Exception e) {
            log.error("Error getting image resources", e);
            return ApiResponse.error("获取资源失败");
        }
    }
}

