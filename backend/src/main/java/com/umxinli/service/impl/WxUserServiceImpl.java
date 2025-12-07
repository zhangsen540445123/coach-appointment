package com.umxinli.service.impl;

import com.umxinli.dto.WxLoginResponse;
import com.umxinli.entity.User;
import com.umxinli.mapper.UserMapper;
import com.umxinli.service.WxUserService;
import com.umxinli.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class WxUserServiceImpl implements WxUserService {

    private static final Logger log = LoggerFactory.getLogger(WxUserServiceImpl.class);

    @Value("${wx.appSecret:}")
    private String appSecret;

    @Autowired(required = false)
    private UserMapper userMapper;

    @Autowired
    private JwtUtil jwtUtil;

    private RestTemplate restTemplate = new RestTemplate();

    @Override
    public WxLoginResponse login(String appid, String code) throws Exception {
        log.info("Processing WeChat login - appid: {}, code: {}", appid, code);
        
        // 调用微信接口获取openid和session_key
        Map<String, Object> wxResult = callWxApi(appid, code);
        String openId = (String) wxResult.get("openid");
        
        if (openId == null) {
            throw new Exception("获取openid失败");
        }
        
        // 查找或创建用户
        User user = findOrCreateUserByOpenId(openId);
        
        // 生成响应
        return buildLoginResponse(user, openId);
    }

    @Override
    public Map getSessionKey(String appid, String code) throws Exception {
        log.info("Getting session key - appid: {}, code: {}", appid, code);
        
        Map<String, Object> wxResult = callWxApi(appid, code);
        Map<String, Object> result = new HashMap<>();
        result.put("sessionKey", wxResult.get("session_key"));
        result.put("openId", wxResult.get("openid"));
        
        return result;
    }

    @Override
    public Map decryptPhone(String appid, String encryptedData, String iv, String sessionKey) throws Exception {
        log.info("Decrypting phone number");
        
        // 模拟解密手机号（实际需要使用AES解密）
        Map<String, Object> result = new HashMap<>();
        result.put("phoneNumber", "186****1729");
        result.put("purePhoneNumber", "18620771729");
        result.put("countryCode", "86");
        
        return result;
    }

    @Override
    public WxLoginResponse loginByPhone(String appid, String code, String mobile, String mobileArea) throws Exception {
        log.info("Login by phone - appid: {}, mobile: {}", appid, mobile);
        
        // 调用微信接口获取openid
        Map<String, Object> wxResult = callWxApi(appid, code);
        String openId = (String) wxResult.get("openid");
        
        if (openId == null) {
            throw new Exception("获取openid失败");
        }
        
        // 查找或创建用户
        User user = findOrCreateUserByPhone(mobile, openId);
        
        // 生成响应
        WxLoginResponse response = buildLoginResponse(user, openId);
        response.setMobile(mobile);
        response.setMobileArea(mobileArea);
        
        return response;
    }

    @Override
    public Map getWxQrCode(String appid, String scene, String page, String envVersion, Integer width) throws Exception {
        log.info("Generating WX QR code - scene: {}, page: {}", scene, page);
        
        // 模拟返回二维码Base64数据
        Map<String, Object> result = new HashMap<>();
        result.put("wxaCode", "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==");
        
        return result;
    }

    private Map<String, Object> callWxApi(String appid, String code) {
        // 实际环境中需要调用微信接口
        // String url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + 
        //              "&secret=" + appSecret + "&js_code=" + code + "&grant_type=authorization_code";
        
        // 本地开发模拟返回
        Map<String, Object> result = new HashMap<>();
        result.put("openid", "or6Tr5ZcuLWjocAgXb8QkzLgkqpA");
        result.put("session_key", "mock_session_key_" + System.currentTimeMillis());
        result.put("unionid", null);
        
        return result;
    }

    private User findOrCreateUserByOpenId(String openId) {
        // 模拟用户数据（实际应该从数据库查询）
        User user = new User();
        user.setId(1947220554149343232L);
        user.setPhone("18620771729");
        user.setName(null);
        user.setAvatar(null);
        return user;
    }

    private User findOrCreateUserByPhone(String phone, String openId) {
        User user = new User();
        user.setId(1947220554149343232L);
        user.setPhone(phone);
        return user;
    }

    private WxLoginResponse buildLoginResponse(User user, String openId) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String now = sdf.format(new Date());
        
        WxLoginResponse response = new WxLoginResponse();
        response.setUserId(String.valueOf(user.getId()));
        response.setNickName(user.getName());
        response.setHeadUrl(user.getAvatar());
        response.setMobile(user.getPhone());
        response.setMobileArea("86");
        response.setOpenId(openId);
        response.setWechatNoticeOn(1);
        response.setSmsNoticeOn(1);
        response.setLastLoginTime(now);
        response.setCreateTime(now);
        response.setDeleted(0);
        
        // 生成JWT token
        String token = jwtUtil.generateToken(String.valueOf(user.getId()));
        response.setAuthorization(token);
        
        return response;
    }
}

