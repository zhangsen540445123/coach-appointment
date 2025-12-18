import request from './request'

export const dictApi = {
  // 字典类型
  getAllTypes: () => request.get('/admin/dict/types'),
  getTypeWithItems: (id) => request.get(`/admin/dict/type/${id}`),
  createType: (data) => request.post('/admin/dict/type', data),
  updateType: (id, data) => request.put(`/admin/dict/type/${id}`, data),
  deleteType: (id) => request.delete(`/admin/dict/type/${id}`),

  // 字典项
  getItemsByTypeId: (typeId) => request.get(`/admin/dict/items/${typeId}`),
  createItem: (data) => request.post('/admin/dict/item', data),
  updateItem: (id, data) => request.put(`/admin/dict/item/${id}`, data),
  deleteItem: (id) => request.delete(`/admin/dict/item/${id}`),

  // 前端获取字典数据
  getAllData: () => request.get('/admin/dict/data'),
  getDataByCode: (typeCode) => request.get(`/admin/dict/data/${typeCode}`)
}

