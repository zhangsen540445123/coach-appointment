package com.umxinli.service.impl;

import com.umxinli.entity.City;
import com.umxinli.mapper.CityMapper;
import com.umxinli.service.CityService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import java.util.*;

@Slf4j
@Service
public class CityServiceImpl implements CityService {
    
    @Autowired
    private CityMapper cityMapper;

    @Override
    @Cacheable(value = "city", key = "#id")
    public City getCityById(Integer id) {
        log.info("Getting city by id: {}", id);
        return cityMapper.selectById(id);
    }

    @Override
    @Cacheable(value = "cities", key = "'all'")
    public List<City> getAllCities() {
        log.info("Getting all cities");
        return cityMapper.selectAll();
    }

    @Override
    @Cacheable(value = "cities", key = "#province")
    public List<City> getCitiesByProvince(String province) {
        log.info("Getting cities by province: {}", province);
        return cityMapper.selectByProvince(province);
    }

    @Override
    @Cacheable(value = "cities", key = "'grouped'")
    public List<Object> getCityListGroupedByProvince() {
        log.info("Getting cities grouped by province");
        List<City> allCities = cityMapper.selectAll();
        Map<String, List<Map<String, Object>>> grouped = new LinkedHashMap<>();
        
        for (City city : allCities) {
            grouped.computeIfAbsent(city.getProvince(), k -> new ArrayList<>())
                   .add(new HashMap<String, Object>() {{
                       put("name", city.getName());
                       put("value", city.getValue());
                   }});
        }
        
        List<Object> result = new ArrayList<>();
        grouped.forEach((province, cities) -> {
            Map<String, Object> item = new HashMap<>();
            item.put("name", province);
            item.put("value", province);
            item.put("submenu", cities);
            result.add(item);
        });
        
        return result;
    }

    @Override
    @CacheEvict(value = {"city", "cities"}, allEntries = true)
    public int addCity(City city) {
        log.info("Adding city: {}", city.getName());
        return cityMapper.insert(city);
    }

    @Override
    @CacheEvict(value = {"city", "cities"}, allEntries = true)
    public int updateCity(City city) {
        log.info("Updating city: {}", city.getId());
        return cityMapper.update(city);
    }

    @Override
    @CacheEvict(value = {"city", "cities"}, allEntries = true)
    public int deleteCity(Integer id) {
        log.info("Deleting city: {}", id);
        return cityMapper.delete(id);
    }
}
