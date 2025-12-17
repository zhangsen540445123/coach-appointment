<template>
  <div class="counselor-list">
    <el-card>
      <div class="search-bar">
        <el-input v-model="searchKeyword" placeholder="Search by name" style="width: 300px" />
        <el-button type="primary" @click="handleSearch">Search</el-button>
        <el-button type="success" @click="handleAdd">Add Coach</el-button>
      </div>
      <el-table :data="tableData" v-loading="loading">
        <el-table-column prop="id" label="ID" width="120" />
        <el-table-column prop="headUrl" label="头像" width="80">
          <template #default="scope">
            <el-avatar :src="scope.row.headUrl" :size="40" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="cityName" label="城市" width="80" />
        <el-table-column prop="consultPrice" label="价格" width="80" />
        <el-table-column label="收藏数" width="80">
          <template #default="scope">
            <el-tag type="warning">{{ scope.row.starCount || 0 }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="关联账号" width="140">
          <template #default="scope">
            <span v-if="scope.row.accountUsername" style="color: #67c23a;">
              {{ scope.row.accountUsername }}
            </span>
            <span v-else style="color: #999;">未创建</span>
          </template>
        </el-table-column>
        <el-table-column prop="canConsult" label="状态" width="80">
          <template #default="scope">
            <el-tag :type="scope.row.canConsult === 1 ? 'success' : 'danger'" size="small">
              {{ scope.row.canConsult === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="400">
          <template #default="scope">
            <el-button size="small" @click="handleToggleTop(scope.row)">{{ scope.row.isTop === 1 ? '取消置顶' : '置顶' }}</el-button>
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="info" size="small" @click="handleCalendar(scope.row)">排班</el-button>
            <el-button
              :type="scope.row.accountUsername ? 'info' : 'success'"
              size="small"
              @click="handleCreateAccount(scope.row)"
              :disabled="!!scope.row.accountUsername"
            >
              {{ scope.row.accountUsername ? '已关联' : '创建账号' }}
            </el-button>
            <el-button :type="scope.row.canConsult === 1 ? 'warning' : 'success'" size="small" @click="handleToggleStatus(scope.row)">
              {{ scope.row.canConsult === 1 ? '禁用' : '启用' }}
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pagination.page" :page-size="pagination.pageSize" :total="total" @current-change="handlePageChange" style="margin-top: 20px" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { counselorApi } from '@/api/counselor'
import { adminAccountApi } from '@/api/user'

const router = useRouter()
const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const searchKeyword = ref('')
const pagination = ref({ page: 1, pageSize: 10 })

const loadData = async () => {
  loading.value = true
  try {
    const res = await counselorApi.getList({ ...pagination.value, keyword: searchKeyword.value })
    if (res.code === 0 || res.code === 200) {
      tableData.value = res.data?.list || []
      total.value = res.data?.total || 0
    }
  } finally {
    loading.value = false
  }
}

const handleSearch = () => { pagination.value.page = 1; loadData() }
const handlePageChange = (page) => { pagination.value.page = page; loadData() }
const handleAdd = () => { router.push('/counselor/create') }
const handleEdit = (row) => { router.push('/counselor/' + row.id) }
const handleCalendar = (row) => { router.push('/counselor/' + row.id + '/calendar') }

const handleToggleTop = async (row) => {
  try {
    const newTop = row.isTop === 1 ? 0 : 1
    const res = await counselorApi.setTop(row.id, newTop)
    if (res.code === 0 || res.code === 200) { ElMessage.success(newTop === 1 ? 'Pinned' : 'Unpinned'); loadData() }
  } catch (e) { ElMessage.error('Operation failed') }
}

const handleToggleStatus = async (row) => {
  try {
    const newStatus = row.canConsult === 1 ? 0 : 1
    const res = await counselorApi.toggleStatus(row.id, newStatus)
    if (res.code === 0 || res.code === 200) { ElMessage.success(newStatus === 1 ? 'Enabled' : 'Disabled'); loadData() }
  } catch (e) { ElMessage.error('Operation failed') }
}

const handleDelete = (row) => {
  ElMessageBox.confirm('Are you sure to delete this coach?', 'Confirm', { type: 'warning' }).then(async () => {
    try {
      const res = await counselorApi.delete(row.id)
      if (res.code === 0 || res.code === 200) { ElMessage.success('Deleted'); loadData() }
    } catch (e) { ElMessage.error('Delete failed') }
  }).catch(() => {})
}

const handleCreateAccount = async (row) => {
  // 如果已有账号，则不允许创建
  if (row.accountUsername) {
    ElMessage.info(`该教练已关联账号：${row.accountUsername}`)
    return
  }
  try {
    const { value } = await ElMessageBox.prompt(
      `为教练"${row.name}"创建后台账号，请输入登录用户名：`,
      '创建教练账号',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[a-zA-Z0-9_]{4,20}$/,
        inputErrorMessage: '用户名需4-20位字母数字下划线'
      }
    )
    // 创建账号，默认密码 coach123456
    await adminAccountApi.create({
      username: value,
      password: 'coach123456',
      realName: row.name,
      role: 2,
      counselorId: row.id
    })
    ElMessage.success(`账号创建成功！用户名：${value}，初始密码：coach123456`)
    loadData() // 刷新列表
  } catch (e) {
    if (e !== 'cancel') {
      ElMessage.error(e.response?.data?.msg || '创建账号失败')
    }
  }
}

onMounted(loadData)
</script>

<style scoped>
.counselor-list { padding: 0; }
.search-bar { margin-bottom: 20px; display: flex; gap: 10px; }
</style>
