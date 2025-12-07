package com.umxinli.dto;

import java.math.BigDecimal;
import java.util.List;

public class CounselorFilterResponse {
    private List<CounselorInfo> list;
    private Integer total;
    private Integer pages;
    private NotifyDialogInfo notify_dialog_info;

    public CounselorFilterResponse() {}

    public CounselorFilterResponse(List<CounselorInfo> list, Integer pages, NotifyDialogInfo notify_dialog_info) {
        this.list = list;
        this.pages = pages;
        this.notify_dialog_info = notify_dialog_info;
    }

    public List<CounselorInfo> getList() {
        return list;
    }

    public void setList(List<CounselorInfo> list) {
        this.list = list;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Integer getPages() {
        return pages;
    }

    public void setPages(Integer pages) {
        this.pages = pages;
    }

    public NotifyDialogInfo getNotify_dialog_info() {
        return notify_dialog_info;
    }

    public void setNotify_dialog_info(NotifyDialogInfo notify_dialog_info) {
        this.notify_dialog_info = notify_dialog_info;
    }

    public static class CounselorInfo {
        private Long counselorId;
        private String name;
        private String headUrl;
        private String headUrlSquare;
        private List<String> label;
        private List<String> qualifications;
        private String cityName;
        private Object directions; // 支持复杂JSON结构
        private String introduction;
        private BigDecimal consultPrice;
        private Integer serviceType;
        private Integer starNum;
        private Integer sortIndex;
        private Integer sortPrice;
        private Integer sortDate;
        private List<Integer> consultType;
        private Integer supportOnlineConsult;
        private Integer supportOfflineConsult;
        private Integer canConsult;
        private String avatarLabel;
        private Integer sysSort;
        private Integer userSort;
        private ExperienceInfo experience;
        private List<String> consultStudioList;

        public CounselorInfo() {}

        public CounselorInfo(Long counselorId, String name, String headUrl, String headUrlSquare, List<String> label, List<String> qualifications, String cityName, Object directions, String introduction, BigDecimal consultPrice, Integer serviceType, Integer starNum, Integer sortIndex, Integer sortPrice, Integer sortDate, List<Integer> consultType, Integer supportOnlineConsult, Integer supportOfflineConsult, Integer canConsult, String avatarLabel, Integer sysSort, Integer userSort, ExperienceInfo experience, List<String> consultStudioList) {
            this.counselorId = counselorId;
            this.name = name;
            this.headUrl = headUrl;
            this.headUrlSquare = headUrlSquare;
            this.label = label;
            this.qualifications = qualifications;
            this.cityName = cityName;
            this.directions = directions;
            this.introduction = introduction;
            this.consultPrice = consultPrice;
            this.serviceType = serviceType;
            this.starNum = starNum;
            this.sortIndex = sortIndex;
            this.sortPrice = sortPrice;
            this.sortDate = sortDate;
            this.consultType = consultType;
            this.supportOnlineConsult = supportOnlineConsult;
            this.supportOfflineConsult = supportOfflineConsult;
            this.canConsult = canConsult;
            this.avatarLabel = avatarLabel;
            this.sysSort = sysSort;
            this.userSort = userSort;
            this.experience = experience;
            this.consultStudioList = consultStudioList;
        }

        public Long getCounselorId() { return counselorId; }
        public void setCounselorId(Long counselorId) { this.counselorId = counselorId; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getHeadUrl() { return headUrl; }
        public void setHeadUrl(String headUrl) { this.headUrl = headUrl; }
        public String getHeadUrlSquare() { return headUrlSquare; }
        public void setHeadUrlSquare(String headUrlSquare) { this.headUrlSquare = headUrlSquare; }
        public List<String> getLabel() { return label; }
        public void setLabel(List<String> label) { this.label = label; }
        public List<String> getQualifications() { return qualifications; }
        public void setQualifications(List<String> qualifications) { this.qualifications = qualifications; }
        public String getCityName() { return cityName; }
        public void setCityName(String cityName) { this.cityName = cityName; }
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
        public Integer getSortIndex() { return sortIndex; }
        public void setSortIndex(Integer sortIndex) { this.sortIndex = sortIndex; }
        public Integer getSortPrice() { return sortPrice; }
        public void setSortPrice(Integer sortPrice) { this.sortPrice = sortPrice; }
        public Integer getSortDate() { return sortDate; }
        public void setSortDate(Integer sortDate) { this.sortDate = sortDate; }
        public List<Integer> getConsultType() { return consultType; }
        public void setConsultType(List<Integer> consultType) { this.consultType = consultType; }
        public Integer getSupportOnlineConsult() { return supportOnlineConsult; }
        public void setSupportOnlineConsult(Integer supportOnlineConsult) { this.supportOnlineConsult = supportOnlineConsult; }
        public Integer getSupportOfflineConsult() { return supportOfflineConsult; }
        public void setSupportOfflineConsult(Integer supportOfflineConsult) { this.supportOfflineConsult = supportOfflineConsult; }
        public Integer getCanConsult() { return canConsult; }
        public void setCanConsult(Integer canConsult) { this.canConsult = canConsult; }
        public String getAvatarLabel() { return avatarLabel; }
        public void setAvatarLabel(String avatarLabel) { this.avatarLabel = avatarLabel; }
        public Integer getSysSort() { return sysSort; }
        public void setSysSort(Integer sysSort) { this.sysSort = sysSort; }
        public Integer getUserSort() { return userSort; }
        public void setUserSort(Integer userSort) { this.userSort = userSort; }
        public ExperienceInfo getExperience() { return experience; }
        public void setExperience(ExperienceInfo experience) { this.experience = experience; }
        public List<String> getConsultStudioList() { return consultStudioList; }
        public void setConsultStudioList(List<String> consultStudioList) { this.consultStudioList = consultStudioList; }
    }

    public static class ExperienceInfo {
        private String date;
        private String time;

        public ExperienceInfo() {}

        public ExperienceInfo(String date, String time) {
            this.date = date;
            this.time = time;
        }

        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }
        public String getTime() { return time; }
        public void setTime(String time) { this.time = time; }
    }

    public static class NotifyDialogInfo {
        private String imageUrl;
        private String openUrl;

        public NotifyDialogInfo() {}

        public NotifyDialogInfo(String imageUrl, String openUrl) {
            this.imageUrl = imageUrl;
            this.openUrl = openUrl;
        }

        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
        public String getOpenUrl() { return openUrl; }
        public void setOpenUrl(String openUrl) { this.openUrl = openUrl; }
    }
}
