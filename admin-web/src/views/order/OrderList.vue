<template>
  <div class="order-list">
    <el-card>
      <div class="search-bar">
        <el-select v-model="statusFilter" placeholder="Status" clearable style="width: 150px">
          <el-option label="All" value="" />
          <el-option label="Pending" :value="0" />
          <el-option label="Paid" :value="1" />
          <el-option label="In Service" :value="2" />
          <el-option label="Completed" :value="3" />
          <el-option label="Cancelled" :value="4" />
          <el-option label="Refunded" :value="5" />
        </el-select>
        <el-button type="primary" @click="handleSearch">Search</el-button>
      </div>
      <el-table :data="tableData" v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="orderNo" label="Order No" />
        <el-table-column prop="userId" label="User ID" width="100" />
        <el-table-column prop="counselorId" label="Coach ID" width="100" />
        <el-table-column prop="price" label="Price" width="100">
          <template #default="scope">{{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column prop="status" label="Status" width="120">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">{{ getStatusText(scope.row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="Created At" />
        <el-table-column label="Actions" width="150">
          <template #default="scope">
            <el-button type="primary" size="small" @click="viewDetail(scope.row)">View</el-button>
            <el-button v-if="scope.row.status < 3" type="danger" size="small" @click="handleCancel(scope.row)">Cancel</el-button>
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
import { orderApi } from '@/api/order'

const router = useRouter()
const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const statusFilter = ref('')
const pagination = ref({ page: 1, pageSize: 10 })

const statusMap = { 0: 'Pending', 1: 'Paid', 2: 'In Service', 3: 'Completed', 4: 'Cancelled', 5: 'Refunded' }
const getStatusText = (status) => statusMap[status] || 'Unknown'
const getStatusType = (status) => {
  const types = { 0: 'warning', 1: 'primary', 2: 'info', 3: 'success', 4: 'danger', 5: 'info' }
  return types[status] || 'info'
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await orderApi.getList(pagination.value)
    if (res.code === 0) {
      tableData.value = res.data?.list || []
      total.value = res.data?.total || 0
    }
  } finally {
    loading.value = false
  }
}

const handleSearch = () => { pagination.value.page = 1; loadData() }
const handlePageChange = (page) => { pagination.value.page = page; loadData() }
const viewDetail = (row) => { router.push('/order/' + row.id) }

const handleCancel = (row) => {
  ElMessageBox.prompt('Please enter cancel reason', 'Cancel Order', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel'
  }).then(async ({ value }) => {
    try {
      const res = await orderApi.cancel(row.id, value)
      if (res.code === 0) { ElMessage.success('Order cancelled'); loadData() }
    } catch (e) { ElMessage.error('Cancel failed') }
  }).catch(() => {})
}

onMounted(loadData)
</script>

<style scoped>
.order-list { padding: 0; }
.search-bar { margin-bottom: 20px; display: flex; gap: 10px; }
</style>
