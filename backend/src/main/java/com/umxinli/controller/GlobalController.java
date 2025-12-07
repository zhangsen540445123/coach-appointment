package com.umxinli.controller;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.GlobalSettings;
import com.umxinli.entity.UserFeedback;
import com.umxinli.mapper.UserFeedbackMapper;
import com.umxinli.service.SettingsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.io.File;

@RestController
@RequestMapping("/global")
@CrossOrigin
public class GlobalController {

    private static final Logger log = LoggerFactory.getLogger(GlobalController.class);

    @Autowired
    private SettingsService settingsService;

    @Autowired
    private UserFeedbackMapper userFeedbackMapper;

    @Value("${server.servlet.context-path:/api}")
    private String contextPath;

    /**
     * 获取图片资源配置
     * GET /global/imageConfig
     * 返回所有图片资源的本地URL映射
     */
    @GetMapping("/imageConfig")
    public ApiResponse<Object> getImageConfig() {
        log.info("Get image config request");
        try {
            String baseUrl = contextPath + "/file/image/";
            Map<String, Object> data = new HashMap<>();

            // 首页图标
            Map<String, String> home = new HashMap<>();
            home.put("jq", baseUrl + "01_jq@3x.png");           // 接洽图标
            home.put("dj", baseUrl + "02_dj@3x.png");           // 低价图标
            home.put("xx", baseUrl + "03_xx@3x.png");           // 线下图标
            home.put("qsn", baseUrl + "04_qsn@3x.png");         // 青少年图标
            home.put("gzs", baseUrl + "05_gzs@3x.png");         // 工作室图标
            home.put("zxs_tx", baseUrl + "zxs_tx@3x.png");      // 咨询师头像
            home.put("zixungw", baseUrl + "咨询顾问@3x.png");    // 咨询顾问图标
            data.put("home", home);

            // 筛选图标
            Map<String, String> filter = new HashMap<>();
            filter.put("keyue", baseUrl + "01_可约@3x.png");     // 可约
            filter.put("dijia", baseUrl + "02_低价@3x.png");     // 低价
            filter.put("xianxia", baseUrl + "03_线下@3x.png");   // 线下
            filter.put("qingshaonian", baseUrl + "04_青少年@3x.png"); // 青少年
            data.put("filter", filter);

            // 咨询师话题方向图标
            Map<String, String> counselor = new HashMap<>();
            counselor.put("gerenchengzhang", baseUrl + "个人成长@3x.png");
            counselor.put("qinzijiaoyu", baseUrl + "亲子教育@3x.png");
            counselor.put("renjiguanxi", baseUrl + "人际关系@3x.png");
            counselor.put("hunyinlianai", baseUrl + "婚姻恋爱@3x.png");
            counselor.put("xueyezhichang", baseUrl + "学业职场@3x.png");
            counselor.put("jiatingkunrao", baseUrl + "家庭困扰@3x.png");
            counselor.put("xingxinli", baseUrl + "性心理@3x.png");
            counselor.put("qingxukunrao", baseUrl + "情绪困扰@3x.png");
            counselor.put("shenxinjiankang", baseUrl + "身心健康@3x.png");
            data.put("counselor", counselor);

            // 分享相关图片
            Map<String, String> share = new HashMap<>();
            share.put("bg", baseUrl + "BG@3x.png");
            share.put("pyq", baseUrl + "pyq@3x.png");           // 朋友圈
            share.put("save", baseUrl + "save@3x.png");         // 保存
            share.put("wx_gf", baseUrl + "wx_gf@3x.png");       // 微信官方
            data.put("share", share);

            // 工作室相关
            Map<String, String> studio = new HashMap<>();
            studio.put("poster_bg", baseUrl + "studio-poster-bg@3x.png");
            data.put("studio", studio);

            // 其他通用图片
            Map<String, String> common = new HashMap<>();
            common.put("weitu", baseUrl + "位图.png");
            common.put("zixunjiyu_bg", baseUrl + "咨询寄语bg@3x.png");
            common.put("zixunjingyan_bg", baseUrl + "咨询经验_bg@3x.png");
            common.put("zixunguwen_tanku", baseUrl + "咨询顾问弹框@3x.png");
            common.put("dingwei", baseUrl + "定位@3x.png");
            common.put("daohang", baseUrl + "导航@3x.png");
            common.put("daohang2", baseUrl + "导航2.png");
            common.put("dianhua", baseUrl + "电话@3x.png");
            common.put("juxing", baseUrl + "矩形_2.png");
            common.put("beijingmengban", baseUrl + "背景蒙版@3x.png");
            common.put("shouye", baseUrl + "首页-2@3x.jpg");
            data.put("common", common);

            return ApiResponse.success(data);
        } catch (Exception e) {
            log.error("Error getting image config", e);
            return ApiResponse.error("Failed to get image config");
        }
    }

