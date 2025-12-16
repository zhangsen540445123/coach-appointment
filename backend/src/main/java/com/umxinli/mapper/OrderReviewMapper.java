package com.umxinli.mapper;

import com.umxinli.entity.OrderReview;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface OrderReviewMapper {
    
    OrderReview selectById(@Param("id") Long id);
    
    OrderReview selectByOrderId(@Param("orderId") Long orderId);
    
    /**
     * 查询评价列表（带关联信息）
     */
    List<OrderReview> selectList(@Param("offset") int offset, @Param("limit") int limit,
                                  @Param("counselorId") Long counselorId, @Param("userId") Long userId,
                                  @Param("isVisible") Integer isVisible);
    
    /**
     * 统计评价数量
     */
    int count(@Param("counselorId") Long counselorId, @Param("userId") Long userId, 
              @Param("isVisible") Integer isVisible);
    
    /**
     * 按教练分组统计评价
     */
    List<Map<String, Object>> countByCounselor();
    
    /**
     * 获取教练的评价统计
     */
    Map<String, Object> getCounselorStats(@Param("counselorId") Long counselorId);
    
    int insert(OrderReview review);
    
    int update(OrderReview review);
    
    /**
     * 更新置顶状态
     */
    int updateIsTop(@Param("id") Long id, @Param("isTop") Integer isTop);
    
    /**
     * 更新显示状态
     */
    int updateIsVisible(@Param("id") Long id, @Param("isVisible") Integer isVisible);
    
    /**
     * 教练回复评价
     */
    int updateReply(@Param("id") Long id, @Param("replyContent") String replyContent);
    
    int delete(@Param("id") Long id);
}

