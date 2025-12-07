import request from './request'

export const settingsApi = {
  getAll: () => request.get('/admin/settings'),
  update: (key, value) => request.post('/admin/settings', { key, value })
}
