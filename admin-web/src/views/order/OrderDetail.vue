<template>
  <div class="order-detail">
    <el-card v-loading="loading">
      <el-descriptions title="Order Details" :column="2" border>
        <el-descriptions-item label="Order No">{{ order.orderNo }}</el-descriptions-item>
        <el-descriptions-item label="User ID">{{ order.userId }}</el-descriptions-item>
        <el-descriptions-item label="Coach ID">{{ order.counselorId }}</el-descriptions-item>
        <el-descriptions-item label="Price">{{ order.price }}</el-descriptions-item>
        <el-descriptions-item label="Status">{{ getStatusText(order.status) }}</el-descriptions-item>
        <el-descriptions-item label="Consult Type">{{ order.consultType === 1 ? 'Online' : 'Offline' }}</el-descriptions-item>
        <el-descriptions-item label="Payment Time">{{ order.paymentTime || 'N/A' }}</el-descriptions-item>
        <el-descriptions-item label="Consult Time">{{ order.consultTime || 'N/A' }}</el-descriptions-item>
        <el-descriptions-item label="Created At">{{ order.createdAt }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-button style="margin-top: 20px" @click="$router.back()">Back</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { orderApi } from '@/api/order'

const route = useRoute()
const loading = ref(false)
const order = ref({})

const statusMap = { 0: 'Pending', 1: 'Paid', 2: 'In Service', 3: 'Completed', 4: 'Cancelled', 5: 'Refunded' }
const getStatusText = (status) => statusMap[status] || 'Unknown'

const loadData = async () => {
  loading.value = true
  try {
    const res = await orderApi.getById(route.params.id)
    if (res.code === 0) { order.value = res.data || {} }
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
</script>

<style scoped>
.order-detail { padding: 0; }
</style>
