import request from './request'

export const reviewApi = {
  // 管理员 - 获取所有评价列表
  getList: (params) => request.post('/admin/review/list', params),
  
  // 管理员 - 按教练分组获取评价统计
  getByCounselor: () => request.get('/admin/review/byCounselor'),
  
  // 管理员 - 获取评价详情
  getById: (id) => request.get('/admin/review/' + id),
  
  // 管理员 - 设置评价显示/隐藏
  setVisible: (id, isVisible) => request.post('/admin/review/' + id + '/visible', { isVisible }),
  
  // 管理员 - 删除评价
  delete: (id) => request.delete('/admin/review/' + id)
}

export const coachApi = {
  // 教练 - 获取个人信息
  getProfile: () => request.get('/admin/coach/profile'),
  
  // 教练 - 提交个人信息修改
  submitProfile: (data) => request.post('/admin/coach/profile/submit', data),
  
  // 教练 - 获取审核记录
  getAuditList: (params) => request.post('/admin/coach/audit/list', params),
  
  // 教练 - 获取评价列表
  getReviewList: (params) => request.post('/admin/coach/review/list', params),
  
  // 教练 - 设置评价置顶
  setReviewTop: (id, isTop) => request.post('/admin/coach/review/' + id + '/top', { isTop }),
  
  // 教练 - 设置评价显示/隐藏
  setReviewVisible: (id, isVisible) => request.post('/admin/coach/review/' + id + '/visible', { isVisible }),
  
  // 教练 - 获取订单列表
  getOrderList: (params) => request.post('/admin/coach/order/list', params),
  
  // 教练 - 获取收益统计
  getEarningsStats: () => request.get('/admin/coach/earnings/stats'),
  
  // 教练 - 获取收益明细
  getEarningsDetail: (days, page, pageSize) => 
    request.get('/admin/coach/earnings/detail', { params: { days, page, pageSize } })
}

