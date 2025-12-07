package com.umxinli.entity;

/**
 * 客户信息实体类
 * 字段与小程序前端 formVisitor 对象保持一致
 */
public class VisitorInfo extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Long id;
    private Long userId;

    // 客户信息（必填）
    private String name;              // 真实姓名
    private Integer age;              // 年龄
    private Integer sex;              // 性别 0-女 1-男

    // 其他信息（非必填）
    private String otherCity;         // 现居城市
    private String otherCareer;       // 职业
    private String otherMarrage;      // 情感状态
    private String otherChildren;     // 有无子女
    private String otherIncome;       // 教练目标
    private Integer otherUm;          // 是否是只管去做成长会会员 0否 1是
    private Integer consultOther;     // 是否有过教练对话 0否 1是
    private Integer realizeChannel;   // 从什么渠道了解我们 1-只管去做成长会 2-公众号 3-悦行活动 4-朋友推荐 5-其他

    public VisitorInfo() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public Integer getSex() { return sex; }
    public void setSex(Integer sex) { this.sex = sex; }

    public String getOtherCity() { return otherCity; }
    public void setOtherCity(String otherCity) { this.otherCity = otherCity; }

    public String getOtherCareer() { return otherCareer; }
    public void setOtherCareer(String otherCareer) { this.otherCareer = otherCareer; }

    public String getOtherMarrage() { return otherMarrage; }
    public void setOtherMarrage(String otherMarrage) { this.otherMarrage = otherMarrage; }

    public String getOtherChildren() { return otherChildren; }
    public void setOtherChildren(String otherChildren) { this.otherChildren = otherChildren; }

    public String getOtherIncome() { return otherIncome; }
    public void setOtherIncome(String otherIncome) { this.otherIncome = otherIncome; }

    public Integer getOtherUm() { return otherUm; }
    public void setOtherUm(Integer otherUm) { this.otherUm = otherUm; }

    public Integer getConsultOther() { return consultOther; }
    public void setConsultOther(Integer consultOther) { this.consultOther = consultOther; }

    public Integer getRealizeChannel() { return realizeChannel; }
    public void setRealizeChannel(Integer realizeChannel) { this.realizeChannel = realizeChannel; }
}
