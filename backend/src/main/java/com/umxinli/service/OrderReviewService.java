package com.umxinli.service;

import com.umxinli.entity.OrderReview;
import com.umxinli.admin.dto.PageRequest;
import com.umxinli.admin.dto.PageResponse;

import java.util.List;
import java.util.Map;

public interface OrderReviewService {
    
    /**
     * 根据ID获取评价
     */
    OrderReview getById(Long id);
    
    /**
     * 根据订单ID获取评价
     */
    OrderReview getByOrderId(Long orderId);
    
    /**
     * 获取评价列表
     */
    PageResponse getList(PageRequest request, Long counselorId, Long userId, Integer isVisible);
    
    /**
     * 按教练分组统计评价
     */
    List<Map<String, Object>> countByCounselor();
    
    /**
     * 获取教练的评价统计
     */
    Map<String, Object> getCounselorStats(Long counselorId);
    
    /**
     * 用户提交评价
     */
    OrderReview submitReview(Long orderId, Long userId, Integer rating, String content, List<String> images) throws Exception;
    
    /**
     * 更新置顶状态
     */
    boolean updateIsTop(Long id, Integer isTop);
    
    /**
     * 更新显示状态
     */
    boolean updateIsVisible(Long id, Integer isVisible);
    
    /**
     * 教练回复评价
     */
    boolean replyReview(Long id, String replyContent, Long counselorId) throws Exception;
    
    /**
     * 删除评价
     */
    boolean delete(Long id);
}

