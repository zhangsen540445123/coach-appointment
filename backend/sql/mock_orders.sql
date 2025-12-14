-- =====================================================
-- Mock 订单数据 - 用于测试小程序"我的预约"页面
-- 执行方式: mysql -u root -p umxinli_db < mock_orders.sql
-- 或在 MySQL 客户端中执行 source mock_orders.sql
-- =====================================================

USE umxinli_db;

-- 首先插入测试用户（如果不存在）
INSERT IGNORE INTO `user` (`id`, `phone`, `name`, `avatar`, `gender`, `city`, `province`) VALUES
(10001, '13800138001', '张三', 'https://thirdwx.qlogo.cn/mmopen/vi_32/default_avatar.png', 1, '上海', '上海'),
(10002, '13800138002', '李四', 'https://thirdwx.qlogo.cn/mmopen/vi_32/default_avatar.png', 2, '北京', '北京'),
(10003, '13800138003', '王五', 'https://thirdwx.qlogo.cn/mmopen/vi_32/default_avatar.png', 1, '广州', '广东');

-- 插入测试访客信息
INSERT IGNORE INTO `visitor_info` (`id`, `user_id`, `name`, `age`, `sex`, `other_city`, `other_career`) VALUES
(1, 10001, '张三', 28, 1, '上海', '软件工程师'),
(2, 10002, '李四', 32, 0, '北京', '产品经理'),
(3, 10003, '王五', 25, 1, '广州', '设计师');

-- 删除旧的测试订单（如果存在）
DELETE FROM `consult_order` WHERE id >= 1001 AND id <= 3999;

-- =====================================================
-- 插入多种状态的测试订单
-- 订单状态: 0-待支付 1-已支付/待服务 2-进行中 3-已完成 4-已取消
-- =====================================================

-- 用户10001的订单（张三）- 6条订单
INSERT INTO `consult_order` (`id`, `order_no`, `user_id`, `counselor_id`, `consult_type`, `consult_way`, `price`, `status`, `payment_time`, `consult_time`, `created_at`) VALUES
-- 待支付订单
(1001, 'ORD20241214001001', 10001, 1922168464726081537, 0, 0, 600.00, 0, NULL, DATE_ADD(NOW(), INTERVAL 3 DAY), NOW()),
(1002, 'ORD20241214001002', 10001, 1943203111282970625, 4, 0, 500.00, 0, NULL, DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_SUB(NOW(), INTERVAL 10 MINUTE)),
-- 已支付/待服务订单
(1003, 'ORD20241214001003', 10001, 1943203111282970626, 1, 1, 400.00, 1, DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_ADD(NOW(), INTERVAL 7 DAY), DATE_SUB(NOW(), INTERVAL 3 DAY)),
-- 进行中订单
(1004, 'ORD20241214001004', 10001, 1943203111282970627, 2, 0, 550.00, 2, DATE_SUB(NOW(), INTERVAL 5 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 7 DAY)),
-- 已完成订单
(1005, 'ORD20241214001005', 10001, 1922168464726081537, 0, 0, 600.00, 3, DATE_SUB(NOW(), INTERVAL 14 DAY), DATE_SUB(NOW(), INTERVAL 10 DAY), DATE_SUB(NOW(), INTERVAL 20 DAY)),
-- 已取消订单
(1006, 'ORD20241214001006', 10001, 1943203111282970625, 4, 0, 500.00, 4, NULL, DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 5 DAY));

-- 用户10002的订单（李四）- 3条订单
INSERT INTO `consult_order` (`id`, `order_no`, `user_id`, `counselor_id`, `consult_type`, `consult_way`, `price`, `status`, `payment_time`, `consult_time`, `created_at`) VALUES
(2001, 'ORD20241214002001', 10002, 1943203111282970627, 2, 1, 550.00, 0, NULL, DATE_ADD(NOW(), INTERVAL 4 DAY), DATE_SUB(NOW(), INTERVAL 5 MINUTE)),
(2002, 'ORD20241214002002', 10002, 1922168464726081537, 0, 0, 600.00, 1, DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_ADD(NOW(), INTERVAL 10 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY)),
(2003, 'ORD20241214002003', 10002, 1943203111282970626, 1, 1, 400.00, 3, DATE_SUB(NOW(), INTERVAL 30 DAY), DATE_SUB(NOW(), INTERVAL 25 DAY), DATE_SUB(NOW(), INTERVAL 35 DAY));

-- 用户10003的订单（王五）- 3条订单
INSERT INTO `consult_order` (`id`, `order_no`, `user_id`, `counselor_id`, `consult_type`, `consult_way`, `price`, `status`, `payment_time`, `consult_time`, `created_at`) VALUES
(3001, 'ORD20241214003001', 10003, 1943203111282970625, 4, 0, 500.00, 0, NULL, DATE_ADD(NOW(), INTERVAL 6 DAY), DATE_SUB(NOW(), INTERVAL 25 MINUTE)),
(3002, 'ORD20241214003002', 10003, 1922168464726081537, 0, 0, 600.00, 2, DATE_SUB(NOW(), INTERVAL 3 DAY), NOW(), DATE_SUB(NOW(), INTERVAL 5 DAY)),
(3003, 'ORD20241214003003', 10003, 1943203111282970627, 2, 1, 550.00, 4, NULL, DATE_ADD(NOW(), INTERVAL 8 DAY), DATE_SUB(NOW(), INTERVAL 10 DAY));

-- 查看插入结果
SELECT 
    o.id, o.order_no, o.status as order_status,
    c.name as counselor_name,
    o.price, o.consult_time
FROM consult_order o
LEFT JOIN counselor c ON o.counselor_id = c.id
ORDER BY o.id;

-- =====================================================
-- 数据统计
-- 总共插入: 12 条订单
-- 待支付(0): 4条 (1001, 1002, 2001, 3001)
-- 已支付(1): 2条 (1003, 2002)
-- 进行中(2): 2条 (1004, 3002)
-- 已完成(3): 2条 (1005, 2003)
-- 已取消(4): 2条 (1006, 3003)
-- =====================================================

SELECT '订单数据插入完成！' as message;
SELECT COUNT(*) as total_orders FROM consult_order;
SELECT status, COUNT(*) as count FROM consult_order GROUP BY status ORDER BY status;

