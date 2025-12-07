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
    private String videoUrl;
    private List<String> imageUrls;
    private List<String> qualifications;
    private Object directions; // JSON结构，可以是复杂对象
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
    private Object training; // JSON数组
    private String special;
    private List<String> school;
    private String address;
    private String faceMsg;
    private String consultMsg;
    private Object consult; // JSON数组
    private String articleList;

    public Counselor() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getGender() { return gender; }
    public void setGender(Integer gender) { this.gender = gender; }

    public String getHeadUrl() { return headUrl; }
    public void setHeadUrl(String headUrl) { this.headUrl = headUrl; }

    public String getHeadUrlSquare() { return headUrlSquare; }
    public void setHeadUrlSquare(String headUrlSquare) { this.headUrlSquare = headUrlSquare; }

    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }

    public List<String> getImageUrls() { return imageUrls; }
    public void setImageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; }

    public List<String> getQualifications() { return qualifications; }
    public void setQualifications(List<String> qualifications) { this.qualifications = qualifications; }

    public Object getDirections() { return directions; }
    public void setDirections(Object directions) { this.directions = directions; }

    public String getIntroduction() { return introduction; }
    public void setIntroduction(String introduction) { this.introduction = introduction; }

    public BigDecimal getConsultPrice() { return consultPrice; }
    public void setConsultPrice(BigDecimal consultPrice) { this.consultPrice = consultPrice; }

    public Integer getServiceType() { return serviceType; }
    public void setServiceType(Integer serviceType) { this.serviceType = serviceType; }

    public Integer getStarNum() { return starNum; }
    public void setStarNum(Integer starNum) { this.starNum = starNum; }

    public List<Integer> getConsultType() { return consultType; }
    public void setConsultType(List<Integer> consultType) { this.consultType = consultType; }

    public Integer getSupportOnlineConsult() { return supportOnlineConsult; }
    public void setSupportOnlineConsult(Integer supportOnlineConsult) { this.supportOnlineConsult = supportOnlineConsult; }

    public Integer getSupportOfflineConsult() { return supportOfflineConsult; }
    public void setSupportOfflineConsult(Integer supportOfflineConsult) { this.supportOfflineConsult = supportOfflineConsult; }

    public Integer getCanConsult() { return canConsult; }
    public void setCanConsult(Integer canConsult) { this.canConsult = canConsult; }

    public Date getExperienceDate() { return experienceDate; }
    public void setExperienceDate(Date experienceDate) { this.experienceDate = experienceDate; }

    public String getExperienceTime() { return experienceTime; }
    public void setExperienceTime(String experienceTime) { this.experienceTime = experienceTime; }

    public String getCityName() { return cityName; }
    public void setCityName(String cityName) { this.cityName = cityName; }

    public Object getTraining() { return training; }
    public void setTraining(Object training) { this.training = training; }

    public String getSpecial() { return special; }
    public void setSpecial(String special) { this.special = special; }

    public List<String> getSchool() { return school; }
    public void setSchool(List<String> school) { this.school = school; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getFaceMsg() { return faceMsg; }
    public void setFaceMsg(String faceMsg) { this.faceMsg = faceMsg; }

    public String getConsultMsg() { return consultMsg; }
    public void setConsultMsg(String consultMsg) { this.consultMsg = consultMsg; }

    public Object getConsult() { return consult; }
    public void setConsult(Object consult) { this.consult = consult; }

    public String getArticleList() { return articleList; }
    public void setArticleList(String articleList) { this.articleList = articleList; }
}
