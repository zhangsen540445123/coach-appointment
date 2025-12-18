<template>
  <div class="order-list">
    <el-card>
      <div class="search-bar">
        <el-select v-model="statusFilter" placeholder="状态筛选" clearable style="width: 150px">
          <el-option label="全部" value="" />
          <el-option v-for="(label, index) in orderStatusOptions" :key="index" :label="label" :value="index" />
        </el-select>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
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
import { useDict } from '@/composables/useDict'

const router = useRouter()
const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const statusFilter = ref('')
const pagination = ref({ page: 1, pageSize: 10 })

// 使用字典数据
const { loadAllDict, getDictItems, getLabel, getStatusType: getDictStatusType } = useDict()
const orderStatusOptions = ref([])

const getStatusText = (status) => getLabel('order_status', status)
const getStatusType = (status) => getDictStatusType('order_status', status)

const loadDictData = async () => {
  await loadAllDict()
  orderStatusOptions.value = getDictItems('order_status')
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

onMounted(async () => {
  await loadDictData()
  loadData()
})
</script>

<style scoped>
.order-list { padding: 0; }
.search-bar { margin-bottom: 20px; display: flex; gap: 10px; }
</style>
