import request from './request'

export const reportApi = {
  // 获取财务报表
  getFinancialReport(params) {
    return request.get('/admin/report/financial', { params })
  },

  // 获取运营报表
  getOperationsReport(params) {
    return request.get('/admin/report/operations', { params })
  }
}

