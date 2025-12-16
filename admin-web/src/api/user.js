import request from './request'

export const userApi = {
  getList: (params) => request.post('/admin/user/list', params),
  getById: (id) => request.get('/admin/user/' + id),
  update: (id, data) => request.put('/admin/user/' + id, data),
  toggleStatus: (id) => request.post('/admin/user/' + id + '/toggleStatus'),
  delete: (id) => request.delete('/admin/user/' + id)
}

// 后台账号管理API（管理员和教练账号）
export const adminAccountApi = {
  // 获取账号列表，可按角色筛选
  getList: (params, role) => request.post('/admin/user/list' + (role ? '?role=' + role : ''), params),
  // 获取账号详情
  getById: (id) => request.get('/admin/user/' + id),
  // 创建账号
  create: (data) => request.post('/admin/user/create', data),
  // 更新账号
  update: (id, data) => request.put('/admin/user/' + id, data),
  // 切换状态
  toggleStatus: (id, status) => request.post('/admin/user/' + id + '/toggleStatus', { status }),
  // 删除账号
  delete: (id) => request.delete('/admin/user/' + id)
}
