-- =====================================================
-- V8: 添加订单评价表
-- =====================================================

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
  `last_login_ip` VARCHAR(50) COMMENT '最后登录IP',
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

-- 插入默认管理员账户（如果不存在）
INSERT IGNORE INTO `admin_user` (`id`, `username`, `password`, `real_name`, `role`, `status`) 
VALUES (1, 'admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', '超级管理员', 1, 1);

