package com.umxinli.service;

import com.umxinli.dto.WxLoginResponse;
import com.umxinli.entity.User;
import java.util.Map;

public interface WxUserService {

    /**
     * 微信登录
     */
    WxLoginResponse login(String appid, String code) throws Exception;

    /**
     * 获取微信会话密钥
     */
    Map getSessionKey(String appid, String code) throws Exception;

    /**
     * 解密手机号（新版本，使用 code）
     */
    Map decryptPhone(String appid, String code) throws Exception;

    /**
     * 解密手机号（旧版本，保留兼容）
     */
    Map decryptPhone(String appid, String encryptedData, String iv, String sessionKey) throws Exception;

    /**
     * 通过手机号登录
     */
    WxLoginResponse loginByPhone(String appid, String code, String mobile, String mobileArea) throws Exception;

    /**
     * 获取小程序二维码
     */
    Map getWxQrCode(String appid, String scene, String page, String envVersion, Integer width) throws Exception;

    /**
     * 更新用户信息（头像、昵称）
     */
    User updateUserInfo(String openid, String nickName, String avatarUrl) throws Exception;
}

