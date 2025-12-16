package com.umxinli.service.impl;

import com.umxinli.admin.dto.PageRequest;
import com.umxinli.admin.dto.PageResponse;
import com.umxinli.entity.Order;
import com.umxinli.entity.OrderReview;
import com.umxinli.mapper.OrderMapper;
import com.umxinli.mapper.OrderReviewMapper;
import com.umxinli.service.OrderReviewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class OrderReviewServiceImpl implements OrderReviewService {
    
    private static final Logger log = LoggerFactory.getLogger(OrderReviewServiceImpl.class);
    
    @Autowired
    private OrderReviewMapper orderReviewMapper;
    
    @Autowired
    private OrderMapper orderMapper;
    
    @Override
    public OrderReview getById(Long id) {
        return orderReviewMapper.selectById(id);
    }
    
    @Override
    public OrderReview getByOrderId(Long orderId) {
        return orderReviewMapper.selectByOrderId(orderId);
    }
    
    @Override
    public PageResponse getList(PageRequest request, Long counselorId, Long userId, Integer isVisible) {
        List<OrderReview> list = orderReviewMapper.selectList(request.getOffset(), request.getPageSize(), 
                counselorId, userId, isVisible);
        int total = orderReviewMapper.count(counselorId, userId, isVisible);
        return new PageResponse(list, total, request.getPage(), request.getPageSize());
    }
    
    @Override
    public List<Map<String, Object>> countByCounselor() {
        return orderReviewMapper.countByCounselor();
    }
    
    @Override
    public Map<String, Object> getCounselorStats(Long counselorId) {
        return orderReviewMapper.getCounselorStats(counselorId);
    }
    
    @Override
    @Transactional
    public OrderReview submitReview(Long orderId, Long userId, Integer rating, String content, List<String> images, Integer isAnonymous) throws Exception {
        // 检查订单是否存在
        Order order = orderMapper.selectById(orderId);
        if (order == null) {
            throw new Exception("订单不存在");
        }

        // 检查订单是否属于该用户
        if (!order.getUserId().equals(userId)) {
            throw new Exception("无权评价此订单");
        }

        // 检查订单状态是否已完成（状态3=已完成）
        if (order.getStatus() != 3) {
            throw new Exception("只能评价已完成的订单");
        }

        // 检查是否已评价
        OrderReview existingReview = orderReviewMapper.selectByOrderId(orderId);
        if (existingReview != null) {
            throw new Exception("该订单已评价");
        }

        // 创建评价
        OrderReview review = new OrderReview();
        review.setOrderId(orderId);
        review.setOrderNo(order.getOrderNo());
        review.setUserId(userId);
        review.setCounselorId(order.getCounselorId());
        review.setRating(rating);
        review.setContent(content);
        review.setImages(images);
        review.setIsAnonymous(isAnonymous != null ? isAnonymous : 0);

        orderReviewMapper.insert(review);
        log.info("用户 {} 对订单 {} 提交了评价，匿名状态: {}", userId, orderId, isAnonymous);

        return review;
    }
    
    @Override
    public boolean updateIsTop(Long id, Integer isTop) {
        return orderReviewMapper.updateIsTop(id, isTop) > 0;
    }
    
    @Override
    public boolean updateIsVisible(Long id, Integer isVisible) {
        return orderReviewMapper.updateIsVisible(id, isVisible) > 0;
    }
    
    @Override
    @Transactional
    public boolean replyReview(Long id, String replyContent, Long counselorId) throws Exception {
        OrderReview review = orderReviewMapper.selectById(id);
        if (review == null) {
            throw new Exception("评价不存在");
        }
        
        // 检查是否是该教练的评价
        if (!review.getCounselorId().equals(counselorId)) {
            throw new Exception("无权回复此评价");
        }
        
        return orderReviewMapper.updateReply(id, replyContent) > 0;
    }
    
    @Override
    public boolean delete(Long id) {
        return orderReviewMapper.delete(id) > 0;
    }
}

