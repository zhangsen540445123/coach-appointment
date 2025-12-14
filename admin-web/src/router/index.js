import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('@/layout/Layout.vue'),
    redirect: '/dashboard',
    children: [
      { path: 'dashboard', name: 'Dashboard', component: () => import('@/views/Dashboard.vue'), meta: { title: '仪表盘' } },
      { path: 'user', name: 'UserList', component: () => import('@/views/user/UserList.vue'), meta: { title: '用户管理' } },
      { path: 'user/:id', name: 'UserDetail', component: () => import('@/views/user/UserDetail.vue'), meta: { title: '用户详情' } },
      { path: 'counselor', name: 'CounselorList', component: () => import('@/views/counselor/CounselorList.vue'), meta: { title: '教练管理' } },
      { path: 'counselor/create', name: 'CounselorCreate', component: () => import('@/views/counselor/CounselorEdit.vue'), meta: { title: '添加教练' } },
      { path: 'counselor/:id', name: 'CounselorEdit', component: () => import('@/views/counselor/CounselorEdit.vue'), meta: { title: '编辑教练' } },
      { path: 'counselor/:id/calendar', name: 'CounselorCalendar', component: () => import('@/views/counselor/CounselorCalendar.vue'), meta: { title: '日程管理' } },
      { path: 'order', name: 'OrderList', component: () => import('@/views/order/OrderList.vue'), meta: { title: '订单管理' } },
      { path: 'order/:id', name: 'OrderDetail', component: () => import('@/views/order/OrderDetail.vue'), meta: { title: '订单详情' } },
      { path: 'audit', name: 'AuditList', component: () => import('@/views/audit/AuditList.vue'), meta: { title: '审核管理' } },
      { path: 'carousel', name: 'CarouselList', component: () => import('@/views/carousel/CarouselList.vue'), meta: { title: '轮播图管理' } },
      { path: 'feedback', name: 'FeedbackList', component: () => import('@/views/feedback/Feedback.vue'), meta: { title: '用户反馈' } },
      { path: 'customer', name: 'CustomerList', component: () => import('@/views/customer/CustomerList.vue'), meta: { title: '客户信息' } },
      { path: 'star', name: 'StarList', component: () => import('@/views/star/StarList.vue'), meta: { title: '收藏管理' } },
      { path: 'coupon', name: 'CouponList', component: () => import('@/views/coupon/CouponList.vue'), meta: { title: '优惠券管理' } },
      { path: 'coupon/code/:couponId', name: 'CouponCode', component: () => import('@/views/coupon/CouponCode.vue'), meta: { title: '兑换码管理' } },
      { path: 'coupon/distribution/:couponId', name: 'CouponDistribution', component: () => import('@/views/coupon/CouponDistribution.vue'), meta: { title: '发放记录' } },
      { path: 'settings', name: 'Settings', component: () => import('@/views/settings/Settings.vue'), meta: { title: '系统设置' } },
      { path: 'settings/wxpay', name: 'WxPaySettings', component: () => import('@/views/settings/WxPaySettings.vue'), meta: { title: '微信支付配置' } }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth !== false && !userStore.isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && userStore.isLoggedIn) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
