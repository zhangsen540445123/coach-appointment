-- 创建数据库
CREATE DATABASE IF NOT EXISTS umxinli_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE umxinli_db;

-- 用户表
CREATE TABLE IF NOT EXISTS `user` (
  `id` BIGINT PRIMARY KEY COMMENT '用户ID',
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
  `payment_time` TIMESTAMP COMMENT '支付时间',
  `consult_time` TIMESTAMP COMMENT '咨询时间',
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
  `used_time` TIMESTAMP COMMENT '使用时间',
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
  `appointment_time` TIMESTAMP COMMENT '预约时间',
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

-- 管理员用户表
CREATE TABLE IF NOT EXISTS `admin_user` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '管理员ID',
  `username` VARCHAR(50) UNIQUE NOT NULL COMMENT '用户名',
  `password` VARCHAR(255) NOT NULL COMMENT '密码',
  `real_name` VARCHAR(100) COMMENT '真实姓名',
  `phone` VARCHAR(20) COMMENT '手机号',
  `email` VARCHAR(100) COMMENT '邮箱',
  `avatar` VARCHAR(500) COMMENT '头像URL',
  `role` INT DEFAULT 1 COMMENT '角色 1-超级管理员 2-教练',
  `counselor_id` BIGINT COMMENT '关联教练ID',
  `status` INT DEFAULT 1 COMMENT '状态 0-禁用 1-正常',
  `last_login_time` TIMESTAMP COMMENT '最后登录时间',
  `last_login_ip` VARCHAR(50) COMMENT '最后登录IP',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_username (username),
  INDEX idx_role (role),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员用户表';

-- 初始化默认管理员账号 (密码: adminadmin, MD5加密)
INSERT INTO `admin_user` (`username`, `password`, `real_name`, `role`, `status`) VALUES
('admin', 'f6fdffe48c908deb0f4c3bd36c032e72', '系统管理员', 1, 1);

-- 初始化城市数据
INSERT INTO `city` (`name`, `province`, `value`) VALUES
('北京', '北京', 'beijing'),
('上海', '上海', 'shanghai'),
('广州', '广东', 'guangzhou'),
('深圳', '广东', 'shenzhen'),
('杭州', '浙江', 'hangzhou'),
('南京', '江苏', 'nanjing'),
('苏州', '江苏', 'suzhou'),
('武汉', '湖北', 'wuhan'),
('成都', '四川', 'chengdu'),
('西安', '陕西', 'xian');

-- 初始化全局设置
INSERT INTO `global_settings` (`key_name`, `value`, `description`) VALUES
('concat_sys_agent_settings', '{\"qrCodeImageUrl\":\"https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20211115/351753974260_.pic_hd.jpg\",\"showAtMp\":\"1\"}', '系统代理设置'),
('app_version', '1.0.0', '应用版本'),
('maintenance_mode', '0', '维护模式 0-关闭 1-开启'),
('order_can_refund_hour', '24', '订单可退款小时数');

-- 初始化示例教练数据
INSERT INTO `counselor` (`id`, `name`, `head_url`, `head_url_square`, `qualifications`, `directions`, `introduction`, `consult_price`, `service_type`, `star_num`, `consult_type`, `support_online_consult`, `support_offline_consult`, `can_consult`, `experience_date`, `experience_time`, `city_name`) VALUES
(1922168464726081537, '孙竹', 'https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20250515/bca0a3f0e2164b5bb3a149a76cf00fb8.jpg', 'https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20250515/b28a276d29294949a677bc043ca8f261.jpg', '[\"国家二级心理教练\"]', '[\"身心健康\",\"人际关系\",\"婚姻恋爱\",\"亲子教育\",\"个人成长\"]', '国家二级心理教练\n精神分析动力取向心理教练，受训于心理动力学长期培训项目，持续接受个人体验和个体督导。\n咨询风格：温暖、涵容、生动灵活', 600.00, 2, 15, '[0,4]', 1, 0, 1, '2019-02-01', '1500小时', ''),
(1943203111282970625, '苗壮', 'https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20250715/9f209e44c1d84008beac4cd35d29175b.jpg', 'https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20250715/13c3e3b01e8f4265935fc9ad705a0cd9.jpg', '[\"国家二级心理教练\"]', '[\"人际关系\",\"亲子教育\",\"个人成长\",\"学业职场\",\"情绪困扰\"]', '硕士研究生\n国家二级心理教练\n我是一名全职个人执业的教练，高校讲师、兼职心理教练。从业8年，目前累计4200小时的咨询时数', 500.00, 2, 12, '[0,4]', 1, 0, 1, '2017-05-01', '4200小时', '');
