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

-- 修改用户表，添加成长会标签字段
ALTER TABLE `user` ADD COLUMN `growth_member_tag` VARCHAR(200) COMMENT '成长会会员标签' AFTER `province`;

