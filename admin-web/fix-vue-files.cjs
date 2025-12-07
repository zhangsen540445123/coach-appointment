const fs = require('fs');

// App.vue
fs.writeFileSync('src/App.vue', `<template>
  <router-view />
</template>

<script setup>
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100%;
}
</style>
`);
console.log('App.vue fixed');

// Login.vue
fs.writeFileSync('src/views/Login.vue', `<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="title">教练预约管理系统</h2>
      <el-form ref="formRef" :model="loginForm" :rules="rules" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="密码" prefix-icon="Lock" show-password />
        </el-form-item>
        <el-button type="primary" class="login-btn" :loading="loading" @click="handleLogin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const formRef = ref(null)
const loginForm = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const handleLogin = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    try {
      const res = await userStore.login(loginForm)
      if (res.code === 200) {
        ElMessage.success('登录成功')
        router.push('/dashboard')
      }
    } catch (e) {
      console.error(e)
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.login-container { display: flex; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.login-box { width: 400px; padding: 40px; background: #fff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
.title { text-align: center; font-size: 24px; color: #333; margin-bottom: 30px; font-weight: 600; }
.login-form { width: 100%; }
.login-btn { width: 100%; }
</style>
`);
console.log('Login.vue fixed');

// Dashboard.vue
fs.writeFileSync('src/views/Dashboard.vue', `







          欢迎使用
          教练预约管理系统












              {{ item.value }}
              {{ item.label }}









import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { orderApi } from '@/api/order'
import { paymentApi } from '@/api/payment'

const userStore = useUserStore()

const stats = ref({
  totalOrders: 0,
  totalPayments: 0,
  pendingOrders: 0,
  todayOrders: 0
})

const statCards = computed(() => [
  { label: '总订单数', value: stats.value.totalOrders, icon: 'List', color: '#409EFF' },
  { label: '支付金额', value: '¥' + stats.value.totalPayments, icon: 'Wallet', color: '#67C23A' },
  { label: '待处理订单', value: stats.value.pendingOrders, icon: 'Clock', color: '#E6A23C' },
  { label: '今日订单', value: stats.value.todayOrders, icon: 'Calendar', color: '#F56C6C' }
])

onMounted(async () => {
  if (userStore.isAdmin) {
    try {
      const [orderRes, paymentRes] = await Promise.all([
        orderApi.getStatistics(),
        paymentApi.getStatistics()
      ])
      if (orderRes.code === 200) {
        stats.value.totalOrders = orderRes.data.total || 0
        stats.value.pendingOrders = orderRes.data.pending || 0
        stats.value.todayOrders = orderRes.data.today || 0
      }
      if (paymentRes.code === 200) {
        stats.value.totalPayments = paymentRes.data.totalAmount || 0
      }
    } catch (e) { console.error(e) }
  }
})



.dashboard { padding: 20px; }
.welcome-card { margin-bottom: 20px; }
.welcome-content { display: flex; align-items: center; }
.welcome-text h2 { margin: 0 0 8px; font-size: 24px; }
.welcome-text p { margin: 0; color: #666; }
.stat-card { text-align: center; }
.stat-content { display: flex; align-items: center; justify-content: center; gap: 15px; }
.stat-icon { font-size: 40px; }
.stat-info .value { font-size: 28px; font-weight: bold; }
.stat-info .label { color: #999; font-size: 14px; }

`);
console.log('Dashboard.vue fixed');

