import request from './request'

// 获取反馈列表
export function getFeedbackList(status) {
  return request({
    url: '/global/admin/feedback/list',
    method: 'get',
    params: { status }
  })
}

// 获取反馈详情
export function getFeedbackDetail(id) {
  return request({
    url: `/global/admin/feedback/${id}`,
    method: 'get'
  })
}

// 处理反馈
export function handleFeedback(data) {
  return request({
    url: '/global/admin/feedback/handle',
    method: 'post',
    data
  })
}

// 删除反馈
export function deleteFeedback(id) {
  return request({
    url: `/global/admin/feedback/${id}`,
    method: 'delete'
  })
}

