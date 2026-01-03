<template>
  <div class="consult-guide-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>咨询指南管理</span>
          <el-button type="primary" @click="handleAdd">新增咨询指南</el-button>
        </div>
      </template>
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="category" label="分类" width="120">
          <template #default="{ row }">
            <el-tag :type="row.category === 0 ? 'primary' : 'success'" size="small">
              {{ row.category === 0 ? '预约需知' : '常见问题' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
        <el-table-column prop="content" label="内容预览" min-width="250">
          <template #default="{ row }">
            <span class="content-preview">{{ (row.content || '').substring(0, 50) }}{{ (row.content || '').length > 50 ? '...' : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sortOrder" label="排序" width="80" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'" size="small">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button :type="row.status === 1 ? 'warning' : 'success'" link size="small" @click="handleToggle(row)">
              {{ row.status === 1 ? '禁用' : '启用' }}
            </el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑咨询指南' : '新增咨询指南'" width="600px" destroy-on-close>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="分类" prop="category">
          <el-radio-group v-model="form.category">
            <el-radio :label="0">预约需知</el-radio>
            <el-radio :label="1">常见问题</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="form.content" type="textarea" :rows="6" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="排序权重">
          <el-input-number v-model="form.sortOrder" :min="0" :max="999" />
          <span class="form-tip" style="margin-left: 10px;">数值越小越靠前</span>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSubmit">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { consultGuideApi } from '@/api/consultGuide'

const loading = ref(false)
const tableData = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const submitting = ref(false)

const form = reactive({
  id: null,
  category: 0,
  title: '',
  content: '',
  sortOrder: 0,
  status: 1
})

const rules = {
  category: [{ required: true, message: '请选择分类', trigger: 'change' }],
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await consultGuideApi.getList()
    if (res.code === 200) {
      tableData.value = res.data || []
    } else {
      ElMessage.error(res.msg || '加载失败')
    }
  } catch (e) {
    console.error('Load error:', e)
    ElMessage.error('获取咨询指南列表失败')
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  Object.assign(form, {
    id: null,
    category: 0,
    title: '',
    content: '',
    sortOrder: 0,
    status: 1
  })
}

const handleAdd = () => {
  isEdit.value = false
  resetForm()
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  Object.assign(form, row)
  dialogVisible.value = true
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    submitting.value = true
    try {
      const res = isEdit.value
        ? await consultGuideApi.update(form.id, form)
        : await consultGuideApi.create(form)
      if (res.code === 200) {
        ElMessage.success(isEdit.value ? '更新成功' : '创建成功')
        dialogVisible.value = false
        loadData()
      } else {
        ElMessage.error(res.msg || '操作失败')
      }
    } catch (e) {
      console.error('Submit error:', e)
      ElMessage.error('操作失败')
    } finally {
      submitting.value = false
    }
  })
}

const handleToggle = async (row) => {
  try {
    const res = await consultGuideApi.toggle(row.id)
    if (res.code === 200) {
      ElMessage.success(row.status === 1 ? '已禁用' : '已启用')
      loadData()
    } else {
      ElMessage.error(res.msg || '操作失败')
    }
  } catch (e) {
    console.error('Toggle error:', e)
    ElMessage.error('操作失败')
  }
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定要删除该咨询指南吗？', '确认删除', { type: 'warning' })
    .then(async () => {
      try {
        const res = await consultGuideApi.delete(row.id)
        if (res.code === 200) {
          ElMessage.success('删除成功')
          loadData()
        } else {
          ElMessage.error(res.msg || '删除失败')
        }
      } catch (e) {
        console.error('Delete error:', e)
        ElMessage.error('删除失败')
      }
    }).catch(() => {})
}

onMounted(() => loadData())
</script>

<style scoped>
.consult-guide-list { padding: 0; }
.card-header { display: flex; justify-content: space-between; align-items: center; }
.content-preview { color: #909399; font-size: 13px; }
.form-tip { font-size: 12px; color: #909399; }
</style>
