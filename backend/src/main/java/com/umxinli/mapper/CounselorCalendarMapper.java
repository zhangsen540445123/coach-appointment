package com.umxinli.mapper;

import com.umxinli.entity.CounselorCalendar;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface CounselorCalendarMapper {
    
    CounselorCalendar selectById(Long id);
    
    List<CounselorCalendar> selectByCounselorId(@Param("counselorId") Long counselorId);
    
    List<CounselorCalendar> selectByCounselorIdAndDateRange(
        @Param("counselorId") Long counselorId,
        @Param("startDate") String startDate,
        @Param("endDate") String endDate
    );
    
    List<CounselorCalendar> selectAvailableByCounselorId(
        @Param("counselorId") Long counselorId,
        @Param("startDate") String startDate,
        @Param("endDate") String endDate
    );
    
    int insert(CounselorCalendar calendar);
    
    int batchInsert(@Param("list") List<CounselorCalendar> list);
    
    int update(CounselorCalendar calendar);
    
    int updateStatus(@Param("id") Long id, @Param("status") Integer status);
    
    int delete(Long id);
    
    int deleteByCounselorId(@Param("counselorId") Long counselorId);
    
    int deleteByCounselorIdAndDate(@Param("counselorId") Long counselorId, @Param("date") String date);
}

