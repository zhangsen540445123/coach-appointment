import request from './request'

export const growthMemberApi = {
  // 获取成长会员列表
  getPage(params) {
    return request.get('/admin/growth-members/page', { params })
  },

  // 获取成长会员详情
  getDetail(id) {
    return request.get(`/admin/growth-members/${id}`)
  },

  // 创建成长会员
  create(data) {
    return request.post('/admin/growth-members', data)
  },

  // 更新成长会员
  update(id, data) {
    return request.put(`/admin/growth-members/${id}`, data)
  },

  // 删除成长会员
  delete(id) {
    return request.delete(`/admin/growth-members/${id}`)
  },

  // 批量删除成长会员
  batchDelete(ids) {
    return request.delete('/admin/growth-members/batch', { data: { ids } })
  },

  // 导入成长会员数据
  import(formData) {
    return request.post('/admin/growth-members/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  // 同步数据到用户表
  sync(phones) {
    return request.post('/admin/growth-members/sync', { phones })
  },

  // 导出成长会员数据
  export(params) {
    return request.get('/admin/growth-members/export', {
      params,
      responseType: 'blob'
    })
  },

  // 下载导入模板
  downloadTemplate() {
    return request.get('/admin/growth-members/template', {
      responseType: 'blob'
    })
  },

  // 获取筛选选项
  getFilterOptions() {
    return request.get('/admin/growth-members/filter-options')
  },

  // 获取统计数据
  getStats() {
    return request.get('/admin/growth-members/stats')
  }
}

