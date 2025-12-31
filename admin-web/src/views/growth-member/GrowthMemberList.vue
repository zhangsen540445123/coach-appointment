<template>
  <div class="growth-member-list">
    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-value">{{ stats.total || 0 }}</div>
            <div class="stat-label">成长会员总数</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 搜索筛选 -->
    <el-card class="filter-card">
      <el-form :inline="true" :model="queryForm">
        <el-form-item label="昵称">
          <el-input v-model="queryForm.xiaoeNickname" placeholder="小鹅通昵称" clearable />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="queryForm.latestPhone" placeholder="最新手机号" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryForm.status" placeholder="请选择" clearable style="width: 120px">
            <el-option v-for="item in filterOptions.statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="加入方式">
          <el-select v-model="queryForm.joinType" placeholder="请选择" clearable style="width: 120px">
            <el-option v-for="item in filterOptions.joinTypeOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadData">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 操作按钮 -->
    <el-card class="table-card">
      <div class="table-toolbar">
        <el-button type="primary" @click="showImportDialog">
          <el-icon><Upload /></el-icon> 导入会员
        </el-button>
        <el-button @click="handleExport">
          <el-icon><Download /></el-icon> 导出
        </el-button>
        <el-button @click="handleDownloadTemplate">
          <el-icon><Document /></el-icon> 下载模板
        </el-button>
        <el-button type="success" @click="handleSync">
          <el-icon><Refresh /></el-icon> 同步到用户
        </el-button>
        <el-button type="danger" :disabled="!selectedIds.length" @click="handleBatchDelete">
          批量删除
        </el-button>
      </div>

      <!-- 数据表格 -->
      <el-table :data="tableData" v-loading="loading" @selection-change="handleSelectionChange" border stripe>
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="xiaoeNickname" label="小鹅通昵称" min-width="120" />
        <el-table-column prop="latestPhone" label="最新手机号" width="120" />
        <el-table-column prop="phoneNumber" label="手机号" width="120" />
        <el-table-column prop="realName" label="真实姓名" width="100" />
        <el-table-column prop="courseCompletionCount" label="完课数" width="80" />
        <el-table-column prop="joinDate" label="加入日期" width="110">
          <template #default="{ row }">{{ formatDate(row.joinDate) }}</template>
        </el-table-column>
        <el-table-column prop="expireDate" label="到期日期" width="110">
          <template #default="{ row }">{{ formatDate(row.expireDate) }}</template>
        </el-table-column>
        <el-table-column prop="joinType" label="加入方式" width="100" />
        <el-table-column prop="status" label="状态" width="80" />
        <el-table-column prop="xiaoeTags" label="标签" min-width="150" show-overflow-tooltip />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="showEditDialog(row)">编辑</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="loadData"
        @current-change="loadData"
        class="pagination"
      />
    </el-card>

    <!-- 导入对话框 -->
    <el-dialog v-model="importDialogVisible" title="导入成长会员" width="500px">
      <el-form :model="importForm" label-width="100px">
        <el-form-item label="会员标签" required>
          <el-input v-model="importForm.tags" placeholder="如：2024年成长会会员" />
        </el-form-item>
        <el-form-item label="选择文件" required>
          <el-upload
            ref="uploadRef"
            :auto-upload="false"
            :limit="1"
            accept=".xlsx,.xls"
            :on-change="handleFileChange"
          >
            <el-button type="primary">选择Excel文件</el-button>
            <template #tip>
              <div class="el-upload__tip">只支持 .xlsx/.xls 格式，可先下载模板填写</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="importDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleImport" :loading="importLoading">导入</el-button>
      </template>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog v-model="editDialogVisible" :title="editForm.id ? '编辑会员' : '添加会员'" width="700px">
      <el-form :model="editForm" label-width="100px" :rules="editRules" ref="editFormRef">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="小鹅通昵称" prop="xiaoeNickname">
              <el-input v-model="editForm.xiaoeNickname" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="真实姓名" prop="realName">
              <el-input v-model="editForm.realName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="最新手机号" prop="latestPhone">
              <el-input v-model="editForm.latestPhone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phoneNumber">
              <el-input v-model="editForm.phoneNumber" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="加入日期" prop="joinDate">
              <el-date-picker v-model="editForm.joinDate" type="date" value-format="YYYY-MM-DD" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="到期日期" prop="expireDate">
              <el-date-picker v-model="editForm.expireDate" type="date" value-format="YYYY-MM-DD" style="width:100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="加入方式" prop="joinType">
              <el-input v-model="editForm.joinType" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-input v-model="editForm.status" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="会员标签" prop="xiaoeTags">
              <el-input v-model="editForm.xiaoeTags" placeholder="如：2024年成长会会员" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave" :loading="saveLoading">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Upload, Download, Document, Refresh } from '@element-plus/icons-vue'
import { growthMemberApi } from '@/api/growthMember'

const loading = ref(false)
const importLoading = ref(false)
const saveLoading = ref(false)
const tableData = ref([])
const selectedIds = ref([])
const stats = ref({})
const filterOptions = ref({ statusOptions: [], joinTypeOptions: [] })

