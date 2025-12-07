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

