<template>
  <div class="dashboard">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="label">Total Users</div>
          <div class="value">{{ stats.totalUsers || 0 }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="label">Total Coaches</div>
          <div class="value">{{ stats.totalCounselors || 0 }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="label">Total Orders</div>
          <div class="value">{{ stats.totalOrders || 0 }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="label">Pending Audits</div>
          <div class="value">{{ stats.pendingAudits || 0 }}</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <template #header>Recent Orders</template>
          <el-table :data="recentOrders" size="small">
            <el-table-column prop="orderNo" label="Order No" />
            <el-table-column prop="price" label="Price" />
            <el-table-column prop="status" label="Status">
              <template #default="scope">{{ getStatusText(scope.row.status) }}</template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>Pending Audits</template>
          <el-table :data="pendingAudits" size="small">
            <el-table-column prop="counselorId" label="Coach ID" />
            <el-table-column prop="submittedAt" label="Submitted" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { orderApi } from '@/api/order'
import { counselorApi } from '@/api/counselor'
import { useDict } from '@/composables/useDict'

const stats = ref({})
const recentOrders = ref([])
const pendingAudits = ref([])

// 使用字典数据
const { loadAllDict, getLabel } = useDict()

const getStatusText = (status) => getLabel('order_status', status)

const loadData = async () => {
  try {
    const [orderStats, orders, audits] = await Promise.all([
      orderApi.getStatistics(),
      orderApi.getList({ page: 1, pageSize: 5 }),
      counselorApi.getAuditList({ page: 1, pageSize: 5 }, 0)
    ])
    if (orderStats.code === 0) stats.value = orderStats.data || {}
    if (orders.code === 0) recentOrders.value = orders.data?.list || []
    if (audits.code === 0) pendingAudits.value = audits.data?.list || []
  } catch (e) {
    console.error('Load dashboard data failed', e)
  }
}

onMounted(async () => {
  await loadAllDict()
  loadData()
})
</script>

<style scoped>
.dashboard { padding: 0; }
.stat-card { text-align: center; padding: 20px; }
.stat-card .label { color: #909399; font-size: 14px; }
.stat-card .value { font-size: 32px; font-weight: bold; color: #303133; margin-top: 10px; }
</style>
