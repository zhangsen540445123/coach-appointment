package com.umxinli.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.dto.WxLoginResponse;
import com.umxinli.service.WxUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequestMapping("/wx/user")
@CrossOrigin
public class WxUserController {

    private static final Logger log = LoggerFactory.getLogger(WxUserController.class);

    @Autowired
    private WxUserService wxUserService;

    /**
     * 微信登录
     * GET /wx/user/{appid}/login?code=xxx
     */
    @GetMapping("/{appid}/login")
    public ApiResponse<WxLoginResponse> login(
            @PathVariable String appid,
            @RequestParam String code,
            HttpServletResponse response) {
        log.info("WeChat login request - appid: {}, code: {}", appid, code);
        try {
            WxLoginResponse loginResponse = wxUserService.login(appid, code);
            response.setHeader("Authorization", loginResponse.getAuthorization());
            return ApiResponse.success(loginResponse);
        } catch (Exception e) {
            log.error("WeChat login failed", e);
            return ApiResponse.error(500, "登录失败，请重试");
        }
    }

    /**
     * 获取微信会话密钥
     * GET /wx/user/{appid}/getSessionKey?code=xxx
     */
    @GetMapping("/{appid}/getSessionKey")
    public ApiResponse<Map<String, String>> getSessionKey(
            @PathVariable String appid,
            @RequestParam String code) {
        log.info("Get session key request - appid: {}, code: {}", appid, code);
        try {
            Map<String, String> sessionInfo = wxUserService.getSessionKey(appid, code);
            return ApiResponse.success(sessionInfo);
        } catch (Exception e) {
            log.error("Get session key failed", e);
            return ApiResponse.error(500, "获取微信会话信息失败");
        }
    }

    /**
     * 解密手机号
     * GET /wx/user/{appid}/phone
     */
    @GetMapping("/{appid}/phone")
    public ApiResponse<Map<String, String>> decryptPhone(
            @PathVariable String appid,
            @RequestParam String encryptedData,
            @RequestParam String iv,
            @RequestParam String sessionKey) {
        log.info("Decrypt phone request - appid: {}", appid);
        try {
            Map<String, String> phoneInfo = wxUserService.decryptPhone(appid, encryptedData, iv, sessionKey);
            return ApiResponse.success(phoneInfo);
        } catch (Exception e) {
            log.error("Decrypt phone failed", e);
            return ApiResponse.error(500, "获取手机号码失败");
        }
    }

    /**
     * 通过手机号登录
     * GET /wx/user/{appid}/loginByPhone
     */
    @GetMapping("/{appid}/loginByPhone")
    public ApiResponse<WxLoginResponse> loginByPhone(
            @PathVariable String appid,
            @RequestParam String code,
            @RequestParam String mobile,
            @RequestParam(required = false, defaultValue = "86") String mobileArea,
            HttpServletResponse response) {
        log.info("Login by phone request - appid: {}, mobile: {}", appid, mobile);
        try {
            WxLoginResponse loginResponse = wxUserService.loginByPhone(appid, code, mobile, mobileArea);
            response.setHeader("Authorization", loginResponse.getAuthorization());
            return ApiResponse.success(loginResponse);
        } catch (Exception e) {
            log.error("Login by phone failed", e);
            return ApiResponse.error(500, "登录失败");
        }
    }

    /**
     * 获取小程序二维码
     * GET /wx/user/{appid}/getWxQrCode
     */
    @GetMapping("/{appid}/getWxQrCode")
    public ApiResponse<Map<String, String>> getWxQrCode(
            @PathVariable String appid,
            @RequestParam String scene,
            @RequestParam String page,
            @RequestParam(required = false, defaultValue = "trial") String envVersion,
            @RequestParam(required = false, defaultValue = "430") Integer width) {
        log.info("Get WX QR code request - appid: {}, scene: {}, page: {}", appid, scene, page);
        try {
            Map<String, String> qrCodeInfo = wxUserService.getWxQrCode(appid, scene, page, envVersion, width);
            return ApiResponse.success(qrCodeInfo);
        } catch (Exception e) {
            log.error("Get WX QR code failed", e);
            return ApiResponse.error(500, "获取小程序二维码失败");
        }
    }
}

