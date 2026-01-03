-- 活动表改造：添加价格和预约方式字段
ALTER TABLE `consult_studio` 
ADD COLUMN `price` DECIMAL(10, 2) DEFAULT 0 COMMENT '活动价格，0表示免费',
ADD COLUMN `booking_type` INT DEFAULT 1 COMMENT '预约方式：0=仅电话预约，1=支持线上预约，2=两者都支持',
ADD COLUMN `max_participants` INT DEFAULT 0 COMMENT '最大参与人数，0表示不限制';

-- 创建活动预约表
CREATE TABLE IF NOT EXISTS `studio_booking` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '预约ID',
  `studio_id` BIGINT NOT NULL COMMENT '活动ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `order_no` VARCHAR(50) COMMENT '订单号（收费活动）',
  `status` INT DEFAULT 0 COMMENT '预约状态：0=待支付，1=已支付/预约成功，2=已取消',
  `price` DECIMAL(10, 2) DEFAULT 0 COMMENT '实际支付金额',
  `payment_time` TIMESTAMP NULL COMMENT '支付时间',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '预约时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_studio_id (studio_id),
  INDEX idx_user_id (user_id),
  INDEX idx_order_no (order_no),
  INDEX idx_status (status),
  UNIQUE KEY uk_studio_user (studio_id, user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='活动预约表';

-- 优惠券表改造：添加类型和适用范围字段
ALTER TABLE `coupon`
ADD COLUMN `coupon_type` INT DEFAULT 0 COMMENT '优惠券类型：0=教练咨询优惠券，1=活动优惠券',
ADD COLUMN `applicable_studio_id` BIGINT NULL COMMENT '适用活动ID，NULL表示适用所有活动';

