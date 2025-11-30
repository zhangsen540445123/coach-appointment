package com.umxinli.mapper;

import com.umxinli.entity.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface OrderMapper {
    Order selectById(@Param("id") Long id);
    int updateStatus(@Param("id") Long id, @Param("status") int status);
}
