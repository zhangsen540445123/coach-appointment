import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [{
        path: '/login',
        name: 'Login',
        component: () =>
            import ('@/views/Login.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/',
        component: () =>
            import ('@/layout/Layout.vue'),
        redirect: '/dashboard',
        children: [
            // 通用页面
            { path: 'dashboard', name: 'Dashboard', component: () =>
                    import ('@/views/Dashboard.vue'), meta: { title: '仪表盘', roles: [1] } },

            // 管理员页面
            { path: 'user', name: 'UserList', component: () =>
                    import ('@/views/user/UserList.vue'), meta: { title: '用户管理', roles: [1] } },
            { path: 'user/:id', name: 'UserDetail', component: () =>
                    import ('@/views/user/UserDetail.vue'), meta: { title: '用户详情', roles: [1] } },
            { path: 'counselor', name: 'CounselorList', component: () =>
                    import ('@/views/counselor/CounselorList.vue'), meta: { title: '教练管理', roles: [1] } },
            { path: 'counselor/create', name: 'CounselorCreate', component: () =>
                    import ('@/views/counselor/CounselorEdit.vue'), meta: { title: '添加教练', roles: [1] } },
            { path: 'counselor/:id', name: 'CounselorEdit', component: () =>
                    import ('@/views/counselor/CounselorEdit.vue'), meta: { title: '编辑教练', roles: [1] } },
            { path: 'counselor/:id/calendar', name: 'CounselorCalendar', component: () =>
                    import ('@/views/counselor/CounselorCalendar.vue'), meta: { title: '日程管理', roles: [1] } },
            { path: 'order', name: 'OrderList', component: () =>
                    import ('@/views/order/OrderList.vue'), meta: { title: '订单管理', roles: [1] } },
            { path: 'order/:id', name: 'OrderDetail', component: () =>
                    import ('@/views/order/OrderDetail.vue'), meta: { title: '订单详情', roles: [1] } },
            { path: 'audit', name: 'AuditList', component: () =>
                    import ('@/views/audit/AuditList.vue'), meta: { title: '审核管理', roles: [1] } },
            { path: 'review', name: 'ReviewList', component: () =>
                    import ('@/views/review/ReviewList.vue'), meta: { title: '评价管理', roles: [1] } },
            { path: 'carousel', name: 'CarouselList', component: () =>
                    import ('@/views/carousel/CarouselList.vue'), meta: { title: '轮播图管理', roles: [1] } },
            { path: 'feedback', name: 'FeedbackList', component: () =>
                    import ('@/views/feedback/Feedback.vue'), meta: { title: '用户反馈', roles: [1] } },
            { path: 'customer', name: 'CustomerList', component: () =>
                    import ('@/views/customer/CustomerList.vue'), meta: { title: '客户信息', roles: [1] } },
            { path: 'star', name: 'StarList', component: () =>
                    import ('@/views/star/StarList.vue'), meta: { title: '收藏管理', roles: [1] } },
            { path: 'coupon', name: 'CouponList', component: () =>
                    import ('@/views/coupon/CouponList.vue'), meta: { title: '优惠券管理', roles: [1] } },
            { path: 'coupon/code/:couponId', name: 'CouponCode', component: () =>
                    import ('@/views/coupon/CouponCode.vue'), meta: { title: '兑换码管理', roles: [1] } },
            { path: 'coupon/distribution/:couponId', name: 'CouponDistribution', component: () =>
                    import ('@/views/coupon/CouponDistribution.vue'), meta: { title: '发放记录', roles: [1] } },
            { path: 'settings', name: 'Settings', component: () =>
                    import ('@/views/settings/Settings.vue'), meta: { title: '系统设置', roles: [1] } },
            { path: 'settings/wxpay', name: 'WxPaySettings', component: () =>
                    import ('@/views/settings/WxPaySettings.vue'), meta: { title: '微信支付配置', roles: [1] } },
            { path: 'account', name: 'AccountList', component: () =>
                    import ('@/views/account/AccountList.vue'), meta: { title: '账号管理', roles: [1] } },
            { path: 'dict', name: 'DictManage', component: () =>
                    import ('@/views/admin/DictManage.vue'), meta: { title: '基础数据', roles: [1] } },
            { path: 'studio', name: 'StudioList', component: () =>
                    import ('@/views/studio/StudioList.vue'), meta: { title: '线下活动管理', roles: [1] } },
            { path: 'growth-member', name: 'GrowthMemberList', component: () =>
                    import ('@/views/growth-member/GrowthMemberList.vue'), meta: { title: '成长会会员', roles: [1] } },

            // 报表页面
            { path: 'report/financial', name: 'FinancialReport', component: () =>
                    import ('@/views/report/FinancialReport.vue'), meta: { title: '财务报表', roles: [1] } },
            { path: 'report/operations', name: 'OperationsReport', component: () =>
                    import ('@/views/report/OperationsReport.vue'), meta: { title: '运营报表', roles: [1] } },

            // 教练页面
            { path: 'coach/dashboard', name: 'CoachDashboard', component: () =>
                    import ('@/views/coach/CoachDashboard.vue'), meta: { title: '工作台', roles: [2] } },
            { path: 'coach/profile', name: 'CoachProfile', component: () =>
                    import ('@/views/coach/CoachProfile.vue'), meta: { title: '个人信息', roles: [2] } },
            { path: 'coach/orders', name: 'CoachOrders', component: () =>
                    import ('@/views/coach/CoachOrders.vue'), meta: { title: '我的订单', roles: [2] } },
            { path: 'coach/reviews', name: 'CoachReviews', component: () =>
                    import ('@/views/coach/CoachReviews.vue'), meta: { title: '用户评价', roles: [2] } }
        ]
    }
]

const router = createRouter({
    // 生产环境部署在 /admin/ 路径下，开发环境使用根路径
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    // 未登录访问需要认证的页面
    if (to.meta.requiresAuth !== false && !userStore.isLoggedIn) {
        next('/login')
        return
    }

    // 已登录访问登录页面，根据角色跳转
    if (to.path === '/login' && userStore.isLoggedIn) {
        const defaultPath = userStore.role === 2 ? '/coach/dashboard' : '/dashboard'
        next(defaultPath)
        return
    }

    // 角色权限控制
    const roles = to.meta.roles
    if (roles && userStore.isLoggedIn) {
        if (!roles.includes(userStore.role)) {
            // 无权限，跳转到各自首页
            const defaultPath = userStore.role === 2 ? '/coach/dashboard' : '/dashboard'
            next(defaultPath)
            return
        }
    }

    next()
})

export default router