    @GetMapping("/settings")
    public ApiResponse<Object> getSettings() {
        log.info("Get global settings request");
        try {
            Map<String, Object> data = new HashMap<>();
            Map<String, Object> concatSysAgentSettings = new HashMap<>();

            // 从数据库获取助理二维码设置
            GlobalSettings qrCodeSetting = settingsService.getSettingByKey("assistantQrCode");
            GlobalSettings showAtMpSetting = settingsService.getSettingByKey("showAssistantAtMp");
            GlobalSettings customerServiceQrCode = settingsService.getSettingByKey("customerServiceQrCode");

            String qrCodeUrl = qrCodeSetting != null ? qrCodeSetting.getValue() :
                "https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20211115/351753974260_.pic_hd.jpg";
            String showAtMp = showAtMpSetting != null ? showAtMpSetting.getValue() : "1";
            String csQrCode = customerServiceQrCode != null ? customerServiceQrCode.getValue() :
                "https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20211115/351753974260_.pic_hd.jpg";

            concatSysAgentSettings.put("qrCodeImageUrl", qrCodeUrl);
            concatSysAgentSettings.put("showAtMp", showAtMp);
            data.put("concatSysAgentSettings", concatSysAgentSettings);
            data.put("customerServiceQrCode", csQrCode);

            return ApiResponse.success(data);
        } catch (Exception e) {
            log.error("Error getting global settings", e);
            return ApiResponse.error("Failed to get global settings");
        }
    }

    /**
     * 获取位置信息
     * GET /global/getLocationInfo
     */
    @GetMapping("/getLocationInfo")
    public ApiResponse getLocationInfo(
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude) {
        log.info("Get location info request - lat: {}, lng: {}", latitude, longitude);
        try {
            Map data = new HashMap();
            data.put("city", "上海市");
            data.put("province", "上海");
            data.put("district", "浦东新区");
            data.put("address", "上海市浦东新区");

            return ApiResponse.success(data);
        } catch (Exception e) {
            log.error("Error getting location info", e);
            return ApiResponse.error("Failed to get location info");
        }
    }

    /**
     * 获取反馈列表（后台管理）
     * GET /global/admin/feedback/list
     */
    @GetMapping("/admin/feedback/list")
    public ApiResponse getFeedbackList(@RequestParam(required = false) Integer status) {
        log.info("Get feedback list request, status: {}", status);
        try {
            List<UserFeedback> list = userFeedbackMapper.selectAll(status);
            return ApiResponse.success(list);
        } catch (Exception e) {
            log.error("Error getting feedback list", e);
            return ApiResponse.error("Failed to get feedback list");
        }
    }

    /**
     * 获取反馈详情
     * GET /global/admin/feedback/{id}
     */
    @GetMapping("/admin/feedback/{id}")
    public ApiResponse getFeedbackDetail(@PathVariable Long id) {
        log.info("Get feedback detail request, id: {}", id);
        try {
            UserFeedback feedback = userFeedbackMapper.selectById(id);
            if (feedback != null) {
                return ApiResponse.success(feedback);
            }
            return ApiResponse.error("Feedback not found");
        } catch (Exception e) {
            log.error("Error getting feedback detail", e);
            return ApiResponse.error("Failed to get feedback detail");
        }
    }

    /**
     * 处理反馈
     * POST /global/admin/feedback/handle
     */
    @PostMapping("/admin/feedback/handle")
    public ApiResponse handleFeedback(@RequestBody Map<String, Object> payload) {
        log.info("Handle feedback request: {}", payload);
        try {
            Long id = Long.valueOf(payload.get("id").toString());
            Integer status = Integer.valueOf(payload.get("status").toString());
            String reply = (String) payload.getOrDefault("reply", "");

            int result = userFeedbackMapper.updateStatus(id, status, reply);
            if (result > 0) {
                return ApiResponse.success("处理成功");
            }
            return ApiResponse.error("处理失败");
        } catch (Exception e) {
            log.error("Error handling feedback", e);
            return ApiResponse.error("Failed to handle feedback");
        }
    }

    /**
     * 删除反馈
     * DELETE /global/admin/feedback/{id}
     */
    @DeleteMapping("/admin/feedback/{id}")
    public ApiResponse deleteFeedback(@PathVariable Long id) {
        log.info("Delete feedback request, id: {}", id);
        try {
            int result = userFeedbackMapper.deleteById(id);
            if (result > 0) {
                return ApiResponse.success("删除成功");
            }
            return ApiResponse.error("删除失败");
        } catch (Exception e) {
            log.error("Error deleting feedback", e);
            return ApiResponse.error("Failed to delete feedback");
        }
    }
}
