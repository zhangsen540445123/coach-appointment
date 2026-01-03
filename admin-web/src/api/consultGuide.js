import request from './request'

export const consultGuideApi = {
  getList: () => request.get('/admin/consult-guide/list'),
  create: (data) => request.post('/admin/consult-guide/create', data),
  update: (id, data) => request.put('/admin/consult-guide/' + id, data),
  delete: (id) => request.delete('/admin/consult-guide/' + id),
  toggle: (id) => request.post('/admin/consult-guide/' + id + '/toggle')
}
