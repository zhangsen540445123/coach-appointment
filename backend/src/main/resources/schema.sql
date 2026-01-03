-- 用户表
CREATE TABLE IF NOT EXISTS `user` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
  `openid` VARCHAR(100) COMMENT 'openid',
  `phone` VARCHAR(20) UNIQUE COMMENT '手机号',
  `name` VARCHAR(100) COMMENT '用户名',
  `avatar` VARCHAR(500) COMMENT '头像URL',
  `gender` INT COMMENT '性别 0-未知 1-男 2-女',
  `city` VARCHAR(100) COMMENT '城市',
  `province` VARCHAR(100) COMMENT '省份',
  `growth_member_tag` VARCHAR(200) COMMENT '成长会会员标签',
  `status` INT DEFAULT 1 COMMENT '状态 0-禁用 1-正常',
  `last_login_time` TIMESTAMP NULL COMMENT '最后登录时间',
  `last_login_ip` VARCHAR(255) COMMENT '最后登录IP',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_phone (phone),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 教练表
CREATE TABLE IF NOT EXISTS `counselor` (
  `id` BIGINT PRIMARY KEY COMMENT '教练ID',
  `name` VARCHAR(100) NOT NULL COMMENT '教练名称',
  `gender` INT COMMENT '性别 0-未知 1-男 2-女',
  `head_url` VARCHAR(500) COMMENT '头像URL',
  `head_url_square` VARCHAR(500) COMMENT '方形头像URL',
  `video_url` VARCHAR(500) COMMENT '介绍视频URL',
  `image_urls` JSON COMMENT '图片列表',
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
  `training` JSON COMMENT '培训经历',
  `special` LONGTEXT COMMENT '特别说明',
  `school` JSON COMMENT '学历背景',
  `address` VARCHAR(500) COMMENT '咨询地址',
  `face_msg` LONGTEXT COMMENT '面询说明',
  `consult_msg` LONGTEXT COMMENT '咨询说明',
  `consult` JSON COMMENT '咨询设置',
  `article_list` LONGTEXT COMMENT '相关文章列表',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_name (name),
  INDEX idx_service_type (service_type),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='教练表';

-- 咨询订单表
CREATE TABLE IF NOT EXISTS `consult_order` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '订单ID',
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
  `name` VARCHAR(200) NOT NULL COMMENT '优惠券名称',
  `type` INT NOT NULL DEFAULT 1 COMMENT '类型: 1-满减券 2-抵扣券',
  `discount_amount` DECIMAL(10, 2) NOT NULL COMMENT '优惠金额',
  `min_amount` DECIMAL(10, 2) DEFAULT 0 COMMENT '最低消费金额',
  `coach_scope` INT DEFAULT 1 COMMENT '适用范围: 1-全部教练 2-指定教练',
  `coach_ids` TEXT COMMENT '指定教练ID列表(JSON)',
  `coupon_type` INT DEFAULT 0 COMMENT '优惠券类型：0=教练咨询优惠券，1=活动优惠券',
  `applicable_studio_id` BIGINT NULL COMMENT '适用活动ID，NULL表示适用所有活动',
  `start_time` DATETIME COMMENT '有效期开始时间',
  `end_time` DATETIME COMMENT '有效期结束时间',
  `status` INT DEFAULT 1 COMMENT '状态 0-禁用 1-启用',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_status (status),
  INDEX idx_start_time (start_time),
  INDEX idx_end_time (end_time),
  INDEX idx_coupon_type (coupon_type),
  INDEX idx_applicable_studio_id (applicable_studio_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='优惠券表';

-- 用户优惠券表
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


-- =====================================================
-- 话题方向和排序选项表
-- 用于小程序首页的筛选功能配置
-- =====================================================

-- 话题方向表
CREATE TABLE IF NOT EXISTS `topic_direction` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    `name` VARCHAR(50) NOT NULL COMMENT '显示名称',
    `value` VARCHAR(50) DEFAULT NULL COMMENT '选项值（null表示全部）',
    `icon_url` VARCHAR(500) DEFAULT NULL COMMENT '图标URL',
    `sort_order` INT DEFAULT 0 COMMENT '排序序号（越小越靠前）',
    `enabled` TINYINT DEFAULT 1 COMMENT '是否启用 0-禁用 1-启用',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='话题方向配置表';

-- 排序选项表
CREATE TABLE IF NOT EXISTS `sort_option` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    `name` VARCHAR(50) NOT NULL COMMENT '显示名称',
    `value` INT NOT NULL COMMENT '选项值',
    `sort_order` INT DEFAULT 0 COMMENT '排序序号（越小越靠前）',
    `enabled` TINYINT DEFAULT 1 COMMENT '是否启用 0-禁用 1-启用',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='排序选项配置表';

-- 订单评价表
CREATE TABLE IF NOT EXISTS `order_review` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '评价ID',
  `order_id` BIGINT NOT NULL COMMENT '订单ID',
  `order_no` VARCHAR(50) NOT NULL COMMENT '订单号',
  `user_id` BIGINT NOT NULL COMMENT '用户ID（评价人）',
  `counselor_id` BIGINT NOT NULL COMMENT '教练ID',
  `rating` INT NOT NULL COMMENT '评分 1-5星',
  `content` TEXT COMMENT '评价内容',
  `images` JSON COMMENT '评价图片列表',
  `is_top` TINYINT DEFAULT 0 COMMENT '是否置顶 0-否 1-是',
  `is_visible` TINYINT DEFAULT 1 COMMENT '是否显示 0-隐藏 1-显示',
  `is_anonymous` TINYINT DEFAULT 0 COMMENT '是否匿名 0-实名 1-匿名',
  `reply_content` TEXT COMMENT '教练回复内容',
  `reply_time` TIMESTAMP NULL COMMENT '回复时间',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  UNIQUE KEY uk_order_id (order_id),
  INDEX idx_user_id (user_id),
  INDEX idx_counselor_id (counselor_id),
  INDEX idx_is_visible (is_visible),
  INDEX idx_is_top (is_top),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单评价表';

-- 更新admin_user表，确保有role和counselor_id字段
-- 注意：如果字段已存在，此语句会报错，可以忽略
-- ALTER TABLE `admin_user` ADD COLUMN IF NOT EXISTS `role` INT DEFAULT 1 COMMENT '角色 1-超级管理员 2-教练';
-- ALTER TABLE `admin_user` ADD COLUMN IF NOT EXISTS `counselor_id` BIGINT NULL COMMENT '关联的教练ID（仅教练角色有值）';

-- 创建admin_user表（如果不存在）
CREATE TABLE IF NOT EXISTS `admin_user` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
  `username` VARCHAR(50) NOT NULL COMMENT '用户名',
  `password` VARCHAR(200) NOT NULL COMMENT '密码',
  `real_name` VARCHAR(100) COMMENT '真实姓名',
  `phone` VARCHAR(20) COMMENT '手机号',
  `email` VARCHAR(100) COMMENT '邮箱',
  `avatar` VARCHAR(500) COMMENT '头像URL',
  `role` INT DEFAULT 1 COMMENT '角色 1-超级管理员 2-教练',
  `counselor_id` BIGINT NULL COMMENT '关联的教练ID（仅教练角色有值）',
  `status` INT DEFAULT 1 COMMENT '状态 0-禁用 1-正常',
  `last_login_time` TIMESTAMP NULL COMMENT '最后登录时间',
  `last_login_ip` VARCHAR(255) COMMENT '最后登录IP',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  UNIQUE KEY uk_username (username),
  INDEX idx_role (role),
  INDEX idx_counselor_id (counselor_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员用户表';

-- 教练资料审核表（如果不存在）
CREATE TABLE IF NOT EXISTS `counselor_audit` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '审核ID',
  `counselor_id` BIGINT NOT NULL COMMENT '教练ID',
  `before_data` LONGTEXT COMMENT '修改前数据JSON',
  `after_data` LONGTEXT COMMENT '修改后数据JSON',
  `audit_status` INT DEFAULT 0 COMMENT '审核状态 0-待审核 1-审核通过 2-审核拒绝',
  `submitted_by` BIGINT COMMENT '提交人ID',
  `submitted_at` TIMESTAMP NULL COMMENT '提交时间',
  `audited_by` BIGINT COMMENT '审核人ID',
  `audited_at` TIMESTAMP NULL COMMENT '审核时间',
  `audit_remark` VARCHAR(500) COMMENT '审核备注',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_counselor_id (counselor_id),
  INDEX idx_audit_status (audit_status),
  INDEX idx_submitted_by (submitted_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='教练资料审核表';

-- 优惠券兑换码表
CREATE TABLE IF NOT EXISTS `coupon_code` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '兑换码ID',
  `code` VARCHAR(50) UNIQUE NOT NULL COMMENT '兑换码',
  `coupon_id` BIGINT NOT NULL COMMENT '关联的优惠券ID',
  `total_count` INT DEFAULT 1 COMMENT '可使用次数',
  `used_count` INT DEFAULT 0 COMMENT '已使用次数',
  `status` INT DEFAULT 1 COMMENT '状态 0-禁用 1-启用',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_coupon_id (coupon_id),
  INDEX idx_code (code),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='优惠券兑换码表';

-- 用户反馈表
CREATE TABLE IF NOT EXISTS `user_feedback` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '反馈ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `user_name` VARCHAR(100) COMMENT '用户名称',
  `content` TEXT COMMENT '反馈内容',
  `status` INT DEFAULT 0 COMMENT '状态 0-待处理 1-已处理',
  `reply` TEXT COMMENT '回复内容',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_user_id (user_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户反馈表';

-- 用户收藏表
CREATE TABLE IF NOT EXISTS `user_star` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '收藏ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `counselor_id` BIGINT NOT NULL COMMENT '教练ID',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  UNIQUE KEY uk_user_counselor (user_id, counselor_id),
  INDEX idx_user_id (user_id),
  INDEX idx_counselor_id (counselor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户收藏表';

-- 教练可预约时间表
CREATE TABLE IF NOT EXISTS `counselor_calendar` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
  `counselor_id` BIGINT NOT NULL COMMENT '教练ID',
  `date` VARCHAR(10) NOT NULL COMMENT '日期 yyyy-MM-dd',
  `start_time` VARCHAR(5) NOT NULL COMMENT '开始时间 HH:mm',
  `consult_way` INT DEFAULT 1 COMMENT '咨询方式: 1-视频, 2-语音, 3-面询',
  `consult_type` INT DEFAULT 4 COMMENT '咨询类型',
  `status` INT DEFAULT 0 COMMENT '状态: 0-可预约, 1-已预约, 2-不可用',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_counselor_id (counselor_id),
  INDEX idx_date (date),
  INDEX idx_status (status),
  INDEX idx_counselor_date (counselor_id, date),
  UNIQUE KEY uk_counselor_date_time (counselor_id, date, start_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='教练可预约时间表';

-- 数据字典类型表
CREATE TABLE IF NOT EXISTS `dict_type` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '类型ID',
  `code` VARCHAR(50) UNIQUE NOT NULL COMMENT '类型编码',
  `name` VARCHAR(100) NOT NULL COMMENT '类型名称',
  `description` VARCHAR(500) COMMENT '描述',
  `sort_order` INT DEFAULT 0 COMMENT '排序',
  `enabled` TINYINT DEFAULT 1 COMMENT '是否启用 0-禁用 1-启用',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_code (code),
  INDEX idx_enabled (enabled)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='数据字典类型表';

-- 数据字典项表
CREATE TABLE IF NOT EXISTS `dict_item` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '项ID',
  `type_id` BIGINT NOT NULL COMMENT '类型ID',
  `type_code` VARCHAR(50) NOT NULL COMMENT '类型编码',
  `label` VARCHAR(100) NOT NULL COMMENT '显示标签',
  `value` VARCHAR(100) COMMENT '值',
  `sort_order` INT DEFAULT 0 COMMENT '排序',
  `enabled` TINYINT DEFAULT 1 COMMENT '是否启用 0-禁用 1-启用',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  UNIQUE INDEX uk_type_label (type_code, label),
  INDEX idx_type_id (type_id),
  INDEX idx_enabled (enabled)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='数据字典项表';

-- 咨询工作室表（悦行活动）
CREATE TABLE IF NOT EXISTS `consult_studio` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '工作室ID',
  `studio_name` VARCHAR(200) NOT NULL COMMENT '工作室名称',
  `studio_type` INT DEFAULT 0 COMMENT '工作室类型 0-线下工作室 1-线上工作室',
  `studio_cover_img_list` JSON COMMENT '封面图片列表',
  `studio_open_time` VARCHAR(100) COMMENT '营业时间',
  `studio_detail` LONGTEXT COMMENT '工作室介绍(富文本)',
  `summary_address` VARCHAR(500) COMMENT '地址摘要',
  `full_address` VARCHAR(500) COMMENT '详细地址',
  `location_longitude` DECIMAL(10, 6) COMMENT '经度',
  `location_latitude` DECIMAL(10, 6) COMMENT '纬度',
  `concat_phone` VARCHAR(50) COMMENT '联系电话',
  `qr_code_url` VARCHAR(500) COMMENT '二维码图片URL',
  `price` DECIMAL(10, 2) DEFAULT 0 COMMENT '活动价格，0表示免费',
  `booking_type` INT DEFAULT 1 COMMENT '预约方式：0=仅电话预约，1=支持线上预约，2=两者都支持',
  `max_participants` INT DEFAULT 0 COMMENT '最大参与人数，0表示不限制',
  `sort_order` INT DEFAULT 0 COMMENT '排序',
  `enabled` TINYINT DEFAULT 1 COMMENT '是否启用 0-禁用 1-启用',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_studio_type (studio_type),
  INDEX idx_enabled (enabled),
  INDEX idx_sort_order (sort_order),
  INDEX idx_booking_type (booking_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='咨询工作室表（悦行活动）';

-- 工作室教练关联表
CREATE TABLE IF NOT EXISTS `studio_counselor` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
  `studio_id` BIGINT NOT NULL COMMENT '工作室ID',
  `counselor_id` BIGINT NOT NULL COMMENT '教练ID',
  `sort_order` INT DEFAULT 0 COMMENT '排序',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  UNIQUE INDEX uk_studio_counselor (studio_id, counselor_id),
  INDEX idx_studio_id (studio_id),
  INDEX idx_counselor_id (counselor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='工作室教练关联表';

-- 活动预约表
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

-- 为 counselor 表添加置顶相关字段
ALTER TABLE counselor ADD COLUMN is_top TINYINT DEFAULT 0 COMMENT '是否置顶：0-否，1-是';
ALTER TABLE counselor ADD COLUMN sort_order INT DEFAULT 0 COMMENT '排序权重，数值越大越靠前';

-- 为置顶字段添加索引以提升查询性能
CREATE INDEX idx_is_top_sort ON counselor(is_top DESC, sort_order DESC, created_at DESC);

-- 成长会会员表
CREATE TABLE IF NOT EXISTS `growth_member` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
  `xiaoe_nickname` VARCHAR(200) COMMENT '小鹅通昵称',
  `latest_phone` VARCHAR(20) COMMENT '最新手机号',
  `course_completion_count` INT DEFAULT 0 COMMENT '完课数',
  `join_date` DATE COMMENT '加入日期',
  `expire_date` DATE COMMENT '到期日期',
  `join_type` VARCHAR(100) COMMENT '加入方式',
  `status` VARCHAR(50) DEFAULT 'active' COMMENT '状态',
  `xiaoe_user_id` VARCHAR(100) COMMENT '小鹅通用户ID',
  `xiaoe_tags` VARCHAR(500) COMMENT '小鹅通标签',
  `last_sync_time` TIMESTAMP NULL COMMENT '最后同步时间',
  `real_name` VARCHAR(100) COMMENT '真实姓名',
  `birthday` DATE COMMENT '生日',
  `gender` VARCHAR(20) COMMENT '性别',
  `city` VARCHAR(100) COMMENT '城市',
  `phone_number` VARCHAR(20) COMMENT '手机号',
  `email` VARCHAR(100) COMMENT '邮箱',
  `source_channel` VARCHAR(100) COMMENT '来源渠道',
  `age` INT COMMENT '年龄',
  `address` VARCHAR(500) COMMENT '地址',
  `wechat_name` VARCHAR(100) COMMENT '微信昵称',
  `wechat_id` VARCHAR(100) COMMENT '微信号',
  `create_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_latest_phone (latest_phone),
  INDEX idx_phone_number (phone_number),
  INDEX idx_xiaoe_user_id (xiaoe_user_id),
  INDEX idx_status (status),
  INDEX idx_join_date (join_date),
  INDEX idx_expire_date (expire_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='成长会会员表';
