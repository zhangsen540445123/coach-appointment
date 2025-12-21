package com.umxinli.admin.service.impl;

import com.umxinli.admin.dto.PageRequest;
import com.umxinli.admin.dto.PageResponse;
import com.umxinli.admin.service.CoachOrderService;
import com.umxinli.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 教练订单服务实现
 */
@Service
public class CoachOrderServiceImpl implements CoachOrderService {

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public PageResponse getOrderList(PageRequest request, Long counselorId, Integer status) {
        // 查询教练的订单
        String sql = "SELECT o.*, u.name as user_name, u.avatar as user_avatar " +
                     "FROM consult_order o " +
                     "LEFT JOIN user u ON o.user_id = u.id " +
                     "WHERE o.counselor_id = ? ";

        if (status != null && status >= 0) {
            sql += "AND o.status = " + status + " ";
        }
        sql += "ORDER BY o.created_at DESC LIMIT ?, ?";

        List<Map<String, Object>> list = jdbcTemplate.queryForList(sql, counselorId,
                request.getOffset(), request.getPageSize());

        // 统计总数
        String countSql = "SELECT COUNT(*) FROM consult_order WHERE counselor_id = ?";
        if (status != null && status >= 0) {
            countSql += " AND status = " + status;
        }
        int total = jdbcTemplate.queryForObject(countSql, Integer.class, counselorId);

        return new PageResponse(list, total, request.getPage(), request.getPageSize());
    }

    @Override
    public Map<String, Object> getEarningsStats(Long counselorId, int days) {
        Map<String, Object> result = new HashMap<>();
        
        // 查询指定天数内的收益
        String sql = "SELECT COALESCE(SUM(price), 0) as totalAmount, COUNT(*) as orderCount " +
                     "FROM consult_order " +
                     "WHERE counselor_id = ? AND status = 3 " +  // 3=已完成
                     "AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)";
        
        try {
            Map<String, Object> stats = jdbcTemplate.queryForMap(sql, counselorId, days);
            result.put("totalAmount", stats.get("totalAmount") != null ? stats.get("totalAmount") : BigDecimal.ZERO);
            result.put("orderCount", stats.get("orderCount") != null ? stats.get("orderCount") : 0);
        } catch (Exception e) {
            result.put("totalAmount", BigDecimal.ZERO);
            result.put("orderCount", 0);
        }
        
        result.put("days", days);
        return result;
    }

    @Override
    public List<Map<String, Object>> getEarningsDetail(Long counselorId, int days, int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        
        String sql = "SELECT o.id, o.order_no, o.price, o.consult_time, o.created_at, " +
                     "u.name as user_name " +
                     "FROM consult_order o " +
                     "LEFT JOIN user u ON o.user_id = u.id " +
                     "WHERE o.counselor_id = ? AND o.status = 3 " +
                     "AND o.created_at >= DATE_SUB(NOW(), INTERVAL ? DAY) " +
                     "ORDER BY o.created_at DESC " +
                     "LIMIT ?, ?";
        
        return jdbcTemplate.queryForList(sql, counselorId, days, offset, pageSize);
    }
}

