package com.umxinli.service.impl;

import com.umxinli.entity.ConsultGuide;
import com.umxinli.mapper.ConsultGuideMapper;
import com.umxinli.service.ConsultGuideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsultGuideServiceImpl implements ConsultGuideService {

    @Autowired
    private ConsultGuideMapper consultGuideMapper;

    @Override
    public ConsultGuide getById(Long id) {
        return consultGuideMapper.selectById(id);
    }

    @Override
    public List<ConsultGuide> getAll() {
        return consultGuideMapper.selectAll();
    }

    @Override
    public List<ConsultGuide> getActiveList() {
        return consultGuideMapper.selectByStatus(1);
    }

    @Override
    public List<ConsultGuide> getByCategory(Integer category) {
        return consultGuideMapper.selectByCategory(category);
    }

    @Override
    public List<ConsultGuide> getActiveByCateogry(Integer category) {
        return consultGuideMapper.selectByCategoryAndStatus(category, 1);
    }

    @Override
    public int add(ConsultGuide consultGuide) {
        return consultGuideMapper.insert(consultGuide);
    }

    @Override
    public int update(ConsultGuide consultGuide) {
        return consultGuideMapper.update(consultGuide);
    }

    @Override
    public int delete(Long id) {
        return consultGuideMapper.delete(id);
    }
}
