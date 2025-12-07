import request from './request'

export const counselorApi = {
  getList: (params) => request.post('/admin/counselor/list', params),
  getById: (id) => request.get('/admin/counselor/' + id),
  create: (data) => request.post('/admin/counselor/create', data),
  update: (id, data) => request.put('/admin/counselor/' + id, data),
  delete: (id) => request.delete('/admin/counselor/' + id),
  toggleStatus: (id, canConsult) => request.post('/admin/counselor/' + id + '/toggleStatus', { canConsult }),
  setTop: (id, isTop) => request.post('/admin/counselor/' + id + '/setTop', { isTop }),
  updateSort: (id, sortOrder) => request.post('/admin/counselor/' + id + '/sort', { sortOrder }),
  getAuditList: (params, status) => request.post('/admin/counselor/audit/list?status=' + (status || ''), params),
  audit: (auditId, data) => request.post('/admin/counselor/audit/' + auditId, data),
  // 可预约时间管理
  getCalendar: (counselorId, startDate, endDate) => request.get('/admin/counselor-calendar/' + counselorId, { params: { startDate, endDate } }),
  saveCalendar: (counselorId, slots) => request.post('/admin/counselor-calendar/' + counselorId + '/batch', slots),
  addCalendarSlot: (counselorId, slot) => request.post('/admin/counselor-calendar/' + counselorId, slot),
  deleteCalendarSlot: (id) => request.delete('/admin/counselor-calendar/' + id)
}
