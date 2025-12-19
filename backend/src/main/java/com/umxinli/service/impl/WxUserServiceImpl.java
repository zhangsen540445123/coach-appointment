package com.umxinli.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.umxinli.dto.WxLoginResponse;
import com.umxinli.entity.User;
import com.umxinli.mapper.UserMapper;
import com.umxinli.service.WxUserService;
import com.umxinli.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class WxUserServiceImpl implements WxUserService {

    private static final Logger log = LoggerFactory.getLogger(WxUserServiceImpl.class);

    @Value("${wx.appid:}")
    private String appid;

    @Value("${wx.appSecret:}")
    private String appSecret;

    @Autowired(required = false)
    private UserMapper userMapper;

    @Autowired
    private JwtUtil jwtUtil;

    private RestTemplate restTemplate = new RestTemplate();

    // 缓存 access_token
    private String accessToken;
    private long accessTokenExpireTime;

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

        // 更新最后登录时间
        updateUserLastLoginTime(user.getId());

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
    public Map decryptPhone(String appid, String code) throws Exception {
        return decryptPhoneAndUpdate(appid, code, null);
    }

    /**
     * 解密手机号并可选更新用户信息
     * @param appid 小程序appid
     * @param code 手机号授权code
     * @param openid 用户openid（可选，如果提供则自动更新用户手机号）
     */
    public Map decryptPhoneAndUpdate(String appid, String code, String openid) throws Exception {
        log.info("开始解密手机号，appid: {}, code: {}, openid: {}", appid, code, openid);

        // 获取 access_token
        String token = getAccessToken(appid);

        // 调用微信接口
        String url = "https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=" + token;

        // 构建 JSON 请求体（手动序列化以确保格式正确）
        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("code", code);
        String jsonBody = mapper.writeValueAsString(requestBody);
        log.info("请求微信API: url={}, body={}", url, jsonBody);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Accept", "application/json");
        HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            log.info("微信手机号解密响应: statusCode={}, body={}", response.getStatusCode(), response.getBody());

            Map<String, Object> result = mapper.readValue(response.getBody(), Map.class);

            Integer errcode = (Integer) result.get("errcode");
            if (errcode != null && errcode == 0) {
                Map<String, Object> phoneInfo = (Map<String, Object>) result.get("phone_info");

                Map<String, Object> phoneResult = new HashMap<>();
                phoneResult.put("phoneNumber", phoneInfo.get("phoneNumber"));
                phoneResult.put("purePhoneNumber", phoneInfo.get("purePhoneNumber"));
                phoneResult.put("countryCode", phoneInfo.get("countryCode"));

                log.info("手机号解密成功: {}", phoneResult.get("phoneNumber"));

                // 如果提供了openid，自动更新用户手机号
                if (openid != null && !openid.isEmpty()) {
                    updateUserPhone(openid, (String) phoneInfo.get("phoneNumber"));
                }

                return phoneResult;
            } else {
                String errmsg = (String) result.get("errmsg");
                log.error("微信手机号解密失败: errcode={}, errmsg={}", errcode, errmsg);
                throw new Exception("微信手机号解密失败: " + errmsg);
            }
        } catch (org.springframework.web.client.HttpClientErrorException e) {
            // 处理 HTTP 错误（如 412 Precondition Failed）
            log.error("微信API HTTP错误: status={}, body={}", e.getStatusCode(), e.getResponseBodyAsString());
            if (e.getStatusCode().value() == 412) {
                throw new Exception("获取手机号权限不足，请确认：1.小程序已完成认证 2.已开通获取手机号能力 3.非个人主体小程序");
            }
            throw new Exception("微信API调用失败: " + e.getMessage());
        } catch (Exception e) {
            log.error("解密手机号失败", e);
            throw e;
        }
    }

    /**
     * 更新用户手机号
     */
    private void updateUserPhone(String openid, String phone) {
        try {
            if (userMapper != null) {
                User user = userMapper.findByOpenid(openid);
                if (user != null) {
                    user.setPhone(phone);
                    userMapper.updateById(user);
                    log.info("用户手机号更新成功: openid={}, phone={}", openid, phone);
                } else {
                    log.warn("用户不存在，无法更新手机号: openid={}", openid);
                }
            }
        } catch (Exception e) {
            log.error("更新用户手机号失败: openid={}", openid, e);
        }
    }

    @Override
    public Map decryptPhone(String appid, String encryptedData, String iv, String sessionKey) throws Exception {
        log.info("Decrypting phone number (old method)");

        // 保留旧方法签名以兼容现有代码
        // 实际应该使用新的 decryptPhone(appid, code) 方法
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

        // 更新最后登录时间
        updateUserLastLoginTime(user.getId());

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

    /**
     * 调用微信 jscode2session 接口
     */
    private Map<String, Object> callWxApi(String appid, String code) throws Exception {
        // 检测是否是微信开发者工具的模拟 code（仅用于开发环境调试）
        if (isMockCode(code)) {
            log.warn("检测到模拟 code: {}，返回模拟的 openid（仅用于开发环境调试）", code);
            return createMockWxApiResponse();
        }

        String url = String.format(
            "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code",
            appid, appSecret, code
        );

        try {
            log.info("调用微信接口: appid={}, code={}", appid, code);
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            String body = response.getBody();
            log.info("微信接口响应: {}", body);

            // 解析 JSON
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> result = mapper.readValue(body, Map.class);

            // 检查是否有错误
            if (result.containsKey("errcode")) {
                Integer errcode = (Integer) result.get("errcode");
                if (errcode != 0) {
                    String errmsg = (String) result.get("errmsg");
                    log.error("微信接口错误: errcode={}, errmsg={}", errcode, errmsg);
                    throw new Exception("微信接口错误: " + errmsg);
                }
            }

            return result;
        } catch (Exception e) {
            log.error("调用微信接口失败", e);
            throw e;
        }
    }

    /**
     * 检测是否是微信开发者工具的模拟 code
     * 常见的模拟 code 格式：
     * - "the code is a mock one"
     * - 以 "mock" 开头或包含 "mock" 的字符串
     */
    private boolean isMockCode(String code) {
        if (code == null || code.isEmpty()) {
            return false;
        }
        String lowerCode = code.toLowerCase();
        return lowerCode.contains("mock") ||
               lowerCode.contains("the code is") ||
               lowerCode.equals("test") ||
               lowerCode.startsWith("test_");
    }

    /**
     * 创建模拟的微信 API 响应（仅用于开发环境调试）
     * 注意：生产环境应该禁用此功能
     */
    private Map<String, Object> createMockWxApiResponse() {
        Map<String, Object> result = new HashMap<>();
        // 生成一个稳定的模拟 openid（基于时间戳的后4位，这样每天不同但同一天内稳定）
        String mockOpenId = "mock_openid_dev_" + (System.currentTimeMillis() / 86400000);
        result.put("openid", mockOpenId);
        result.put("session_key", "mock_session_key_" + System.currentTimeMillis());
        result.put("errcode", 0);
        log.warn("⚠️ 返回模拟 openid: {} - 请使用真机调试获取真实的 openid", mockOpenId);
        return result;
    }

    /**
     * 获取微信 access_token（用于调用其他微信接口）
     */
    private String getAccessToken(String appid) throws Exception {
        // 检查 token 是否过期
        if (accessToken != null && System.currentTimeMillis() < accessTokenExpireTime) {
            return accessToken;
        }

        String url = String.format(
            "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s",
            appid, appSecret
        );

        try {
            log.info("获取 access_token: appid={}", appid);
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> result = mapper.readValue(response.getBody(), Map.class);

            if (result.containsKey("access_token")) {
                accessToken = (String) result.get("access_token");
                Integer expiresIn = (Integer) result.get("expires_in");
                // 提前5分钟过期
                accessTokenExpireTime = System.currentTimeMillis() + (expiresIn - 300) * 1000;
                log.info("获取 access_token 成功，有效期: {} 秒", expiresIn);
                return accessToken;
            } else {
                throw new Exception("获取 access_token 失败");
            }
        } catch (Exception e) {
            log.error("获取 access_token 失败", e);
            throw e;
        }
    }

    private User findOrCreateUserByOpenId(String openId) {
        // 查询用户
        User user = null;
        if (userMapper != null) {
            user = userMapper.findByOpenid(openId);
        }

        if (user == null) {
            // 创建新用户
            user = new User();
            user.setOpenid(openId);
            user.setId(System.currentTimeMillis()); // 简单生成ID，实际应该用数据库自增

            if (userMapper != null) {
                userMapper.insert(user);
                log.info("创建新用户: openid={}", openId);
            } else {
                log.warn("UserMapper 未注入，使用模拟用户数据");
            }
        } else {
            log.info("用户已存在: openid={}", openId);
        }

        return user;
    }

    private User findOrCreateUserByPhone(String phone, String openId) {
        User user = null;

        if (userMapper != null) {
            // 先通过openid查找用户
            user = userMapper.findByOpenid(openId);

            if (user == null) {
                // 再通过手机号查找用户
                user = userMapper.selectByPhone(phone);
            }
        }

        if (user == null) {
            // 创建新用户
            user = new User();
            user.setId(System.currentTimeMillis());
            user.setPhone(phone);
            user.setOpenid(openId);

            if (userMapper != null) {
                userMapper.insert(user);
                log.info("创建新用户: phone={}, openid={}", phone, openId);
            }
        } else {
            // 更新现有用户的手机号和openid
            boolean needUpdate = false;
            if (user.getPhone() == null || !user.getPhone().equals(phone)) {
                user.setPhone(phone);
                needUpdate = true;
            }
            if (user.getOpenid() == null || !user.getOpenid().equals(openId)) {
                user.setOpenid(openId);
                needUpdate = true;
            }

            if (needUpdate && userMapper != null) {
                userMapper.updateById(user);
                log.info("更新用户信息: phone={}, openid={}", phone, openId);
            }
        }

        return user;
    }

    /**
     * 更新用户最后登录时间
     */
    private void updateUserLastLoginTime(Long userId) {
        if (userMapper != null && userId != null) {
            try {
                userMapper.updateLastLogin(userId, null); // IP 在小程序端不易获取，设为null
                log.info("更新用户最后登录时间成功: userId={}", userId);
            } catch (Exception e) {
                log.warn("更新用户最后登录时间失败: userId={}, error={}", userId, e.getMessage());
            }
        }
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
        
        log.info("构建登录响应成功: userId={}, openId={}", user.getId(), openId);
        return response;
    }

    @Override
    public User updateUserInfo(String openid, String nickName, String avatarUrl) throws Exception {
        User user = null;
        if (userMapper != null) {
            user = userMapper.findByOpenid(openid);
        }

        if (user == null) {
            throw new Exception("用户不存在");
        }

        user.setName(nickName);
        user.setAvatar(avatarUrl);

        if (userMapper != null) {
            userMapper.updateById(user);
            log.info("更新用户信息成功: openid={}, nickName={}", openid, nickName);
        } else {
            log.warn("UserMapper 未注入，无法更新用户信息");
        }

        return user;
    }
}

