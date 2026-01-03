<template>
  <div class="studio-booking-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>活动预约列表</span>
          <el-button @click="$router.back()">返回</el-button>
        </div>
      </template>

      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="预约ID" width="80" />
        <el-table-column prop="userName" label="用户名" width="120" />
        <el-table-column prop="userPhone" label="手机号" width="130" />
        <el-table-column label="支付状态" width="100">
          <template #default="{ row }">
            <el-tag v-if="row.status === 0" type="warning" size="small">待支付</el-tag>
            <el-tag v-else-if="row.status === 1" type="success" size="small">已支付</el-tag>
            <el-tag v-else type="info" size="small">已取消</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="支付金额" width="100">
          <template #default="{ row }">
            <span v-if="row.price && row.price > 0">¥{{ row.price }}</span>
            <span v-else>免费</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="预约时间" width="180" />
        <el-table-column prop="paymentTime" label="支付时间" width="180">
          <template #default="{ row }">
            {{ row.paymentTime || '-' }}
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="loadData"
        @current-change="loadData"
        style="margin-top: 20px; justify-content: flex-end;"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import request from '@/api/request'

const route = useRoute()
const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const pagination = ref({ page: 1, pageSize: 10 })

const loadData = async () => {
  loading.value = true
  try {
    const studioId = route.params.id
    const res = await request.get(`/admin/studio/${studioId}/bookings`, {
      params: { page: pagination.value.page, pageSize: pagination.value.pageSize }
    })
    if (res.code === 200) {
      tableData.value = res.data?.list || []
      total.value = res.data?.total || 0
    }
  } catch (e) {
    console.error('Load error:', e)
    ElMessage.error('获取预约列表失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => loadData())
</script>

<style scoped>
.card-header { display: flex; justify-content: space-between; align-items: center; }
</style>

