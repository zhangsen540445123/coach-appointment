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
(1, 'concat_sys_agent_settings', '{"qrCodeImageUrl":"/api/file/image/qrcode_customer_service.jpg","showAtMp":"1"}', '系统代理设置'),
(2, 'app_version', '1.0.0', '应用版本'),
(3, 'maintenance_mode', '0', '维护模式 0-关闭 1-开启'),
(4, 'order_can_refund_hour', '24', '订单可退款小时数');

-- 初始化示例教练数据 (使用 INSERT IGNORE 避免重复插入)
INSERT IGNORE INTO `counselor` (`id`, `name`, `head_url`, `head_url_square`, `qualifications`, `directions`, `introduction`, `consult_price`, `service_type`, `star_num`, `consult_type`, `support_online_consult`, `support_offline_consult`, `can_consult`, `experience_date`, `experience_time`, `city_name`) VALUES
(1922168464726081537, '孙竹', '/api/file/image/counselor_sunzhu.jpg', '/api/file/image/counselor_sunzhu_square.jpg', '["国家二级心理教练"]', '["身心健康","人际关系","婚姻恋爱","亲子教育","个人成长"]', '国家二级心理教练\n精神分析动力取向心理教练，受训于心理动力学长期培训项目，持续接受个人体验和个体督导。\n咨询风格：温暖、涵容、生动灵活', 600.00, 2, 15, '[0,4]', 1, 0, 1, '2019-02-01', '1500小时', '上海'),
(1943203111282970625, '苗壮', '/api/file/image/counselor_miaozhuang.jpg', '/api/file/image/counselor_miaozhuang_square.jpg', '["国家二级心理教练"]', '["人际关系","亲子教育","个人成长","学业职场","情绪困扰"]', '硕士研究生\n国家二级心理教练\n我是一名全职个人执业的教练，高校讲师、兼职心理教练。从业8年，目前累计4200小时的咨询时数', 500.00, 2, 12, '[0,4]', 1, 0, 1, '2017-05-01', '4200小时', '北京'),
(1943203111282970626, '李明', '/api/file/image/counselor_sunzhu.jpg', '/api/file/image/counselor_sunzhu_square.jpg', '["国家三级心理咨询师","认证心理治疗师"]', '["情绪管理","压力调节","职场发展","人际沟通"]', '资深心理咨询师，专注于职场心理健康领域10年。擅长运用认知行为疗法帮助来访者改善情绪问题。', 400.00, 1, 10, '[0,1,4]', 1, 1, 1, '2014-03-01', '3000小时', '深圳'),
(1943203111282970627, '王芳', '/api/file/image/counselor_miaozhuang.jpg', '/api/file/image/counselor_miaozhuang_square.jpg', '["国家二级心理咨询师","家庭治疗师"]', '["婚姻家庭","亲子关系","情感问题","个人成长"]', '家庭治疗专家，从业12年，擅长处理婚姻危机、亲子冲突等家庭问题。温柔耐心，善于倾听。', 550.00, 3, 18, '[0,2,4]', 1, 1, 1, '2012-06-01', '5000小时', '广州');

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

-- 初始化默认管理员账号 (密码: adminadmin, MD5加密)
INSERT IGNORE INTO `admin_user` (`username`, `password`, `real_name`, `role`, `status`) VALUES
('admin', 'f6fdffe48c908deb0f4c3bd36c032e72', '系统管理员', 1, 1);

-- 初始化教练账号 (密码: coach123456, MD5加密: e99a18c428cb38d5f260853678922e03)
-- 苗壮教练账号
INSERT IGNORE INTO `admin_user` (`username`, `password`, `real_name`, `role`, `status`, `counselor_id`) VALUES
('miaozhuang', 'e99a18c428cb38d5f260853678922e03', '苗壮', 2, 1, 1943203111282970625);

-- 孙竹教练账号
INSERT IGNORE INTO `admin_user` (`username`, `password`, `real_name`, `role`, `status`, `counselor_id`) VALUES
('sunzhu', 'e99a18c428cb38d5f260853678922e03', '孙竹', 2, 1, 1922168464726081537);

-- =====================================================
-- Mock 订单数据
-- 用于测试小程序"我的预约"页面和管理后台订单管理
-- =====================================================

