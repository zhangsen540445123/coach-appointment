-- 资质认证选项
INSERT INTO `dict_item` (`type_id`, `type_code`, `label`, `value`, `sort_order`, `enabled`) VALUES
(1, 'qualification', '国家二级心理咨询师', '国家二级心理咨询师', 1, 1),
(1, 'qualification', '国家三级心理咨询师', '国家三级心理咨询师', 2, 1),
(1, 'qualification', '心理治疗师', '心理治疗师', 3, 1),
(1, 'qualification', '精神科医师', '精神科医师', 4, 1),
(1, 'qualification', '婚姻家庭咨询师', '婚姻家庭咨询师', 5, 1);

-- 受训流派选项
INSERT INTO `dict_item` (`type_id`, `type_code`, `label`, `value`, `sort_order`, `enabled`) VALUES
(2, 'school', '精神分析流派动力取向', '精神分析流派动力取向', 1, 1),
(2, 'school', '认知行为疗法', '认知行为疗法', 2, 1),
(2, 'school', '人本主义', '人本主义', 3, 1),
(2, 'school', '家庭系统治疗', '家庭系统治疗', 4, 1),
(2, 'school', '正念疗法', '正念疗法', 5, 1);

-- 擅长方向选项
INSERT INTO `dict_item` (`type_id`, `type_code`, `label`, `value`, `sort_order`, `enabled`) VALUES
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
INSERT INTO `dict_item` (`type_id`, `type_code`, `label`, `value`, `sort_order`, `enabled`) VALUES
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
INSERT INTO `dict_item` (`type_id`, `type_code`, `label`, `value`, `sort_order`, `enabled`) VALUES
(5, 'marriage', '已婚', '已婚', 1, 1),
(5, 'marriage', '单身', '单身', 2, 1),
(5, 'marriage', '恋爱中', '恋爱中', 3, 1),
(5, 'marriage', '丧偶', '丧偶', 4, 1),
(5, 'marriage', '离异', '离异', 5, 1),
(5, 'marriage', '其他', '其他', 6, 1);

-- 子女情况选项
INSERT INTO `dict_item` (`type_id`, `type_code`, `label`, `value`, `sort_order`, `enabled`) VALUES
(6, 'children', '没有', '没有', 1, 1),
(6, 'children', '一个孩子', '一个孩子', 2, 1),
(6, 'children', '一个以上', '一个以上', 3, 1),
(6, 'children', '其他', '其他', 4, 1);

-- 渠道来源选项
INSERT INTO `dict_item` (`type_id`, `type_code`, `label`, `value`, `sort_order`, `enabled`) VALUES
(7, 'channel', '只管去做成长会', '1', 1, 1),
(7, 'channel', '公众号', '2', 2, 1),
(7, 'channel', '悦行活动', '3', 3, 1),
(7, 'channel', '朋友推荐', '4', 4, 1),
(7, 'channel', '其他', '5', 5, 1);

-- 订单状态
INSERT INTO `dict_item` (`type_id`, `type_code`, `label`, `value`, `sort_order`, `enabled`) VALUES
(8, 'order_status', '待支付', '0', 1, 1),
(8, 'order_status', '已支付', '1', 2, 1),
(8, 'order_status', '进行中', '2', 3, 1),
(8, 'order_status', '已完成', '3', 4, 1),
(8, 'order_status', '已取消', '4', 5, 1),
(8, 'order_status', '已退款', '5', 6, 1);

-- 咨询类型
INSERT INTO `dict_item` (`type_id`, `type_code`, `label`, `value`, `sort_order`, `enabled`) VALUES
(9, 'consult_type', '线上视频', '0', 1, 1),
(9, 'consult_type', '线上语音', '1', 2, 1),
(9, 'consult_type', '线下面询', '2', 3, 1),
(9, 'consult_type', '标准咨询', '4', 4, 1);

-- 咨询方式
INSERT INTO `dict_item` (`type_id`, `type_code`, `label`, `value`, `sort_order`, `enabled`) VALUES
(10, 'consult_way', '线上', '0', 1, 1),
(10, 'consult_way', '线下', '1', 2, 1),
(10, 'consult_way', '混合', '2', 3, 1);

-- 审核状态
INSERT INTO `dict_item` (`type_id`, `type_code`, `label`, `value`, `sort_order`, `enabled`) VALUES
(11, 'audit_status', '待审核', '0', 1, 1),
(11, 'audit_status', '已通过', '1', 2, 1),
(11, 'audit_status', '已拒绝', '2', 3, 1);

