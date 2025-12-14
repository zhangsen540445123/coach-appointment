-- =====================================================
-- 话题方向和排序选项表 - 手动执行版本
-- 执行方式: mysql -u root -p umxinli_db < filter_config.sql
-- =====================================================

USE umxinli_db;

-- 话题方向表
DROP TABLE IF EXISTS `topic_direction`;
CREATE TABLE `topic_direction` (
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
DROP TABLE IF EXISTS `sort_option`;
CREATE TABLE `sort_option` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    `name` VARCHAR(50) NOT NULL COMMENT '显示名称',
    `value` INT NOT NULL COMMENT '选项值',
    `sort_order` INT DEFAULT 0 COMMENT '排序序号（越小越靠前）',
    `enabled` TINYINT DEFAULT 1 COMMENT '是否启用 0-禁用 1-启用',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='排序选项配置表';

-- 初始化话题方向数据
INSERT INTO `topic_direction` (`name`, `value`, `icon_url`, `sort_order`, `enabled`) VALUES
('全部', NULL, NULL, 0, 1),
('身心健康', '身心健康', 'http://localhost:8080/api/file/image/身心健康@3x.png', 1, 1),
('人际关系', '人际关系', 'http://localhost:8080/api/file/image/人际关系@3x.png', 2, 1),
('婚姻恋爱', '婚姻恋爱', 'http://localhost:8080/api/file/image/婚姻恋爱@3x.png', 3, 1),
('亲子教育', '亲子教育', 'http://localhost:8080/api/file/image/亲子教育@3x.png', 4, 1),
('个人成长', '个人成长', 'http://localhost:8080/api/file/image/个人成长@3x.png', 5, 1),
('情绪困扰', '情绪困扰', 'http://localhost:8080/api/file/image/情绪困扰@3x.png', 6, 1),
('学业职场', '学业职场', 'http://localhost:8080/api/file/image/学业职场@3x.png', 7, 1),
('家庭困扰', '家庭困扰', 'http://localhost:8080/api/file/image/家庭困扰@3x.png', 8, 1),
('性心理', '性心理', 'http://localhost:8080/api/file/image/性心理@3x.png', 9, 1);

-- 初始化排序选项数据
INSERT INTO `sort_option` (`name`, `value`, `sort_order`, `enabled`) VALUES
('推荐排序', 0, 0, 1),
('低价优先', 1, 1, 1),
('高价优先', 2, 2, 1),
('近期可预约优先', 3, 3, 1);

-- 查看结果
SELECT '===== 话题方向数据 =====' as info;
SELECT id, name, value, sort_order, enabled FROM topic_direction ORDER BY sort_order;

SELECT '===== 排序选项数据 =====' as info;
SELECT id, name, value, sort_order, enabled FROM sort_option ORDER BY sort_order;

SELECT '数据初始化完成！' as message;

