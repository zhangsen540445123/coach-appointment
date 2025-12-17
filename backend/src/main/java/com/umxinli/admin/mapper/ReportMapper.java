package com.umxinli.admin.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 报表统计Mapper
 */
@Mapper
public interface ReportMapper {
    
    // ========== 财务报表 ==========
    
    /** 获取时间段内总收入(已支付订单) */
    BigDecimal getTotalRevenue(@Param("startDate") Date startDate, @Param("endDate") Date endDate, 
                               @Param("counselorId") Long counselorId);
    
    /** 获取时间段内订单数 */
    int getOrderCount(@Param("startDate") Date startDate, @Param("endDate") Date endDate,
                      @Param("status") Integer status, @Param("counselorId") Long counselorId);
    
    /** 获取时间段内退款金额 */
    BigDecimal getRefundAmount(@Param("startDate") Date startDate, @Param("endDate") Date endDate,
                               @Param("counselorId") Long counselorId);
    
    /** 按时间维度统计收入趋势 */
    List<Map<String, Object>> getRevenueTrend(@Param("startDate") Date startDate, @Param("endDate") Date endDate,
                                              @Param("dimension") String dimension, @Param("counselorId") Long counselorId);
    
    /** 按时间维度统计订单趋势 */
    List<Map<String, Object>> getOrderTrend(@Param("startDate") Date startDate, @Param("endDate") Date endDate,
                                            @Param("dimension") String dimension, @Param("counselorId") Long counselorId);
    
    /** 教练收入排行 */
    List<Map<String, Object>> getCounselorRevenueRank(@Param("startDate") Date startDate, @Param("endDate") Date endDate,
                                                      @Param("limit") int limit);
    
    // ========== 运营报表 ==========
    
    /** 获取时间段内新增用户数 */
    int getNewUserCount(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
    
    /** 获取总用户数 */
    int getTotalUserCount();
    
    /** 获取时间段内新增教练数 */
    int getNewCounselorCount(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
    
    /** 获取总教练数 */
    int getTotalCounselorCount();
    
    /** 获取活跃教练数(可接单) */
    int getActiveCounselorCount();
    
    /** 获取时间段内收藏数 */
    int getStarCount(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
    
    /** 获取总收藏数 */
    int getTotalStarCount();
    
    /** 按时间维度统计用户增长趋势 */
    List<Map<String, Object>> getUserTrend(@Param("startDate") Date startDate, @Param("endDate") Date endDate,
                                           @Param("dimension") String dimension);
    
    /** 按时间维度统计收藏趋势 */
    List<Map<String, Object>> getStarTrend(@Param("startDate") Date startDate, @Param("endDate") Date endDate,
                                           @Param("dimension") String dimension);
    
    /** 订单完成率(已完成/总数) */
    Map<String, Object> getOrderCompletionRate(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
    
    /** 教练平均评分 */
    BigDecimal getAverageRating(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
    
    /** 热门城市分布 */
    List<Map<String, Object>> getCityDistribution(@Param("limit") int limit);
    
    /** 咨询方式分布 */
    List<Map<String, Object>> getConsultWayDistribution(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}

