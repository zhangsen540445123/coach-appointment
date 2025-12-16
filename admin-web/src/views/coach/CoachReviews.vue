<template>
  <div class="coach-reviews">
    <el-card>
      <template #header><span>用户评价</span></template>

      <el-table :data="tableData" v-loading="loading" style="width: 100%">
        <el-table-column prop="orderNo" label="订单号" width="180" />
        <el-table-column label="用户" width="150">
          <template #default="{ row }">
            <div class="user-info">
              <el-avatar :src="row.isAnonymous === 1 ? '' : row.userAvatar" size="small" />
              <span>{{ row.isAnonymous === 1 ? '匿名用户' : (row.userName || '用户') }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="评分" width="150">
          <template #default="{ row }">
            <el-rate v-model="row.rating" disabled />
          </template>
        </el-table-column>
        <el-table-column label="评价内容" min-width="200">
          <template #default="{ row }">
            <div>{{ row.content }}</div>
            <div v-if="row.replyContent" class="reply-content">
              <el-tag type="success" size="small">已回复</el-tag>
              <span style="margin-left: 8px; color: #666;">{{ row.replyContent }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="row.isVisible === 1 ? 'success' : 'info'" size="small">
              {{ row.isVisible === 1 ? '显示' : '隐藏' }}
            </el-tag>
            <el-tag v-if="row.isTop === 1" type="warning" size="small" style="margin-left: 4px">置顶</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="评价时间" width="180" />
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="showReplyDialog(row)">
              {{ row.replyContent ? '修改回复' : '回复' }}
            </el-button>
            <el-button link type="primary" @click="toggleTop(row)">
              {{ row.isTop === 1 ? '取消置顶' : '置顶' }}
            </el-button>
            <el-button link :type="row.isVisible === 1 ? 'warning' : 'success'" @click="toggleVisible(row)">
              {{ row.isVisible === 1 ? '隐藏' : '显示' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination v-model:current-page="pagination.page" v-model:page-size="pagination.pageSize"
                     :total="total" layout="total, prev, pager, next" @current-change="loadData"
                     style="margin-top: 20px; justify-content: flex-end;" />
    </el-card>

    <!-- 回复评价弹窗 -->
    <el-dialog v-model="replyDialogVisible" title="回复评价" width="500px">
      <el-form :model="replyForm" label-width="80px">
        <el-form-item label="评价内容">
          <div style="color: #666;">{{ currentReview?.content }}</div>
        </el-form-item>
        <el-form-item label="回复内容">
          <el-input v-model="replyForm.replyContent" type="textarea" :rows="4" placeholder="请输入回复内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="replyDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitReply" :loading="replying">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { coachApi } from '@/api/review'

const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const pagination = ref({ page: 1, pageSize: 10 })
const replyDialogVisible = ref(false)
const currentReview = ref(null)
const replyForm = ref({ replyContent: '' })
const replying = ref(false)

onMounted(() => loadData())

const loadData = async () => {
  loading.value = true
  try {
    const res = await coachApi.getReviewList({
      page: pagination.value.page,
      pageSize: pagination.value.pageSize
    })
    tableData.value = res.data?.list || []
    total.value = res.data?.total || 0
  } catch (e) {
    ElMessage.error('加载评价失败')
  } finally {
    loading.value = false
  }
}

const toggleTop = async (row) => {
  try {
    await coachApi.setReviewTop(row.id, row.isTop === 1 ? 0 : 1)
    ElMessage.success('操作成功')
    loadData()
  } catch (e) {
    ElMessage.error('操作失败')
  }
}

const toggleVisible = async (row) => {
  try {
    await coachApi.setReviewVisible(row.id, row.isVisible === 1 ? 0 : 1)
    ElMessage.success('操作成功')
    loadData()
  } catch (e) {
    ElMessage.error('操作失败')
  }
}

const showReplyDialog = (row) => {
  currentReview.value = row
  replyForm.value.replyContent = row.replyContent || ''
  replyDialogVisible.value = true
}

const submitReply = async () => {
  if (!replyForm.value.replyContent.trim()) {
    ElMessage.warning('请输入回复内容')
    return
  }

  replying.value = true
  try {
    await coachApi.replyReview(currentReview.value.id, replyForm.value.replyContent)
    ElMessage.success('回复成功')
    replyDialogVisible.value = false
    loadData()
  } catch (e) {
    ElMessage.error(e.response?.data?.msg || '回复失败')
  } finally {
    replying.value = false
  }
}
</script>

<style scoped>
.user-info { display: flex; align-items: center; gap: 8px; }
.reply-content { margin-top: 8px; padding: 8px; background: #f5f7fa; border-radius: 4px; font-size: 13px; }
</style>

