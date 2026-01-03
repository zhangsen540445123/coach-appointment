package com.umxinli.service.impl;

import com.umxinli.entity.ConsultStudio;
import com.umxinli.entity.Counselor;
import com.umxinli.mapper.ConsultStudioMapper;
import com.umxinli.mapper.CounselorMapper;
import com.umxinli.service.ConsultStudioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class ConsultStudioServiceImpl implements ConsultStudioService {
    
    private static final Logger log = LoggerFactory.getLogger(ConsultStudioServiceImpl.class);
    
    @Autowired
    private ConsultStudioMapper studioMapper;
    
    @Autowired
    private CounselorMapper counselorMapper;
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired(required = false)
    private com.umxinli.mapper.StudioBookingMapper studioBookingMapper;

    @Override
    public Map<String, Object> getStudioList(int page, int size) {
        List<ConsultStudio> list = studioMapper.selectAll();

        // 填充当前参与人数
        if (studioBookingMapper != null) {
            for (ConsultStudio studio : list) {
                int count = studioBookingMapper.countByStudioIdAndStatus(studio.getId(), 1);
                studio.setCurrentParticipants(count);
            }
        }

        int total = list.size();
        int start = (page - 1) * size;
        int end = Math.min(start + size, total);

        List<ConsultStudio> pageList = start < total ? list.subList(start, end) : new ArrayList<>();

        Map<String, Object> result = new HashMap<>();
        result.put("list", pageList);
        result.put("total", total);
        result.put("pages", (total + size - 1) / size);
        return result;
    }

    @Override
    public ConsultStudio getStudioById(Long id) {
        return studioMapper.selectById(id);
    }

    @Override
    public List<Counselor> getStudioCounselors(Long studioId) {
        String sql = "SELECT c.* FROM counselor c " +
                     "JOIN studio_counselor sc ON c.id = sc.counselor_id " +
                     "WHERE sc.studio_id = ? ORDER BY sc.sort_order ASC";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Counselor c = new Counselor();
            c.setId(rs.getLong("id"));
            c.setName(rs.getString("name"));
            c.setGender(rs.getInt("gender"));
            c.setHeadUrl(rs.getString("head_url"));
            c.setHeadUrlSquare(rs.getString("head_url_square"));
            c.setIntroduction(rs.getString("introduction"));
            c.setConsultPrice(rs.getBigDecimal("consult_price"));
            c.setCityName(rs.getString("city_name"));
            return c;
        }, studioId);
    }

    @Override
    public List<ConsultStudio> getAllStudios() {
        return studioMapper.selectAllForAdmin();
    }

    @Override
    public int createStudio(ConsultStudio studio) {
        if (studio.getEnabled() == null) studio.setEnabled(1);
        if (studio.getSortOrder() == null) studio.setSortOrder(0);
        return studioMapper.insert(studio);
    }

    @Override
    public int updateStudio(ConsultStudio studio) {
        return studioMapper.update(studio);
    }

    @Override
    public int deleteStudio(Long id) {
        // 先删除关联关系
        jdbcTemplate.update("DELETE FROM studio_counselor WHERE studio_id = ?", id);
        return studioMapper.deleteById(id);
    }

    @Override
    public int toggleEnabled(Long id) {
        ConsultStudio studio = studioMapper.selectById(id);
        if (studio == null) return 0;
        int newEnabled = studio.getEnabled() == 1 ? 0 : 1;
        return studioMapper.updateEnabled(id, newEnabled);
    }

    @Override
    @Transactional
    public int bindCounselors(Long studioId, List<Long> counselorIds) {
        int count = 0;
        for (int i = 0; i < counselorIds.size(); i++) {
            Long counselorId = counselorIds.get(i);
            try {
                jdbcTemplate.update(
                    "INSERT IGNORE INTO studio_counselor (studio_id, counselor_id, sort_order) VALUES (?, ?, ?)",
                    studioId, counselorId, i);
                count++;
            } catch (Exception e) {
                log.warn("Failed to bind counselor {} to studio {}: {}", counselorId, studioId, e.getMessage());
            }
        }
        return count;
    }

    @Override
    public int unbindCounselor(Long studioId, Long counselorId) {
        return jdbcTemplate.update(
            "DELETE FROM studio_counselor WHERE studio_id = ? AND counselor_id = ?", 
            studioId, counselorId);
    }
}

