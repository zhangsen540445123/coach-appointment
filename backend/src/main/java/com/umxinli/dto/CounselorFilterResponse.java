package com.umxinli.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CounselorFilterResponse {
    private List<CounselorInfo> list;
    private Integer pages;
    private NotifyDialogInfo notify_dialog_info;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CounselorInfo {
        private Long counselorId;
        private String name;
        private String headUrl;
        private String headUrlSquare;
        private List<String> label;
        private List<String> qualifications;
        private String cityName;
        private List<String> directions;
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
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ExperienceInfo {
        private String date;
        private String time;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class NotifyDialogInfo {
        private String imageUrl;
        private String openUrl;
    }
}
