package com.umxinli.mapper;

import com.umxinli.entity.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrderMapper {
    Order selectById(@Param("id") Long id);
    int insert(Order order);
    int updateStatus(@Param("id") Long id, @Param("status") int status);
    List selectList(@Param("offset") int offset, @Param("limit") int limit, @Param("status") Integer status);
    int countByStatus(@Param("status") Integer status);
    int updateConsultTime(@Param("orderId") Long orderId, @Param("consultTime") String consultTime);
    int bindVisitor(@Param("orderId") Long orderId, @Param("visitorId") Long visitorId);
}
