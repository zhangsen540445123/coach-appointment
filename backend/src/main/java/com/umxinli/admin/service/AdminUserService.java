package com.umxinli.admin.service;

import com.umxinli.admin.dto.PageRequest;
import com.umxinli.admin.dto.PageResponse;
import com.umxinli.admin.entity.AdminUser;

public interface AdminUserService {
    
    /**
     * 获取用户列表
     */
    PageResponse getList(PageRequest request, Integer role);
    
    /**
     * 根据ID获取用户
     */
    AdminUser getById(Long id);
    
    /**
     * 创建用户
     */
    AdminUser create(AdminUser user) throws Exception;
    
    /**
     * 更新用户
     */
    AdminUser update(AdminUser user) throws Exception;
    
    /**
     * 删除用户
     */
    boolean delete(Long id);
    
    /**
     * 启用/禁用用户
     */
    boolean toggleStatus(Long id, Integer status);
}

