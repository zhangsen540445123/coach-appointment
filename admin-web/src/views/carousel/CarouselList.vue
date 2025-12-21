<template>
  <div class="carousel-list">
    <el-card>
      <div class="toolbar">
        <el-button type="primary" @click="handleAdd">Add Carousel</el-button>
      </div>
      <el-table :data="tableData" v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="imageUrl" label="Image" width="200">
          <template #default="scope">
            <el-image :src="scope.row.imageUrl" style="width: 150px; height: 80px" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="Title" />
        <el-table-column prop="linkUrl" label="Link URL" />
        <el-table-column prop="sortOrder" label="Sort" width="80" />
        <el-table-column prop="status" label="Status" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{ scope.row.status === 1 ? 'Active' : 'Inactive' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="200">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">Edit</el-button>
            <el-button :type="scope.row.status === 1 ? 'warning' : 'success'" size="small" @click="handleToggle(scope.row)">{{ scope.row.status === 1 ? 'Disable' : 'Enable' }}</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" :title="isEdit ? 'Edit Carousel' : 'Add Carousel'" width="500px">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="Title" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="Image URL" prop="imageUrl">
          <el-input v-model="form.imageUrl" />
        </el-form-item>
        <el-form-item label="Link URL">
          <el-input v-model="form.linkUrl" />
        </el-form-item>
        <el-form-item label="Sort Order">
          <el-input-number v-model="form.sortOrder" :min="0" />
        </el-form-item>
        <el-form-item label="Status">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSubmit">{{ isEdit ? 'Update' : 'Create' }}</el-button>
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
  title: [{ required: true, message: 'Please enter title', trigger: 'blur' }],
  imageUrl: [{ required: true, message: 'Please enter image URL', trigger: 'blur' }]
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
        ElMessage.success(isEdit.value ? 'Updated' : 'Created')
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
      ElMessage.success(newStatus === 1 ? 'Enabled' : 'Disabled')
      loadData()
    } else {
      ElMessage.error(res.msg || 'Operation failed')
    }
  } catch (e) {
    console.error('Toggle error:', e)
    ElMessage.error('Operation failed')
  }
}

const handleDelete = (row) => {
  ElMessageBox.confirm('Are you sure to delete this carousel?', 'Confirm', { type: 'warning' }).then(async () => {
    try {
      const res = await carouselApi.delete(row.id)
      if (res.code === 200) {
        ElMessage.success('Deleted')
        loadData()
      } else {
        ElMessage.error(res.msg || 'Delete failed')
      }
    } catch (e) {
      console.error('Delete error:', e)
      ElMessage.error('Delete failed')
    }
  }).catch(() => {})
}

onMounted(loadData)
</script>

<style scoped>
.carousel-list { padding: 0; }
.toolbar { margin-bottom: 20px; }
</style>
