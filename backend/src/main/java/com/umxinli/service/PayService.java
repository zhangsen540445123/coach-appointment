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
     * @param orderId 订单ID
     * @param clientIp 客户端IP地址
     * @return 支付参数
     */
    Map toPay(Long orderId, String clientIp) throws Exception;

    /**
     * 批量支付
     * @param orderIds 订单ID列表
     * @param clientIp 客户端IP地址
     * @return 支付参数
     */
    Map toBatchPay(List orderIds, String clientIp) throws Exception;

    /**
     * 处理支付回调
     */
    boolean handlePayNotify(String xmlData) throws Exception;

    /**
     * 查询支付状态
     */
    Map queryPayStatus(Long orderId);
}

