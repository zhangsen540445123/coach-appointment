package com.umxinli.admin.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.mapper.UserStarMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 后台收藏管理控制器
 */
@RestController
@RequestMapping("/admin/star")
@CrossOrigin
public class AdminStarController {

    private static final Logger log = LoggerFactory.getLogger(AdminStarController.class);

    @Autowired
    private UserStarMapper userStarMapper;

    /**
     * 获取教练收藏统计列表
     * GET /admin/star/list?page=1&size=10&keyword=xxx
     */
    @GetMapping("/list")
    public ApiResponse getStarStats(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword) {
        log.info("Get star stats - page: {}, size: {}, keyword: {}", page, size, keyword);
        try {
            int offset = (page - 1) * size;
            List<Map<String, Object>> list = userStarMapper.selectCounselorStarStats(keyword, offset, size);
            int total = userStarMapper.countCounselorStarStats(keyword);
            
            Map<String, Object> result = new HashMap<>();
            result.put("list", list);
            result.put("total", total);
            result.put("page", page);
            result.put("size", size);
            
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("Error getting star stats", e);
            return ApiResponse.error("Failed to get star stats");
        }
    }

    /**
     * 获取某教练的收藏用户列表
     * GET /admin/star/users/{counselorId}?page=1&size=10
     */
    @GetMapping("/users/{counselorId}")
    public ApiResponse getStarUsers(
            @PathVariable Long counselorId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("Get star users for counselor: {} - page: {}, size: {}", counselorId, page, size);
        try {
            int offset = (page - 1) * size;
            List<Map<String, Object>> list = userStarMapper.selectStarUsersByCounselorId(counselorId, offset, size);
            int total = userStarMapper.countStarUsersByCounselorId(counselorId);
            
            Map<String, Object> result = new HashMap<>();
            result.put("list", list);
            result.put("total", total);
            result.put("page", page);
            result.put("size", size);
            
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("Error getting star users", e);
            return ApiResponse.error("Failed to get star users");
        }
    }
}

