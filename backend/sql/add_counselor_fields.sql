-- 为 counselor 表添加缺失的字段
-- 执行此脚本以修复 "Unknown column 'video_url'" 错误

ALTER TABLE `counselor`
  ADD COLUMN IF NOT EXISTS `video_url` VARCHAR(500) COMMENT '介绍视频URL' AFTER `head_url_square`,
  ADD COLUMN IF NOT EXISTS `image_urls` JSON COMMENT '图片列表' AFTER `video_url`,
  ADD COLUMN IF NOT EXISTS `training` JSON COMMENT '培训经历' AFTER `city_name`,
  ADD COLUMN IF NOT EXISTS `special` LONGTEXT COMMENT '特别说明' AFTER `training`,
  ADD COLUMN IF NOT EXISTS `school` JSON COMMENT '学历背景' AFTER `special`,
  ADD COLUMN IF NOT EXISTS `address` VARCHAR(500) COMMENT '咨询地址' AFTER `school`,
  ADD COLUMN IF NOT EXISTS `face_msg` LONGTEXT COMMENT '面询说明' AFTER `address`,
  ADD COLUMN IF NOT EXISTS `consult_msg` LONGTEXT COMMENT '咨询说明' AFTER `face_msg`,
  ADD COLUMN IF NOT EXISTS `consult` JSON COMMENT '咨询设置' AFTER `consult_msg`,
  ADD COLUMN IF NOT EXISTS `article_list` LONGTEXT COMMENT '相关文章列表' AFTER `consult`;

