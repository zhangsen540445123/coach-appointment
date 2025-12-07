package com.umxinli.admin.service;

import com.umxinli.admin.dto.PageRequest;
import com.umxinli.admin.dto.PageResponse;
import com.umxinli.entity.User;

public interface AdminVisitorService {
    
    /**
     * 获取用户列表
     */
    PageResponse getList(PageRequest request);
    
    /**
     * 根据ID获取用户
     */
    User getById(Long id);
    
    /**
     * 更新用户信息
     */
    User update(User user) throws Exception;
    
    /**
     * 禁用/启用用户
     */
    boolean toggleStatus(Long id, Integer status);
    
    /**
     * 删除用户
     */
    boolean delete(Long id);
}

