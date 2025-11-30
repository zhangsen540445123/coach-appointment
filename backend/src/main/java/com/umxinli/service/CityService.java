package com.umxinli.service;

import com.umxinli.entity.City;
import java.util.List;

public interface CityService {
    City getCityById(Integer id);
    
    List<City> getAllCities();
    
    List<City> getCitiesByProvince(String province);
    
    List<Object> getCityListGroupedByProvince();
    
    int addCity(City city);
    
    int updateCity(City city);
    
    int deleteCity(Integer id);
}
