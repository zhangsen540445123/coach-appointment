<template>
      Search
        <template #default="scope">
          Toggle Status
          Delete
        </template>
</template>
<script setup>
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
    ElMessage.success('Status updated')
    fetchData()
  } catch (e) { console.error(e) }
}

const handleDelete = (row) => {
  ElMessageBox.confirm('Are you sure to delete this user?', 'Confirm', { type: 'warning' }).then(async () => {
    await userApi.delete(row.id)
    ElMessage.success('Deleted')
    fetchData()
  }).catch(() => {})
}

onMounted(() => { fetchData() })
</script>

<style scoped>
.user-list { background: #fff; padding: 20px; border-radius: 4px; }
.toolbar { margin-bottom: 16px; display: flex; gap: 10px; }
</style>
