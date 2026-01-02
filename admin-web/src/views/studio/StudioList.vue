<template>
  <div class="studio-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>悦行活动管理</span>
          <el-button type="primary" @click="handleAdd">新增悦行活动</el-button>
        </div>
      </template>

      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column label="封面图" width="120">
          <template #default="{ row }">
            <el-image v-if="getCoverImage(row)" :src="getCoverImage(row)" style="width: 80px; height: 60px; border-radius: 4px;" fit="cover" />
            <span v-else class="no-image">暂无</span>
          </template>
        </el-table-column>
        <el-table-column prop="studioName" label="活动名称" min-width="180" />
        <el-table-column prop="studioType" label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.studioType === 0 ? 'success' : 'primary'" size="small">
              {{ row.studioType === 0 ? '线下' : '线上' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="studioOpenTime" label="活动时间" min-width="180" />
        <el-table-column prop="summaryAddress" label="地址" min-width="200" show-overflow-tooltip />
        <el-table-column prop="enabled" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.enabled === 1 ? 'success' : 'info'" size="small">
              {{ row.enabled === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button :type="row.enabled === 1 ? 'warning' : 'success'" link size="small" @click="handleToggle(row)">
              {{ row.enabled === 1 ? '禁用' : '启用' }}
            </el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑悦行活动' : '新增悦行活动'" width="800px" top="3vh" destroy-on-close>
      <el-form :model="form" label-width="100px" class="studio-form">
        <el-form-item label="活动名称" required>
          <el-input v-model="form.studioName" placeholder="请输入活动名称" />
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.studioType">
            <el-radio :label="0">悦行活动</el-radio>
            <el-radio :label="1">线上活动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="封面图片">
          <div class="cover-images">
            <div v-for="(img, index) in coverImages" :key="index" class="cover-image-item">
              <el-image :src="getImageUrl(img)" fit="cover" class="cover-preview" />
              <div class="cover-image-mask" @click="removeCoverImage(index)">
                <el-icon><Delete /></el-icon>
              </div>
            </div>
            <el-upload
              class="cover-uploader"
              action="/api/file/upload"
              :show-file-list="false"
              :on-success="handleCoverUploadSuccess"
              :before-upload="beforeImageUpload"
            >
              <div class="upload-trigger">
                <el-icon size="24"><Plus /></el-icon>
              </div>
            </el-upload>
          </div>
          <div class="form-tip">支持上传多张图片，第一张作为列表封面，建议尺寸 750×400</div>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-input v-model="form.studioOpenTime" placeholder="如：周一至周五 9:00-18:00" />
        </el-form-item>
        <el-form-item label="活动地址" v-if="form.studioType === 0">
          <el-input v-model="form.summaryAddress" placeholder="如：南山区" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.concatPhone" placeholder="请输入联系电话" style="width: 300px;" />
        </el-form-item>
        <el-form-item label="二维码">
          <div class="qrcode-section">
            <el-image v-if="form.qrCodeUrl" :src="getImageUrl(form.qrCodeUrl)" fit="contain" class="qrcode-preview" />
            <el-upload
              action="/api/file/upload"
              :show-file-list="false"
              :on-success="handleQrcodeUploadSuccess"
              :before-upload="beforeImageUpload"
            >
              <el-button size="small" type="primary" plain>{{ form.qrCodeUrl ? '更换' : '上传' }}</el-button>
            </el-upload>
            <el-button v-if="form.qrCodeUrl" size="small" type="danger" plain @click="form.qrCodeUrl = ''">删除</el-button>
          </div>
          <div class="form-tip">用于"名片"功能展示</div>
        </el-form-item>
        <el-form-item label="活动详情">
          <WangEditor v-model="form.studioDetail" />
        </el-form-item>
        <el-form-item label="排序权重">
          <el-input-number v-model="form.sortOrder" :min="0" :max="999" />
          <span class="form-tip" style="margin-left: 10px;">数值越大越靠前</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="submitting">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete, Plus } from '@element-plus/icons-vue'
import request from '@/api/request'
import WangEditor from '@/components/WangEditor.vue'

const loading = ref(false)
const submitting = ref(false)
const tableData = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const coverImages = ref([])

const form = reactive({
  id: null, studioName: '', studioType: 0, studioCoverImgList: '', studioOpenTime: '',
  summaryAddress: '', fullAddress: '', locationLongitude: '', locationLatitude: '',
  concatPhone: '', qrCodeUrl: '', studioDetail: '', sortOrder: 0, enabled: 1
})

const getImageUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `/api${url}`
}

const getCoverImage = (row) => {
  if (!row.studioCoverImgList) return null
  try {
    const list = typeof row.studioCoverImgList === 'string' ? JSON.parse(row.studioCoverImgList) : row.studioCoverImgList
    return list && list.length > 0 ? getImageUrl(list[0]) : null
  } catch { return null }
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await request.get('/admin/studio/list')
    if (res.code === 200 || res.code === 0) tableData.value = res.data || []
  } catch (e) {
    console.error('Load error:', e)
    ElMessage.error('获取列表失败')
  } finally { loading.value = false }
}

const resetForm = () => {
  Object.assign(form, {
    id: null, studioName: '', studioType: 0, studioCoverImgList: '', studioOpenTime: '',
    summaryAddress: '', fullAddress: '', locationLongitude: '', locationLatitude: '',
    concatPhone: '', qrCodeUrl: '', studioDetail: '', sortOrder: 0, enabled: 1
  })
  coverImages.value = []
}

const handleAdd = () => { isEdit.value = false; resetForm(); dialogVisible.value = true }

const handleEdit = (row) => {
  isEdit.value = true
  Object.assign(form, row)
  try {
    coverImages.value = row.studioCoverImgList
      ? (typeof row.studioCoverImgList === 'string' ? JSON.parse(row.studioCoverImgList) : row.studioCoverImgList)
      : []
  } catch { coverImages.value = [] }
  dialogVisible.value = true
}

const beforeImageUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt10M = file.size / 1024 / 1024 < 10
  if (!isImage) { ElMessage.error('只能上传图片文件'); return false }
  if (!isLt10M) { ElMessage.error('图片大小不能超过10MB'); return false }
  return true
}

