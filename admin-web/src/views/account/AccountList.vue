<template>
  <div class="account-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>后台账号管理</span>
          <el-button type="primary" @click="showCreateDialog">添加账号</el-button>
        </div>
      </template>

      <!-- 筛选 -->
      <div class="filter-bar">
        <el-radio-group v-model="filterRole" @change="loadData">
          <el-radio-button :label="null">全部</el-radio-button>
          <el-radio-button :label="1">管理员</el-radio-button>
          <el-radio-button :label="2">教练</el-radio-button>
        </el-radio-group>
      </div>

      <!-- 列表 -->
      <el-table :data="tableData" v-loading="loading" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="username" label="用户名" width="150" />
        <el-table-column prop="realName" label="姓名" width="120" />
        <el-table-column label="角色" width="100">
          <template #default="{ row }">
            <el-tag :type="row.role === 1 ? 'danger' : 'success'" size="small">
              {{ row.role === 1 ? '管理员' : '教练' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="关联教练" width="150">
          <template #default="{ row }">
            <span v-if="row.role === 2 && row.counselorId">ID: {{ row.counselorId }}</span>
            <span v-else-if="row.role === 2" style="color: #999;">未关联</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'" size="small">
              {{ row.status === 1 ? '正常' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastLoginTime" label="最后登录" width="180" />
        <el-table-column prop="createdAt" label="创建时间" width="180" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="showEditDialog(row)">编辑</el-button>
            <el-button link type="warning" @click="resetPassword(row)">重置密码</el-button>
            <el-button link :type="row.status === 1 ? 'warning' : 'success'" @click="toggleStatus(row)">
              {{ row.status === 1 ? '禁用' : '启用' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination v-model:current-page="pagination.page" v-model:page-size="pagination.pageSize"
                     :total="total" layout="total, prev, pager, next" @current-change="loadData"
                     style="margin-top: 20px; justify-content: flex-end;" />
    </el-card>

    <!-- 创建/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑账号' : '添加账号'" width="500px">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" :disabled="isEdit" placeholder="登录用户名" />
        </el-form-item>
        <el-form-item label="密码" :prop="isEdit ? '' : 'password'">
          <el-input v-model="form.password" type="password" show-password 
                    :placeholder="isEdit ? '留空则不修改密码' : '请输入密码'" />
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="form.realName" placeholder="真实姓名" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-radio-group v-model="form.role" @change="onRoleChange">
            <el-radio :label="1">管理员</el-radio>
            <el-radio :label="2">教练</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.role === 2" label="关联教练" prop="counselorId">
          <el-select v-model="form.counselorId" placeholder="选择要关联的教练" filterable clearable style="width: 100%">
            <el-option v-for="c in counselorList" :key="c.id" :label="c.name" :value="c.id">
              <span>{{ c.name }}</span>
              <span style="color: #999; margin-left: 8px; font-size: 12px;">ID: {{ c.id }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm" :loading="submitting">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminAccountApi } from '@/api/user'
import { counselorApi } from '@/api/counselor'

const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const pagination = ref({ page: 1, pageSize: 10 })
const filterRole = ref(null)

const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const submitting = ref(false)
const counselorList = ref([])

const form = reactive({
  id: null,
  username: '',
  password: '',
  realName: '',
  role: 2,
  counselorId: null
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  realName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }]
}

onMounted(() => {
  loadData()
  loadCounselors()
})

const loadData = async () => {
  loading.value = true
  try {
    const res = await adminAccountApi.getList({
      page: pagination.value.page,
      pageSize: pagination.value.pageSize
    }, filterRole.value)
    tableData.value = res.data?.list || []
    total.value = res.data?.total || 0
  } catch (e) {
    ElMessage.error('加载账号列表失败')
  } finally {
    loading.value = false
  }
}

const loadCounselors = async () => {
  try {
    const res = await counselorApi.getList({ page: 1, pageSize: 100 })
    counselorList.value = res.data?.list || []
  } catch (e) {
    console.error('加载教练列表失败', e)
  }
}

const showCreateDialog = () => {
  isEdit.value = false
  Object.assign(form, { id: null, username: '', password: '', realName: '', role: 2, counselorId: null })
  dialogVisible.value = true
}

const showEditDialog = (row) => {
  isEdit.value = true
  Object.assign(form, {
    id: row.id,
    username: row.username,
    password: '',
    realName: row.realName,
    role: row.role,
    counselorId: row.counselorId
  })
  dialogVisible.value = true
}

const onRoleChange = () => {
  if (form.role !== 2) {
    form.counselorId = null
  }
}

const submitForm = async () => {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  submitting.value = true
  try {
    if (isEdit.value) {
      await adminAccountApi.update(form.id, form)
      ElMessage.success('更新成功')
    } else {
      await adminAccountApi.create(form)
      ElMessage.success('创建成功')
    }
    dialogVisible.value = false
    loadData()
  } catch (e) {
    ElMessage.error(e.response?.data?.msg || '操作失败')
  } finally {
    submitting.value = false
  }
}

const toggleStatus = async (row) => {
  const newStatus = row.status === 1 ? 0 : 1
  try {
    await adminAccountApi.toggleStatus(row.id, newStatus)
    ElMessage.success(newStatus === 1 ? '已启用' : '已禁用')
    loadData()
  } catch (e) {
    ElMessage.error('操作失败')
  }
}

const resetPassword = async (row) => {
  try {
    await ElMessageBox.prompt('请输入新密码', '重置密码', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^.{6,}$/,
      inputErrorMessage: '密码至少6位'
    }).then(async ({ value }) => {
      const res = await adminAccountApi.update(row.id, { password: value })
      if (res.code === 200) {
        ElMessage.success('密码已重置')
      } else {
        ElMessage.error(res.msg || '重置密码失败')
      }
    })
  } catch (e) {
    if (e !== 'cancel') {
      ElMessage.error('重置密码失败')
    }
  }
}
</script>

<style scoped>
.card-header { display: flex; justify-content: space-between; align-items: center; }
.filter-bar { margin-bottom: 20px; }
</style>

