import request from './request'

export const orderApi = {
  getList: (params) => request.post('/admin/order/list', params),
  getById: (id) => request.get('/admin/order/' + id),
  updateStatus: (id, status) => request.post('/admin/order/' + id + '/status', { status }),
  cancel: (id, reason) => request.post('/admin/order/' + id + '/cancel', { reason }),
  getStatistics: (counselorId) => request.get('/admin/order/statistics' + (counselorId ? '?counselorId=' + counselorId : ''))
}
