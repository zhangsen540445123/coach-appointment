import request from './request'

export const authApi = {
  login: (data) => request.post('/admin/auth/login', data),
  logout: () => request.post('/admin/auth/logout'),
  getProfile: () => request.get('/admin/auth/profile'),
  updatePassword: (data) => request.post('/admin/auth/password', data)
}
