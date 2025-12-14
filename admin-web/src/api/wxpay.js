import request from './request'

export const wxpayApi = {
  // 获取微信支付配置
  getConfig: () => request.get('/admin/wxpay/config'),
  
  // 保存微信支付配置
  saveConfig: (data) => request.post('/admin/wxpay/config', data),
  
  // 删除微信支付配置
  deleteConfig: (id) => request.delete(`/admin/wxpay/config/${id}`)
}

