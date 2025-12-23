package com.umxinli.admin.service;

import com.umxinli.admin.mapper.ReportMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

/**
 * 报表统计服务
 */
@Service
public class ReportService {

    @Autowired
    private ReportMapper reportMapper;

    /**
     * 获取财务报表数据
     */
    public Map<String, Object> getFinancialReport(Date startDate, Date endDate, String dimension, Long counselorId) {
        Map<String, Object> result = new HashMap<>();
        
        // 汇总数据
        BigDecimal totalRevenue = reportMapper.getTotalRevenue(startDate, endDate, counselorId);
        int totalOrders = reportMapper.getOrderCount(startDate, endDate, null, counselorId);
        int paidOrders = reportMapper.getOrderCount(startDate, endDate, 1, counselorId) 
                       + reportMapper.getOrderCount(startDate, endDate, 2, counselorId)
                       + reportMapper.getOrderCount(startDate, endDate, 3, counselorId);
        int completedOrders = reportMapper.getOrderCount(startDate, endDate, 3, counselorId);
        int cancelledOrders = reportMapper.getOrderCount(startDate, endDate, 4, counselorId);
        BigDecimal refundAmount = reportMapper.getRefundAmount(startDate, endDate, counselorId);
        
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalRevenue", totalRevenue);
        summary.put("totalOrders", totalOrders);
        summary.put("paidOrders", paidOrders);
        summary.put("completedOrders", completedOrders);
        summary.put("cancelledOrders", cancelledOrders);
        summary.put("refundAmount", refundAmount);
        summary.put("netRevenue", totalRevenue.subtract(refundAmount));
        // 平均订单金额
        if (paidOrders > 0) {
            summary.put("avgOrderAmount", totalRevenue.divide(BigDecimal.valueOf(paidOrders), 2, RoundingMode.HALF_UP));
        } else {
            summary.put("avgOrderAmount", BigDecimal.ZERO);
        }
        result.put("summary", summary);
        
        // 收入趋势
        List<Map<String, Object>> revenueTrend = reportMapper.getRevenueTrend(startDate, endDate, dimension, counselorId);
        result.put("revenueTrend", revenueTrend);
        
        // 订单趋势
        List<Map<String, Object>> orderTrend = reportMapper.getOrderTrend(startDate, endDate, dimension, counselorId);
        result.put("orderTrend", orderTrend);
        
        // 教练收入排行(不按教练筛选时显示)
        if (counselorId == null) {
            List<Map<String, Object>> counselorRank = reportMapper.getCounselorRevenueRank(startDate, endDate, 10);
            result.put("counselorRank", counselorRank);
        }
        
        // 咨询方式分布
        List<Map<String, Object>> consultWayDist = reportMapper.getConsultWayDistribution(startDate, endDate);
        result.put("consultWayDistribution", consultWayDist);
        
        return result;
    }

    /**
     * 获取运营报表数据
     */
    public Map<String, Object> getOperationsReport(Date startDate, Date endDate, String dimension) {
        Map<String, Object> result = new HashMap<>();
        
        // 用户统计
        Map<String, Object> userStats = new HashMap<>();
        userStats.put("totalUsers", reportMapper.getTotalUserCount());
        userStats.put("newUsers", reportMapper.getNewUserCount(startDate, endDate));
        result.put("userStats", userStats);
        
        // 教练统计
        Map<String, Object> counselorStats = new HashMap<>();
        counselorStats.put("totalCounselors", reportMapper.getTotalCounselorCount());
        counselorStats.put("newCounselors", reportMapper.getNewCounselorCount(startDate, endDate));
        counselorStats.put("activeCounselors", reportMapper.getActiveCounselorCount());
        result.put("counselorStats", counselorStats);
        
        // 订单统计
        Map<String, Object> orderStats = new HashMap<>();
        int totalOrders = reportMapper.getOrderCount(startDate, endDate, null, null);
        int completedOrders = reportMapper.getOrderCount(startDate, endDate, 3, null);
        // 已支付订单数（status=1,2,3，排除待支付0、已取消4、已退款5）
        int paidOrders = reportMapper.getOrderCount(startDate, endDate, 1, null)
                       + reportMapper.getOrderCount(startDate, endDate, 2, null)
                       + reportMapper.getOrderCount(startDate, endDate, 3, null);
        orderStats.put("totalOrders", totalOrders);
        orderStats.put("completedOrders", completedOrders);
        orderStats.put("paidOrders", paidOrders);
        // 完成率 = 已完成订单 / 已支付订单（不包含待支付订单）
        if (paidOrders > 0) {
            orderStats.put("completionRate", BigDecimal.valueOf(completedOrders * 100.0 / paidOrders).setScale(1, RoundingMode.HALF_UP));
        } else {
            orderStats.put("completionRate", BigDecimal.ZERO);
        }
        result.put("orderStats", orderStats);
        
        // 收藏统计
        Map<String, Object> starStats = new HashMap<>();
        starStats.put("totalStars", reportMapper.getTotalStarCount());
        starStats.put("newStars", reportMapper.getStarCount(startDate, endDate));
        result.put("starStats", starStats);
        
        // 评分统计
        BigDecimal avgRating = reportMapper.getAverageRating(startDate, endDate);
        result.put("averageRating", avgRating.setScale(1, RoundingMode.HALF_UP));
        
        // 趋势数据
        result.put("userTrend", reportMapper.getUserTrend(startDate, endDate, dimension));
        result.put("orderTrend", reportMapper.getOrderTrend(startDate, endDate, dimension, null));
        result.put("starTrend", reportMapper.getStarTrend(startDate, endDate, dimension));
        
        // 城市分布
        result.put("cityDistribution", reportMapper.getCityDistribution(10));
        
        return result;
    }
}

