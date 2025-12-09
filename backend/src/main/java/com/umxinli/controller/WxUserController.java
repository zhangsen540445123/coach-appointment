package com.umxinli.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.dto.WxLoginResponse;
import com.umxinli.entity.User;
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
     * 解密手机号（新版本，使用 code）
     * GET /wx/user/{appid}/phone?code=xxx&openid=xxx
     * 如果提供 openid 参数，解密成功后会自动更新用户手机号
     */
    @GetMapping("/{appid}/phone")
    public ApiResponse<Map<String, String>> decryptPhone(
            @PathVariable String appid,
            @RequestParam(required = false) String code,
            @RequestParam(required = false) String openid,
            @RequestParam(required = false) String encryptedData,
            @RequestParam(required = false) String iv,
            @RequestParam(required = false) String sessionKey) {
        log.info("Decrypt phone request - appid: {}, code: {}, openid: {}", appid, code, openid);
        try {
            Map<String, String> phoneInfo;
            if (code != null && !code.isEmpty()) {
                // 使用新版本接口（推荐）
                // 如果提供了openid，会自动更新用户手机号
                if (wxUserService instanceof com.umxinli.service.impl.WxUserServiceImpl) {
                    phoneInfo = ((com.umxinli.service.impl.WxUserServiceImpl) wxUserService)
                            .decryptPhoneAndUpdate(appid, code, openid);
                } else {
                    phoneInfo = wxUserService.decryptPhone(appid, code);
                }
            } else {
                // 使用旧版本接口（兼容）
                phoneInfo = wxUserService.decryptPhone(appid, encryptedData, iv, sessionKey);
            }
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

    /**
     * 更新用户信息（头像、昵称）
     * POST /wx/user/{appid}/updateUserInfo
     */
    @PostMapping("/{appid}/updateUserInfo")
    public ApiResponse<User> updateUserInfo(
            @PathVariable String appid,
            @RequestBody Map<String, String> userInfo) {
        log.info("Update user info request - appid: {}", appid);
        try {
            String openid = userInfo.get("openid");
            String nickName = userInfo.get("nickName");
            String avatarUrl = userInfo.get("avatarUrl");

            User user = wxUserService.updateUserInfo(openid, nickName, avatarUrl);
            return ApiResponse.success(user);
        } catch (Exception e) {
            log.error("Update user info failed", e);
            return ApiResponse.error(500, "更新用户信息失败");
        }
    }
}

