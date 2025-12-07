<template>
  <div class="counselor-list">
    <el-card>
      <div class="search-bar">
        <el-input v-model="searchKeyword" placeholder="Search by name" style="width: 300px" />
        <el-button type="primary" @click="handleSearch">Search</el-button>
        <el-button type="success" @click="handleAdd">Add Coach</el-button>
      </div>
      <el-table :data="tableData" v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="headUrl" label="Avatar" width="80">
          <template #default="scope">
            <el-avatar :src="scope.row.headUrl" :size="40" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="cityName" label="City" />
        <el-table-column prop="consultPrice" label="Price" />
        <el-table-column prop="sortOrder" label="Sort" width="80" />
        <el-table-column prop="canConsult" label="Status" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.canConsult === 1 ? 'success' : 'danger'">{{ scope.row.canConsult === 1 ? 'Active' : 'Inactive' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="360">
          <template #default="scope">
            <el-button size="small" @click="handleToggleTop(scope.row)">{{ scope.row.isTop === 1 ? 'Unpin' : 'Pin' }}</el-button>
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">Edit</el-button>
            <el-button type="info" size="small" @click="handleCalendar(scope.row)">Schedule</el-button>
            <el-button :type="scope.row.canConsult === 1 ? 'warning' : 'success'" size="small" @click="handleToggleStatus(scope.row)">{{ scope.row.canConsult === 1 ? 'Disable' : 'Enable' }}</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pagination.page" :page-size="pagination.pageSize" :total="total" @current-change="handlePageChange" style="margin-top: 20px" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { counselorApi } from '@/api/counselor'

const router = useRouter()
const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const searchKeyword = ref('')
const pagination = ref({ page: 1, pageSize: 10 })

const loadData = async () => {
  loading.value = true
  try {
    const res = await counselorApi.getList({ ...pagination.value, keyword: searchKeyword.value })
    if (res.code === 0 || res.code === 200) {
      tableData.value = res.data?.list || []
      total.value = res.data?.total || 0
    }
  } finally {
    loading.value = false
  }
}

const handleSearch = () => { pagination.value.page = 1; loadData() }
const handlePageChange = (page) => { pagination.value.page = page; loadData() }
const handleAdd = () => { router.push('/counselor/create') }
const handleEdit = (row) => { router.push('/counselor/' + row.id) }
const handleCalendar = (row) => { router.push('/counselor/' + row.id + '/calendar') }

const handleToggleTop = async (row) => {
  try {
    const newTop = row.isTop === 1 ? 0 : 1
    const res = await counselorApi.setTop(row.id, newTop)
    if (res.code === 0 || res.code === 200) { ElMessage.success(newTop === 1 ? 'Pinned' : 'Unpinned'); loadData() }
  } catch (e) { ElMessage.error('Operation failed') }
}

const handleToggleStatus = async (row) => {
  try {
    const newStatus = row.canConsult === 1 ? 0 : 1
    const res = await counselorApi.toggleStatus(row.id, newStatus)
    if (res.code === 0 || res.code === 200) { ElMessage.success(newStatus === 1 ? 'Enabled' : 'Disabled'); loadData() }
  } catch (e) { ElMessage.error('Operation failed') }
}

const handleDelete = (row) => {
  ElMessageBox.confirm('Are you sure to delete this coach?', 'Confirm', { type: 'warning' }).then(async () => {
    try {
      const res = await counselorApi.delete(row.id)
      if (res.code === 0 || res.code === 200) { ElMessage.success('Deleted'); loadData() }
    } catch (e) { ElMessage.error('Delete failed') }
  }).catch(() => {})
}

onMounted(loadData)
</script>

<style scoped>
.counselor-list { padding: 0; }
.search-bar { margin-bottom: 20px; display: flex; gap: 10px; }
</style>