-- 首先插入测试用户（如果不存在）
INSERT IGNORE INTO `user` (`id`, `phone`, `name`, `avatar`, `gender`, `city`, `province`) VALUES
(10001, '13800138001', '张三', '/api/file/image/default_avatar.png', 1, '上海', '上海'),
(10002, '13800138002', '李四', '/api/file/image/default_avatar.png', 2, '北京', '北京'),
(10003, '13800138003', '王五', '/api/file/image/default_avatar.png', 1, '广州', '广东');

-- 插入测试访客信息
INSERT IGNORE INTO `visitor_info` (`id`, `user_id`, `name`, `age`, `sex`, `other_city`, `other_career`) VALUES
(1, 10001, '张三', 28, 1, '上海', '软件工程师'),
(2, 10002, '李四', 32, 0, '北京', '产品经理'),
(3, 10003, '王五', 25, 1, '广州', '设计师');

-- =====================================================
-- 插入多种状态的测试订单
-- 订单状态: 0-待支付 1-已支付/待服务 2-进行中 3-已完成 4-已取消
-- =====================================================

-- 用户10001的订单（张三）
-- 待支付订单 - 刚创建
INSERT INTO `consult_order` (`id`, `order_no`, `user_id`, `counselor_id`, `consult_type`, `consult_way`, `price`, `status`, `consult_time`, `created_at`) VALUES
(1001, 'ORD20241214001001', 10001, 1922168464726081537, 0, 0, 600.00, 0, DATE_ADD(NOW(), INTERVAL 3 DAY), NOW()),
(1002, 'ORD20241214001002', 10001, 1943203111282970625, 4, 0, 500.00, 0, DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_SUB(NOW(), INTERVAL 10 MINUTE));

-- 已支付/待服务订单
INSERT INTO `consult_order` (`id`, `order_no`, `user_id`, `counselor_id`, `consult_type`, `consult_way`, `price`, `status`, `payment_time`, `consult_time`, `created_at`) VALUES
(1003, 'ORD20241214001003', 10001, 1943203111282970626, 1, 1, 400.00, 1, DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_ADD(NOW(), INTERVAL 7 DAY), DATE_SUB(NOW(), INTERVAL 3 DAY));

-- 进行中订单
INSERT INTO `consult_order` (`id`, `order_no`, `user_id`, `counselor_id`, `consult_type`, `consult_way`, `price`, `status`, `payment_time`, `consult_time`, `created_at`) VALUES
(1004, 'ORD20241214001004', 10001, 1943203111282970627, 2, 0, 550.00, 2, DATE_SUB(NOW(), INTERVAL 5 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 7 DAY));

-- 已完成订单
INSERT INTO `consult_order` (`id`, `order_no`, `user_id`, `counselor_id`, `consult_type`, `consult_way`, `price`, `status`, `payment_time`, `consult_time`, `created_at`) VALUES
(1005, 'ORD20241214001005', 10001, 1922168464726081537, 0, 0, 600.00, 3, DATE_SUB(NOW(), INTERVAL 14 DAY), DATE_SUB(NOW(), INTERVAL 10 DAY), DATE_SUB(NOW(), INTERVAL 20 DAY));

-- 已取消订单
INSERT INTO `consult_order` (`id`, `order_no`, `user_id`, `counselor_id`, `consult_type`, `consult_way`, `price`, `status`, `consult_time`, `created_at`) VALUES
(1006, 'ORD20241214001006', 10001, 1943203111282970625, 4, 0, 500.00, 4, DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 5 DAY));

-- =====================================================
-- 用户10002的订单（李四）
-- =====================================================

-- 待支付订单
INSERT INTO `consult_order` (`id`, `order_no`, `user_id`, `counselor_id`, `consult_type`, `consult_way`, `price`, `status`, `consult_time`, `created_at`) VALUES
(2001, 'ORD20241214002001', 10002, 1943203111282970627, 2, 1, 550.00, 0, DATE_ADD(NOW(), INTERVAL 4 DAY), DATE_SUB(NOW(), INTERVAL 5 MINUTE));

