const fs = require('fs');

// CounselorList.vue
fs.writeFileSync('src/views/counselor/CounselorList.vue', `
  
    
      
      搜索
      新增教练
    
    
      
      
      
      
      
      
      
        
          {{ row.status === 1 ? '启用' : '禁用' }}
        
      
      
        
          编辑
          禁用
          启用
          删除
        
      
    
    
    
    
      
        
          
        
        
          
        
        
          
        
        
          
        
        
          
        
      
      
        取消
        {{ isEdit ? '保存' : '创建' }}
      
    
  



import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { counselorApi } from '@/api/counselor'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const isAdmin = computed(() => userStore.isAdmin)
const isCoach = computed(() => userStore.isCoach)

const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const queryParams = reactive({ page: 1, pageSize: 10, keyword: '' })

const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const form = reactive({ id: null, name: '', phone: '', specialties: '', introduction: '', price: '' })

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入电话', trigger: 'blur' }]
}

const fetchData = async () => {
  loading.value = true
  try {
    const res = await counselorApi.getList(queryParams)
    if (res.code === 200) {
      let list = res.data.list
      if (isCoach.value && userStore.userInfo?.counselorId) {
        list = list.filter(c => c.id === userStore.userInfo.counselorId)
      }
      tableData.value = list
      total.value = isCoach.value ? list.length : res.data.total
    }
  } finally { loading.value = false }
}

const handleSearch = () => { queryParams.page = 1; fetchData() }
const handlePageChange = (page) => { queryParams.page = page; fetchData() }

const handleAdd = () => {
  isEdit.value = false
  Object.assign(form, { id: null, name: '', phone: '', specialties: '', introduction: '', price: '' })
  dialogVisible.value = true
}

const handleEdit = async (row) => {
  isEdit.value = true
  const res = await counselorApi.getById(row.id)
  if (res.code === 200) { Object.assign(form, res.data); dialogVisible.value = true }
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    try {
      if (isEdit.value) {
        if (isAdmin.value) {
          await counselorApi.update(form.id, form)
          ElMessage.success('更新成功')
        } else {
          await counselorApi.submitUpdate(form.id, form)
          ElMessage.success('已提交审核')
        }
      } else {
        await counselorApi.create(form)
        ElMessage.success('创建成功')
      }
      dialogVisible.value = false
      fetchData()
    } catch (e) { console.error(e) }
  })
}

const handleToggleStatus = async (row) => {
  await counselorApi.toggleStatus(row.id)
  ElMessage.success('状态已更新')
  fetchData()
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定删除该教练吗？', '提示', { type: 'warning' }).then(async () => {
    await counselorApi.delete(row.id)
    ElMessage.success('删除成功')
    fetchData()
  }).catch(() => {})
}

onMounted(() => { fetchData() })



.counselor-list { background: #fff; padding: 20px; border-radius: 4px; }
.toolbar { margin-bottom: 16px; display: flex; gap: 10px; }
.avatar { width: 40px; height: 40px; border-radius: 50%; }

`);
console.log('CounselorList.vue fixed');

