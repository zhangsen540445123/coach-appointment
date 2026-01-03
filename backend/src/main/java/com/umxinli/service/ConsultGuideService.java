package com.umxinli.service;

import com.umxinli.entity.ConsultGuide;
import java.util.List;

public interface ConsultGuideService {
    ConsultGuide getById(Long id);

    List<ConsultGuide> getAll();

    List<ConsultGuide> getActiveList();

    List<ConsultGuide> getByCategory(Integer category);

    List<ConsultGuide> getActiveByCateogry(Integer category);

    int add(ConsultGuide consultGuide);

    int update(ConsultGuide consultGuide);

    int delete(Long id);
}
