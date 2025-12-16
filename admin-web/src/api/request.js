import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const request = axios.create({
    baseURL: '/api',
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' }
})

request.interceptors.request.use(config => {
    const userStore = useUserStore()
    if (userStore.token) {
        config.headers.Authorization = 'Bearer ' + userStore.token
    }
    return config
})

request.interceptors.response.use(
    response => response.data,
    error => {
        const msg = error.response?.data?.message || error.message || 'Request failed'
        ElMessage.error(msg)
        if (error.response?.status === 401) {
            const userStore = useUserStore()
            userStore.logout()
            // Use Vite BASE_URL to build correct login path
            const basePath = import.meta.env.BASE_URL || '/'
            window.location.href = basePath + 'login'
        }
        return Promise.reject(error)
    }
)

export default request
