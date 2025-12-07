package com.umxinli.admin.service;

import com.umxinli.admin.dto.PageRequest;
import com.umxinli.admin.dto.PageResponse;
import com.umxinli.admin.entity.AdminUser;
import com.umxinli.admin.entity.CounselorAudit;
import com.umxinli.entity.Counselor;

public interface AdminCounselorService {
    
    /**
     * 获取教练列表（管理员）
     */
    PageResponse getList(PageRequest request);
    
    /**
     * 根据ID获取教练
     */
    Counselor getById(Long id);
    
    /**
     * 创建教练
     */
    Counselor create(Counselor counselor) throws Exception;
    
    /**
     * 更新教练信息（管理员直接更新）
     */
    Counselor updateByAdmin(Counselor counselor) throws Exception;
    
    /**
     * 教练提交资料修改（需审核）
     */
    CounselorAudit submitUpdate(Counselor counselor, AdminUser currentUser) throws Exception;
    
    /**
     * 删除教练
     */
    boolean delete(Long id);
    
    /**
     * 获取待审核列表
     */
    PageResponse getAuditList(PageRequest request, Integer status);
    
    /**
     * 审核教练资料修改
     */
    boolean audit(Long auditId, Integer status, String remark, AdminUser currentUser) throws Exception;
    
    /**
     * 启用/禁用教练
     */
    boolean toggleStatus(Long id, Integer canConsult);
}

