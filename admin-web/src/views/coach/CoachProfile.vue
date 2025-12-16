<template>
  <div class="coach-profile">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>个人信息</span>
          <div>
            <el-tag v-if="auditStatus === 0" type="warning">审核中</el-tag>
            <el-tag v-else-if="auditStatus === 2" type="danger">审核被拒</el-tag>
            <el-button type="primary" @click="handleSubmit" :loading="submitting" 
                       :disabled="auditStatus === 0">提交修改</el-button>
          </div>
        </div>
      </template>

      <el-alert v-if="auditStatus === 2" type="error" :title="'审核拒绝原因：' + auditRemark" 
                show-icon style="margin-bottom: 20px" />

      <el-form :model="form" label-width="120px" v-loading="loading">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <el-radio-group v-model="form.gender">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="头像">
          <el-upload action="#" :show-file-list="false" :before-upload="handleAvatarUpload">
            <el-avatar :size="100" :src="form.headUrl" />
            <div class="upload-tip">点击更换</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="咨询价格">
          <el-input-number v-model="form.consultPrice" :min="0" :step="10" />
          <span style="margin-left: 8px">元/次</span>
        </el-form-item>

        <el-form-item label="城市">
          <el-input v-model="form.cityName" />
        </el-form-item>

        <el-form-item label="擅长领域">
          <el-input v-model="form.special" type="textarea" :rows="3" />
        </el-form-item>

        <el-form-item label="个人简介">
          <el-input v-model="form.introduction" type="textarea" :rows="5" />
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 审核记录 -->
    <el-card style="margin-top: 20px">
      <template #header><span>审核记录</span></template>
      <el-table :data="auditList" v-loading="auditLoading">
        <el-table-column prop="submittedAt" label="提交时间" width="180" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.auditStatus === 0 ? 'warning' : row.auditStatus === 1 ? 'success' : 'danger'">
              {{ row.auditStatus === 0 ? '待审核' : row.auditStatus === 1 ? '已通过' : '已拒绝' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="auditRemark" label="审核备注" />
        <el-table-column prop="auditedAt" label="审核时间" width="180" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { coachApi } from '@/api/review'

const loading = ref(false)
const submitting = ref(false)
const auditLoading = ref(false)
const form = ref({})
const auditList = ref([])
const auditStatus = ref(-1) // -1: 无审核, 0: 待审核, 1: 通过, 2: 拒绝
const auditRemark = ref('')

onMounted(() => {
  loadProfile()
  loadAuditList()
})

const loadProfile = async () => {
  loading.value = true
  try {
    const res = await coachApi.getProfile()
    form.value = res.data || {}
  } catch (e) {
    ElMessage.error('加载个人信息失败')
  } finally {
    loading.value = false
  }
}

const loadAuditList = async () => {
  auditLoading.value = true
  try {
    const res = await coachApi.getAuditList({ page: 1, pageSize: 10 })
    auditList.value = res.data?.list || []
    // 检查是否有待审核或最近被拒绝的记录
    const pending = auditList.value.find(item => item.auditStatus === 0)
    const rejected = auditList.value.find(item => item.auditStatus === 2)
    if (pending) {
      auditStatus.value = 0
    } else if (rejected) {
      auditStatus.value = 2
      auditRemark.value = rejected.auditRemark
    }
  } catch (e) { console.error(e) }
  finally { auditLoading.value = false }
}

const handleSubmit = async () => {
  submitting.value = true
  try {
    await coachApi.submitProfile(form.value)
    ElMessage.success('提交成功，等待审核')
    auditStatus.value = 0
    loadAuditList()
  } catch (e) {
    ElMessage.error(e.response?.data?.msg || '提交失败')
  } finally {
    submitting.value = false
  }
}

const handleAvatarUpload = (file) => {
  // TODO: 实现图片上传
  ElMessage.info('头像上传功能开发中')
  return false
}
</script>

<style scoped>
.card-header { display: flex; justify-content: space-between; align-items: center; }
.upload-tip { text-align: center; color: #909399; font-size: 12px; margin-top: 8px; }
</style>

