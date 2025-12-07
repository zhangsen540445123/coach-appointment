const fs = require('fs');

// AuditList.vue
fs.writeFileSync('src/views/audit/AuditList.vue', `
  
    
      
      
        全部
        待审核
        已通过
        已拒绝
      
      搜索
    
    
      
      
      
      
        
          {{ getStatusText(row.status) }}
        
      
      
      
        
          审核
        
      
    
    
    
    
      
        
          {{ auditDetail.counselorName }}
        
        
          {{ auditDetail.updateContent }}
        
        
          {{ auditDetail.createdAt }}
        
      
      
        拒绝原因
        
      
      
        拒绝
        通过
      
    
  



import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { counselorApi } from '@/api/counselor'

const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const queryParams = reactive({ page: 1, pageSize: 10, keyword: '' })
const statusFilter = ref('')

const statusMap = { 0: { text: '待审核', type: 'warning' }, 1: { text: '已通过', type: 'success' }, 2: { text: '已拒绝', type: 'danger' } }
const getStatusText = (s) => statusMap[s]?.text || '未知'
const getStatusType = (s) => statusMap[s]?.type || 'info'

const auditDialogVisible = ref(false)
const auditDetail = ref({})
const rejectReason = ref('')

const fetchData = async () => {
  loading.value = true
  try {
    const params = { ...queryParams }
    if (statusFilter.value !== '') params.status = Number(statusFilter.value)
    const res = await counselorApi.getAuditList(params)
    if (res.code === 200) { tableData.value = res.data.list; total.value = res.data.total }
  } finally { loading.value = false }
}

const handleSearch = () => { queryParams.page = 1; fetchData() }
const handlePageChange = (page) => { queryParams.page = page; fetchData() }

const handleAudit = (row) => {
  auditDetail.value = row
  rejectReason.value = ''
  auditDialogVisible.value = true
}

const handleApprove = async () => {
  try {
    await counselorApi.audit(auditDetail.value.id, { status: 1 })
    ElMessage.success('审核通过')
    auditDialogVisible.value = false
    fetchData()
  } catch (e) { console.error(e) }
}

const handleReject = async () => {
  if (!rejectReason.value) { ElMessage.warning('请输入拒绝原因'); return }
  try {
    await counselorApi.audit(auditDetail.value.id, { status: 2, reason: rejectReason.value })
    ElMessage.success('已拒绝')
    auditDialogVisible.value = false
    fetchData()
  } catch (e) { console.error(e) }
}

onMounted(() => { fetchData() })



.audit-list { background: #fff; padding: 20px; border-radius: 4px; }
.toolbar { margin-bottom: 16px; display: flex; gap: 10px; }
.audit-info { margin-bottom: 20px; }
.reject-input { margin-top: 20px; }

`);
console.log('AuditList.vue fixed');

