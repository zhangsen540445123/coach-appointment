package com.umxinli.service;

import com.umxinli.entity.ConsultStudio;
import com.umxinli.entity.Counselor;

import java.util.List;
import java.util.Map;

public interface ConsultStudioService {
    
    /**
     * 获取启用的工作室列表（前端用）
     */
    Map<String, Object> getStudioList(int page, int size);
    
    /**
     * 获取工作室详情
     */
    ConsultStudio getStudioById(Long id);
    
    /**
     * 获取工作室下的教练列表
     */
    List<Counselor> getStudioCounselors(Long studioId);
    
    /**
     * 获取所有工作室列表（管理端用）
     */
    List<ConsultStudio> getAllStudios();
    
    /**
     * 创建工作室
     */
    int createStudio(ConsultStudio studio);
    
    /**
     * 更新工作室
     */
    int updateStudio(ConsultStudio studio);
    
    /**
     * 删除工作室
     */
    int deleteStudio(Long id);
    
    /**
     * 切换工作室启用状态
     */
    int toggleEnabled(Long id);
    
    /**
     * 关联教练到工作室
     */
    int bindCounselors(Long studioId, List<Long> counselorIds);
    
    /**
     * 解绑教练
     */
    int unbindCounselor(Long studioId, Long counselorId);
}

