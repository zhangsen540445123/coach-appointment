package com.umxinli.mapper;

import com.umxinli.entity.GlobalSettings;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface SettingsMapper {
    GlobalSettings selectByKey(@Param("keyName") String keyName);
}
