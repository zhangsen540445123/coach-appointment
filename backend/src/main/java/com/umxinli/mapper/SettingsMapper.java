package com.umxinli.mapper;

import com.umxinli.entity.GlobalSettings;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SettingsMapper {
    GlobalSettings selectByKey(@Param("keyName") String keyName);
    List<GlobalSettings> selectAll();
    int insert(GlobalSettings settings);
    int updateByKey(@Param("keyName") String keyName, @Param("value") String value);
}
