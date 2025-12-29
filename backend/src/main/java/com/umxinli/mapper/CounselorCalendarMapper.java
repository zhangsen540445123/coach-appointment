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

    /**
     * 查询指定日期范围内有可预约时间的教练ID列表
     * @param startDate 开始日期 (yyyy-MM-dd)
     * @param endDate 结束日期 (yyyy-MM-dd)
     * @return 有可预约时间的教练ID列表
     */
    List<Long> selectCounselorIdsWithAvailableSlots(
        @Param("startDate") String startDate,
        @Param("endDate") String endDate
    );

    /**
     * 释放教练的预约时段（将已预约状态改为可预约）
     * @param counselorId 教练ID
     * @param date 日期 (yyyy-MM-dd)
     * @param startTime 开始时间 (HH:mm)
     * @return 更新的记录数
     */
    int releaseSlot(
        @Param("counselorId") Long counselorId,
        @Param("date") String date,
        @Param("startTime") String startTime
    );

    /**
     * 预约教练的时段（将可预约状态改为已预约）
     * @param counselorId 教练ID
     * @param date 日期 (yyyy-MM-dd)
     * @param startTime 开始时间 (HH:mm)
     * @return 更新的记录数
     */
    int bookSlot(
        @Param("counselorId") Long counselorId,
        @Param("date") String date,
        @Param("startTime") String startTime
    );
}

