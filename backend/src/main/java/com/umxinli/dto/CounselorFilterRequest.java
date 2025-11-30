package com.umxinli.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CounselorFilterRequest {
    private String name;
    private String shortcut;
    private FilterCriteria filter;
    private Pager pager;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FilterCriteria {
        private List<Integer> consultTypeList;
        private List<Integer> serviceType;
        private List<Integer> sexList;
        private List<Integer> priceList;
        private List<Integer> consultTimeList;
        private List<Integer> troubleList;
        private AddressFilter address;
        private Integer sort;
        private Integer consultWay;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AddressFilter {
        private String province;
        private String city;
        private String area;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Pager {
        private Integer index = 1;
        private Integer size = 7;
    }
}
