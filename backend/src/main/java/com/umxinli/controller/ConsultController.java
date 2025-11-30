package com.umxinli.controller;

import com.umxinli.dto.CounselorFilterRequest;
import com.umxinli.dto.CounselorFilterResponse;
import com.umxinli.entity.Carousel;
import com.umxinli.service.CarouselService;
import com.umxinli.service.CityService;
import com.umxinli.service.CounselorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orderConsult")
public class ConsultController {

    @Autowired
    private CarouselService carouselService;

    @Autowired
    private CityService cityService;

    @Autowired
    private CounselorService counselorService;

    /**
     * Get carousel list for the main page.
     * @return List of carousels.
     */
    @GetMapping("/getCarousel")
    public List<Carousel> getCarousel() {
        return carouselService.getActiveCarousels();
    }

    /**
     * Get city list grouped by province.
     * @return List of cities grouped by province.
     */
    @GetMapping("/getCityList")
    public List<Object> getCityList() {
        return cityService.getCityListGroupedByProvince();
    }

    /**
     * Filter counselors based on criteria.
     * @param filterDTO The filter criteria.
     * @return A list of filtered counselors.
     */
    @PostMapping("/filter")
    public CounselorFilterResponse filterCounselors(@RequestBody CounselorFilterRequest request) {
        return counselorService.filterCounselors(request);
    }
}