-- 已支付/待服务订单
INSERT INTO `consult_order` (`id`, `order_no`, `user_id`, `counselor_id`, `consult_type`, `consult_way`, `price`, `status`, `payment_time`, `consult_time`, `created_at`) VALUES
(2002, 'ORD20241214002002', 10002, 1922168464726081537, 0, 0, 600.00, 1, DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_ADD(NOW(), INTERVAL 10 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY));

-- 已完成订单
INSERT INTO `consult_order` (`id`, `order_no`, `user_id`, `counselor_id`, `consult_type`, `consult_way`, `price`, `status`, `payment_time`, `consult_time`, `created_at`) VALUES
(2003, 'ORD20241214002003', 10002, 1943203111282970626, 1, 1, 400.00, 3, DATE_SUB(NOW(), INTERVAL 30 DAY), DATE_SUB(NOW(), INTERVAL 25 DAY), DATE_SUB(NOW(), INTERVAL 35 DAY));

-- =====================================================
-- 用户10003的订单（王五）
-- =====================================================

-- 待支付订单（已超时，即将自动取消）
INSERT INTO `consult_order` (`id`, `order_no`, `user_id`, `counselor_id`, `consult_type`, `consult_way`, `price`, `status`, `consult_time`, `created_at`) VALUES
(3001, 'ORD20241214003001', 10003, 1943203111282970625, 4, 0, 500.00, 0, DATE_ADD(NOW(), INTERVAL 6 DAY), DATE_SUB(NOW(), INTERVAL 25 MINUTE));

-- 进行中订单
INSERT INTO `consult_order` (`id`, `order_no`, `user_id`, `counselor_id`, `consult_type`, `consult_way`, `price`, `status`, `payment_time`, `consult_time`, `created_at`) VALUES
(3002, 'ORD20241214003002', 10003, 1922168464726081537, 0, 0, 600.00, 2, DATE_SUB(NOW(), INTERVAL 3 DAY), NOW(), DATE_SUB(NOW(), INTERVAL 5 DAY));

-- 已取消订单
INSERT INTO `consult_order` (`id`, `order_no`, `user_id`, `counselor_id`, `consult_type`, `consult_way`, `price`, `status`, `consult_time`, `created_at`) VALUES
(3003, 'ORD20241214003003', 10003, 1943203111282970627, 2, 1, 550.00, 4, DATE_ADD(NOW(), INTERVAL 8 DAY), DATE_SUB(NOW(), INTERVAL 10 DAY));

-- =====================================================
-- 数据统计
-- 总共插入: 12 条订单
-- 待支付(0): 4条 (1001, 1002, 2001, 3001)
-- 已支付(1): 2条 (1003, 2002)
-- 进行中(2): 2条 (1004, 3002)
-- 已完成(3): 2条 (1005, 2003)
-- 已取消(4): 2条 (1006, 3003)
-- =====================================================

-- =====================================================
-- 初始化话题方向数据
-- 数据来源：小程序前端 app/common/vendor.js 第15252-15289行
-- =====================================================

INSERT INTO `topic_direction` (`name`, `value`, `icon_url`, `sort_order`, `enabled`) VALUES
('全部', NULL, NULL, 0, 1),
('身心健康', '身心健康', 'https://localhost/api/file/image/身心健康@3x.png', 1, 1),
('人际关系', '人际关系', 'https://localhost/api/file/image/人际关系@3x.png', 2, 1),
('婚姻恋爱', '婚姻恋爱', 'https://localhost/api/file/image/婚姻恋爱@3x.png', 3, 1),
('亲子教育', '亲子教育', 'https://localhost/api/file/image/亲子教育@3x.png', 4, 1),
('个人成长', '个人成长', 'https://localhost/api/file/image/个人成长@3x.png', 5, 1),
('情绪困扰', '情绪困扰', 'https://localhost/api/file/image/情绪困扰@3x.png', 6, 1),
('学业职场', '学业职场', 'https://localhost/api/file/image/学业职场@3x.png', 7, 1),
('家庭困扰', '家庭困扰', 'https://localhost/api/file/image/家庭困扰@3x.png', 8, 1),
('性心理', '性心理', 'https://localhost/api/file/image/性心理@3x.png', 9, 1);

-- =====================================================
-- 初始化排序选项数据
-- 数据来源：小程序前端 app/common/vendor.js 第15291-15310行
-- =====================================================

