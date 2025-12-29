package com.umxinli.task;

import com.umxinli.entity.Order;
import com.umxinli.mapper.OrderMapper;
import com.umxinli.mapper.CounselorCalendarMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * 订单定时任务
 * 用于处理订单超时自动取消等定时任务
 */
@Component
public class OrderScheduledTask {

    private static final Logger log = LoggerFactory.getLogger(OrderScheduledTask.class);

    /** 订单支付超时时间（分钟） */
    private static final int ORDER_TIMEOUT_MINUTES = 30;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired(required = false)
    private CounselorCalendarMapper counselorCalendarMapper;

    /**
     * 定时任务：每5分钟批量取消超时未支付的订单
     * 作为懒取消机制的兜底，确保长期不被查询的订单也能被取消
     * 同时释放教练的预约时段
     */
    @Scheduled(fixedRate = 5 * 60 * 1000, initialDelay = 60 * 1000)
    @Transactional
    public void cancelTimeoutOrders() {
        log.info("Starting scheduled task: cancel timeout orders");
        try {
            // 1. 先查询超时订单详情（用于后续释放教练时段）
            List<Order> timeoutOrders = orderMapper.selectTimeoutOrders(ORDER_TIMEOUT_MINUTES);

            if (timeoutOrders.isEmpty()) {
                log.debug("No timeout orders found");
                return;
            }

            log.info("Found {} timeout orders to cancel", timeoutOrders.size());

            // 2. 批量取消超时订单
            int cancelled = orderMapper.cancelTimeoutOrders(ORDER_TIMEOUT_MINUTES);

            if (cancelled > 0) {
                log.info("Successfully cancelled {} timeout orders", cancelled);

                // 3. 释放教练的预约时段
                releaseCoachCalendarSlots(timeoutOrders);
            }
        } catch (Exception e) {
            log.error("Error in scheduled task: cancel timeout orders", e);
        }
    }

    /**
     * 释放教练的预约时段
     * @param cancelledOrders 被取消的订单列表
     */
    private void releaseCoachCalendarSlots(List<Order> cancelledOrders) {
        if (counselorCalendarMapper == null) {
            log.warn("CounselorCalendarMapper not available, skipping slot release");
            return;
        }

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm");
        int releasedCount = 0;

        for (Order order : cancelledOrders) {
            try {
                Long counselorId = order.getCounselorId();
                Date consultTime = order.getConsultTime();

                if (counselorId == null || consultTime == null) {
                    log.debug("Order {} has no counselor or consult time, skipping", order.getId());
                    continue;
                }

                String date = dateFormat.format(consultTime);
                String startTime = timeFormat.format(consultTime);

                int released = counselorCalendarMapper.releaseSlot(counselorId, date, startTime);
                if (released > 0) {
                    releasedCount++;
                    log.info("Released coach slot: counselorId={}, date={}, time={}",
                            counselorId, date, startTime);
                }
            } catch (Exception e) {
                log.error("Error releasing slot for order {}", order.getId(), e);
            }
        }

        if (releasedCount > 0) {
            log.info("Released {} coach slots in total", releasedCount);
        }
    }

    /**
     * 定时任务：每天凌晨2点清理历史超时订单数据（可选）
     * 用于数据统计和清理
     */
    @Scheduled(cron = "0 0 2 * * ?")
    public void dailyOrderCleanup() {
        log.info("Starting daily order cleanup task");
        try {
            // 再次确保没有遗漏的超时订单
            int cancelled = orderMapper.cancelTimeoutOrders(ORDER_TIMEOUT_MINUTES);
            if (cancelled > 0) {
                log.info("Daily cleanup: cancelled {} timeout orders", cancelled);
            }
        } catch (Exception e) {
            log.error("Error in daily order cleanup task", e);
        }
    }
}

