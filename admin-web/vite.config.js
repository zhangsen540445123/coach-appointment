import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    plugins: [vue()],
    // 生产环境下的基础路径（部署在 /admin/ 下）
    base: '/admin/',
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'https://localhost',
                changeOrigin: true,
                secure: false // 允许自签名证书
            }
        }
    }
})