const fs = require('fs');

// Layout.vue
fs.writeFileSync('src/layout/Layout.vue', `\ufeff
  
    
      教练预约
      
        
          {{ item.meta.title }}
        
      
    
    
      
        
          
            
              欢迎, {{ userStore.userInfo?.realName || userStore.userInfo?.username }}
              {{ userStore.isAdmin ? '管理员' : '教练' }}
            
            
              
                修改密码
                退出登录
              
            
          
        
      
      
        
      
    
  



import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const menuItems = computed(() => {
  const allRoutes = router.options.routes.find(r => r.path === '/')?.children || []
  return allRoutes.filter(item => {
    if (!item.meta?.title) return false
    if (!item.meta.roles) return true
    return item.meta.roles.includes(userStore.userInfo?.role)
  })
})

const activeMenu = computed(() => '/' + (route.path.split('/')[1] || 'dashboard'))
const handleMenuSelect = (path) => { router.push(path) }
const handleChangePassword = () => { ElMessage.info('修改密码功能开发中') }
const handleLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
    .then(() => { userStore.logout(); router.push('/login'); ElMessage.success('已退出登录') }).catch(() => {})
}



.layout-container { display: flex; height: 100vh; }
.aside { background-color: #304156; }
.logo { height: 60px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 18px; font-weight: bold; background-color: #263445; }
.el-menu { border-right: none; }
.main-container { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.header { background-color: #fff; box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08); display: flex; justify-content: flex-end; align-items: center; padding: 0 20px; }
.header-right { display: flex; align-items: center; gap: 20px; }
.user-info { display: flex; align-items: center; gap: 10px; }
.main-content { flex: 1; padding: 20px; background-color: #f0f2f5; overflow-y: auto; }

`);
console.log('Layout.vue fixed');

