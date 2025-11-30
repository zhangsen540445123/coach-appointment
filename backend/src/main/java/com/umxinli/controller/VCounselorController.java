package com.umxinli.controller;

import com.umxinli.entity.Counselor;
import com.umxinli.service.CounselorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/vCounselor")
public class VCounselorController {

    @Autowired
    private CounselorService counselorService;

    /**
     * Get the list of featured (star) counselors.
     * @return A list of featured counselors.
     */
    @PostMapping("/getStarList")
    public List<Counselor> getStarList() {
        return counselorService.getFeaturedCounselors();
    }
}
