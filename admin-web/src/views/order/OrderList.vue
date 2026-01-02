<template>
  <div class="order-list">
    <el-card>
      <div class="search-bar">
        <el-input v-model="searchKeyword" placeholder="搜索订单号/用户ID" clearable style="width: 200px" />
        <el-select v-model="statusFilter" placeholder="状态筛选（可多选）" clearable multiple collapse-tags style="width: 200px">
          <el-option v-for="(label, index) in orderStatusOptions" :key="index" :label="label" :value="index" />
        </el-select>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>
      <el-table :data="tableData" v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="orderNo" label="订单号" width="180" />
        <el-table-column label="用户" width="150">
          <template #default="scope">
            <span v-if="scope.row.userName">{{ scope.row.userName }}</span>
            <span v-else style="color: #909399;">ID: {{ scope.row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="教练" width="150">
          <template #default="scope">
            <span v-if="scope.row.counselorName">{{ scope.row.counselorName }}</span>
            <span v-else style="color: #909399;">ID: {{ scope.row.counselorId }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" width="100">
          <template #default="scope">¥{{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">{{ getStatusText(scope.row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="180" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="scope">
            <el-button type="primary" size="small" @click="viewDetail(scope.row)">查看</el-button>
            <el-button v-if="scope.row.status === 0 || scope.row.status === 1"
                       type="danger" size="small" @click="handleCancel(scope.row)">取消</el-button>
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
const searchKeyword = ref('')
const statusFilter = ref([])
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
    const params = {
      ...pagination.value,
      keyword: searchKeyword.value,
      // 将状态数组传递给后端，如果为空数组则传 null
      status: statusFilter.value.length > 0 ? statusFilter.value : null
    }
    const res = await orderApi.getList(params)
    if (res.code === 200) {
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
  ElMessageBox.prompt('请输入取消原因', '取消订单', {
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  }).then(async ({ value }) => {
    try {
      const res = await orderApi.cancel(row.id, value)
      if (res.code === 200) {
        ElMessage.success('订单已取消')
        loadData()
      } else {
        ElMessage.error(res.msg || '取消失败')
      }
    } catch (e) {
      ElMessage.error('取消失败')
    }
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
