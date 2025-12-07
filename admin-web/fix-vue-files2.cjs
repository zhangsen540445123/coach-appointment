const fs = require('fs');

// UserList.vue
fs.writeFileSync('src/views/user/UserList.vue', `
  
    
      
      搜索
    
    
      
      
      
      
      
      
        
          切换状态
          删除
        
      
    
    
  



import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { userApi } from '@/api/user'

const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const queryParams = reactive({ page: 1, pageSize: 10, keyword: '' })

const fetchData = async () => {
  loading.value = true
  try {
    const res = await userApi.getList(queryParams)
    if (res.code === 200) { tableData.value = res.data.list; total.value = res.data.total }
  } finally { loading.value = false }
}

const handleSearch = () => { queryParams.page = 1; fetchData() }
const handlePageChange = (page) => { queryParams.page = page; fetchData() }

const handleToggleStatus = async (row) => {
  try {
    await userApi.toggleStatus(row.id)
    ElMessage.success('状态已更新')
    fetchData()
  } catch (e) { console.error(e) }
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定删除该用户吗？', '提示', { type: 'warning' }).then(async () => {
    await userApi.delete(row.id)
    ElMessage.success('删除成功')
    fetchData()
  }).catch(() => {})
}

onMounted(() => { fetchData() })



.user-list { background: #fff; padding: 20px; border-radius: 4px; }
.toolbar { margin-bottom: 16px; display: flex; gap: 10px; }

`);
console.log('UserList.vue fixed');

// OrderList.vue
fs.writeFileSync('src/views/order/OrderList.vue', `
  
    
      
      
        全部
        待支付
        已支付
        已完成
        已取消
      
      搜索
    
    
      
      
      
        
          {{ formatPrice(row.price) }}
        
      
      
        
          {{ getStatusText(row.status) }}
        
      
      
      
        
          查看
          取消
        
      
    
    
  



import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { orderApi } from '@/api/order'

const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const queryParams = reactive({ page: 1, pageSize: 10, keyword: '', status: '' })

const statusMap = { 0: { text: '待支付', type: 'info' }, 1: { text: '已支付', type: 'warning' }, 2: { text: '已完成', type: 'success' }, 3: { text: '已取消', type: 'danger' } }
const getStatusText = (s) => statusMap[s]?.text || '未知'
const getStatusType = (s) => statusMap[s]?.type || 'info'
const formatPrice = (p) => p ? '¥' + Number(p).toFixed(2) : '¥0.00'

const fetchData = async () => {
  loading.value = true
  try {
    const res = await orderApi.getList(queryParams)
    if (res.code === 200) { tableData.value = res.data.list; total.value = res.data.total }
  } finally { loading.value = false }
}

const handleSearch = () => { queryParams.page = 1; fetchData() }
const handlePageChange = (page) => { queryParams.page = page; fetchData() }

const handleView = (row) => { ElMessage.info('订单详情: ' + row.orderNo) }
const handleCancel = (row) => {
  ElMessageBox.prompt('请输入取消原因', '取消订单', { confirmButtonText: '确定', cancelButtonText: '取消' })
    .then(async ({ value }) => {
      await orderApi.cancel(row.id, { reason: value })
      ElMessage.success('订单已取消')
      fetchData()
    }).catch(() => {})
}

onMounted(() => { fetchData() })



.order-list { background: #fff; padding: 20px; border-radius: 4px; }
.toolbar { margin-bottom: 16px; display: flex; gap: 10px; }

`);
console.log('OrderList.vue fixed');

