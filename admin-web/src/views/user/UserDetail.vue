<template>
  <div class="user-detail">
    <el-card v-loading="loading">
      <div class="user-header">
        <el-avatar :src="user.avatar" :size="80" />
        <div class="user-info">
          <h2>{{ user.name || 'N/A' }}</h2>
          <p>ID: {{ user.id }}</p>
        </div>
      </div>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="Phone">{{ user.phone || 'N/A' }}</el-descriptions-item>
        <el-descriptions-item label="Gender">{{ user.gender === 1 ? 'Male' : user.gender === 2 ? 'Female' : 'Unknown' }}</el-descriptions-item>
        <el-descriptions-item label="City">{{ user.city || 'N/A' }}</el-descriptions-item>
        <el-descriptions-item label="Province">{{ user.province || 'N/A' }}</el-descriptions-item>
        <el-descriptions-item label="Created At">{{ user.createdAt }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-button style="margin-top: 20px" @click="$router.back()">Back</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { userApi } from '@/api/user'

const route = useRoute()
const loading = ref(false)
const user = ref({})

const loadData = async () => {
  loading.value = true
  try {
    const res = await userApi.getById(route.params.id)
    if (res.code === 200) {
      user.value = res.data || {}
    }
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
</script>

<style scoped>
.user-detail { padding: 0; }
.user-header { display: flex; align-items: center; gap: 20px; margin-bottom: 20px; }
.user-info h2 { margin: 0 0 5px 0; }
.user-info p { margin: 0; color: #909399; }
</style>
