import request from './request'

export const filterConfigApi = {
  // 话题方向
  getTopicDirectionList: (params = {}) => request.get('/admin/filterConfig/topicDirections', { params }),
  getTopicDirection: (id) => request.get(`/admin/filterConfig/topicDirections/${id}`),
  createTopicDirection: (data) => request.post('/admin/filterConfig/topicDirections', data),
  updateTopicDirection: (id, data) => request.put(`/admin/filterConfig/topicDirections/${id}`, data),
  deleteTopicDirection: (id) => request.delete(`/admin/filterConfig/topicDirections/${id}`),
  updateTopicDirectionEnabled: (id, enabled) => request.put(`/admin/filterConfig/topicDirections/${id}/enabled`, { enabled }),

  // 排序选项（预留）
  getSortOptionList: (params = {}) => request.get('/admin/filterConfig/sortOptions', { params }),
  getSortOption: (id) => request.get(`/admin/filterConfig/sortOptions/${id}`)
}

