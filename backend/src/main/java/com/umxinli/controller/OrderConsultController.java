package com.umxinli.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.dto.CounselorFilterRequest;
import com.umxinli.dto.CounselorFilterResponse;
import com.umxinli.service.CarouselService;
import com.umxinli.service.CityService;
import com.umxinli.service.CounselorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orderConsult")
@CrossOrigin
public class OrderConsultController {

    private static final Logger log = LoggerFactory.getLogger(OrderConsultController.class);
    
    @Autowired
    private CounselorService counselorService;
    
    @Autowired
    private CarouselService carouselService;
    
    @Autowired
    private CityService cityService;

    @PostMapping("/filter")
    public ApiResponse<CounselorFilterResponse> filterCounselors(@RequestBody CounselorFilterRequest request) {
        log.info("Filter counselors request: {}", request);
        try {
            CounselorFilterResponse response = counselorService.filterCounselors(request);
            return ApiResponse.success(response);
        } catch (Exception e) {
            log.error("Error filtering counselors", e);
            return ApiResponse.error("Failed to filter counselors");
        }
    }

    @GetMapping("/getCarousel")
    public ApiResponse<Object> getCarousel() {
        log.info("Get carousel request");
        try {
            return ApiResponse.success(carouselService.getActiveCarousels());
        } catch (Exception e) {
            log.error("Error getting carousel", e);
            return ApiResponse.error("Failed to get carousel");
        }
    }

    @GetMapping("/getCityList")
    public ApiResponse<Object> getCityList() {
        log.info("Get city list request");
        try {
            List<Object> cities = cityService.getCityListGroupedByProvince();
            return ApiResponse.success(cities);
        } catch (Exception e) {
            log.error("Error getting city list", e);
            return ApiResponse.error("Failed to get city list");
        }
    }
}
