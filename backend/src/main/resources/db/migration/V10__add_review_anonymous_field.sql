-- 添加评价匿名字段
ALTER TABLE `order_review` ADD COLUMN `is_anonymous` TINYINT DEFAULT 0 COMMENT '是否匿名 0-实名 1-匿名' AFTER `is_visible`;

