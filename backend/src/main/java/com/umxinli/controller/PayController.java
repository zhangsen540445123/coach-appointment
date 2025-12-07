package com.umxinli.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.service.PayService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
     * 获取价格
     * POST /pay/getPrice
     */
    @PostMapping("/getPrice")
    public ApiResponse getPrice(@RequestBody Map payload) {
        log.info("Get price request: {}", payload);
        try {
            Long counselorId = Long.valueOf(payload.get("counselorId").toString());
            Integer consultType = (Integer) payload.get("consultType");
            Integer consultWay = (Integer) payload.get("consultWay");
            
            Map priceInfo = payService.getPrice(counselorId, consultType, consultWay);
            return ApiResponse.success(priceInfo);
        } catch (Exception e) {
            log.error("Error getting price", e);
            return ApiResponse.error("Failed to get price");
        }
    }

    /**
     * 发起支付
     * POST /pay/toPay/{orderId}
     */
    @PostMapping("/toPay/{orderId}")
    public ApiResponse toPay(@PathVariable Long orderId, @RequestBody(required = false) Map payload) {
        log.info("To pay request for orderId: {}", orderId);
        try {
            Map payResult = payService.toPay(orderId);
            return ApiResponse.success(payResult);
        } catch (Exception e) {
            log.error("Error processing payment", e);
            return ApiResponse.error("Failed to process payment");
        }
    }

    /**
     * 批量支付
     * POST /pay/toBatchPay
     */
    @PostMapping("/toBatchPay")
    public ApiResponse toBatchPay(@RequestBody Map payload) {
        log.info("To batch pay request: {}", payload);
        try {
            List orderIds = (List) payload.get("orderIds");
            Map payResult = payService.toBatchPay(orderIds);
            return ApiResponse.success(payResult);
        } catch (Exception e) {
            log.error("Error processing batch payment", e);
            return ApiResponse.error("Failed to process batch payment");
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

