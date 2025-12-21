package com.umxinli.admin.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.CounselorCalendar;
import com.umxinli.mapper.CounselorCalendarMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * 教练可预约时间管理控制器
 */
@RestController
@RequestMapping("/admin/counselor-calendar")
public class AdminCounselorCalendarController {

    private static final Logger log = LoggerFactory.getLogger(AdminCounselorCalendarController.class);

    @Autowired
    private CounselorCalendarMapper counselorCalendarMapper;

    /**
     * 获取教练的可预约时间列表
     */
    @GetMapping("/{counselorId}")
    public ApiResponse getCalendar(@PathVariable Long counselorId,
                                   @RequestParam(required = false) String startDate,
                                   @RequestParam(required = false) String endDate) {
        log.info("Get calendar for counselor: {}, startDate: {}, endDate: {}", counselorId, startDate, endDate);
        try {
            List<CounselorCalendar> list;
            if (startDate != null && endDate != null) {
                list = counselorCalendarMapper.selectByCounselorIdAndDateRange(counselorId, startDate, endDate);
            } else {
                list = counselorCalendarMapper.selectByCounselorId(counselorId);
            }
            return ApiResponse.success(list);
        } catch (Exception e) {
            log.error("Error getting calendar", e);
            return ApiResponse.error("获取可预约时间失败");
        }
    }

    /**
     * 批量保存教练的可预约时间
     */
    @PostMapping("/{counselorId}/batch")
    public ApiResponse saveCalendar(@PathVariable Long counselorId, @RequestBody List<Map<String, Object>> slots) {
        log.info("Save calendar for counselor: {}, slots count: {}", counselorId, slots.size());
        try {
            // 收集所有涉及的日期
            Set<String> dates = new HashSet<>();
            List<CounselorCalendar> calendars = new ArrayList<>();
            for (Map<String, Object> slot : slots) {
                CounselorCalendar cal = new CounselorCalendar();
                cal.setCounselorId(counselorId);
                String date = (String) slot.get("date");
                cal.setDate(date);
                cal.setStartTime((String) slot.get("startTime"));
                cal.setConsultWay(slot.get("consultWay") != null ? ((Number) slot.get("consultWay")).intValue() : 1);
                cal.setConsultType(slot.get("consultType") != null ? ((Number) slot.get("consultType")).intValue() : 4);
                cal.setStatus(0); // 0-可预约
                calendars.add(cal);
                dates.add(date);
            }

            // 只删除涉及日期的现有记录，而不是删除所有日期
            for (String date : dates) {
                counselorCalendarMapper.deleteByCounselorIdAndDate(counselorId, date);
            }

            if (!calendars.isEmpty()) {
                counselorCalendarMapper.batchInsert(calendars);
            }

            return ApiResponse.success("保存成功");
        } catch (Exception e) {
            log.error("Error saving calendar", e);
            return ApiResponse.error("保存可预约时间失败");
        }
    }

    /**
     * 添加单个可预约时间
     */
    @PostMapping("/{counselorId}")
    public ApiResponse addSlot(@PathVariable Long counselorId, @RequestBody CounselorCalendar slot) {
        log.info("Add slot for counselor: {}", counselorId);
        try {
            slot.setCounselorId(counselorId);
            slot.setStatus(0);
            counselorCalendarMapper.insert(slot);
            return ApiResponse.success("添加成功", slot);
        } catch (Exception e) {
            log.error("Error adding slot", e);
            return ApiResponse.error("添加可预约时间失败");
        }
    }

    /**
     * 删除可预约时间
     */
    @DeleteMapping("/{id}")
    public ApiResponse deleteSlot(@PathVariable Long id) {
        log.info("Delete slot: {}", id);
        try {
            counselorCalendarMapper.delete(id);
            return ApiResponse.success("删除成功");
        } catch (Exception e) {
            log.error("Error deleting slot", e);
            return ApiResponse.error("删除可预约时间失败");
        }
    }

    /**
     * 删除教练某一天的所有可预约时间
     */
    @DeleteMapping("/{counselorId}/date/{date}")
    public ApiResponse deleteByDate(@PathVariable Long counselorId, @PathVariable String date) {
        log.info("Delete slots for counselor: {} on date: {}", counselorId, date);
        try {
            counselorCalendarMapper.deleteByCounselorIdAndDate(counselorId, date);
            return ApiResponse.success("删除成功");
        } catch (Exception e) {
            log.error("Error deleting slots", e);
            return ApiResponse.error("删除可预约时间失败");
        }
    }
}

