package com.umxinli.mapper;

import com.umxinli.entity.PaymentRecord;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PaymentRecordMapper {
    
    /**
     * 根据ID查询
     */
    PaymentRecord selectById(@Param("id") Long id);
    
    /**
     * 根据订单ID查询
     */
    PaymentRecord selectByOrderId(@Param("orderId") Long orderId);
    
    /**
     * 根据商户订单号查询
     */
    PaymentRecord selectByOutTradeNo(@Param("outTradeNo") String outTradeNo);
    
    /**
     * 根据微信交易号查询
     */
    PaymentRecord selectByTransactionId(@Param("transactionId") String transactionId);
    
    /**
     * 插入记录
     */
    int insert(PaymentRecord record);
    
    /**
     * 更新记录
     */
    int update(PaymentRecord record);
    
    /**
     * 根据订单ID更新状态
     */
    int updateStatusByOrderId(@Param("orderId") Long orderId, @Param("status") Integer status);
}

