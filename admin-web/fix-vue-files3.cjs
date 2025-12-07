const fs = require('fs');

// PaymentList.vue
fs.writeFileSync('src/views/payment/PaymentList.vue', `
  
    
      
      
        全部
        未支付
        已支付
      
      搜索
    
    
      
      
      
        
          {{ formatPrice(row.amount) }}
        
      
      
        
          {{ row.status === 1 ? '已支付' : '未支付' }}
        
      
      
      
        
          退款
        
      
    
    
  



import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { paymentApi } from '@/api/payment'

const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const queryParams = reactive({ page: 1, pageSize: 10, keyword: '' })
const statusFilter = ref('')

const formatPrice = (p) => p ? '¥' + Number(p).toFixed(2) : '¥0.00'

const fetchData = async () => {
  loading.value = true
  try {
    const status = statusFilter.value === '' ? null : Number(statusFilter.value)
    const res = await paymentApi.getList(queryParams, status)
    if (res.code === 200) { tableData.value = res.data.list; total.value = res.data.total }
  } finally { loading.value = false }
}

const handleSearch = () => { queryParams.page = 1; fetchData() }
const handlePageChange = (page) => { queryParams.page = page; fetchData() }

const handleRefund = (row) => {
  ElMessageBox.prompt('请输入退款原因', '发起退款', { confirmButtonText: '确定', cancelButtonText: '取消' })
    .then(async ({ value }) => {
      await paymentApi.refund(row.id, { reason: value })
      ElMessage.success('退款成功')
      fetchData()
    }).catch(() => {})
}

onMounted(() => { fetchData() })



.payment-list { background: #fff; padding: 20px; border-radius: 4px; }
.toolbar { margin-bottom: 16px; display: flex; gap: 10px; }

`);
console.log('PaymentList.vue fixed');

