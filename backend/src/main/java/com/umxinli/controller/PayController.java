package com.umxinli.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.service.PayService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pay")
@CrossOrigin
public class PayController {

    private static final Logger log = LoggerFactory.getLogger(PayController.class);

    @Autowired
    private PayService payService;

    /**
     * 获取客户端真实IP地址
     */
    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    /**
     * 获取订单价格（支持优惠券计算）
     * POST /pay/getPrice
     * 请求参数：
     * - orderId: 订单ID（必填）
     * - couponDetailId: 用户优惠券ID（选填，传null表示不使用优惠券）
     */
    @PostMapping("/getPrice")
    public ApiResponse getPrice(@RequestBody Map payload) {
        log.info("Get price request: {}", payload);
        try {
            // 安全地获取订单ID
            Long orderId = null;
            if (payload.get("orderId") != null) {
                orderId = Long.valueOf(payload.get("orderId").toString());
            }

            // 安全地获取优惠券ID（可能为null）
            Long couponDetailId = null;
            if (payload.get("couponDetailId") != null && !"null".equals(payload.get("couponDetailId").toString())) {
                couponDetailId = Long.valueOf(payload.get("couponDetailId").toString());
            }

            if (orderId == null) {
                return ApiResponse.error("订单ID不能为空");
            }

            // 调用服务层计算价格
            Map priceInfo = payService.calculateOrderPrice(orderId, couponDetailId);
            return ApiResponse.success(priceInfo);
        } catch (Exception e) {
            log.error("Error getting price", e);
            return ApiResponse.error("获取价格失败: " + e.getMessage());
        }
    }

    /**
     * 发起支付
     * POST /pay/toPay/{orderId}
     */
    @PostMapping("/toPay/{orderId}")
    public ApiResponse toPay(@PathVariable Long orderId,
                             @RequestBody(required = false) Map payload,
                             HttpServletRequest request) {
        log.info("To pay request for orderId: {}", orderId);
        try {
            String clientIp = getClientIp(request);
            Map payResult = payService.toPay(orderId, clientIp);
            return ApiResponse.success(payResult);
        } catch (Exception e) {
            log.error("Error processing payment", e);
            return ApiResponse.error(e.getMessage());
        }
    }

    /**
     * 批量支付
     * POST /pay/toBatchPay
     */
    @PostMapping("/toBatchPay")
    public ApiResponse toBatchPay(@RequestBody Map payload, HttpServletRequest request) {
        log.info("To batch pay request: {}", payload);
        try {
            String clientIp = getClientIp(request);
            List orderIds = (List) payload.get("orderIds");
            Map payResult = payService.toBatchPay(orderIds, clientIp);
            return ApiResponse.success(payResult);
        } catch (Exception e) {
            log.error("Error processing batch payment", e);
            return ApiResponse.error(e.getMessage());
        }
    }

    /**
     * 支付回调
     * POST /pay/notify
     */
    @PostMapping("/notify")
    public String payNotify(@RequestBody String xmlData) {
        log.info("Pay notify received");
        try {
            boolean result = payService.handlePayNotify(xmlData);
            if (result) {
                return "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>";
            }
        } catch (Exception e) {
            log.error("Error handling pay notify", e);
        }
        return "<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[ERROR]]></return_msg></xml>";
    }

    /**
     * 查询支付状态
     * GET /pay/queryStatus/{orderId}
     */
    @GetMapping("/queryStatus/{orderId}")
    public ApiResponse queryPayStatus(@PathVariable Long orderId) {
        log.info("Query pay status for orderId: {}", orderId);
        try {
            Map statusInfo = payService.queryPayStatus(orderId);
            return ApiResponse.success(statusInfo);
        } catch (Exception e) {
            log.error("Error querying pay status", e);
            return ApiResponse.error("Failed to query pay status");
        }
    }
}

