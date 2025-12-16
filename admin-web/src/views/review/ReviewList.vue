<template>
  <div class="review-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>评价管理</span>
          <el-radio-group v-model="viewMode" @change="handleViewModeChange">
            <el-radio-button label="order">按订单</el-radio-button>
            <el-radio-button label="counselor">按教练</el-radio-button>
          </el-radio-group>
        </div>
      </template>

      <!-- 按订单视图 -->
      <div v-if="viewMode === 'order'">
        <el-form :inline="true" class="filter-form">
          <el-form-item label="教练">
            <el-select v-model="filter.counselorId" placeholder="全部" clearable>
              <el-option v-for="item in counselorList" :key="item.counselorId" 
                         :label="item.counselorName" :value="item.counselorId" />
            </el-select>
          </el-form-item>
          <el-form-item label="显示状态">
            <el-select v-model="filter.isVisible" placeholder="全部" clearable>
              <el-option label="显示" :value="1" />
              <el-option label="隐藏" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loadData">查询</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="tableData" v-loading="loading" style="width: 100%">
          <el-table-column prop="orderNo" label="订单号" width="180" />
          <el-table-column label="用户" width="150">
            <template #default="{ row }">
              <div class="user-info">
                <el-avatar :src="row.userAvatar" size="small" />
                <span>{{ row.userName || '匿名用户' }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="counselorName" label="教练" width="120" />
          <el-table-column label="评分" width="150">
            <template #default="{ row }">
              <el-rate v-model="row.rating" disabled />
            </template>
          </el-table-column>
          <el-table-column prop="content" label="评价内容" min-width="200" show-overflow-tooltip />
          <el-table-column label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="row.isVisible === 1 ? 'success' : 'info'">
                {{ row.isVisible === 1 ? '显示' : '隐藏' }}
              </el-tag>
              <el-tag v-if="row.isTop === 1" type="warning" style="margin-left: 4px">置顶</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="评价时间" width="180" />
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="toggleVisible(row)">
                {{ row.isVisible === 1 ? '隐藏' : '显示' }}
              </el-button>
              <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination v-model:current-page="pagination.page" v-model:page-size="pagination.pageSize"
                       :total="total" layout="total, prev, pager, next" @current-change="loadData" />
      </div>

      <!-- 按教练视图 -->
      <div v-else>
        <el-table :data="counselorStats" v-loading="loading" style="width: 100%">
          <el-table-column label="教练" width="200">
            <template #default="{ row }">
              <div class="user-info">
                <el-avatar :src="row.counselorHeadUrl" size="small" />
                <span>{{ row.counselorName }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="totalCount" label="评价数量" width="120" />
          <el-table-column label="平均评分" width="180">
            <template #default="{ row }">
              <el-rate :model-value="row.avgRating" disabled show-score />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button link type="primary" @click="viewCounselorReviews(row)">查看评价</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reviewApi } from '@/api/review'

const loading = ref(false)
const viewMode = ref('order')
const tableData = ref([])
const counselorStats = ref([])
const counselorList = ref([])
const total = ref(0)
const filter = ref({ counselorId: null, isVisible: null })
const pagination = ref({ page: 1, pageSize: 10 })

onMounted(() => {
  loadCounselorStats()
  loadData()
})

const loadCounselorStats = async () => {
  try {
    const res = await reviewApi.getByCounselor()
    counselorStats.value = res.data || []
    counselorList.value = res.data || []
  } catch (e) { console.error(e) }
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await reviewApi.getList({
      page: pagination.value.page,
      pageSize: pagination.value.pageSize,
      ...filter.value
    })
    tableData.value = res.data?.list || []
    total.value = res.data?.total || 0
  } catch (e) {
    ElMessage.error('加载失败')
  } finally {
    loading.value = false
  }
}

const handleViewModeChange = () => {
  if (viewMode.value === 'counselor') loadCounselorStats()
  else loadData()
}

const toggleVisible = async (row) => {
  try {
    await reviewApi.setVisible(row.id, row.isVisible === 1 ? 0 : 1)
    ElMessage.success('操作成功')
    loadData()
  } catch (e) { ElMessage.error('操作失败') }
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定删除此评价？', '确认').then(async () => {
    await reviewApi.delete(row.id)
    ElMessage.success('删除成功')
    loadData()
  }).catch(() => {})
}

const viewCounselorReviews = (row) => {
  filter.value.counselorId = row.counselorId
  viewMode.value = 'order'
  loadData()
}
</script>

<style scoped>
.card-header { display: flex; justify-content: space-between; align-items: center; }
.filter-form { margin-bottom: 20px; }
.user-info { display: flex; align-items: center; gap: 8px; }
.el-pagination { margin-top: 20px; justify-content: flex-end; }
</style>

