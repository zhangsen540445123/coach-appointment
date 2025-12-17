package com.umxinli.admin.controller;

import com.umxinli.admin.service.ReportService;
import com.umxinli.dto.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;
import java.util.Map;

/**
 * 报表管理控制器
 */
@RestController
@RequestMapping("/admin/report")
@CrossOrigin
public class AdminReportController {

    private static final Logger log = LoggerFactory.getLogger(AdminReportController.class);

    @Autowired
    private ReportService reportService;

    /**
     * 获取财务报表
     * GET /admin/report/financial
     */
    @GetMapping("/financial")
    public ApiResponse<Map<String, Object>> getFinancialReport(
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
            @RequestParam(defaultValue = "day") String dimension,
            @RequestParam(required = false) Long counselorId) {
        log.info("Get financial report: {} to {}, dimension={}", startDate, endDate, dimension);
        try {
            // 默认查询最近30天
            if (startDate == null || endDate == null) {
                Calendar cal = Calendar.getInstance();
                endDate = cal.getTime();
                cal.add(Calendar.DAY_OF_MONTH, -30);
                startDate = cal.getTime();
            }
            Map<String, Object> report = reportService.getFinancialReport(startDate, endDate, dimension, counselorId);
            return ApiResponse.success(report);
        } catch (Exception e) {
            log.error("Error getting financial report", e);
            return ApiResponse.error("获取财务报表失败: " + e.getMessage());
        }
    }

    /**
     * 获取运营报表
     * GET /admin/report/operations
     */
    @GetMapping("/operations")
    public ApiResponse<Map<String, Object>> getOperationsReport(
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
            @RequestParam(defaultValue = "day") String dimension) {
        log.info("Get operations report: {} to {}, dimension={}", startDate, endDate, dimension);
        try {
            // 默认查询最近30天
            if (startDate == null || endDate == null) {
                Calendar cal = Calendar.getInstance();
                endDate = cal.getTime();
                cal.add(Calendar.DAY_OF_MONTH, -30);
                startDate = cal.getTime();
            }
            Map<String, Object> report = reportService.getOperationsReport(startDate, endDate, dimension);
            return ApiResponse.success(report);
        } catch (Exception e) {
            log.error("Error getting operations report", e);
            return ApiResponse.error("获取运营报表失败: " + e.getMessage());
        }
    }
}

