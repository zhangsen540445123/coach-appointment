package com.umxinli.mapper;

import com.umxinli.dto.OrderDTO;
import com.umxinli.entity.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrderMapper {
    Order selectById(@Param("id") Long id);
    OrderDTO selectByIdWithCounselor(@Param("id") Long id);
    int insert(Order order);
    int updateStatus(@Param("id") Long id, @Param("status") int status);
    int updateById(Order order);
    List<Order> selectList(@Param("offset") int offset, @Param("limit") int limit, @Param("status") Integer status);
    List<Order> selectListWithKeyword(@Param("offset") int offset, @Param("limit") int limit, @Param("status") Integer status, @Param("keyword") String keyword);
    List<OrderDTO> selectListWithCounselor(@Param("offset") int offset, @Param("limit") int limit, @Param("status") Integer status, @Param("userId") Long userId);
    int countByStatus(@Param("status") Integer status);
    int countByStatusAndKeyword(@Param("status") Integer status, @Param("keyword") String keyword);
    int updateConsultTime(@Param("orderId") Long orderId, @Param("consultTime") String consultTime);
    int bindVisitor(@Param("orderId") Long orderId, @Param("visitorId") Long visitorId);

    /**
     * 批量取消超时未支付的订单
     * @param timeoutMinutes 超时时间（分钟）
     * @return 取消的订单数量
     */
    int cancelTimeoutOrders(@Param("timeoutMinutes") int timeoutMinutes);

    /**
     * 查询超时未支付的订单ID列表（用于释放教练时段）
     * @param timeoutMinutes 超时时间（分钟）
     * @return 超时订单ID列表
     */
    List<Long> selectTimeoutOrderIds(@Param("timeoutMinutes") int timeoutMinutes);

    /**
     * 检查单个订单是否超时，如果超时则取消
     * @param orderId 订单ID
     * @param timeoutMinutes 超时时间（分钟）
     * @return 更新的行数（0表示未超时或已处理）
     */
    int cancelIfTimeout(@Param("orderId") Long orderId, @Param("timeoutMinutes") int timeoutMinutes);

    /**
     * 查询超时未支付的订单详情列表（用于释放教练时段）
     * @param timeoutMinutes 超时时间（分钟）
     * @return 超时订单列表
     */
    List<Order> selectTimeoutOrders(@Param("timeoutMinutes") int timeoutMinutes);
}