const queryForm = reactive({
  xiaoeNickname: '',
  latestPhone: '',
  status: '',
  joinType: ''
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const importDialogVisible = ref(false)
const importForm = reactive({ tags: '', file: null })
const uploadRef = ref(null)

const editDialogVisible = ref(false)
const editFormRef = ref(null)
const editForm = reactive({
  id: null,
  xiaoeNickname: '',
  realName: '',
  latestPhone: '',
  phoneNumber: '',
  joinDate: '',
  expireDate: '',
  joinType: '',
  status: '',
  xiaoeTags: ''
})
const editRules = {
  phoneNumber: [{ pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }]
}

const formatDate = (date) => {
  if (!date) return ''
  return date.substring(0, 10)
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await growthMemberApi.getPage({
      ...queryForm,
      page: pagination.page,
      pageSize: pagination.pageSize
    })
    if (res.code === 200) {
      tableData.value = res.data.list || []
      pagination.total = res.data.total || 0
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const loadStats = async () => {
  try {
    const res = await growthMemberApi.getStats()
    if (res.code === 200) {
      stats.value = res.data || {}
    }
  } catch (e) { console.error(e) }
}

const loadFilterOptions = async () => {
  try {
    const res = await growthMemberApi.getFilterOptions()
    if (res.code === 200) {
      filterOptions.value = res.data || {}
    }
  } catch (e) { console.error(e) }
}

const resetQuery = () => {
  Object.keys(queryForm).forEach(k => queryForm[k] = '')
  pagination.page = 1
  loadData()
}

const handleSelectionChange = (rows) => {
  selectedIds.value = rows.map(r => r.id)
}

const showImportDialog = () => {
  importForm.tags = ''
  importForm.file = null
  importDialogVisible.value = true
}

const handleFileChange = (file) => {
  importForm.file = file.raw
}

const handleImport = async () => {
  if (!importForm.tags) {
    return ElMessage.warning('请输入会员标签')
  }
  if (!importForm.file) {
    return ElMessage.warning('请选择文件')
  }
  importLoading.value = true
  try {
    const formData = new FormData()
    formData.append('file', importForm.file)
    formData.append('tags', importForm.tags)
    const res = await growthMemberApi.import(formData)
    if (res.code === 200) {
      const d = res.data
      ElMessage.success(`导入成功！新增${d.successCount}条，更新${d.updateCount}条，失败${d.errorCount}条`)
      importDialogVisible.value = false
      loadData()
      loadStats()
    } else {
      ElMessage.error(res.msg || '导入失败')
    }
  } catch (e) {
    ElMessage.error('导入失败')
  } finally {
    importLoading.value = false
  }
}

const handleExport = async () => {
  try {
    const res = await growthMemberApi.export(queryForm)
    const url = window.URL.createObjectURL(new Blob([res]))
    const link = document.createElement('a')
    link.href = url
    link.download = 'growth_members.xlsx'
    link.click()
    window.URL.revokeObjectURL(url)
    ElMessage.success('导出成功')
  } catch (e) {
    ElMessage.error('导出失败')
  }
}

const handleDownloadTemplate = async () => {
  try {
    const res = await growthMemberApi.downloadTemplate()
    const url = window.URL.createObjectURL(new Blob([res]))
    const link = document.createElement('a')
    link.href = url
    link.download = 'growth_member_template.xlsx'
    link.click()
    window.URL.revokeObjectURL(url)
  } catch (e) {
    ElMessage.error('下载模板失败')
  }
}

const handleSync = async () => {
  try {
    await ElMessageBox.confirm('确定要将成长会会员数据同步到用户标签吗？', '确认同步')
    const res = await growthMemberApi.sync()
    if (res.code === 200) {
      ElMessage.success(`同步成功！更新了${res.data.syncCount}个用户`)
    } else {
      ElMessage.error(res.msg || '同步失败')
    }
  } catch (e) {
    if (e !== 'cancel') ElMessage.error('同步失败')
  }
}

const showEditDialog = (row) => {
  Object.assign(editForm, {
    id: row.id,
    xiaoeNickname: row.xiaoeNickname || '',
    realName: row.realName || '',
    latestPhone: row.latestPhone || '',
    phoneNumber: row.phoneNumber || '',
    joinDate: row.joinDate ? row.joinDate.substring(0, 10) : '',
    expireDate: row.expireDate ? row.expireDate.substring(0, 10) : '',
    joinType: row.joinType || '',
    status: row.status || '',
    xiaoeTags: row.xiaoeTags || ''
  })
  editDialogVisible.value = true
}

const handleSave = async () => {
  saveLoading.value = true
  try {
    const res = await growthMemberApi.update(editForm.id, editForm)
    if (res.code === 200) {
      ElMessage.success('保存成功')
      editDialogVisible.value = false
      loadData()
    } else {
      ElMessage.error(res.msg || '保存失败')
    }
  } catch (e) {
    ElMessage.error('保存失败')
  } finally {
    saveLoading.value = false
  }
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除该会员吗？', '确认删除')
    const res = await growthMemberApi.delete(row.id)
    if (res.code === 200) {
      ElMessage.success('删除成功')
      loadData()
      loadStats()
    }
  } catch (e) {
    if (e !== 'cancel') ElMessage.error('删除失败')
  }
}

const handleBatchDelete = async () => {
  try {
    await ElMessageBox.confirm(`确定要删除选中的${selectedIds.value.length}条记录吗？`, '确认删除')
    const res = await growthMemberApi.batchDelete(selectedIds.value)
    if (res.code === 200) {
      ElMessage.success('批量删除成功')
      loadData()
      loadStats()
    }
  } catch (e) {
    if (e !== 'cancel') ElMessage.error('批量删除失败')
  }
}

onMounted(() => {
  loadData()
  loadStats()
  loadFilterOptions()
})
</script>

<style scoped>
.growth-member-list {
  padding: 20px;
}
.stats-row {
  margin-bottom: 20px;
}
.stat-item {
  text-align: center;
}
.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #409EFF;
}
.stat-label {
  color: #909399;
  margin-top: 5px;
}
.filter-card {
  margin-bottom: 20px;
}
.table-toolbar {
  margin-bottom: 15px;
}
.pagination {
  margin-top: 20px;
  justify-content: flex-end;
}
</style>


