package com.umxinli.service;

import java.util.List;
import java.util.Map;

public interface PayService {

    /**
     * 计算订单价格（支持优惠券）
     * @param orderId 订单ID
     * @param userCouponId 用户优惠券ID（可为null）
     * @return 价格信息，包含原价、优惠金额、最终价格等
     */
    Map calculateOrderPrice(Long orderId, Long userCouponId);

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

    /**
     * 自动退款（用于订单被取消后支付回调到达的情况）
     * @param orderId 订单ID
     * @param transactionId 微信支付交易号
     * @param refundAmount 退款金额
     * @param reason 退款原因
     * @return 退款结果
     */
    boolean autoRefund(Long orderId, String transactionId, java.math.BigDecimal refundAmount, String reason);
}

