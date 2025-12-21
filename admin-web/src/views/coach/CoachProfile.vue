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
          <div class="avatar-upload">
            <el-upload
              class="avatar-uploader"
              action="/api/file/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <el-avatar v-if="form.headUrl" :size="100" :src="getImageUrl(form.headUrl)" />
              <el-icon v-else class="avatar-uploader-icon" :size="100"><Plus /></el-icon>
            </el-upload>
            <div class="upload-tip">点击上传头像（支持JPG/PNG，最大10MB）</div>
          </div>
        </el-form-item>

        <el-form-item label="咨询价格">
          <el-input-number v-model="form.consultPrice" :min="0" :step="10" />
          <span style="margin-left: 8px">元/次</span>
        </el-form-item>

        <el-form-item label="城市">
          <el-input v-model="form.cityName" />
        </el-form-item>

        <el-form-item label="擅长领域">
          <div class="directions-editor">
            <div v-for="(dir, dirIndex) in form.directionsList" :key="dirIndex" class="direction-item">
              <div class="direction-header">
                <el-select v-model="dir.name" filterable allow-create placeholder="选择或输入擅长领域" style="width: 200px">
                  <el-option v-for="d in directionOptions" :key="d" :label="d" :value="d" />
                </el-select>
                <el-button type="danger" size="small" @click="removeDirection(dirIndex)">删除</el-button>
              </div>
              <div class="direction-children">
                <el-tag
                  v-for="(child, childIndex) in dir.child"
                  :key="childIndex"
                  closable
                  @close="removeDirectionChild(dirIndex, childIndex)"
                  style="margin-right: 8px; margin-bottom: 8px"
                >
                  {{ child.name }}
                </el-tag>
                <el-input
                  v-if="showChildInput[dirIndex]"
                  v-model="newChildName[dirIndex]"
                  size="small"
                  style="width: 120px; margin-right: 8px"
                  @keyup.enter="addDirectionChild(dirIndex)"
                  @blur="addDirectionChild(dirIndex)"
                />
                <el-button v-else size="small" @click="showAddChild(dirIndex)">+ 添加子项</el-button>
              </div>
            </div>
            <el-button type="primary" @click="addDirection">+ 添加擅长领域</el-button>
          </div>
        </el-form-item>

        <el-form-item label="咨询寄语">
          <el-input v-model="form.special" type="textarea" :rows="3" placeholder="咨询寄语" />
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
import { Plus } from '@element-plus/icons-vue'
import { coachApi } from '@/api/review'

const loading = ref(false)
const submitting = ref(false)
const auditLoading = ref(false)
const form = ref({ directionsList: [] })
const auditList = ref([])
const auditStatus = ref(-1) // -1: 无审核, 0: 待审核, 1: 通过, 2: 拒绝
const auditRemark = ref('')

const directionOptions = ['情绪困扰', '婚姻恋爱', '人际关系', '亲子教育', '个人成长', '职业发展', '身心健康']
const showChildInput = ref({})
const newChildName = ref({})

onMounted(() => {
  loadProfile()
  loadAuditList()
})

const getImageUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return url.startsWith('/') ? url : '/' + url
}

const loadProfile = async () => {
  loading.value = true
  try {
    console.log('Loading coach profile...')
    const res = await coachApi.getProfile()
    console.log('Profile response:', res)
    if ((res.code === 200 || res.code === 0) && res.data) {
      const data = res.data
      form.value = {
        ...data,
        directionsList: Array.isArray(data.directions)
          ? data.directions.map((d, i) =>
              typeof d === 'string' ? { name: d, value: i, child: [] } : d
            )
          : []
      }
      console.log('Loaded profile:', form.value)
    } else {
      ElMessage.error(res.msg || '加载个人信息失败')
    }
  } catch (e) {
    console.error('Load profile error:', e)
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

const addDirection = () => {
  form.value.directionsList.push({ name: '', value: form.value.directionsList.length, child: [] })
}

const removeDirection = (index) => {
  form.value.directionsList.splice(index, 1)
}

const showAddChild = (dirIndex) => {
  showChildInput.value[dirIndex] = true
  newChildName.value[dirIndex] = ''
}

const addDirectionChild = (dirIndex) => {
  const childName = newChildName.value[dirIndex]
  if (childName && childName.trim()) {
    if (!form.value.directionsList[dirIndex].child) {
      form.value.directionsList[dirIndex].child = []
    }
    form.value.directionsList[dirIndex].child.push({
      name: childName.trim(),
      value: form.value.directionsList[dirIndex].child.length
    })
  }
  showChildInput.value[dirIndex] = false
  newChildName.value[dirIndex] = ''
}

const removeDirectionChild = (dirIndex, childIndex) => {
  form.value.directionsList[dirIndex].child.splice(childIndex, 1)
}

const handleSubmit = async () => {
  submitting.value = true
  try {
    console.log('Submitting profile:', form.value)
    const submitData = {
      ...form.value,
      directions: form.value.directionsList
    }
    const res = await coachApi.submitProfile(submitData)
    console.log('Submit response:', res)
    if (res.code === 200 || res.code === 0) {
      ElMessage.success('提交成功，等待审核')
      auditStatus.value = 0
      loadAuditList()
    } else {
      ElMessage.error(res.msg || '提交失败')
    }
  } catch (e) {
    console.error('Submit error:', e)
    ElMessage.error(e.response?.data?.msg || '提交失败')
  } finally {
    submitting.value = false
  }
}

const beforeAvatarUpload = (file) => {
  const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt10M = file.size / 1024 / 1024 < 10

  if (!isJPGorPNG) {
    ElMessage.error('头像图片只能是 JPG 或 PNG 格式!')
    return false
  }
  if (!isLt10M) {
    ElMessage.error('头像图片大小不能超过 10MB!')
    return false
  }
  return true
}

const handleAvatarSuccess = (response, file) => {
  console.log('Avatar upload response:', response)
  if (response.code === 200 || response.code === 0) {
    form.value.headUrl = response.data
    ElMessage.success('头像上传成功')
  } else {
    ElMessage.error(response.msg || '上传失败')
  }
}
</script>

<style scoped>
.card-header { display: flex; justify-content: space-between; align-items: center; }
.avatar-upload { display: flex; flex-direction: column; align-items: flex-start; }
.avatar-uploader { border: 1px dashed #d9d9d9; border-radius: 6px; cursor: pointer; overflow: hidden; transition: border-color 0.3s; }
.avatar-uploader:hover { border-color: #409eff; }
.avatar-uploader-icon { font-size: 28px; color: #8c939d; width: 100px; height: 100px; display: flex; justify-content: center; align-items: center; }
.upload-tip { color: #909399; font-size: 12px; margin-top: 8px; }

.directions-editor { width: 100%; }
.direction-item { margin-bottom: 16px; padding: 12px; border: 1px solid #ebeef5; border-radius: 4px; }
.direction-header { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
.direction-children { margin-top: 8px; }
</style>