INSERT INTO `sort_option` (`name`, `value`, `sort_order`, `enabled`) VALUES
('推荐排序', 0, 0, 1),
('低价优先', 1, 1, 1),
('高价优先', 2, 2, 1),
('近期可预约优先', 3, 3, 1);

-- =====================================================
-- 初始化教练可预约时间数据
-- 为苗壮和孙竹教练添加未来7天的可预约时间段
-- =====================================================

-- 苗壮教练的可预约时间（未来7天，每天上午和下午各2个时段）
INSERT IGNORE INTO `counselor_calendar` (`counselor_id`, `date`, `start_time`, `consult_way`, `consult_type`, `status`) VALUES
(1943203111282970625, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 DAY), '%Y-%m-%d'), '09:00', 1, 4, 0),
(1943203111282970625, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 DAY), '%Y-%m-%d'), '10:00', 1, 4, 0),
(1943203111282970625, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 DAY), '%Y-%m-%d'), '14:00', 1, 4, 0),
(1943203111282970625, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 DAY), '%Y-%m-%d'), '15:00', 1, 4, 0),
(1943203111282970625, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 2 DAY), '%Y-%m-%d'), '09:00', 1, 4, 0),
(1943203111282970625, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 2 DAY), '%Y-%m-%d'), '10:00', 1, 4, 0),
(1943203111282970625, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 2 DAY), '%Y-%m-%d'), '14:00', 1, 4, 0),
(1943203111282970625, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 3 DAY), '%Y-%m-%d'), '09:00', 1, 4, 0),
(1943203111282970625, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 3 DAY), '%Y-%m-%d'), '15:00', 1, 4, 0),
(1943203111282970625, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 5 DAY), '%Y-%m-%d'), '10:00', 1, 4, 0),
(1943203111282970625, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 5 DAY), '%Y-%m-%d'), '14:00', 1, 4, 0),
(1943203111282970625, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 7 DAY), '%Y-%m-%d'), '09:00', 1, 4, 0);

-- 孙竹教练的可预约时间（未来7天）
INSERT IGNORE INTO `counselor_calendar` (`counselor_id`, `date`, `start_time`, `consult_way`, `consult_type`, `status`) VALUES
(1922168464726081537, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 DAY), '%Y-%m-%d'), '10:00', 1, 0, 0),
(1922168464726081537, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 DAY), '%Y-%m-%d'), '14:00', 1, 0, 0),
(1922168464726081537, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 DAY), '%Y-%m-%d'), '16:00', 1, 0, 0),
(1922168464726081537, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 2 DAY), '%Y-%m-%d'), '09:00', 1, 0, 0),
(1922168464726081537, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 2 DAY), '%Y-%m-%d'), '11:00', 1, 0, 0),
(1922168464726081537, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 3 DAY), '%Y-%m-%d'), '14:00', 1, 0, 0),
(1922168464726081537, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 3 DAY), '%Y-%m-%d'), '15:00', 1, 0, 0),
(1922168464726081537, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 4 DAY), '%Y-%m-%d'), '10:00', 1, 0, 0),
(1922168464726081537, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 6 DAY), '%Y-%m-%d'), '09:00', 1, 0, 0),
(1922168464726081537, DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 6 DAY), '%Y-%m-%d'), '14:00', 1, 0, 0);

-- =====================================================
-- 初始化数据字典
-- =====================================================

-- 字典类型
INSERT IGNORE INTO `dict_type` (`id`, `code`, `name`, `description`, `sort_order`, `enabled`) VALUES
(1, 'qualification', '资质认证', '教练编辑页-资质认证选项', 1, 1),
(2, 'school', '受训流派', '教练编辑页-受训流派选项', 2, 1),
(3, 'direction', '擅长方向', '教练编辑页-擅长方向选项', 3, 1),
(4, 'career', '职业选项', '客户信息页-职业选项', 4, 1),
(5, 'marriage', '婚姻状态', '客户信息页-婚姻状态选项', 5, 1),
(6, 'children', '子女情况', '客户信息页-子女情况选项', 6, 1),
(7, 'channel', '渠道来源', '客户信息页-了解渠道选项', 7, 1);

