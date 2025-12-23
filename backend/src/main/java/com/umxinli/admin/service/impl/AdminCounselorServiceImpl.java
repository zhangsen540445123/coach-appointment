package com.umxinli.admin.service.impl;

import com.alibaba.fastjson2.JSON;
import com.umxinli.admin.dto.PageRequest;
import com.umxinli.admin.dto.PageResponse;
import com.umxinli.admin.entity.AdminUser;
import com.umxinli.admin.entity.CounselorAudit;
import com.umxinli.admin.mapper.CounselorAuditMapper;
import com.umxinli.admin.service.AdminCounselorService;
import com.umxinli.entity.Counselor;
import com.umxinli.mapper.CounselorMapper;
import com.umxinli.service.CounselorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class AdminCounselorServiceImpl implements AdminCounselorService {

    private static final Logger log = LoggerFactory.getLogger(AdminCounselorServiceImpl.class);

    @Autowired
    private CounselorMapper counselorMapper;

    @Autowired
    private CounselorAuditMapper counselorAuditMapper;

    @Autowired
    private CounselorService counselorService;

    @Override
    public PageResponse getList(PageRequest request) {
        String keyword = request.getKeyword();
        List list;

        // 如果有搜索关键词，使用过滤查询
        if (keyword != null && !keyword.trim().isEmpty()) {
            list = counselorMapper.selectByFilter(keyword, null, 1000, 0);
        } else {
            list = counselorMapper.selectAll();
        }

        int total = list.size();
        // 简单分页处理
        int start = request.getOffset();
        int end = Math.min(start + request.getPageSize(), total);
        List pageList = list.subList(start, end);
        return new PageResponse(pageList, total, request.getPage(), request.getPageSize());
    }

    @Override
    public Counselor getById(Long id) {
        return counselorMapper.selectById(id);
    }

    @Override
    public Counselor create(Counselor counselor) throws Exception {
        counselor.setId(System.currentTimeMillis());
        counselorMapper.insert(counselor);
        return counselor;
    }

    @Override
    public Counselor updateByAdmin(Counselor counselor) throws Exception {
        Counselor existing = counselorMapper.selectById(counselor.getId());
        if (existing == null) {
            throw new Exception("教练不存在");
        }
        // 使用 CounselorService 更新，确保清除缓存
        counselorService.updateCounselor(counselor);
        return counselor;
    }

    @Override
    @Transactional
    public CounselorAudit submitUpdate(Counselor counselor, AdminUser currentUser) throws Exception {
        Counselor existing = counselorMapper.selectById(counselor.getId());
        if (existing == null) {
            throw new Exception("教练不存在");
        }
        
        // 检查是否有待审核的记录
        CounselorAudit pending = counselorAuditMapper.selectPendingByCounselorId(counselor.getId());
        if (pending != null) {
            throw new Exception("已有待审核的修改记录，请等待审核完成");
        }
        
        // 创建审核记录
        CounselorAudit audit = new CounselorAudit();
        audit.setId(System.currentTimeMillis());
        audit.setCounselorId(counselor.getId());
        audit.setBeforeData(JSON.toJSONString(existing));
        audit.setAfterData(JSON.toJSONString(counselor));
        audit.setAuditStatus(CounselorAudit.STATUS_PENDING);
        audit.setSubmittedBy(currentUser.getId());
        audit.setSubmittedAt(new Date());
        audit.setCreatedAt(new Date());
        audit.setUpdatedAt(new Date());
        
        counselorAuditMapper.insert(audit);
        return audit;
    }

    @Override
    public boolean delete(Long id) {
        return counselorMapper.delete(id) > 0;
    }

    @Override
    public PageResponse getAuditList(PageRequest request, Integer status) {
        List list = counselorAuditMapper.selectList(
            request.getOffset(), request.getPageSize(), status, null);
        int total = counselorAuditMapper.count(status, null);
        return new PageResponse(list, total, request.getPage(), request.getPageSize());
    }

    @Override
    @Transactional
    public boolean audit(Long auditId, Integer status, String remark, AdminUser currentUser) throws Exception {
        CounselorAudit audit = counselorAuditMapper.selectById(auditId);
        if (audit == null) {
            throw new Exception("审核记录不存在");
        }
        if (audit.getAuditStatus() != CounselorAudit.STATUS_PENDING) {
            throw new Exception("该记录已审核");
        }

        // 如果审核通过，更新教练信息
        if (status == CounselorAudit.STATUS_APPROVED) {
            Counselor counselor = JSON.parseObject(audit.getAfterData(), Counselor.class);
            // 使用 CounselorService 更新，确保清除缓存
            // CounselorServiceImpl.updateCounselor() 有 @CacheEvict 注解
            log.info("审核通过，更新教练信息并清除缓存，counselorId: {}", counselor.getId());
            counselorService.updateCounselor(counselor);
        }

        // 更新审核状态
        counselorAuditMapper.updateStatus(auditId, status, currentUser.getId(), remark);
        return true;
    }

    @Override
    public boolean toggleStatus(Long id, Integer canConsult) {
        Counselor counselor = counselorMapper.selectById(id);
        if (counselor != null) {
            counselor.setCanConsult(canConsult);
            // 使用 CounselorService 更新，确保清除缓存
            return counselorService.updateCounselor(counselor) > 0;
        }
        return false;
    }

    @Override
    public boolean setTop(Long id, Integer isTop) {
        Counselor counselor = counselorMapper.selectById(id);
        if (counselor != null) {
            counselor.setIsTop(isTop);
            // 如果置顶，设置一个较高的排序权重
            if (isTop == 1) {
                counselor.setSortOrder(100);
            } else {
                counselor.setSortOrder(0);
            }
            // 使用 CounselorService 更新，确保清除缓存
            return counselorService.updateCounselor(counselor) > 0;
        }
        return false;
    }
}

