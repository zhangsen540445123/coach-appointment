package com.umxinli.dto;

public class WxLoginResponse {
    private String userId;
    private String nickName;
    private String headUrl;
    private String mobile;
    private String mobileArea;
    private String inviteId;
    private String lastLoginTime;
    private String lastLoginIp;
    private String openId;
    private String unionId;
    private Integer wechatNoticeOn;
    private Integer smsNoticeOn;
    private String createTime;
    private String firstPayTime;
    private String lastOrderTime;
    private String noticeOpenId;
    private Integer deleted;
    private String authorization;

    public WxLoginResponse() {}

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getNickName() { return nickName; }
    public void setNickName(String nickName) { this.nickName = nickName; }
    public String getHeadUrl() { return headUrl; }
    public void setHeadUrl(String headUrl) { this.headUrl = headUrl; }
    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }
    public String getMobileArea() { return mobileArea; }
    public void setMobileArea(String mobileArea) { this.mobileArea = mobileArea; }
    public String getInviteId() { return inviteId; }
    public void setInviteId(String inviteId) { this.inviteId = inviteId; }
    public String getLastLoginTime() { return lastLoginTime; }
    public void setLastLoginTime(String lastLoginTime) { this.lastLoginTime = lastLoginTime; }
    public String getLastLoginIp() { return lastLoginIp; }
    public void setLastLoginIp(String lastLoginIp) { this.lastLoginIp = lastLoginIp; }
    public String getOpenId() { return openId; }
    public void setOpenId(String openId) { this.openId = openId; }
    public String getUnionId() { return unionId; }
    public void setUnionId(String unionId) { this.unionId = unionId; }
    public Integer getWechatNoticeOn() { return wechatNoticeOn; }
    public void setWechatNoticeOn(Integer wechatNoticeOn) { this.wechatNoticeOn = wechatNoticeOn; }
    public Integer getSmsNoticeOn() { return smsNoticeOn; }
    public void setSmsNoticeOn(Integer smsNoticeOn) { this.smsNoticeOn = smsNoticeOn; }
    public String getCreateTime() { return createTime; }
    public void setCreateTime(String createTime) { this.createTime = createTime; }
    public String getFirstPayTime() { return firstPayTime; }
    public void setFirstPayTime(String firstPayTime) { this.firstPayTime = firstPayTime; }
    public String getLastOrderTime() { return lastOrderTime; }
    public void setLastOrderTime(String lastOrderTime) { this.lastOrderTime = lastOrderTime; }
    public String getNoticeOpenId() { return noticeOpenId; }
    public void setNoticeOpenId(String noticeOpenId) { this.noticeOpenId = noticeOpenId; }
    public Integer getDeleted() { return deleted; }
    public void setDeleted(Integer deleted) { this.deleted = deleted; }
    public String getAuthorization() { return authorization; }
    public void setAuthorization(String authorization) { this.authorization = authorization; }
}