-- 资质认证选项
INSERT IGNORE INTO `dict_item` (`type_id`, `type_code`, `label`, `value`, `sort_order`, `enabled`) VALUES
(1, 'qualification', '国家二级心理咨询师', '国家二级心理咨询师', 1, 1),
(1, 'qualification', '国家三级心理咨询师', '国家三级心理咨询师', 2, 1),
(1, 'qualification', '心理治疗师', '心理治疗师', 3, 1),
(1, 'qualification', '精神科医师', '精神科医师', 4, 1),
(1, 'qualification', '婚姻家庭咨询师', '婚姻家庭咨询师', 5, 1);

-- 受训流派选项
INSERT IGNORE INTO `dict_item` (`type_id`, `type_code`, `label`, `value`, `sort_order`, `enabled`) VALUES
(2, 'school', '精神分析流派动力取向', '精神分析流派动力取向', 1, 1),
(2, 'school', '认知行为疗法', '认知行为疗法', 2, 1),
(2, 'school', '人本主义', '人本主义', 3, 1),
(2, 'school', '家庭系统治疗', '家庭系统治疗', 4, 1),
(2, 'school', '正念疗法', '正念疗法', 5, 1);

-- 擅长方向选项
INSERT IGNORE INTO `dict_item` (`type_id`, `type_code`, `label`, `value`, `sort_order`, `enabled`) VALUES
(3, 'direction', '身心健康', '身心健康', 1, 1),
(3, 'direction', '人际关系', '人际关系', 2, 1),
(3, 'direction', '婚姻恋爱', '婚姻恋爱', 3, 1),
(3, 'direction', '亲子教育', '亲子教育', 4, 1),
(3, 'direction', '个人成长', '个人成长', 5, 1),
(3, 'direction', '学业职场', '学业职场', 6, 1),
(3, 'direction', '情绪困扰', '情绪困扰', 7, 1),
(3, 'direction', '性心理', '性心理', 8, 1),
(3, 'direction', '家庭困扰', '家庭困扰', 9, 1);

-- 职业选项
INSERT IGNORE INTO `dict_item` (`type_id`, `type_code`, `label`, `value`, `sort_order`, `enabled`) VALUES
(4, 'career', '国企事业单位', '国企事业单位', 1, 1),
(4, 'career', '外资', '外资', 2, 1),
(4, 'career', '私企', '私企', 3, 1),
(4, 'career', '个体', '个体', 4, 1),
(4, 'career', '自由职业', '自由职业', 5, 1),
(4, 'career', '专业人员(医生、律师、老师)', '专业人员(医生、律师、老师)', 6, 1),
(4, 'career', '学生', '学生', 7, 1),
(4, 'career', '退休人员', '退休人员', 8, 1),
(4, 'career', '其他', '其他', 9, 1);

-- 婚姻状态选项
INSERT IGNORE INTO `dict_item` (`type_id`, `type_code`, `label`, `value`, `sort_order`, `enabled`) VALUES
(5, 'marriage', '已婚', '已婚', 1, 1),
(5, 'marriage', '单身', '单身', 2, 1),
(5, 'marriage', '恋爱中', '恋爱中', 3, 1),
(5, 'marriage', '丧偶', '丧偶', 4, 1),
(5, 'marriage', '离异', '离异', 5, 1),
(5, 'marriage', '其他', '其他', 6, 1);

-- 子女情况选项
INSERT IGNORE INTO `dict_item` (`type_id`, `type_code`, `label`, `value`, `sort_order`, `enabled`) VALUES
(6, 'children', '没有', '没有', 1, 1),
(6, 'children', '一个孩子', '一个孩子', 2, 1),
(6, 'children', '一个以上', '一个以上', 3, 1),
(6, 'children', '其他', '其他', 4, 1);

-- 渠道来源选项
INSERT IGNORE INTO `dict_item` (`type_id`, `type_code`, `label`, `value`, `sort_order`, `enabled`) VALUES
(7, 'channel', '只管去做成长会', '1', 1, 1),
(7, 'channel', '公众号', '2', 2, 1),
(7, 'channel', '悦行活动', '3', 3, 1),
(7, 'channel', '朋友推荐', '4', 4, 1),
(7, 'channel', '其他', '5', 5, 1);

