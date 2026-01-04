<template>
  <el-container class="layout-container">
    <el-aside width="200px" class="sidebar">
      <div class="logo">{{ userStore.isCounselor ? '教练工作台' : '教练管理后台' }}</div>
      <el-menu :default-active="activeMenu" router background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">

        <!-- 管理员菜单 -->
        <template v-if="userStore.isAdmin">
          <el-menu-item index="/dashboard">
            <el-icon><Odometer /></el-icon>
            <span>仪表盘</span>
          </el-menu-item>
          <el-menu-item index="/user">
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/counselor">
            <el-icon><Avatar /></el-icon>
            <span>教练管理</span>
          </el-menu-item>
          <el-menu-item index="/order">
            <el-icon><List /></el-icon>
            <span>订单管理</span>
          </el-menu-item>
          <el-menu-item index="/audit">
            <el-icon><Document /></el-icon>
            <span>审核管理</span>
          </el-menu-item>
          <el-menu-item index="/review">
            <el-icon><Comment /></el-icon>
            <span>评价管理</span>
          </el-menu-item>
          <el-menu-item index="/carousel">
            <el-icon><Picture /></el-icon>
            <span>轮播图管理</span>
          </el-menu-item>
          <el-menu-item index="/consult-guide">
            <el-icon><QuestionFilled /></el-icon>
            <span>咨询指南</span>
          </el-menu-item>
          <el-menu-item index="/feedback">
            <el-icon><ChatDotRound /></el-icon>
            <span>用户反馈</span>
          </el-menu-item>
          <el-menu-item index="/customer">
            <el-icon><Notebook /></el-icon>
            <span>客户信息</span>
          </el-menu-item>
          <el-menu-item index="/star">
            <el-icon><Star /></el-icon>
            <span>收藏管理</span>
          </el-menu-item>
          <el-menu-item index="/coupon">
            <el-icon><Ticket /></el-icon>
            <span>优惠券管理</span>
          </el-menu-item>
          <el-menu-item index="/studio">
            <el-icon><OfficeBuilding /></el-icon>
            <span>悦行活动管理</span>
          </el-menu-item>
          <el-menu-item index="/growth-member">
            <el-icon><Medal /></el-icon>
            <span>成长会会员</span>
          </el-menu-item>
          <el-menu-item index="/account">
            <el-icon><UserFilled /></el-icon>
            <span>账号管理</span>
          </el-menu-item>
          <el-sub-menu index="/report">
            <template #title>
              <el-icon><DataAnalysis /></el-icon>
              <span>数据报表</span>
            </template>
            <el-menu-item index="/report/financial">财务报表</el-menu-item>
            <el-menu-item index="/report/operations">运营报表</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/settings">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/settings">基本设置</el-menu-item>
            <el-menu-item index="/settings/wxpay">微信支付配置</el-menu-item>
            <el-menu-item index="/dict">基础数据</el-menu-item>
          </el-sub-menu>
        </template>

        <!-- 教练菜单 -->
        <template v-if="userStore.isCounselor">
          <el-menu-item index="/coach/dashboard">
            <el-icon><Odometer /></el-icon>
            <span>工作台</span>
          </el-menu-item>
          <el-menu-item index="/coach/profile">
            <el-icon><User /></el-icon>
            <span>个人信息</span>
          </el-menu-item>
          <el-menu-item index="/coach/orders">
            <el-icon><List /></el-icon>
            <span>我的订单</span>
          </el-menu-item>
          <el-menu-item index="/coach/reviews">
            <el-icon><Comment /></el-icon>
            <span>用户评价</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <el-container class="main-container">
      <el-header class="header">
        <el-dropdown @command="handleCommand">
          <span class="user-info">
            <el-avatar :size="32" />
            <span>{{ userStore.userInfo?.realName || userStore.userInfo?.username }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const activeMenu = computed(() => {
  const path = route.path
  // 管理员页面
  if (path.startsWith('/user')) return '/user'
  if (path.startsWith('/counselor')) return '/counselor'
  if (path.startsWith('/order') && !path.startsWith('/order/review')) return '/order'
  if (path.startsWith('/audit')) return '/audit'
  if (path.startsWith('/review')) return '/review'
  if (path.startsWith('/carousel')) return '/carousel'
  if (path.startsWith('/consult-guide')) return '/consult-guide'
  if (path.startsWith('/feedback')) return '/feedback'
  if (path.startsWith('/star')) return '/star'
  if (path.startsWith('/coupon')) return '/coupon'
  if (path.startsWith('/growth-member')) return '/growth-member'
  if (path.startsWith('/account')) return '/account'
  if (path.startsWith('/report')) return '/report'
  if (path.startsWith('/settings')) return '/settings'
  if (path.startsWith('/dict')) return '/dict'
  // 教练页面
  if (path.startsWith('/coach/dashboard')) return '/coach/dashboard'
  if (path.startsWith('/coach/profile')) return '/coach/profile'
  if (path.startsWith('/coach/orders')) return '/coach/orders'
  if (path.startsWith('/coach/reviews')) return '/coach/reviews'
  // 默认
  return userStore.isCounselor ? '/coach/dashboard' : '/dashboard'
})

const handleCommand = (cmd) => {
  if (cmd === 'logout') {
    ElMessageBox.confirm('确定要退出登录吗？', '确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      userStore.logout()
      router.push('/login')
      ElMessage.success('已退出登录')
    }).catch(() => {})
  }
}
</script>

<style scoped>
.layout-container { width: 100%; height: 100vh; }
.sidebar { height: 100vh; background: #304156; }
.logo { height: 60px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 18px; font-weight: bold; background: #263445; }
.el-menu { border-right: none; }
.main-container { display: flex; flex-direction: column; overflow: hidden; }
.header { height: 60px; background: #fff; border-bottom: 1px solid #e6e6e6; display: flex; align-items: center; justify-content: flex-end; padding: 0 20px; }
.user-info { display: flex; align-items: center; cursor: pointer; }
.user-info span { margin-left: 10px; }
.main-content { padding: 20px; background: #f0f2f5; overflow: auto; }
</style>
