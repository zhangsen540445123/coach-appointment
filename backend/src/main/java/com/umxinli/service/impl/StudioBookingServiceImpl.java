package com.umxinli.service.impl;

import com.umxinli.entity.ConsultStudio;
import com.umxinli.entity.StudioBooking;
import com.umxinli.entity.User;
import com.umxinli.entity.WxPayConfig;
import com.umxinli.mapper.ConsultStudioMapper;
import com.umxinli.mapper.StudioBookingMapper;
import com.umxinli.mapper.UserMapper;
import com.umxinli.mapper.WxPayConfigMapper;
import com.umxinli.service.StudioBookingService;
import com.umxinli.util.WxPayUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StudioBookingServiceImpl implements StudioBookingService {

    private static final Logger log = LoggerFactory.getLogger(StudioBookingServiceImpl.class);
    private static final String UNIFIED_ORDER_URL = "https://api.mch.weixin.qq.com/pay/unifiedorder";

    @Autowired
    private StudioBookingMapper bookingMapper;

    @Autowired
    private ConsultStudioMapper studioMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private WxPayConfigMapper wxPayConfigMapper;

    @Override
    @Transactional
    public Map<String, Object> bookStudio(Long studioId, Long userId, String clientIp) throws Exception {
        log.info("User {} booking studio {}", userId, studioId);

        // 1. 校验活动是否存在
        ConsultStudio studio = studioMapper.selectById(studioId);
        if (studio == null) {
            throw new Exception("活动不存在");
        }

        // 2. 校验活动是否支持线上预约
        if (studio.getBookingType() == null || studio.getBookingType() == 0) {
            throw new Exception("该活动不支持线上预约，请电话预约");
        }

        // 3. 校验用户是否已登录并绑定手机号
        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new Exception("用户不存在");
        }
        if (user.getPhone() == null || user.getPhone().isEmpty()) {
            throw new Exception("请先绑定手机号");
        }

        // 4. 校验是否已预约
        StudioBooking existingBooking = bookingMapper.selectByStudioAndUser(studioId, userId);
        if (existingBooking != null && existingBooking.getStatus() != 2) {
            throw new Exception("您已预约过该活动");
        }

        // 5. 校验活动是否已满员
        if (studio.getMaxParticipants() != null && studio.getMaxParticipants() > 0) {
            int currentCount = bookingMapper.countByStudioIdAndStatus(studioId, 1);
            if (currentCount >= studio.getMaxParticipants()) {
                throw new Exception("活动已满员");
            }
        }

        // 6. 创建预约记录
        StudioBooking booking = new StudioBooking();
        booking.setStudioId(studioId);
        booking.setUserId(userId);
        booking.setPrice(studio.getPrice() != null ? studio.getPrice() : BigDecimal.ZERO);

        Map<String, Object> result = new HashMap<>();

        // 7. 判断是否免费活动
        if (booking.getPrice().compareTo(BigDecimal.ZERO) == 0) {
            // 免费活动，直接预约成功
            booking.setStatus(1);
            booking.setPaymentTime(new Date());
            bookingMapper.insert(booking);

            result.put("success", true);
            result.put("message", "预约成功");
            result.put("bookingId", booking.getId());
            result.put("needPay", false);
        } else {
            // 收费活动，创建待支付订单
            String orderNo = "STUDIO" + System.currentTimeMillis();
            booking.setOrderNo(orderNo);
            booking.setStatus(0);
            bookingMapper.insert(booking);

            // 调用支付接口
            Map<String, Object> payParams = createPayment(booking, user, studio, clientIp);

            result.put("success", true);
            result.put("message", "请完成支付");
            result.put("bookingId", booking.getId());
            result.put("needPay", true);
            result.put("payParams", payParams);
        }

        return result;
    }

    private Map<String, Object> createPayment(StudioBooking booking, User user, ConsultStudio studio, String clientIp) throws Exception {
        // 获取微信支付配置
        WxPayConfig config = wxPayConfigMapper.selectEnabled();
        if (config == null) {
            throw new Exception("微信支付未配置");
        }

        String openid = user.getOpenid();
        if (openid == null || openid.isEmpty()) {
            throw new Exception("用户未绑定微信，无法支付");
        }

        // 金额转换为分
        int totalFee = booking.getPrice().multiply(new BigDecimal("100")).intValue();
        String outTradeNo = booking.getOrderNo();
        String spbillCreateIp = (clientIp != null && !clientIp.isEmpty()) ? clientIp : "127.0.0.1";

        // 构建统一下单参数
        Map<String, String> params = new HashMap<>();
        params.put("appid", config.getAppId());
        params.put("mch_id", config.getMchId());
        params.put("nonce_str", WxPayUtil.generateNonceStr());
        params.put("body", "活动预约-" + studio.getStudioName());
        params.put("out_trade_no", outTradeNo);
        params.put("total_fee", String.valueOf(totalFee));
        params.put("spbill_create_ip", spbillCreateIp);
        params.put("notify_url", config.getNotifyUrl());
        params.put("trade_type", "JSAPI");
        params.put("openid", openid);

        // 生成签名
        String sign = WxPayUtil.signMD5(params, config.getApiKey());
        params.put("sign", sign);

        // 调用微信统一下单API
        String xmlRequest = WxPayUtil.mapToXml(params);
        String xmlResponse = WxPayUtil.httpPost(UNIFIED_ORDER_URL, xmlRequest);
        Map<String, String> responseMap = WxPayUtil.xmlToMap(xmlResponse);

        if (!"SUCCESS".equals(responseMap.get("return_code"))) {
            throw new Exception("微信支付请求失败: " + responseMap.get("return_msg"));
        }

        if (!"SUCCESS".equals(responseMap.get("result_code"))) {
            throw new Exception("微信支付下单失败: " + responseMap.get("err_code_des"));
        }

        String prepayId = responseMap.get("prepay_id");

        // 生成小程序调起支付的参数
        Map<String, String> payParams = new HashMap<>();
        payParams.put("appId", config.getAppId());
        payParams.put("timeStamp", String.valueOf(System.currentTimeMillis() / 1000));
        payParams.put("nonceStr", WxPayUtil.generateNonceStr());
        payParams.put("package", "prepay_id=" + prepayId);
        payParams.put("signType", "MD5");

        String paySign = WxPayUtil.signMD5(payParams, config.getApiKey());
        payParams.put("paySign", paySign);

        Map<String, Object> result = new HashMap<>();
        result.put("timeStamp", payParams.get("timeStamp"));
        result.put("nonceStr", payParams.get("nonceStr"));
        result.put("packageValue", payParams.get("package"));
        result.put("signType", payParams.get("signType"));
        result.put("paySign", paySign);

        return result;
    }

    @Override
    public StudioBooking getBookingStatus(Long studioId, Long userId) {
        return bookingMapper.selectByStudioAndUser(studioId, userId);
    }

    @Override
    @Transactional
    public boolean cancelBooking(Long bookingId, Long userId) throws Exception {
        StudioBooking booking = bookingMapper.selectById(bookingId);
        if (booking == null) {
            throw new Exception("预约记录不存在");
        }

        if (!booking.getUserId().equals(userId)) {
            throw new Exception("无权取消此预约");
        }

        if (booking.getStatus() == 2) {
            throw new Exception("预约已取消");
        }

        if (booking.getStatus() == 1 && booking.getPrice().compareTo(BigDecimal.ZERO) > 0) {
            throw new Exception("已支付的预约暂不支持取消，请联系客服");
        }

        booking.setStatus(2);
        bookingMapper.update(booking);
        return true;
    }

    @Override
    public List<StudioBooking> getUserBookings(Long userId) {
        return bookingMapper.selectByUserId(userId);
    }

    @Override
    public List<StudioBooking> getStudioBookings(Long studioId, int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        return bookingMapper.selectByStudioId(studioId, offset, pageSize);
    }

    @Override
    public int getBookingCount(Long studioId) {
        return bookingMapper.countByStudioId(studioId);
    }

    @Override
    @Transactional
    public Map<String, Object> payBooking(Long bookingId, String clientIp) throws Exception {
        StudioBooking booking = bookingMapper.selectById(bookingId);
        if (booking == null) {
            throw new Exception("预约记录不存在");
        }

        if (booking.getStatus() != 0) {
            throw new Exception("预约状态异常");
        }

        ConsultStudio studio = studioMapper.selectById(booking.getStudioId());
        User user = userMapper.selectById(booking.getUserId());

        return createPayment(booking, user, studio, clientIp);
    }

    @Override
    @Transactional
    public boolean handleBookingPayNotify(String orderNo) throws Exception {
        StudioBooking booking = bookingMapper.selectByOrderNo(orderNo);
        if (booking == null) {
            log.error("预约记录不存在: orderNo={}", orderNo);
            return false;
        }

        if (booking.getStatus() == 1) {
            log.info("预约已支付，跳过重复回调: orderNo={}", orderNo);
            return true;
        }

        booking.setStatus(1);
        booking.setPaymentTime(new Date());
        bookingMapper.update(booking);

        log.info("活动预约支付成功: bookingId={}, orderNo={}", booking.getId(), orderNo);
        return true;
    }
}

