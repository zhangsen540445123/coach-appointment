package com.umxinli.dto;

import java.util.List;

public class CounselorFilterRequest {
    private String name;
    private String shortcut;
    private FilterCriteria filter;
    private Pager pager;

    public CounselorFilterRequest() {}

    public CounselorFilterRequest(String name, String shortcut, FilterCriteria filter, Pager pager) {
        this.name = name;
        this.shortcut = shortcut;
        this.filter = filter;
        this.pager = pager;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortcut() {
        return shortcut;
    }

    public void setShortcut(String shortcut) {
        this.shortcut = shortcut;
    }

    public FilterCriteria getFilter() {
        return filter;
    }

    public void setFilter(FilterCriteria filter) {
        this.filter = filter;
    }

    public Pager getPager() {
        return pager;
    }

    public void setPager(Pager pager) {
        this.pager = pager;
    }

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
        private String direction; // 话题方向筛选（单选，向后兼容）
        private List<String> directions; // 话题方向筛选（多选）
        private List<Long> recentAvailableCounselorIds; // 近期可约的教练ID列表（内部使用）

        public FilterCriteria() {}

        public FilterCriteria(List<Integer> consultTypeList, List<Integer> serviceType, List<Integer> sexList, List<Integer> priceList, List<Integer> consultTimeList, List<Integer> troubleList, AddressFilter address, Integer sort, Integer consultWay, String direction) {
            this.consultTypeList = consultTypeList;
            this.serviceType = serviceType;
            this.sexList = sexList;
            this.priceList = priceList;
            this.consultTimeList = consultTimeList;
            this.troubleList = troubleList;
            this.address = address;
            this.sort = sort;
            this.consultWay = consultWay;
            this.direction = direction;
        }

        public List<Long> getRecentAvailableCounselorIds() {
            return recentAvailableCounselorIds;
        }

        public void setRecentAvailableCounselorIds(List<Long> recentAvailableCounselorIds) {
            this.recentAvailableCounselorIds = recentAvailableCounselorIds;
        }

        public String getDirection() {
            return direction;
        }

        public void setDirection(String direction) {
            this.direction = direction;
        }

        public List<String> getDirections() {
            return directions;
        }

        public void setDirections(List<String> directions) {
            this.directions = directions;
        }

        public List<Integer> getConsultTypeList() {
            return consultTypeList;
        }

        public void setConsultTypeList(List<Integer> consultTypeList) {
            this.consultTypeList = consultTypeList;
        }

        public List<Integer> getServiceType() {
            return serviceType;
        }

        public void setServiceType(List<Integer> serviceType) {
            this.serviceType = serviceType;
        }

        public List<Integer> getSexList() {
            return sexList;
        }

        public void setSexList(List<Integer> sexList) {
            this.sexList = sexList;
        }

        public List<Integer> getPriceList() {
            return priceList;
        }

        public void setPriceList(List<Integer> priceList) {
            this.priceList = priceList;
        }

        public List<Integer> getConsultTimeList() {
            return consultTimeList;
        }

        public void setConsultTimeList(List<Integer> consultTimeList) {
            this.consultTimeList = consultTimeList;
        }

        public List<Integer> getTroubleList() {
            return troubleList;
        }

        public void setTroubleList(List<Integer> troubleList) {
            this.troubleList = troubleList;
        }

        public AddressFilter getAddress() {
            return address;
        }

        public void setAddress(AddressFilter address) {
            this.address = address;
        }

        public Integer getSort() {
            return sort;
        }

        public void setSort(Integer sort) {
            this.sort = sort;
        }

        public Integer getConsultWay() {
            return consultWay;
        }

        public void setConsultWay(Integer consultWay) {
            this.consultWay = consultWay;
        }
    }

    public static class AddressFilter {
        private String province;
        private String city;
        private String area;

        public AddressFilter() {}

        public AddressFilter(String province, String city, String area) {
            this.province = province;
            this.city = city;
            this.area = area;
        }

        public String getProvince() {
            return province;
        }

        public void setProvince(String province) {
            this.province = province;
        }

        public String getCity() {
            return city;
        }

        public void setCity(String city) {
            this.city = city;
        }

        public String getArea() {
            return area;
        }

        public void setArea(String area) {
            this.area = area;
        }
    }

    public static class Pager {
        private Integer index = 1;
        private Integer size = 7;

        public Pager() {}

        public Pager(Integer index, Integer size) {
            this.index = index;
            this.size = size;
        }

        public Integer getIndex() {
            return index;
        }

        public void setIndex(Integer index) {
            this.index = index;
        }

        public Integer getSize() {
            return size;
        }

        public void setSize(Integer size) {
            this.size = size;
        }
    }
}
