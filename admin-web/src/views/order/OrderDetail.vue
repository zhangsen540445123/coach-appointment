<template>
  <div class="order-detail">
    <el-card v-loading="loading">
      <el-descriptions title="订单详情" :column="2" border>
        <el-descriptions-item label="订单号">{{ order.orderNo }}</el-descriptions-item>
        <el-descriptions-item label="用户ID">{{ order.userId }}</el-descriptions-item>
        <el-descriptions-item label="教练ID">{{ order.counselorId }}</el-descriptions-item>
        <el-descriptions-item label="价格">¥{{ order.price }}</el-descriptions-item>
        <el-descriptions-item label="状态">{{ getStatusText(order.status) }}</el-descriptions-item>
        <el-descriptions-item label="咨询类型">{{ getConsultTypeText(order.consultType) }}</el-descriptions-item>
        <el-descriptions-item label="咨询方式">{{ getConsultWayText(order.consultWay) }}</el-descriptions-item>
        <el-descriptions-item label="支付时间">{{ order.paymentTime || '未支付' }}</el-descriptions-item>
        <el-descriptions-item label="咨询时间">{{ order.consultTime || '未安排' }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ order.createdAt }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-button style="margin-top: 20px" @click="$router.back()">返回</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { orderApi } from '@/api/order'
import { useDict } from '@/composables/useDict'

const route = useRoute()
const loading = ref(false)
const order = ref({})

// 使用字典数据
const { loadAllDict, getLabel } = useDict()

const getStatusText = (status) => getLabel('order_status', status)
const getConsultTypeText = (type) => getLabel('consult_type', type)
const getConsultWayText = (way) => getLabel('consult_way', way)

const loadData = async () => {
  loading.value = true
  try {
    const res = await orderApi.getById(route.params.id)
    if (res.code === 200) { order.value = res.data || {} }
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadAllDict()
  loadData()
})
</script>

<style scoped>
.order-detail { padding: 0; }
</style>
