<template>
  <el-container class="layout-container">
    <el-aside width="200px" class="sidebar">
      <div class="logo">教练管理后台</div>
      <el-menu :default-active="activeMenu" router background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
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
        <el-menu-item index="/carousel">
          <el-icon><Picture /></el-icon>
          <span>轮播图管理</span>
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
        <el-menu-item index="/settings">
          <el-icon><Setting /></el-icon>
          <span>系统设置</span>
        </el-menu-item>
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
  if (path.startsWith('/user')) return '/user'
  if (path.startsWith('/counselor')) return '/counselor'
  if (path.startsWith('/order')) return '/order'
  if (path.startsWith('/audit')) return '/audit'
  if (path.startsWith('/carousel')) return '/carousel'
  if (path.startsWith('/feedback')) return '/feedback'
  if (path.startsWith('/star')) return '/star'
  if (path.startsWith('/coupon')) return '/coupon'
  if (path.startsWith('/settings')) return '/settings'
  return '/dashboard'
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
