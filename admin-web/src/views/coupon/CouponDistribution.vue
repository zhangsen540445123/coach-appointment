<template>
  <div class="coupon-distribution">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>发放记录 - {{ couponName }}</span>
        </div>
      </template>

      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="userId" label="用户ID" width="180" />
        <el-table-column prop="userName" label="用户昵称" width="150" />
        <el-table-column label="领取方式" width="120">
          <template #default="{ row }">
            <el-tag :type="row.receiveType === 1 ? 'primary' : 'success'">
              {{ row.receiveType === 1 ? '系统推送' : '兑换码' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="领取时间" width="180">
          <template #default="{ row }">{{ formatDateTime(row.createdAt) }}</template>
        </el-table-column>
        <el-table-column prop="usedAt" label="使用时间" width="180">
          <template #default="{ row }">{{ formatDateTime(row.usedAt) }}</template>
        </el-table-column>
        <el-table-column prop="orderId" label="关联订单" width="180" />
      </el-table>

      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.size"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next"
        @change="loadData"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import request from '@/api/request'

const route = useRoute()
const couponId = ref(route.params.couponId)
const couponName = ref('')
const loading = ref(false)
const tableData = ref([])

const pagination = reactive({ page: 1, size: 10, total: 0 })

const loadData = async () => {
  loading.value = true
  try {
    const res = await request.get(`/admin/coupon/distribution/${couponId.value}`, {
      params: { page: pagination.page, size: pagination.size }
    })
    if (res.code === 200) {
      tableData.value = res.data.list || []
      pagination.total = res.data.total || 0
      if (res.data.couponName) couponName.value = res.data.couponName
    }
  } catch (e) { ElMessage.error('加载失败') }
  finally { loading.value = false }
}

const getStatusType = (status) => {
  const types = { 0: 'success', 1: 'info', 2: 'warning' }
  return types[status] || 'info'
}

const getStatusText = (status) => {
  const texts = { 0: '未使用', 1: '已使用', 2: '已过期' }
  return texts[status] || '未知'
}

const formatDateTime = (str) => {
  if (!str) return '-'
  const d = new Date(str)
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}

onMounted(() => { loadData() })
</script>

<style scoped>
.card-header { display: flex; justify-content: space-between; align-items: center; }
.el-pagination { margin-top: 20px; justify-content: flex-end; }
</style>

