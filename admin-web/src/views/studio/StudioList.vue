<template>
  <div class="studio-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>工作室管理</span>
          <el-button type="primary" @click="handleAdd">新增工作室</el-button>
        </div>
      </template>
      
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="studioName" label="工作室名称" min-width="150" />
        <el-table-column prop="studioType" label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.studioType === 0 ? 'success' : 'primary'">
              {{ row.studioType === 0 ? '线下' : '线上' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="summaryAddress" label="地址" min-width="200" />
        <el-table-column prop="concatPhone" label="联系电话" width="130" />
        <el-table-column prop="enabled" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.enabled === 1 ? 'success' : 'info'">
              {{ row.enabled === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button size="small" :type="row.enabled === 1 ? 'warning' : 'success'" @click="handleToggle(row)">
              {{ row.enabled === 1 ? '禁用' : '启用' }}
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑工作室' : '新增工作室'" width="700px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="名称" required>
          <el-input v-model="form.studioName" placeholder="请输入工作室名称" />
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.studioType">
            <el-radio :label="0">线下工作室</el-radio>
            <el-radio :label="1">线上工作室</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-input v-model="form.studioOpenTime" placeholder="如：周一至周五 9:00-18:00" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.summaryAddress" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.concatPhone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="工作室介绍">
          <el-input v-model="form.studioDetail" type="textarea" :rows="4" placeholder="请输入工作室介绍" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.sortOrder" :min="0" />
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
import request from '@/api/request'

const loading = ref(false)
const submitting = ref(false)
const tableData = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)

const form = reactive({
  id: null,
  studioName: '',
  studioType: 0,
  studioOpenTime: '',
  summaryAddress: '',
  concatPhone: '',
  studioDetail: '',
  sortOrder: 0,
  enabled: 1
})

const loadData = async () => {
  loading.value = true
  try {
    const res = await request.get('/admin/studio/list')
    if (res.code === 200) {
      tableData.value = res.data
    }
  } finally {
    loading.value = false
  }
}

const handleAdd = () => {
  isEdit.value = false
  Object.assign(form, { id: null, studioName: '', studioType: 0, studioOpenTime: '', summaryAddress: '', concatPhone: '', studioDetail: '', sortOrder: 0, enabled: 1 })
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  Object.assign(form, row)
  dialogVisible.value = true
}

const handleSubmit = async () => {
  if (!form.studioName) {
    ElMessage.warning('请输入工作室名称')
    return
  }
  submitting.value = true
  try {
    if (isEdit.value) {
      await request.put(`/admin/studio/${form.id}`, form)
    } else {
      await request.post('/admin/studio', form)
    }
    ElMessage.success('保存成功')
    dialogVisible.value = false
    loadData()
  } catch (e) {
    ElMessage.error('保存失败')
  } finally {
    submitting.value = false
  }
}

const handleToggle = async (row) => {
  try {
    await request.post(`/admin/studio/${row.id}/toggle`)
    ElMessage.success('操作成功')
    loadData()
  } catch (e) {
    ElMessage.error('操作失败')
  }
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定要删除该工作室吗？', '确认删除', { type: 'warning' })
    .then(async () => {
      await request.delete(`/admin/studio/${row.id}`)
      ElMessage.success('删除成功')
      loadData()
    })
    .catch(() => {})
}

onMounted(() => loadData())
</script>

<style scoped>
.card-header { display: flex; justify-content: space-between; align-items: center; }
</style>

