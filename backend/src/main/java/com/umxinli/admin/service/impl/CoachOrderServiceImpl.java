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
    public PageResponse getOrderList(PageRequest request, Long counselorId, List<Integer> statusList) {
        // 查询教练的订单
        StringBuilder sql = new StringBuilder(
            "SELECT o.*, u.name as user_name, u.avatar as user_avatar " +
            "FROM consult_order o " +
            "LEFT JOIN user u ON o.user_id = u.id " +
            "WHERE o.counselor_id = ? "
        );

        // 支持多状态查询
        if (statusList != null && !statusList.isEmpty()) {
            sql.append("AND o.status IN (");
            for (int i = 0; i < statusList.size(); i++) {
                sql.append("?");
                if (i < statusList.size() - 1) {
                    sql.append(", ");
                }
            }
            sql.append(") ");
        }
        sql.append("ORDER BY o.created_at DESC LIMIT ?, ?");

        // 构建参数列表
        Object[] params;
        if (statusList != null && !statusList.isEmpty()) {
            params = new Object[statusList.size() + 3];
            params[0] = counselorId;
            for (int i = 0; i < statusList.size(); i++) {
                params[i + 1] = statusList.get(i);
            }
            params[statusList.size() + 1] = request.getOffset();
            params[statusList.size() + 2] = request.getPageSize();
        } else {
            params = new Object[]{counselorId, request.getOffset(), request.getPageSize()};
        }

        List<Map<String, Object>> list = jdbcTemplate.queryForList(sql.toString(), params);

        // 统计总数
        StringBuilder countSql = new StringBuilder("SELECT COUNT(*) FROM consult_order WHERE counselor_id = ?");
        if (statusList != null && !statusList.isEmpty()) {
            countSql.append(" AND status IN (");
            for (int i = 0; i < statusList.size(); i++) {
                countSql.append("?");
                if (i < statusList.size() - 1) {
                    countSql.append(", ");
                }
            }
            countSql.append(")");
        }

        // 构建统计参数列表
        Object[] countParams;
        if (statusList != null && !statusList.isEmpty()) {
            countParams = new Object[statusList.size() + 1];
            countParams[0] = counselorId;
            for (int i = 0; i < statusList.size(); i++) {
                countParams[i + 1] = statusList.get(i);
            }
        } else {
            countParams = new Object[]{counselorId};
        }

        int total = jdbcTemplate.queryForObject(countSql.toString(), Integer.class, countParams);

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

