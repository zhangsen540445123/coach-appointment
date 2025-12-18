<template>
  <div class="coach-orders">
    <el-card>
      <template #header><span>我的订单</span></template>
      
      <el-form :inline="true" class="filter-form">
        <el-form-item label="订单状态">
          <el-select v-model="filter.status" placeholder="全部" clearable @change="loadData">
            <el-option label="全部" :value="null" />
            <el-option v-for="(label, index) in orderStatusOptions" :key="index" :label="label" :value="index" />
          </el-select>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" v-loading="loading" style="width: 100%">
        <el-table-column prop="order_no" label="订单号" width="180" />
        <el-table-column label="用户" width="150">
          <template #default="{ row }">
            <div class="user-info">
              <el-avatar :src="row.user_avatar" size="small" />
              <span>{{ row.user_name || '匿名用户' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="金额" width="100">
          <template #default="{ row }">¥{{ row.price }}</template>
        </el-table-column>
        <el-table-column prop="consult_time" label="咨询时间" width="180" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="180" />
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="viewDetail(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination v-model:current-page="pagination.page" v-model:page-size="pagination.pageSize"
                     :total="total" layout="total, prev, pager, next" @current-change="loadData" 
                     style="margin-top: 20px; justify-content: flex-end;" />
    </el-card>

    <!-- 订单详情弹窗 -->
    <el-dialog v-model="detailVisible" title="订单详情" width="500px">
      <el-descriptions :column="1" border v-if="currentOrder">
        <el-descriptions-item label="订单号">{{ currentOrder.order_no }}</el-descriptions-item>
        <el-descriptions-item label="用户">{{ currentOrder.user_name }}</el-descriptions-item>
        <el-descriptions-item label="金额">¥{{ currentOrder.price }}</el-descriptions-item>
        <el-descriptions-item label="咨询时间">{{ currentOrder.consult_time }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(currentOrder.status)">{{ getStatusText(currentOrder.status) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ currentOrder.created_at }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { coachApi } from '@/api/review'
import { useDict } from '@/composables/useDict'

const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const filter = ref({ status: null })
const pagination = ref({ page: 1, pageSize: 10 })
const detailVisible = ref(false)
const currentOrder = ref(null)

// 使用字典数据
const { loadAllDict, getDictItems, getLabel, getStatusType: getDictStatusType } = useDict()
const orderStatusOptions = ref([])

const getStatusText = (status) => getLabel('order_status', status)
const getStatusType = (status) => getDictStatusType('order_status', status)

onMounted(async () => {
  await loadAllDict()
  orderStatusOptions.value = getDictItems('order_status')
  loadData()
})

const loadData = async () => {
  loading.value = true
  try {
    const res = await coachApi.getOrderList({
      page: pagination.value.page,
      pageSize: pagination.value.pageSize,
      status: filter.value.status
    })
    tableData.value = res.data?.list || []
    total.value = res.data?.total || 0
  } catch (e) {
    ElMessage.error('加载订单失败')
  } finally {
    loading.value = false
  }
}

const viewDetail = (row) => {
  currentOrder.value = row
  detailVisible.value = true
}
</script>

<style scoped>
.filter-form { margin-bottom: 20px; }
.user-info { display: flex; align-items: center; gap: 8px; }
</style>

