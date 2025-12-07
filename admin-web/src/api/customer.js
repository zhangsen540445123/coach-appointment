import request from './request'

export const customerApi = {
  getList: (params) => request.post('/admin/customer/list', params),
  getById: (id) => request.get('/admin/customer/' + id),
  update: (id, data) => request.put('/admin/customer/' + id, data),
  delete: (id) => request.delete('/admin/customer/' + id)
}

