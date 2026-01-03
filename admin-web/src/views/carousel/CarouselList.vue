<template>
  <div class="carousel-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>轮播图管理</span>
          <el-button type="primary" @click="handleAdd">新增轮播图</el-button>
        </div>
      </template>
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="imageUrl" label="图片" width="200">
          <template #default="scope">
            <el-image :src="scope.row.imageUrl" style="width: 150px; height: 80px" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="linkUrl" label="链接地址" />
        <el-table-column prop="sortOrder" label="排序" width="80" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" size="small">{{ scope.row.status === 1 ? '启用' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280" fixed="right">
          <template #default="scope">
            <el-button type="primary" link size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button :type="scope.row.status === 1 ? 'warning' : 'success'" link size="small" @click="handleToggle(scope.row)">{{ scope.row.status === 1 ? '禁用' : '启用' }}</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑轮播图' : '新增轮播图'" width="500px">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="图片地址" prop="imageUrl">
          <el-input v-model="form.imageUrl" placeholder="请输入图片地址" />
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input v-model="form.linkUrl" placeholder="请输入链接地址" />
        </el-form-item>
        <el-form-item label="排序权重">
          <el-input-number v-model="form.sortOrder" :min="0" />
          <span class="form-tip" style="margin-left: 10px;">数值越大越靠前</span>
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
import { carouselApi } from '@/api/carousel'

const loading = ref(false)
const tableData = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const submitting = ref(false)

const form = reactive({ id: null, title: '', imageUrl: '', linkUrl: '', sortOrder: 0, status: 1 })

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  imageUrl: [{ required: true, message: '请输入图片地址', trigger: 'blur' }]
}

const loadData = async () => {
  loading.value = true
  try {
    console.log('Loading carousel list...')
    const res = await carouselApi.getList()
    console.log('Carousel list response:', res)
    if (res.code === 200) {
      tableData.value = res.data || []
      console.log('Loaded carousels:', tableData.value.length)
    } else {
      console.error('Invalid response:', res)
      ElMessage.error(res.msg || '加载失败')
    }
  } catch (e) {
    console.error('Load carousel error:', e)
    ElMessage.error('加载轮播图列表失败')
  } finally {
    loading.value = false
  }
}

const handleAdd = () => {
  isEdit.value = false
  Object.assign(form, { id: null, title: '', imageUrl: '', linkUrl: '', sortOrder: 0, status: 1 })
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
      console.log('Submitting carousel:', form)
      const res = isEdit.value
        ? await carouselApi.update(form.id, form)
        : await carouselApi.create(form)
      console.log('Submit response:', res)
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
    const newStatus = row.status === 1 ? 0 : 1
    const res = await carouselApi.update(row.id, { ...row, status: newStatus })
    if (res.code === 200) {
      ElMessage.success(newStatus === 1 ? '已启用' : '已禁用')
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
  ElMessageBox.confirm('确定要删除该轮播图吗？', '确认删除', { type: 'warning' }).then(async () => {
    try {
      const res = await carouselApi.delete(row.id)
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

onMounted(loadData)
</script>

<style scoped>
.carousel-list { padding: 0; }
.card-header { display: flex; justify-content: space-between; align-items: center; }
.form-tip { font-size: 12px; color: #909399; }
</style>
