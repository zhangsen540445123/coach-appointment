package com.umxinli.service.impl;

import com.umxinli.dto.CounselorFilterRequest;
import com.umxinli.dto.CounselorFilterResponse;
import com.umxinli.entity.Counselor;
import com.umxinli.mapper.CounselorMapper;
import com.umxinli.service.CounselorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class CounselorServiceImpl implements CounselorService {
    
    @Autowired
    private CounselorMapper counselorMapper;

    @Override
    @Cacheable(value = "counselor", key = "#id")
    public Counselor getCounselorById(Long id) {
        log.info("Getting counselor by id: {}", id);
        return counselorMapper.selectById(id);
    }

    @Override
    @Cacheable(value = "counselors", key = "'all'")
    public List<Counselor> getAllCounselors() {
        log.info("Getting all counselors");
        return counselorMapper.selectAll();
    }

    @Override
    @Cacheable(value = "counselors", key = "'featured'")
    public List<Counselor> getFeaturedCounselors() {
        log.info("Getting featured counselors");
        return counselorMapper.selectFeatured(5); // Get top 5 featured counselors
    }

    @Override
    public CounselorFilterResponse filterCounselors(CounselorFilterRequest request) {
        log.info("Filtering counselors with request: {}", request);
        
        CounselorFilterRequest.Pager pager = request.getPager();
        if (pager == null) {
            pager = new CounselorFilterRequest.Pager(1, 7);
        }
        
        int offset = (pager.getIndex() - 1) * pager.getSize();
        List<Counselor> counselors = counselorMapper.selectByFilter(
            request.getName(),
            request.getFilter(),
            pager.getSize(),
            offset
        );
        
        Integer total = counselorMapper.countByFilter(request.getName(), request.getFilter());
        int pages = (total + pager.getSize() - 1) / pager.getSize();
        
        List<CounselorFilterResponse.CounselorInfo> list = new ArrayList<>();
        for (Counselor c : counselors) {
            CounselorFilterResponse.CounselorInfo info = new CounselorFilterResponse.CounselorInfo();
            info.setCounselorId(c.getId());
            info.setName(c.getName());
            info.setHeadUrl(c.getHeadUrl());
            info.setHeadUrlSquare(c.getHeadUrlSquare());
            info.setQualifications(c.getQualifications());
            info.setCityName(c.getCityName());
            info.setDirections(c.getDirections());
            info.setIntroduction(c.getIntroduction());
            info.setConsultPrice(c.getConsultPrice());
            info.setServiceType(c.getServiceType());
            info.setStarNum(c.getStarNum());
            info.setConsultType(c.getConsultType());
            info.setSupportOnlineConsult(c.getSupportOnlineConsult());
            info.setSupportOfflineConsult(c.getSupportOfflineConsult());
            info.setCanConsult(c.getCanConsult());
            
            CounselorFilterResponse.ExperienceInfo exp = new CounselorFilterResponse.ExperienceInfo();
            exp.setDate(c.getExperienceDate() != null ? c.getExperienceDate().toString() : "");
            exp.setTime(c.getExperienceTime());
            info.setExperience(exp);
            
            list.add(info);
        }
        
        CounselorFilterResponse response = new CounselorFilterResponse();
        response.setList(list);
        response.setPages(pages);
        
        return response;
    }

    @Override
    @CacheEvict(value = {"counselor", "counselors"}, allEntries = true)
    public int addCounselor(Counselor counselor) {
        log.info("Adding counselor: {}", counselor.getName());
        return counselorMapper.insert(counselor);
    }

    @Override
    @CacheEvict(value = {"counselor", "counselors"}, allEntries = true)
    public int updateCounselor(Counselor counselor) {
        log.info("Updating counselor: {}", counselor.getId());
        return counselorMapper.update(counselor);
    }

    @Override
    @CacheEvict(value = {"counselor", "counselors"}, allEntries = true)
    public int deleteCounselor(Long id) {
        log.info("Deleting counselor: {}", id);
        return counselorMapper.delete(id);
    }
}
