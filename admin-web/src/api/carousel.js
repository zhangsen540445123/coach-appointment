import request from './request'

export const carouselApi = {
  getList: () => request.get('/admin/carousel/list'),
  create: (data) => request.post('/admin/carousel/create', data),
  update: (id, data) => request.put('/admin/carousel/' + id, data),
  delete: (id) => request.delete('/admin/carousel/' + id),
  updateSort: (items) => request.post('/admin/carousel/sort', { items })
}
