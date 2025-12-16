import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '@/api/auth'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('admin_token') || '')
  const userInfo = ref(JSON.parse(localStorage.getItem('admin_user') || 'null'))

  const isLoggedIn = computed(() => !!token.value)
  const role = computed(() => userInfo.value?.role || 0)
  const isAdmin = computed(() => userInfo.value?.role === 1)
  const isCounselor = computed(() => userInfo.value?.role === 2)

  function setToken(t) {
    token.value = t
    localStorage.setItem('admin_token', t)
  }

  function setUserInfo(info) {
    userInfo.value = info
    localStorage.setItem('admin_user', JSON.stringify(info))
  }

  async function login(username, password) {
    const res = await authApi.login({ username, password })
    if (res.code === 200) {
      setToken(res.data.token)
      setUserInfo({
        userId: res.data.userId,
        username: res.data.username,
        realName: res.data.realName,
        avatar: res.data.avatar,
        role: res.data.role,
        counselorId: res.data.counselorId
      })
    }
    return res
  }

  function logout() {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
  }

  return { token, userInfo, isLoggedIn, role, isAdmin, isCounselor, setToken, setUserInfo, login, logout }
})
