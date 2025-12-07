package com.umxinli.admin.service.impl;

import com.umxinli.admin.dto.PageRequest;
import com.umxinli.admin.dto.PageResponse;
import com.umxinli.admin.entity.AdminUser;
import com.umxinli.admin.mapper.AdminUserMapper;
import com.umxinli.admin.service.AdminUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.Date;
import java.util.List;

@Service
public class AdminUserServiceImpl implements AdminUserService {

    private static final Logger log = LoggerFactory.getLogger(AdminUserServiceImpl.class);

    @Autowired
    private AdminUserMapper adminUserMapper;

    @Override
    public PageResponse getList(PageRequest request, Integer role) {
        List list = adminUserMapper.selectList(
            request.getOffset(), request.getPageSize(), request.getKeyword(), role);
        int total = adminUserMapper.count(request.getKeyword(), role);
        return new PageResponse(list, total, request.getPage(), request.getPageSize());
    }

    @Override
    public AdminUser getById(Long id) {
        return adminUserMapper.selectById(id);
    }

    @Override
    public AdminUser create(AdminUser user) throws Exception {
        // 检查用户名是否已存在
        AdminUser existing = adminUserMapper.selectByUsername(user.getUsername());
        if (existing != null) {
            throw new Exception("用户名已存在");
        }
        
        // 设置默认值
        user.setId(System.currentTimeMillis());
        user.setPassword(DigestUtils.md5DigestAsHex(user.getPassword().getBytes()));
        user.setStatus(1);
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        
        adminUserMapper.insert(user);
        return user;
    }

    @Override
    public AdminUser update(AdminUser user) throws Exception {
        AdminUser existing = adminUserMapper.selectById(user.getId());
        if (existing == null) {
            throw new Exception("用户不存在");
        }
        
        // 如果修改了用户名，检查是否重复
        if (!existing.getUsername().equals(user.getUsername())) {
            AdminUser byUsername = adminUserMapper.selectByUsername(user.getUsername());
            if (byUsername != null) {
                throw new Exception("用户名已存在");
            }
        }
        
        // 如果传入了新密码，则更新
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            user.setPassword(DigestUtils.md5DigestAsHex(user.getPassword().getBytes()));
        } else {
            user.setPassword(existing.getPassword());
        }
        
        user.setUpdatedAt(new Date());
        adminUserMapper.update(user);
        return user;
    }

    @Override
    public boolean delete(Long id) {
        return adminUserMapper.delete(id) > 0;
    }

    @Override
    public boolean toggleStatus(Long id, Integer status) {
        AdminUser user = adminUserMapper.selectById(id);
        if (user != null) {
            user.setStatus(status);
            user.setUpdatedAt(new Date());
            return adminUserMapper.update(user) > 0;
        }
        return false;
    }
}

