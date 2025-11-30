package com.umxinli.entity;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class Counselor extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String name;
    private Integer gender;
    private String headUrl;
    private String headUrlSquare;
    private List<String> qualifications;
    private List<String> directions;
    private String introduction;
    private BigDecimal consultPrice;
    private Integer serviceType;
    private Integer starNum;
    private List<Integer> consultType;
    private Integer supportOnlineConsult;
    private Integer supportOfflineConsult;
    private Integer canConsult;
    private Date experienceDate;
    private String experienceTime;
    private String cityName;

    public Counselor() {}

    public Counselor(Long id, String name, Integer gender, String headUrl, String headUrlSquare, List<String> qualifications, List<String> directions, String introduction, BigDecimal consultPrice, Integer serviceType, Integer starNum, List<Integer> consultType, Integer supportOnlineConsult, Integer supportOfflineConsult, Integer canConsult, Date experienceDate, String experienceTime, String cityName) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.headUrl = headUrl;
        this.headUrlSquare = headUrlSquare;
        this.qualifications = qualifications;
        this.directions = directions;
        this.introduction = introduction;
        this.consultPrice = consultPrice;
        this.serviceType = serviceType;
        this.starNum = starNum;
        this.consultType = consultType;
        this.supportOnlineConsult = supportOnlineConsult;
        this.supportOfflineConsult = supportOfflineConsult;
        this.canConsult = canConsult;
        this.experienceDate = experienceDate;
        this.experienceTime = experienceTime;
        this.cityName = cityName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public String getHeadUrl() {
        return headUrl;
    }

    public void setHeadUrl(String headUrl) {
        this.headUrl = headUrl;
    }

    public String getHeadUrlSquare() {
        return headUrlSquare;
    }

    public void setHeadUrlSquare(String headUrlSquare) {
        this.headUrlSquare = headUrlSquare;
    }

    public List<String> getQualifications() {
        return qualifications;
    }

    public void setQualifications(List<String> qualifications) {
        this.qualifications = qualifications;
    }

    public List<String> getDirections() {
        return directions;
    }

    public void setDirections(List<String> directions) {
        this.directions = directions;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public BigDecimal getConsultPrice() {
        return consultPrice;
    }

    public void setConsultPrice(BigDecimal consultPrice) {
        this.consultPrice = consultPrice;
    }

    public Integer getServiceType() {
        return serviceType;
    }

    public void setServiceType(Integer serviceType) {
        this.serviceType = serviceType;
    }

    public Integer getStarNum() {
        return starNum;
    }

    public void setStarNum(Integer starNum) {
        this.starNum = starNum;
    }

    public List<Integer> getConsultType() {
        return consultType;
    }

    public void setConsultType(List<Integer> consultType) {
        this.consultType = consultType;
    }

    public Integer getSupportOnlineConsult() {
        return supportOnlineConsult;
    }

    public void setSupportOnlineConsult(Integer supportOnlineConsult) {
        this.supportOnlineConsult = supportOnlineConsult;
    }

    public Integer getSupportOfflineConsult() {
        return supportOfflineConsult;
    }

    public void setSupportOfflineConsult(Integer supportOfflineConsult) {
        this.supportOfflineConsult = supportOfflineConsult;
    }

    public Integer getCanConsult() {
        return canConsult;
    }

    public void setCanConsult(Integer canConsult) {
        this.canConsult = canConsult;
    }

    public Date getExperienceDate() {
        return experienceDate;
    }

    public void setExperienceDate(Date experienceDate) {
        this.experienceDate = experienceDate;
    }

    public String getExperienceTime() {
        return experienceTime;
    }

    public void setExperienceTime(String experienceTime) {
        this.experienceTime = experienceTime;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }
}
