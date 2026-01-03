package com.umxinli.mapper;

import com.umxinli.entity.StudioBooking;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface StudioBookingMapper {
    
    StudioBooking selectById(@Param("id") Long id);
    
    StudioBooking selectByStudioAndUser(@Param("studioId") Long studioId, @Param("userId") Long userId);
    
    StudioBooking selectByOrderNo(@Param("orderNo") String orderNo);
    
    List<StudioBooking> selectByStudioId(@Param("studioId") Long studioId, @Param("offset") int offset, @Param("limit") int limit);
    
    List<StudioBooking> selectByUserId(@Param("userId") Long userId);
    
    int countByStudioId(@Param("studioId") Long studioId);
    
    int countByStudioIdAndStatus(@Param("studioId") Long studioId, @Param("status") Integer status);
    
    int insert(StudioBooking booking);
    
    int update(StudioBooking booking);
    
    int updateStatus(@Param("id") Long id, @Param("status") Integer status);
    
    int delete(@Param("id") Long id);
}

