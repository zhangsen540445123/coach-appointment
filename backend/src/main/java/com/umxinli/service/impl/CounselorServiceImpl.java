package com.umxinli.service.impl;

import com.umxinli.dto.CounselorFilterRequest;
import com.umxinli.dto.CounselorFilterResponse;
import com.umxinli.entity.Counselor;
import com.umxinli.mapper.CounselorMapper;
import com.umxinli.service.CounselorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CounselorServiceImpl implements CounselorService {

    private static final Logger log = LoggerFactory.getLogger(CounselorServiceImpl.class);
    
    @Autowired
    private CounselorMapper counselorMapper;


    @Value("${app.base-url:https://localhost}")
    private String baseUrl;

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

        // 处理 shortcut 参数，映射到 filter.sort
        // shortcut: 0=近期可约, 1=低价咨询, 2=线下咨询
        String shortcut = request.getShortcut();
        CounselorFilterRequest.FilterCriteria filter = request.getFilter();
        if (shortcut != null && !shortcut.isEmpty()) {
            if (filter == null) {
                filter = new CounselorFilterRequest.FilterCriteria();
                request.setFilter(filter);
            }
            switch (shortcut) {
                case "0":
                    // 近期可约 - 按最近可预约时间排序
                    filter.setSort(3);
                    break;
                case "1":
                    // 低价咨询 - 按价格从低到高排序
                    filter.setSort(1);
                    break;
                case "2":
                    // 线下咨询 - 筛选支持线下的教练
                    filter.setConsultWay(1);
                    break;
            }
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
        
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        List<CounselorFilterResponse.CounselorInfo> list = new ArrayList<>();
        for (Counselor c : counselors) {
            CounselorFilterResponse.CounselorInfo info = new CounselorFilterResponse.CounselorInfo();
            info.setCounselorId(c.getId());
            info.setName(c.getName());
            info.setHeadUrl(baseUrl + c.getHeadUrl());
            info.setHeadUrlSquare(baseUrl + c.getHeadUrlSquare());
            info.setQualifications(c.getQualifications());
            info.setCityName(c.getCityName());

            // 将复杂的 directions 对象转换为简单字符串数组（提取 name 属性）
            Object directions = c.getDirections();
            if (directions instanceof List) {
                List<?> dirList = (List<?>) directions;
                List<String> simpleDirections = new ArrayList<>();
                for (Object item : dirList) {
                    if (item instanceof Map) {
                        Object name = ((Map<?, ?>) item).get("name");
                        if (name != null) {
                            simpleDirections.add(name.toString());
                        }
                    } else if (item instanceof String) {
                        simpleDirections.add((String) item);
                    }
                }
                info.setDirections(simpleDirections);
            } else {
                info.setDirections(directions);
            }

            info.setIntroduction(c.getIntroduction());
            info.setConsultPrice(c.getConsultPrice());
            info.setServiceType(c.getServiceType());
            info.setStarNum(c.getStarNum());
            info.setConsultType(c.getConsultType());
            info.setSupportOnlineConsult(c.getSupportOnlineConsult());
            info.setSupportOfflineConsult(c.getSupportOfflineConsult());
            info.setCanConsult(c.getCanConsult());

            // 格式化日期为 yyyy-MM-dd 格式
            CounselorFilterResponse.ExperienceInfo exp = new CounselorFilterResponse.ExperienceInfo();
            String dateStr = "";
            if (c.getExperienceDate() != null) {
                dateStr = dateFormat.format(c.getExperienceDate());
            }
            exp.setDate(dateStr);
            exp.setTime(c.getExperienceTime());
            info.setExperience(exp);

            list.add(info);
        }
        
        CounselorFilterResponse response = new CounselorFilterResponse();
        response.setList(list);
        response.setTotal(total);
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
