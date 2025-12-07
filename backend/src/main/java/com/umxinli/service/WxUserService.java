package com.umxinli.service;

import com.umxinli.dto.WxLoginResponse;
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
     * 解密手机号
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
}

