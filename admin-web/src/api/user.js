import request from './request'

export const userApi = {
  getList: (params) => request.post('/admin/user/list', params),
  getById: (id) => request.get('/admin/user/' + id),
  update: (id, data) => request.put('/admin/user/' + id, data),
  toggleStatus: (id) => request.post('/admin/user/' + id + '/toggleStatus'),
  delete: (id) => request.delete('/admin/user/' + id)
}
