-- 更新优惠券表结构，添加教练范围相关字段
-- 执行此脚本前请备份数据库

-- 删除旧的 coupon 表（如果存在）
DROP TABLE IF EXISTS `coupon`;

-- 重新创建 coupon 表，包含所有必需字段
CREATE TABLE `coupon` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '优惠券ID',
  `name` VARCHAR(200) NOT NULL COMMENT '优惠券名称',
  `type` INT NOT NULL COMMENT '优惠类型 1-满减券 2-抵扣券',
  `discount_amount` DECIMAL(10, 2) NOT NULL COMMENT '优惠金额',
  `min_amount` DECIMAL(10, 2) DEFAULT 0 COMMENT '满减门槛（仅满减券）',
  `coach_scope` INT DEFAULT 1 COMMENT '适用范围 1-全部教练 2-指定教练',
  `coach_ids` JSON COMMENT '指定教练ID列表（JSON数组）',
  `start_time` DATETIME COMMENT '有效期开始时间',
  `end_time` DATETIME COMMENT '有效期结束时间',
  `status` INT DEFAULT 1 COMMENT '状态 0-停用 1-启用',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_status (status),
  INDEX idx_type (type),
  INDEX idx_coach_scope (coach_scope)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='优惠券模板表';

-- 更新 user_coupon 表结构（如果需要）
DROP TABLE IF EXISTS `user_coupon`;
CREATE TABLE `user_coupon` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '用户优惠券ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `coupon_id` BIGINT NOT NULL COMMENT '优惠券ID',
  `status` INT DEFAULT 0 COMMENT '状态 0-未使用 1-已使用 2-已过期',
  `receive_type` INT DEFAULT 1 COMMENT '领取方式 1-推送 2-兑换码',
  `used_at` DATETIME COMMENT '使用时间',
  `order_id` BIGINT COMMENT '使用的订单ID',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  INDEX idx_user_id (user_id),
  INDEX idx_coupon_id (coupon_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户优惠券表';

