<template>
  <div class="feedback-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户反馈管理</span>
          <el-radio-group v-model="statusFilter" @change="loadFeedbackList">
            <el-radio-button :label="null">全部</el-radio-button>
            <el-radio-button :label="0">待处理</el-radio-button>
            <el-radio-button :label="1">已处理</el-radio-button>
          </el-radio-group>
        </div>
      </template>

      <el-table :data="feedbackList" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="userName" label="反馈人" width="120">
          <template #default="{ row }">
            {{ row.userName || '匿名用户' }}
          </template>
        </el-table-column>
        <el-table-column prop="content" label="反馈内容" min-width="300">
          <template #default="{ row }">
            <el-tooltip :content="row.content" placement="top" :disabled="row.content.length < 50">
              <span>{{ row.content.length > 50 ? row.content.substring(0, 50) + '...' : row.content }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 0 ? 'warning' : 'success'">
              {{ row.status === 0 ? '待处理' : '已处理' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="反馈时间" width="180" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="showDetail(row)">查看</el-button>
            <el-button v-if="row.status === 0" type="success" size="small" @click="handleProcess(row)">处理</el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 详情对话框 -->
    <el-dialog v-model="detailVisible" title="反馈详情" width="500px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="反馈人">{{ currentFeedback.userName || '匿名用户' }}</el-descriptions-item>
        <el-descriptions-item label="反馈时间">{{ currentFeedback.createdAt }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="currentFeedback.status === 0 ? 'warning' : 'success'">
            {{ currentFeedback.status === 0 ? '待处理' : '已处理' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="反馈内容">{{ currentFeedback.content }}</el-descriptions-item>
        <el-descriptions-item v-if="currentFeedback.reply" label="回复内容">{{ currentFeedback.reply }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <!-- 处理对话框 -->
    <el-dialog v-model="processVisible" title="处理反馈" width="500px">
      <el-form :model="processForm" label-width="80px">
        <el-form-item label="回复内容">
          <el-input v-model="processForm.reply" type="textarea" :rows="4" placeholder="请输入回复内容（可选）" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="processVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmProcess">确认处理</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getFeedbackList, handleFeedback, deleteFeedback } from '@/api/feedback'

const loading = ref(false)
const feedbackList = ref([])
const statusFilter = ref(null)
const detailVisible = ref(false)
const processVisible = ref(false)
const currentFeedback = ref({})
const processForm = ref({ id: null, reply: '' })

const loadFeedbackList = async () => {
  loading.value = true
  try {
    const res = await getFeedbackList(statusFilter.value)
    if (res.code === 200) {
      feedbackList.value = res.data || []
    }
  } catch (error) {
    console.error('加载反馈列表失败', error)
  } finally {
    loading.value = false
  }
}

const showDetail = (row) => {
  currentFeedback.value = row
  detailVisible.value = true
}

const handleProcess = (row) => {
  processForm.value = { id: row.id, reply: '' }
  processVisible.value = true
}

const confirmProcess = async () => {
  try {
    const res = await handleFeedback({ id: processForm.value.id, status: 1, reply: processForm.value.reply })
    if (res.code === 200) {
      ElMessage.success('处理成功')
      processVisible.value = false
      loadFeedbackList()
    } else {
      ElMessage.error(res.msg || '处理失败')
    }
  } catch (error) {
    ElMessage.error('处理失败')
  }
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定要删除这条反馈吗？', '提示', { type: 'warning' })
    .then(async () => {
      const res = await deleteFeedback(row.id)
      if (res.code === 200) {
        ElMessage.success('删除成功')
        loadFeedbackList()
      } else {
        ElMessage.error(res.msg || '删除失败')
      }
    })
    .catch(() => {})
}

onMounted(() => {
  loadFeedbackList()
})
</script>

<style scoped>
.feedback-container { padding: 20px; }
.card-header { display: flex; justify-content: space-between; align-items: center; }
</style>

