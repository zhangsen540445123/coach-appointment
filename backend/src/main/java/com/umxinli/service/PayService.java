package com.umxinli.service;

import java.util.List;
import java.util.Map;

public interface PayService {
    
    /**
     * 获取价格信息
     */
    Map getPrice(Long counselorId, Integer consultType, Integer consultWay);
    
    /**
     * 发起支付
     */
    Map toPay(Long orderId) throws Exception;
    
    /**
     * 批量支付
     */
    Map toBatchPay(List orderIds) throws Exception;
    
    /**
     * 处理支付回调
     */
    boolean handlePayNotify(String xmlData) throws Exception;
    
    /**
     * 查询支付状态
     */
    Map queryPayStatus(Long orderId);
}

