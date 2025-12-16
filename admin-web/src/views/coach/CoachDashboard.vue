<template>
  <div class="coach-dashboard">
    <el-row :gutter="20">
      <!-- 收益统计卡片 -->
      <el-col :span="8">
        <el-card class="stats-card" @click="showEarningsDetail(7)">
          <template #header><span>近7天收益</span></template>
          <div class="stats-value">¥{{ earnings.last7Days?.totalAmount || '0.00' }}</div>
          <div class="stats-desc">{{ earnings.last7Days?.orderCount || 0 }} 笔订单</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="stats-card" @click="showEarningsDetail(30)">
          <template #header><span>近30天收益</span></template>
          <div class="stats-value">¥{{ earnings.last30Days?.totalAmount || '0.00' }}</div>
          <div class="stats-desc">{{ earnings.last30Days?.orderCount || 0 }} 笔订单</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="stats-card" @click="showEarningsDetail(365)">
          <template #header><span>近1年收益</span></template>
          <div class="stats-value">¥{{ earnings.lastYear?.totalAmount || '0.00' }}</div>
          <div class="stats-desc">{{ earnings.lastYear?.orderCount || 0 }} 笔订单</div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 最近订单 -->
    <el-card style="margin-top: 20px">
      <template #header>
        <div class="card-header">
          <span>最近订单</span>
          <el-button type="primary" link @click="$router.push('/coach/orders')">查看全部</el-button>
        </div>
      </template>
      <el-table :data="recentOrders" v-loading="loading">
        <el-table-column prop="order_no" label="订单号" width="180" />
        <el-table-column prop="user_name" label="用户" width="120" />
        <el-table-column prop="price" label="金额" width="100">
          <template #default="{ row }">¥{{ row.price }}</template>
        </el-table-column>
        <el-table-column prop="consult_time" label="咨询时间" width="180" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 收益明细弹窗 -->
    <el-dialog v-model="earningsDialogVisible" :title="`近${selectedDays}天收益明细`" width="600px">
      <el-table :data="earningsDetail" v-loading="detailLoading">
        <el-table-column prop="order_no" label="订单号" width="180" />
        <el-table-column prop="user_name" label="用户" width="120" />
        <el-table-column prop="price" label="金额" width="100">
          <template #default="{ row }">¥{{ row.price }}</template>
        </el-table-column>
        <el-table-column prop="created_at" label="完成时间" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { coachApi } from '@/api/review'

const loading = ref(false)
const detailLoading = ref(false)
const earnings = ref({})
const recentOrders = ref([])
const earningsDialogVisible = ref(false)
const earningsDetail = ref([])
const selectedDays = ref(7)

const statusMap = { 0: '待支付', 1: '待服务', 2: '进行中', 3: '已完成', 4: '已取消' }
const getStatusText = (status) => statusMap[status] || '未知'
const getStatusType = (status) => {
  const types = { 0: 'warning', 1: 'primary', 2: 'info', 3: 'success', 4: 'danger' }
  return types[status] || 'info'
}

onMounted(() => {
  loadEarningsStats()
  loadRecentOrders()
})

const loadEarningsStats = async () => {
  try {
    const res = await coachApi.getEarningsStats()
    earnings.value = res.data || {}
  } catch (e) { console.error(e) }
}

const loadRecentOrders = async () => {
  loading.value = true
  try {
    const res = await coachApi.getOrderList({ page: 1, pageSize: 5 })
    recentOrders.value = res.data?.list || []
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

const showEarningsDetail = async (days) => {
  selectedDays.value = days
  earningsDialogVisible.value = true
  detailLoading.value = true
  try {
    const res = await coachApi.getEarningsDetail(days, 1, 50)
    earningsDetail.value = res.data || []
  } catch (e) { console.error(e) }
  finally { detailLoading.value = false }
}
</script>

<style scoped>
.stats-card { cursor: pointer; transition: transform 0.2s; }
.stats-card:hover { transform: translateY(-4px); }
.stats-value { font-size: 32px; font-weight: bold; color: #409EFF; }
.stats-desc { color: #909399; margin-top: 8px; }
.card-header { display: flex; justify-content: space-between; align-items: center; }
</style>

