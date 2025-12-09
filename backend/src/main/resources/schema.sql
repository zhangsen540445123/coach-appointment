--
-- Table structure for table `admin_user`
--
CREATE TABLE `admin_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `real_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` int DEFAULT '1',
  `counselor_id` bigint DEFAULT NULL,
  `status` int DEFAULT '1',
  `last_login_time` timestamp NULL DEFAULT NULL,
  `last_login_ip` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `appointment` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '预约ID',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `counselor_id` bigint DEFAULT NULL COMMENT '教练ID',
  `appointment_time` timestamp NULL DEFAULT NULL COMMENT '预约时间',
  `status` int DEFAULT '0' COMMENT '状态 0-待确认 1-已确认 2-已完成 3-已取消',
  `notes` longtext COLLATE utf8mb4_unicode_ci COMMENT '备注',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_counselor_id` (`counselor_id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='预约表';

CREATE TABLE `article` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `title` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章标题',
  `author` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '作者',
  `digest` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '摘要',
  `url` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '文章链接',
  `thumb_url` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '缩略图URL',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_update_time` (`update_time`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章表';

CREATE TABLE `carousel` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '轮播图ID',
  `title` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '图片URL',
  `link_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '链接URL',
  `sort_order` int DEFAULT '0' COMMENT '排序',
  `status` int DEFAULT '1' COMMENT '状态 0-禁用 1-启用',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='轮播图表';

CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '城市ID',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '城市名称',
  `province` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '省份',
  `value` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '城市编码',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_province` (`province`),
  KEY `idx_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='城市表';


/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consult_order` (
  `id` bigint NOT NULL COMMENT '订单ID',
  `order_no` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '订单号',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `counselor_id` bigint NOT NULL COMMENT '教练ID',
  `consult_type` int DEFAULT NULL COMMENT '咨询类型',
  `consult_way` int DEFAULT NULL COMMENT '咨询方式 0-网络 1-线下 2-混合',
  `price` decimal(10,2) DEFAULT NULL COMMENT '价格',
  `status` int DEFAULT '0' COMMENT '订单状态 0-待支付 1-已支付 2-进行中 3-已完成 4-已取消',
  `payment_time` timestamp NULL DEFAULT NULL COMMENT '支付时间',
  `consult_time` timestamp NULL DEFAULT NULL COMMENT '咨询时间',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_no` (`order_no`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_counselor_id` (`counselor_id`),
  KEY `idx_order_no` (`order_no`),
  KEY `idx_status` (`status`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='咨询订单表';

CREATE TABLE `counselor` (
  `id` bigint NOT NULL COMMENT '教练ID',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '教练名称',
  `gender` int DEFAULT NULL COMMENT '性别 0-未知 1-男 2-女',
  `head_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '头像URL',
  `head_url_square` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '方形头像URL',
  `video_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `qualifications` json DEFAULT NULL COMMENT '资格证书列表',
  `directions` json DEFAULT NULL COMMENT '咨询方向列表',
  `image_urls` json DEFAULT NULL,
  `introduction` longtext COLLATE utf8mb4_unicode_ci COMMENT '个人介绍',
  `consult_price` decimal(10,2) DEFAULT NULL COMMENT '咨询价格',
  `service_type` int DEFAULT NULL COMMENT '服务类型 1-线上 2-线下 3-混合',
  `star_num` int DEFAULT '0' COMMENT '星级评分',
  `consult_type` json DEFAULT NULL COMMENT '咨询类型列表',
  `support_online_consult` int DEFAULT '1' COMMENT '是否支持在线咨询',
  `support_offline_consult` int DEFAULT '0' COMMENT '是否支持线下咨询',
  `can_consult` int DEFAULT '1' COMMENT '是否可咨询',
  `experience_date` date DEFAULT NULL COMMENT '从业日期',
  `experience_time` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '从业时长',
  `training` json DEFAULT NULL,
  `special` text COLLATE utf8mb4_unicode_ci,
  `school` json DEFAULT NULL,
  `address` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `face_msg` text COLLATE utf8mb4_unicode_ci,
  `consult_msg` text COLLATE utf8mb4_unicode_ci,
  `consult` json DEFAULT NULL,
  `article_list` text COLLATE utf8mb4_unicode_ci,
  `city_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '城市名称',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_name` (`name`),
  KEY `idx_service_type` (`service_type`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='教练表';

CREATE TABLE `counselor_calendar` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `counselor_id` bigint NOT NULL,
  `date` varchar(10) NOT NULL COMMENT '日期 yyyy-MM-dd',
  `start_time` varchar(5) NOT NULL COMMENT '开始时间 HH:mm',
  `consult_way` int DEFAULT '1' COMMENT '咨询方式: 1-视频, 2-语音, 3-面询',
  `consult_type` int DEFAULT '4' COMMENT '咨询类型',
  `status` int DEFAULT '0' COMMENT '状态: 0-可预约, 1-已预约, 2-不可用',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_counselor_date` (`counselor_id`,`date`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='教练可预约时间表';

CREATE TABLE `coupon` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '优惠券名称',
  `type` int NOT NULL DEFAULT '1' COMMENT '类型: 1=满减, 2=直接抵扣',
  `discount_amount` decimal(10,2) NOT NULL COMMENT '优惠金额',
  `min_amount` decimal(10,2) DEFAULT '0.00' COMMENT '最低消费金额(满减时使用)',
  `coach_scope` int NOT NULL DEFAULT '1' COMMENT '适用范围: 1=全部教练, 2=指定教练',
  `coach_ids` text COLLATE utf8mb4_unicode_ci COMMENT '指定教练ID列表(JSON数组)',
  `start_time` datetime DEFAULT NULL COMMENT '生效开始时间',
  `end_time` datetime DEFAULT NULL COMMENT '生效结束时间',
  `status` int DEFAULT '1' COMMENT '状态: 0=禁用, 1=启用',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='优惠券模板';

CREATE TABLE `coupon_code` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '兑换码',
  `coupon_id` bigint NOT NULL COMMENT '关联优惠券模板ID',
  `total_count` int DEFAULT '1' COMMENT '可兑换次数',
  `used_count` int DEFAULT '0' COMMENT '已兑换次数',
  `status` int DEFAULT '1' COMMENT '状态: 0=禁用, 1=启用',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `idx_code` (`code`),
  KEY `idx_coupon_id` (`coupon_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='兑换码';

CREATE TABLE `feedback` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '反馈ID',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `order_id` bigint DEFAULT NULL COMMENT '订单ID',
  `rating` int DEFAULT NULL COMMENT '评分 1-5',
  `content` longtext COLLATE utf8mb4_unicode_ci COMMENT '反馈内容',
  `images` json DEFAULT NULL COMMENT '反馈图片列表',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='反馈表';

CREATE TABLE `global_settings` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '设置ID',
  `key_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '设置键',
  `value` longtext COLLATE utf8mb4_unicode_ci COMMENT '设置值',
  `description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `key_name` (`key_name`),
  KEY `idx_key_name` (`key_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='全局设置表';

CREATE TABLE `user` (
  `id` bigint NOT NULL COMMENT '用户ID',
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '手机号',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户名/微信昵称',
  `avatar` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '头像URL',
  `gender` int DEFAULT NULL COMMENT '性别 0-未知 1-男 2-女',
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '城市',
  `province` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '省份',
  `openid` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '微信openid',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `uk_openid` (`openid`),
  KEY `idx_phone` (`phone`),
  KEY `idx_openid` (`openid`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

CREATE TABLE `user_coupon` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `coupon_id` bigint NOT NULL COMMENT '优惠券模板ID',
  `status` int DEFAULT '0' COMMENT '状态: 0=未使用, 1=已使用, 2=已过期',
  `receive_type` int DEFAULT '1' COMMENT '获取方式: 1=系统推送, 2=兑换码兑换',
  `used_at` datetime DEFAULT NULL COMMENT '使用时间',
  `order_id` bigint DEFAULT NULL COMMENT '使用的订单ID',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_coupon_id` (`coupon_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户优惠券';

CREATE TABLE `user_feedback` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `user_name` varchar(100) DEFAULT NULL COMMENT '用户昵称',
  `content` text NOT NULL COMMENT '反馈内容',
  `status` tinyint DEFAULT '0' COMMENT '状态 0-待处理 1-已处理',
  `reply` text COMMENT '回复内容',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户反馈表';

CREATE TABLE `user_star` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `counselor_id` varchar(50) NOT NULL COMMENT '教练ID',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_counselor` (`user_id`,`counselor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户收藏表';

CREATE TABLE `visitor_info` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '客户信息ID',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '真实姓名',
  `age` int DEFAULT NULL COMMENT '年龄',
  `sex` int DEFAULT NULL COMMENT '性别 0-女 1-男',
  `other_city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '现居城市',
  `other_career` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '职业',
  `other_marrage` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '情感状态',
  `other_children` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '有无子女',
  `other_income` text COLLATE utf8mb4_unicode_ci COMMENT '教练目标',
  `other_um` int DEFAULT '0' COMMENT '是否是只管去做成长会会员 0否 1是',
  `consult_other` int DEFAULT '0' COMMENT '是否有过教练对话 0否 1是',
  `realize_channel` int DEFAULT NULL COMMENT '来源渠道 1-只管去做成长会 2-公众号 3-悦行活动 4-朋友推荐 5-其他',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_id` (`user_id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='客户信息表';


-- 初始化默认管理员账号 (密码: adminadmin, MD5加密)
INSERT INTO `admin_user` (`username`, `password`, `real_name`, `role`, `status`) VALUES
('admin', 'f6fdffe48c908deb0f4c3bd36c032e72', '系统管理员', 1, 1);

-- 初始化城市数据 (使用 INSERT IGNORE 避免重复插入)
INSERT IGNORE INTO `city` (`id`, `name`, `province`, `value`) VALUES
(1, '北京', '北京', 'beijing'),
(2, '上海', '上海', 'shanghai'),
(3, '广州', '广东', 'guangzhou'),
(4, '深圳', '广东', 'shenzhen'),
(5, '杭州', '浙江', 'hangzhou'),
(6, '南京', '江苏', 'nanjing'),
(7, '苏州', '江苏', 'suzhou'),
(8, '武汉', '湖北', 'wuhan'),
(9, '成都', '四川', 'chengdu'),
(10, '西安', '陕西', 'xian');

-- 初始化全局设置 (使用 INSERT IGNORE 避免重复插入)
INSERT IGNORE INTO `global_settings` (`id`, `key_name`, `value`, `description`) VALUES
(1, 'concat_sys_agent_settings', '{"qrCodeImageUrl":"https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20211115/351753974260_.pic_hd.jpg","showAtMp":"1"}', '系统代理设置'),
(2, 'app_version', '1.0.0', '应用版本'),
(3, 'maintenance_mode', '0', '维护模式 0-关闭 1-开启'),
(4, 'order_can_refund_hour', '24', '订单可退款小时数');

-- 初始化示例教练数据 (使用 INSERT IGNORE 避免重复插入)
INSERT IGNORE INTO `counselor` (`id`, `name`, `head_url`, `head_url_square`, `qualifications`, `directions`, `introduction`, `consult_price`, `service_type`, `star_num`, `consult_type`, `support_online_consult`, `support_offline_consult`, `can_consult`, `experience_date`, `experience_time`, `city_name`) VALUES
(1922168464726081537, '孙竹', 'https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20250515/bca0a3f0e2164b5bb3a149a76cf00fb8.jpg', 'https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20250515/b28a276d29294949a677bc043ca8f261.jpg', '["国家二级心理教练"]', '["身心健康","人际关系","婚姻恋爱","亲子教育","个人成长"]', '国家二级心理教练\n精神分析动力取向心理教练，受训于心理动力学长期培训项目，持续接受个人体验和个体督导。\n咨询风格：温暖、涵容、生动灵活', 600.00, 2, 15, '[0,4]', 1, 0, 1, '2019-02-01', '1500小时', '上海'),
(1943203111282970625, '苗壮', 'https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20250715/9f209e44c1d84008beac4cd35d29175b.jpg', 'https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20250715/13c3e3b01e8f4265935fc9ad705a0cd9.jpg', '["国家二级心理教练"]', '["人际关系","亲子教育","个人成长","学业职场","情绪困扰"]', '硕士研究生\n国家二级心理教练\n我是一名全职个人执业的教练，高校讲师、兼职心理教练。从业8年，目前累计4200小时的咨询时数', 500.00, 2, 12, '[0,4]', 1, 0, 1, '2017-05-01', '4200小时', '北京'),
(1943203111282970626, '李明', 'https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20250515/bca0a3f0e2164b5bb3a149a76cf00fb8.jpg', 'https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20250515/b28a276d29294949a677bc043ca8f261.jpg', '["国家三级心理咨询师","认证心理治疗师"]', '["情绪管理","压力调节","职场发展","人际沟通"]', '资深心理咨询师，专注于职场心理健康领域10年。擅长运用认知行为疗法帮助来访者改善情绪问题。', 400.00, 1, 10, '[0,1,4]', 1, 1, 1, '2014-03-01', '3000小时', '深圳'),
(1943203111282970627, '王芳', 'https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20250715/9f209e44c1d84008beac4cd35d29175b.jpg', 'https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20250715/13c3e3b01e8f4265935fc9ad705a0cd9.jpg', '["国家二级心理咨询师","家庭治疗师"]', '["婚姻家庭","亲子关系","情感问题","个人成长"]', '家庭治疗专家，从业12年，擅长处理婚姻危机、亲子冲突等家庭问题。温柔耐心，善于倾听。', 550.00, 3, 18, '[0,2,4]', 1, 1, 1, '2012-06-01', '5000小时', '广州');

-- 初始化文章数据
INSERT IGNORE INTO `article` (`id`, `title`, `author`, `digest`, `url`, `thumb_url`, `update_time`) VALUES
(1, '动力学取向的心理咨询有哪些设置？', '有弥联合咨询组', '动力学取向的咨询，如何付费，如何预约咨询时间？', 'http://mp.weixin.qq.com/s?__biz=Mzg4Mzg2MTg4NA==&mid=2247605202&idx=1&sn=5456cff3c9bb647d71b64a1cb37b4982', 'https://mmbiz.qpic.cn/sz_mmbiz_jpg/Cf0RPickzPyo5DLiarV7ugyBraHR4O5Q3N2VPCvtpLuHlcj258XNux2jeIdRNgM8dBNoDHMfianRh8HqucSCpRmMQ/0?wx_fmt=jpeg', '2024-08-22 16:16:46'),
(2, '如何判断，我的教练是否适合我？', '咨询助理', '选择合适的心理教练是咨询成功的关键一步', 'http://mp.weixin.qq.com/s?__biz=Mzg4Mzg2MTg4NA==&mid=2247583750&idx=1&sn=285f9bf6e33229bf84addd643838d086', 'https://mmbiz.qpic.cn/mmbiz_jpg/Cf0RPickzPyrr61tTxpL5wFGUGDICoL4uBRtAwfxpqwnvdEznmsstcadPtMDW0yPEiaAYTg53rIPNp02OibTibKticw/0?wx_fmt=jpeg', '2024-04-26 23:31:58'),
(3, '开始心理咨询之前，需要做哪些准备？', '有弥联合咨询组', '心理咨询开始前，你需要做什么样的准备呢？', 'http://mp.weixin.qq.com/s?__biz=Mzg4Mzg2MTg4NA==&mid=2247605299&idx=1&sn=a17c8b558319f595ee2df0a5a3be7955', 'https://mmbiz.qpic.cn/sz_mmbiz_jpg/Cf0RPickzPyoFYCtufuLxOXaiaPHYWwF5a9CwrCnhFEQXx9srY0xSFJCPF3iczIGyCLWr0WhxGRduq30ibnZibRFGlQ/0?wx_fmt=jpeg', '2024-08-29 09:40:23'),
(4, '动力学取向的心理咨询会带来什么改变？', '有弥联合咨询组', '动力学取向的心理咨询，是怎么改变我们每个人的？', 'http://mp.weixin.qq.com/s?__biz=Mzg4Mzg2MTg4NA==&mid=2247605210&idx=1&sn=f53a72f545207f9848dff95603ad212f', 'https://mmbiz.qpic.cn/sz_mmbiz_jpg/Cf0RPickzPyo5DLiarV7ugyBraHR4O5Q3NTiaejMicg8JkGVBAYpSxGUjej8hysevUGJ4oMck9dKoTOFseiayrC2Vqw/0?wx_fmt=jpeg', '2024-08-22 19:57:44');

-- 初始化轮播图数据
INSERT IGNORE INTO `carousel` (`id`, `title`, `image_url`, `link_url`, `sort_order`, `status`) VALUES
(1, '心理健康月', '/images/carousel1.jpg', '', 1, 1),
(2, '新用户优惠', '/images/carousel2.jpg', '', 2, 1),
(3, '专业咨询服务', '/images/carousel3.jpg', '', 3, 1);

