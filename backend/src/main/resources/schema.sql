-- 用户表
CREATE TABLE IF NOT EXISTS `user` (
  `id` BIGINT PRIMARY KEY COMMENT '用户ID',
  `openid` VARCHAR(100)  COMMENT 'openid',
  `phone` VARCHAR(20) UNIQUE COMMENT '手机号',
  `name` VARCHAR(100) COMMENT '用户名',
  `avatar` VARCHAR(500) COMMENT '头像URL',
  `gender` INT COMMENT '性别 0-未知 1-男 2-女',
  `city` VARCHAR(100) COMMENT '城市',
  `province` VARCHAR(100) COMMENT '省份',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_phone (phone),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 教练表
CREATE TABLE IF NOT EXISTS `counselor` (
  `id` BIGINT PRIMARY KEY COMMENT '教练ID',
  `name` VARCHAR(100) NOT NULL COMMENT '教练名称',
  `gender` INT COMMENT '性别 0-未知 1-男 2-女',
  `head_url` VARCHAR(500) COMMENT '头像URL',
  `head_url_square` VARCHAR(500) COMMENT '方形头像URL',
  `qualifications` JSON COMMENT '资格证书列表',
  `directions` JSON COMMENT '咨询方向列表',
  `introduction` LONGTEXT COMMENT '个人介绍',
  `consult_price` DECIMAL(10, 2) COMMENT '咨询价格',
  `service_type` INT COMMENT '服务类型 1-线上 2-线下 3-混合',
  `star_num` INT DEFAULT 0 COMMENT '星级评分',
  `consult_type` JSON COMMENT '咨询类型列表',
  `support_online_consult` INT DEFAULT 1 COMMENT '是否支持在线咨询',
  `support_offline_consult` INT DEFAULT 0 COMMENT '是否支持线下咨询',
  `can_consult` INT DEFAULT 1 COMMENT '是否可咨询',
  `experience_date` DATE COMMENT '从业日期',
  `experience_time` VARCHAR(50) COMMENT '从业时长',
  `city_name` VARCHAR(100) COMMENT '城市名称',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_name (name),
  INDEX idx_service_type (service_type),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='教练表';

-- 咨询订单表
CREATE TABLE IF NOT EXISTS `consult_order` (
  `id` BIGINT PRIMARY KEY COMMENT '订单ID',
  `order_no` VARCHAR(50) UNIQUE NOT NULL COMMENT '订单号',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `counselor_id` BIGINT NOT NULL COMMENT '教练ID',
  `consult_type` INT COMMENT '咨询类型',
  `consult_way` INT COMMENT '咨询方式 0-网络 1-线下 2-混合',
  `price` DECIMAL(10, 2) COMMENT '价格',
  `status` INT DEFAULT 0 COMMENT '订单状态 0-待支付 1-已支付 2-进行中 3-已完成 4-已取消',
  `payment_time` TIMESTAMP NULL COMMENT '支付时间',
  `consult_time` TIMESTAMP NULL COMMENT '咨询时间',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_user_id (user_id),
  INDEX idx_counselor_id (counselor_id),
  INDEX idx_order_no (order_no),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='咨询订单表';

-- 城市表
CREATE TABLE IF NOT EXISTS `city` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '城市ID',
  `name` VARCHAR(100) NOT NULL COMMENT '城市名称',
  `province` VARCHAR(100) NOT NULL COMMENT '省份',
  `value` VARCHAR(100) COMMENT '城市编码',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  INDEX idx_province (province),
  INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='城市表';

-- 轮播图表
CREATE TABLE IF NOT EXISTS `carousel` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '轮播图ID',
  `title` VARCHAR(200) COMMENT '标题',
  `image_url` VARCHAR(500) COMMENT '图片URL',
  `link_url` VARCHAR(500) COMMENT '链接URL',
  `sort_order` INT DEFAULT 0 COMMENT '排序',
  `status` INT DEFAULT 1 COMMENT '状态 0-禁用 1-启用',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_status (status),
  INDEX idx_sort_order (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='轮播图表';

-- 全局设置表
CREATE TABLE IF NOT EXISTS `global_settings` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '设置ID',
  `key_name` VARCHAR(100) UNIQUE NOT NULL COMMENT '设置键',
  `value` LONGTEXT COMMENT '设置值',
  `description` VARCHAR(500) COMMENT '描述',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_key_name (key_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='全局设置表';

-- 客户信息表
CREATE TABLE IF NOT EXISTS `visitor_info` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '客户信息ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `name` VARCHAR(100) COMMENT '真实姓名',
  `age` INT COMMENT '年龄',
  `sex` INT COMMENT '性别 0-女 1-男',
  `other_city` VARCHAR(100) COMMENT '现居城市',
  `other_career` VARCHAR(100) COMMENT '职业',
  `other_marrage` VARCHAR(50) COMMENT '情感状态',
  `other_children` VARCHAR(50) COMMENT '有无子女',
  `other_income` TEXT COMMENT '教练目标',
  `other_um` INT DEFAULT 0 COMMENT '是否是只管去做成长会会员 0否 1是',
  `consult_other` INT DEFAULT 0 COMMENT '是否有过教练对话 0否 1是',
  `realize_channel` INT COMMENT '来源渠道 1-只管去做成长会 2-公众号 3-悦行活动 4-朋友推荐 5-其他',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_user_id (user_id),
  UNIQUE KEY uk_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='客户信息表';

-- 优惠券表
CREATE TABLE IF NOT EXISTS `coupon` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '优惠券ID',
  `code` VARCHAR(50) UNIQUE NOT NULL COMMENT '优惠券码',
  `name` VARCHAR(200) COMMENT '优惠券名称',
  `discount_type` INT COMMENT '折扣类型 1-固定金额 2-百分比',
  `discount_value` DECIMAL(10, 2) COMMENT '折扣值',
  `min_amount` DECIMAL(10, 2) COMMENT '最小使用金额',
  `max_amount` DECIMAL(10, 2) COMMENT '最大使用金额',
  `valid_from` DATE COMMENT '有效期开始',
  `valid_to` DATE COMMENT '有效期结束',
  `total_count` INT COMMENT '总数量',
  `used_count` INT DEFAULT 0 COMMENT '已使用数量',
  `status` INT DEFAULT 1 COMMENT '状态 0-禁用 1-启用',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_code (code),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='优惠券表';



-- 用户优惠券表
CREATE TABLE IF NOT EXISTS `user_coupon` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '用户优惠券ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `coupon_id` BIGINT NOT NULL COMMENT '优惠券ID',
  `used` INT DEFAULT 0 COMMENT '是否已使用',
  `used_time` TIMESTAMP NULL COMMENT '使用时间',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  INDEX idx_user_id (user_id),
  INDEX idx_coupon_id (coupon_id),
  UNIQUE KEY uk_user_coupon (user_id, coupon_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户优惠券表';

-- 预约表
CREATE TABLE IF NOT EXISTS `appointment` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '预约ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `counselor_id` BIGINT COMMENT '教练ID',
  `appointment_time` TIMESTAMP NULL COMMENT '预约时间',
  `status` INT DEFAULT 0 COMMENT '状态 0-待确认 1-已确认 2-已完成 3-已取消',
  `notes` LONGTEXT COMMENT '备注',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_user_id (user_id),
  INDEX idx_counselor_id (counselor_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='预约表';

-- 反馈表
CREATE TABLE IF NOT EXISTS `feedback` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '反馈ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `order_id` BIGINT COMMENT '订单ID',
  `rating` INT COMMENT '评分 1-5',
  `content` LONGTEXT COMMENT '反馈内容',
  `images` JSON COMMENT '反馈图片列表',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_user_id (user_id),
  INDEX idx_order_id (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='反馈表';

-- 文章表
CREATE TABLE IF NOT EXISTS `article` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '文章ID',
  `title` VARCHAR(500) NOT NULL COMMENT '文章标题',
  `author` VARCHAR(200) COMMENT '作者',
  `digest` VARCHAR(1000) COMMENT '摘要',
  `url` VARCHAR(1000) COMMENT '文章链接',
  `thumb_url` VARCHAR(1000) COMMENT '缩略图URL',
  `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  INDEX idx_update_time (update_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章表';

-- 微信支付配置表
CREATE TABLE IF NOT EXISTS `wx_pay_config` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '配置ID',
  `app_id` VARCHAR(100) NOT NULL COMMENT '微信应用ID',
  `mch_id` VARCHAR(100) NOT NULL COMMENT '商户号',
  `api_key` VARCHAR(200) COMMENT 'API密钥',
  `api_v3_key` VARCHAR(200) COMMENT 'API V3密钥',
  `cert_path` VARCHAR(500) COMMENT '证书路径',
  `private_key_path` VARCHAR(500) COMMENT '私钥路径',
  `notify_url` VARCHAR(500) COMMENT '支付回调地址',
  `status` INT DEFAULT 1 COMMENT '状态 0-禁用 1-启用',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='微信支付配置表';

-- 支付记录表
CREATE TABLE IF NOT EXISTS `payment_record` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '记录ID',
  `order_id` BIGINT NOT NULL COMMENT '订单ID',
  `order_no` VARCHAR(50) NOT NULL COMMENT '订单号',
  `transaction_id` VARCHAR(100) COMMENT '微信支付交易号',
  `out_trade_no` VARCHAR(100) NOT NULL COMMENT '商户订单号',
  `amount` DECIMAL(10, 2) NOT NULL COMMENT '支付金额',
  `status` INT DEFAULT 0 COMMENT '状态 0-待支付 1-支付成功 2-支付失败 3-已退款',
  `pay_time` TIMESTAMP NULL COMMENT '支付时间',
  `notify_data` LONGTEXT COMMENT '回调数据',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_order_id (order_id),
  INDEX idx_order_no (order_no),
  INDEX idx_out_trade_no (out_trade_no),
  INDEX idx_transaction_id (transaction_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='支付记录表';