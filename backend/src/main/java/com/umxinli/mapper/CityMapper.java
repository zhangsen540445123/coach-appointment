package com.umxinli.mapper;

import com.umxinli.entity.City;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface CityMapper {
    City selectById(Integer id);
    
    List<City> selectAll();
    
    List<City> selectByProvince(String province);
    
    int insert(City city);
    
    int update(City city);
    
    int delete(Integer id);
}
