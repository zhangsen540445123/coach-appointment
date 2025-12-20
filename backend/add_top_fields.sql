-- 为 counselor 表添加置顶相关字段
ALTER TABLE counselor ADD COLUMN is_top TINYINT DEFAULT 0 COMMENT '是否置顶：0-否，1-是';
ALTER TABLE counselor ADD COLUMN sort_order INT DEFAULT 0 COMMENT '排序权重，数值越大越靠前';

-- 为置顶字段添加索引以提升查询性能
CREATE INDEX idx_is_top_sort ON counselor(is_top DESC, sort_order DESC, created_at DESC);

