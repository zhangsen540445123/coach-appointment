package com.umxinli.admin.controller;

import com.alibaba.excel.EasyExcel;
import com.umxinli.admin.service.ReportService;
import com.umxinli.dto.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

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
     * 导出财务报表Excel
     * GET /admin/report/financial/export
     */
    @GetMapping("/financial/export")
    public void exportFinancialReport(
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
            @RequestParam(defaultValue = "day") String dimension,
            @RequestParam(required = false) Long counselorId,
            HttpServletResponse response) throws IOException {
        log.info("Export financial report: {} to {}, dimension={}", startDate, endDate, dimension);
        try {
            // 默认查询最近30天
            if (startDate == null || endDate == null) {
                Calendar cal = Calendar.getInstance();
                endDate = cal.getTime();
                cal.add(Calendar.DAY_OF_MONTH, -30);
                startDate = cal.getTime();
            }

            Map<String, Object> report = reportService.getFinancialReport(startDate, endDate, dimension, counselorId);

            // 设置响应头
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setCharacterEncoding("utf-8");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
            String fileName = URLEncoder.encode("财务报表_" + sdf.format(startDate) + "_" + sdf.format(endDate), StandardCharsets.UTF_8);
            response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + fileName + ".xlsx");

            // 准备数据
            List<List<String>> dataList = new ArrayList<>();

            // 添加汇总数据
            Map<String, Object> summary = (Map<String, Object>) report.get("summary");
            dataList.add(Arrays.asList("财务报表汇总", "", "", ""));
            dataList.add(Arrays.asList("统计项", "数值", "", ""));
            dataList.add(Arrays.asList("总收入", String.format("¥%.2f", summary.get("totalRevenue")), "", ""));
            dataList.add(Arrays.asList("净收入", String.format("¥%.2f", summary.get("netRevenue")), "", ""));
            dataList.add(Arrays.asList("退款金额", String.format("¥%.2f", summary.get("refundAmount")), "", ""));
            dataList.add(Arrays.asList("订单总数", String.valueOf(summary.get("totalOrders")), "", ""));
            dataList.add(Arrays.asList("已完成订单", String.valueOf(summary.get("completedOrders")), "", ""));
            dataList.add(Arrays.asList("平均单价", String.format("¥%.2f", summary.get("avgOrderAmount")), "", ""));
            dataList.add(Arrays.asList("", "", "", ""));

            // 添加收入趋势
            dataList.add(Arrays.asList("收入趋势", "", "", ""));
            dataList.add(Arrays.asList("日期", "收入", "订单数", ""));
            List<Map<String, Object>> revenueTrend = (List<Map<String, Object>>) report.get("revenueTrend");
            if (revenueTrend != null) {
                for (Map<String, Object> item : revenueTrend) {
                    dataList.add(Arrays.asList(
                        String.valueOf(item.get("date") != null ? item.get("date") : item.get("period")),
                        String.format("%.2f", item.get("revenue")),
                        String.valueOf(item.get("orderCount")),
                        ""
                    ));
                }
            }

            // 添加教练排行
            List<Map<String, Object>> counselorRank = (List<Map<String, Object>>) report.get("counselorRank");
            if (counselorRank != null && !counselorRank.isEmpty()) {
                dataList.add(Arrays.asList("", "", "", ""));
                dataList.add(Arrays.asList("教练收入排行 TOP 10", "", "", ""));
                dataList.add(Arrays.asList("排名", "教练", "订单数", "收入"));
                for (int i = 0; i < counselorRank.size(); i++) {
                    Map<String, Object> item = counselorRank.get(i);
                    dataList.add(Arrays.asList(
                        String.valueOf(i + 1),
                        String.valueOf(item.get("name")),
                        String.valueOf(item.get("orderCount")),
                        String.format("¥%.2f", item.get("revenue"))
                    ));
                }
            }

            // 使用EasyExcel写入
            EasyExcel.write(response.getOutputStream())
                    .head(Arrays.asList(
                        Arrays.asList("列1"),
                        Arrays.asList("列2"),
                        Arrays.asList("列3"),
                        Arrays.asList("列4")
                    ))
                    .sheet("财务报表")
                    .doWrite(dataList);

        } catch (Exception e) {
            log.error("Error exporting financial report", e);
            response.reset();
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            response.getWriter().println("{\"code\":500,\"msg\":\"导出失败\"}");
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

