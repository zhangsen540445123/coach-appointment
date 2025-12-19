<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="title">Coach Admin</h1>
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="Username" prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="Password" prefix-icon="Lock" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" :loading="loading" @click="handleLogin">Login</el-button>
        </el-form-item>
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
const formRef = ref(null)
const loading = ref(false)

const form = reactive({ username: '', password: '' })

const rules = {
  username: [{ required: true, message: 'Please enter username', trigger: 'blur' }],
  password: [{ required: true, message: 'Please enter password', trigger: 'blur' }]
}

const handleLogin = async () => {
  if (!formRef.value) return

  try {
    // Use promise-based validation instead of callback-based
    const valid = await formRef.value.validate().catch(() => false)
    if (!valid) return

    loading.value = true
    const res = await userStore.login(form.username, form.password)

    // 后端 ApiResponse.success() 返回 code=0，不是 200
    if (res.code === 0) {
      ElMessage({
        message: '登录成功',
        type: 'success',
        duration: 2000
      })
      // 根据用户角色跳转到对应的首页
      const targetPath = userStore.role === 2 ? '/coach/dashboard' : '/dashboard'
      await router.push(targetPath)
    } else {
      ElMessage({
        message: res.msg || '登录失败',
        type: 'error',
        duration: 3000
      })
    }
  } catch (e) {
    ElMessage({
      message: '登录失败',
      type: 'error',
      duration: 3000
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container { width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.login-box { width: 400px; padding: 40px; background: #fff; border-radius: 8px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
.title { text-align: center; margin-bottom: 30px; color: #333; font-size: 24px; }
.login-btn { width: 100%; }
</style>
