package com.umxinli.admin.mapper;

import com.umxinli.admin.entity.CounselorAudit;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CounselorAuditMapper {
    
    CounselorAudit selectById(@Param("id") Long id);
    
    List selectByCounselorId(@Param("counselorId") Long counselorId);
    
    List selectList(@Param("offset") int offset, @Param("limit") int limit,
                                    @Param("status") Integer status, @Param("counselorId") Long counselorId);
    
    int count(@Param("status") Integer status, @Param("counselorId") Long counselorId);
    
    CounselorAudit selectPendingByCounselorId(@Param("counselorId") Long counselorId);
    
    int insert(CounselorAudit audit);
    
    int updateStatus(@Param("id") Long id, @Param("status") Integer status,
                     @Param("auditedBy") Long auditedBy, @Param("auditRemark") String auditRemark);
}

