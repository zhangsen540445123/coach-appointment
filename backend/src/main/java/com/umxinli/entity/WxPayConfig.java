package com.umxinli.entity;

import java.util.Date;

/**
 * 微信支付配置实体
 */
public class WxPayConfig extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String appId;           // 微信应用ID
    private String mchId;           // 商户号
    private String apiKey;          // API密钥
    private String apiV3Key;        // API V3密钥
    private String certPath;        // 证书路径
    private String privateKeyPath;  // 私钥路径
    private String notifyUrl;       // 支付回调地址
    private Integer status;         // 状态 0-禁用 1-启用
    private Date createdAt;
    private Date updatedAt;

    public WxPayConfig() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAppId() { return appId; }
    public void setAppId(String appId) { this.appId = appId; }

    public String getMchId() { return mchId; }
    public void setMchId(String mchId) { this.mchId = mchId; }

    public String getApiKey() { return apiKey; }
    public void setApiKey(String apiKey) { this.apiKey = apiKey; }

    public String getApiV3Key() { return apiV3Key; }
    public void setApiV3Key(String apiV3Key) { this.apiV3Key = apiV3Key; }

    public String getCertPath() { return certPath; }
    public void setCertPath(String certPath) { this.certPath = certPath; }

    public String getPrivateKeyPath() { return privateKeyPath; }
    public void setPrivateKeyPath(String privateKeyPath) { this.privateKeyPath = privateKeyPath; }

    public String getNotifyUrl() { return notifyUrl; }
    public void setNotifyUrl(String notifyUrl) { this.notifyUrl = notifyUrl; }

    public Integer getStatus() { return status; }
    public void setStatus(Integer status) { this.status = status; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }
}

