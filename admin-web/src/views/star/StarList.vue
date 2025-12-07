<template>
  <div class="star-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>收藏管理</span>
          <el-input v-model="keyword" placeholder="搜索教练名称" style="width: 200px" clearable @clear="loadData" @keyup.enter="loadData">
            <template #append>
              <el-button @click="loadData"><el-icon><Search /></el-icon></el-button>
            </template>
          </el-input>
        </div>
      </template>
      
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column label="教练头像" width="80">
          <template #default="{ row }">
            <el-avatar :src="row.headUrl" :size="50" />
          </template>
        </el-table-column>
        <el-table-column prop="counselorName" label="教练名称" width="150" />
        <el-table-column prop="cityName" label="所在城市" width="120">
          <template #default="{ row }">
            {{ row.cityName || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="starCount" label="收藏次数" width="120">
          <template #default="{ row }">
            <el-tag type="primary" size="large">{{ row.starCount }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastStarTime" label="最近收藏时间" width="180">
          <template #default="{ row }">
            {{ row.lastStarTime || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150">
          <template #default="{ row }">
            <el-button type="primary" link @click="viewStarUsers(row)" :disabled="row.starCount === 0">
              <el-icon><View /></el-icon> 查看收藏用户
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="pagination">
        <el-pagination
          v-model:current-page="page"
          v-model:page-size="size"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="loadData"
          @current-change="loadData"
        />
      </div>
    </el-card>

    <!-- 收藏用户弹窗 -->
    <el-dialog v-model="dialogVisible" :title="`${currentCounselor?.counselorName} 的收藏用户`" width="700px">
      <el-table :data="userList" v-loading="userLoading" stripe>
        <el-table-column label="用户头像" width="80">
          <template #default="{ row }">
            <el-avatar :src="row.avatar" :size="40" />
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户昵称" width="150">
          <template #default="{ row }">
            {{ row.userName || '未设置' }}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="150">
          <template #default="{ row }">
            {{ row.phone || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="starTime" label="收藏时间" width="180" />
      </el-table>
      <div class="pagination" v-if="userTotal > userSize">
        <el-pagination
          v-model:current-page="userPage"
          v-model:page-size="userSize"
          :total="userTotal"
          layout="prev, pager, next"
          @current-change="loadStarUsers"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Search, View } from '@element-plus/icons-vue'
import request from '@/api/request'

const loading = ref(false)
const tableData = ref([])
const page = ref(1)
const size = ref(10)
const total = ref(0)
const keyword = ref('')

const dialogVisible = ref(false)
const currentCounselor = ref(null)
const userList = ref([])
const userLoading = ref(false)
const userPage = ref(1)
const userSize = ref(10)
const userTotal = ref(0)

const loadData = async () => {
  loading.value = true
  try {
    const res = await request.get('/admin/star/list', {
      params: { page: page.value, size: size.value, keyword: keyword.value }
    })
    if (res.code === 200) {
      tableData.value = res.data.list
      total.value = res.data.total
    }
  } finally {
    loading.value = false
  }
}

const viewStarUsers = (row) => {
  currentCounselor.value = row
  userPage.value = 1
  dialogVisible.value = true
  loadStarUsers()
}

const loadStarUsers = async () => {
  if (!currentCounselor.value) return
  userLoading.value = true
  try {
    const res = await request.get(`/admin/star/users/${currentCounselor.value.counselorId}`, {
      params: { page: userPage.value, size: userSize.value }
    })
    if (res.code === 200) {
      userList.value = res.data.list
      userTotal.value = res.data.total
    }
  } finally {
    userLoading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.card-header { display: flex; justify-content: space-between; align-items: center; }
.pagination { margin-top: 20px; display: flex; justify-content: flex-end; }
</style>