const handleCoverUploadSuccess = (res) => {
  if (res.code === 200 || res.code === 0) {
    coverImages.value.push(res.data?.url || res.data)
    ElMessage.success('上传成功')
  } else { ElMessage.error(res.message || '上传失败') }
}

const removeCoverImage = (index) => { coverImages.value.splice(index, 1) }

const handleQrcodeUploadSuccess = (res) => {
  if (res.code === 200 || res.code === 0) {
    form.qrCodeUrl = res.data?.url || res.data
    ElMessage.success('上传成功')
  } else { ElMessage.error(res.message || '上传失败') }
}



const handleSubmit = async () => {
  if (!form.studioName) { ElMessage.warning('请输入活动名称'); return }
  submitting.value = true
  try {
    form.studioCoverImgList = JSON.stringify(coverImages.value)
    if (isEdit.value) await request.put(`/admin/studio/${form.id}`, form)
    else await request.post('/admin/studio', form)
    ElMessage.success('保存成功')
    dialogVisible.value = false
    loadData()
  } catch (e) {
    console.error('Save error:', e)
    ElMessage.error('保存失败')
  } finally { submitting.value = false }
}

const handleToggle = async (row) => {
  try {
    await request.post(`/admin/studio/${row.id}/toggle`)
    ElMessage.success('操作成功')
    loadData()
  } catch { ElMessage.error('操作失败') }
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定要删除该悦行活动吗？', '确认删除', { type: 'warning' })
    .then(async () => {
      await request.delete(`/admin/studio/${row.id}`)
      ElMessage.success('删除成功')
      loadData()
    }).catch(() => {})
}

onMounted(() => loadData())
</script>

<style scoped>
.card-header { display: flex; justify-content: space-between; align-items: center; }
.studio-form { max-height: 70vh; overflow-y: auto; padding-right: 10px; }
.no-image { color: #999; font-size: 12px; }
.cover-images { display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-start; }
.cover-image-item { position: relative; border-radius: 8px; overflow: hidden; }
.cover-preview { width: 120px; height: 80px; display: block; }
.cover-image-mask {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.2s; cursor: pointer; color: #fff;
}
.cover-image-item:hover .cover-image-mask { opacity: 1; }
.cover-uploader .upload-trigger {
  width: 120px; height: 80px; border: 1px dashed #dcdfe6; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; cursor: pointer; color: #909399;
  transition: all 0.2s;
}
.cover-uploader .upload-trigger:hover { border-color: #409eff; color: #409eff; }
.qrcode-section { display: flex; align-items: center; gap: 12px; }
.qrcode-preview { width: 80px; height: 80px; border: 1px solid #eee; border-radius: 4px; }
.form-tip { font-size: 12px; color: #909399; margin-top: 4px; }
</style>

