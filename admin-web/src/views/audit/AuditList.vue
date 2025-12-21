<template>
  <div class="audit-list">
    <el-card>
      <div class="search-bar">
        <el-select v-model="statusFilter" placeholder="状态筛选" clearable @change="loadData">
          <el-option label="全部" value="" />
          <el-option v-for="(label, index) in auditStatusOptions" :key="index" :label="label" :value="index" />
        </el-select>
      </div>
      <el-table :data="tableData" v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="counselorId" label="教练ID" width="100" />
        <el-table-column prop="auditStatus" label="状态" width="120">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.auditStatus)">{{ getStatusText(scope.row.auditStatus) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="submittedAt" label="提交时间" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button-group v-if="scope.row.auditStatus === 0">
              <el-button type="success" size="small" @click="handleApprove(scope.row)">通过</el-button>
              <el-button type="danger" size="small" @click="handleReject(scope.row)">拒绝</el-button>
            </el-button-group>
            <el-button type="primary" size="small" @click="viewDetail(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pagination.page" :page-size="pagination.pageSize" :total="total" @current-change="handlePageChange" style="margin-top: 20px" />
    </el-card>
    <el-dialog v-model="dialogVisible" title="审核详情" width="600px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="修改前数据">
          <pre>{{ dialogData.beforeData }}</pre>
        </el-descriptions-item>
        <el-descriptions-item label="修改后数据">
          <pre>{{ dialogData.afterData }}</pre>
        </el-descriptions-item>
      </el-descriptions>
      <el-form v-if="dialogData.auditStatus === 0" style="margin-top: 20px">
        <el-form-item label="审核备注">
          <el-input v-model="auditRemark" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button v-if="dialogData.auditStatus === 0" type="danger" @click="submitAudit(2)">拒绝</el-button>
        <el-button v-if="dialogData.auditStatus === 0" type="success" @click="submitAudit(1)">通过</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { counselorApi } from '@/api/counselor'
import { useDict } from '@/composables/useDict'

const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const statusFilter = ref('')
const pagination = ref({ page: 1, pageSize: 10 })
const dialogVisible = ref(false)
const dialogData = ref({})
const auditRemark = ref('')

// 使用字典数据
const { loadAllDict, getDictItems, getLabel, getStatusType: getDictStatusType } = useDict()
const auditStatusOptions = ref([])

const getStatusText = (status) => getLabel('audit_status', status)
const getStatusType = (status) => getDictStatusType('audit_status', status)

const loadData = async () => {
  loading.value = true
  try {
    const status = statusFilter.value === '' ? null : parseInt(statusFilter.value)
    const res = await counselorApi.getAuditList(pagination.value, status)
    if (res.code === 200) {
      tableData.value = res.data?.list || []
      total.value = res.data?.total || 0
    } else {
      ElMessage.error(res.msg || '获取审核列表失败')
    }
  } catch (e) {
    console.error('Error loading audit list:', e)
    ElMessage.error('获取审核列表失败')
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page) => { pagination.value.page = page; loadData() }

const handleApprove = async (row) => {
  try {
    const res = await counselorApi.audit(row.id, { status: 1, remark: '' })
    if (res.code === 200) {
      ElMessage.success('审核通过')
      loadData()
    } else {
      ElMessage.error(res.msg || '操作失败')
    }
  } catch (e) {
    ElMessage.error('操作失败')
  }
}

const handleReject = async (row) => {
  try {
    const res = await counselorApi.audit(row.id, { status: 2, remark: '' })
    if (res.code === 200) {
      ElMessage.success('已拒绝')
      loadData()
    } else {
      ElMessage.error(res.msg || '操作失败')
    }
  } catch (e) {
    ElMessage.error('操作失败')
  }
}

const viewDetail = (row) => {
  dialogData.value = row
  auditRemark.value = ''
  dialogVisible.value = true
}

const submitAudit = async (status) => {
  try {
    const res = await counselorApi.audit(dialogData.value.id, { status, remark: auditRemark.value })
    if (res.code === 200) {
      ElMessage.success(status === 1 ? '审核通过' : '已拒绝')
      dialogVisible.value = false
      loadData()
    } else {
      ElMessage.error(res.msg || '操作失败')
    }
  } catch (e) {
    ElMessage.error('操作失败')
  }
}

onMounted(async () => {
  await loadAllDict()
  auditStatusOptions.value = getDictItems('audit_status')
  loadData()
})
</script>

<style scoped>
.audit-list { padding: 0; }
.search-bar { margin-bottom: 20px; }
pre { white-space: pre-wrap; word-wrap: break-word; margin: 0; }
</style>
