package com.umxinli.entity;

import java.util.Date;

/**
 * 成长会会员实体类
 */
public class GrowthMember extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String xiaoeNickname;
    private String latestPhone;
    private Integer courseCompletionCount;
    private Date joinDate;
    private Date expireDate;
    private String joinType;
    private String status;
    private String xiaoeUserId;
    private String xiaoeTags;
    private Date lastSyncTime;
    private String realName;
    private Date birthday;
    private String gender;
    private String city;
    private String phoneNumber;
    private String email;
    private String sourceChannel;
    private Integer age;
    private String address;
    private String wechatName;
    private String wechatId;
    private Date createTime;
    private Date updateTime;

    public GrowthMember() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getXiaoeNickname() { return xiaoeNickname; }
    public void setXiaoeNickname(String xiaoeNickname) { this.xiaoeNickname = xiaoeNickname; }

    public String getLatestPhone() { return latestPhone; }
    public void setLatestPhone(String latestPhone) { this.latestPhone = latestPhone; }

    public Integer getCourseCompletionCount() { return courseCompletionCount; }
    public void setCourseCompletionCount(Integer courseCompletionCount) { this.courseCompletionCount = courseCompletionCount; }

    public Date getJoinDate() { return joinDate; }
    public void setJoinDate(Date joinDate) { this.joinDate = joinDate; }

    public Date getExpireDate() { return expireDate; }
    public void setExpireDate(Date expireDate) { this.expireDate = expireDate; }

    public String getJoinType() { return joinType; }
    public void setJoinType(String joinType) { this.joinType = joinType; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getXiaoeUserId() { return xiaoeUserId; }
    public void setXiaoeUserId(String xiaoeUserId) { this.xiaoeUserId = xiaoeUserId; }

    public String getXiaoeTags() { return xiaoeTags; }
    public void setXiaoeTags(String xiaoeTags) { this.xiaoeTags = xiaoeTags; }

    public Date getLastSyncTime() { return lastSyncTime; }
    public void setLastSyncTime(Date lastSyncTime) { this.lastSyncTime = lastSyncTime; }

    public String getRealName() { return realName; }
    public void setRealName(String realName) { this.realName = realName; }

    public Date getBirthday() { return birthday; }
    public void setBirthday(Date birthday) { this.birthday = birthday; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSourceChannel() { return sourceChannel; }
    public void setSourceChannel(String sourceChannel) { this.sourceChannel = sourceChannel; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getWechatName() { return wechatName; }
    public void setWechatName(String wechatName) { this.wechatName = wechatName; }

    public String getWechatId() { return wechatId; }
    public void setWechatId(String wechatId) { this.wechatId = wechatId; }

    public Date getCreateTime() { return createTime; }
    public void setCreateTime(Date createTime) { this.createTime = createTime; }

    public Date getUpdateTime() { return updateTime; }
    public void setUpdateTime(Date updateTime) { this.updateTime = updateTime; }
}

