<template>
  <div class="user-list">
    <el-card>
      <div class="search-bar">
        <el-input v-model="searchKeyword" placeholder="Search by phone or name" style="width: 300px" />
        <el-button type="primary" @click="handleSearch">Search</el-button>
      </div>
      <el-table :data="tableData" v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="avatar" label="Avatar" width="80">
          <template #default="scope">
            <el-avatar :src="scope.row.avatar" :size="40" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="phone" label="Phone" />
        <el-table-column prop="city" label="City" />
        <el-table-column prop="createdAt" label="Created At" />
        <el-table-column label="Actions" width="120">
          <template #default="scope">
            <el-button type="primary" size="small" @click="viewDetail(scope.row)">View</el-button>
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
import { userApi } from '@/api/user'

const router = useRouter()
const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const searchKeyword = ref('')
const pagination = ref({ page: 1, pageSize: 10 })

const loadData = async () => {
  loading.value = true
  try {
    const res = await userApi.getList({ ...pagination.value, keyword: searchKeyword.value })
    if (res.code === 0) {
      tableData.value = res.data?.list || []
      total.value = res.data?.total || 0
    }
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.value.page = 1
  loadData()
}

const handlePageChange = (page) => {
  pagination.value.page = page
  loadData()
}

const viewDetail = (row) => {
  router.push('/user/' + row.id)
}

onMounted(loadData)
</script>

<style scoped>
.user-list { padding: 0; }
.search-bar { margin-bottom: 20px; display: flex; gap: 10px; }
</style>
