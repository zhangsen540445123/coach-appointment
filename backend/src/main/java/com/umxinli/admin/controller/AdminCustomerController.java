package com.umxinli.admin.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.VisitorInfo;
import com.umxinli.mapper.VisitorInfoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 客户信息管理控制器
 * 提供客户信息的增删改查管理功能
 */
@RestController
@RequestMapping("/admin/customer")
@CrossOrigin
public class AdminCustomerController {

    private static final Logger log = LoggerFactory.getLogger(AdminCustomerController.class);

    @Autowired
    private VisitorInfoMapper visitorInfoMapper;

    /**
     * 获取客户列表（分页）
     * POST /admin/customer/list
     */
    @PostMapping("/list")
    public ApiResponse getList(@RequestBody Map<String, Object> request) {
        int page = request.get("page") != null ? (Integer) request.get("page") : 1;
        int pageSize = request.get("pageSize") != null ? (Integer) request.get("pageSize") : 10;
        String keyword = (String) request.get("keyword");
        
        log.info("Get customer list, page: {}, pageSize: {}, keyword: {}", page, pageSize, keyword);
        
        try {
            int offset = (page - 1) * pageSize;
            List<VisitorInfo> list = visitorInfoMapper.selectAll(keyword, offset, pageSize);
            int total = visitorInfoMapper.countAll(keyword);
            
            Map<String, Object> data = new HashMap<>();
            data.put("list", list);
            data.put("total", total);
            data.put("page", page);
            data.put("pageSize", pageSize);
            
            return ApiResponse.success(data);
        } catch (Exception e) {
            log.error("Error getting customer list", e);
            return ApiResponse.error("获取客户列表失败");
        }
    }

    /**
     * 根据ID获取客户详情
     * GET /admin/customer/{id}
     */
    @GetMapping("/{id}")
    public ApiResponse getById(@PathVariable Long id) {
        log.info("Get customer by id: {}", id);
        try {
            VisitorInfo info = visitorInfoMapper.selectById(id);
            if (info == null) {
                return ApiResponse.error(404, "客户信息不存在");
            }
            return ApiResponse.success(info);
        } catch (Exception e) {
            log.error("Error getting customer", e);
            return ApiResponse.error("获取客户信息失败");
        }
    }

    /**
     * 更新客户信息
     * PUT /admin/customer/{id}
     */
    @PutMapping("/{id}")
    public ApiResponse update(@PathVariable Long id, @RequestBody VisitorInfo info) {
        log.info("Update customer: {}", id);
        try {
            info.setId(id);
            int result = visitorInfoMapper.update(info);
            if (result > 0) {
                return ApiResponse.success("更新成功", info);
            } else {
                return ApiResponse.error("更新失败");
            }
        } catch (Exception e) {
            log.error("Error updating customer", e);
            return ApiResponse.error("更新失败: " + e.getMessage());
        }
    }

    /**
     * 删除客户信息
     * DELETE /admin/customer/{id}
     */
    @DeleteMapping("/{id}")
    public ApiResponse delete(@PathVariable Long id) {
        log.info("Delete customer: {}", id);
        try {
            int result = visitorInfoMapper.deleteById(id);
            if (result > 0) {
                return ApiResponse.success("删除成功");
            } else {
                return ApiResponse.error("删除失败");
            }
        } catch (Exception e) {
            log.error("Error deleting customer", e);
            return ApiResponse.error("删除客户失败");
        }
    }
}

