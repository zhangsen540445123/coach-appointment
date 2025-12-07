<template>
  <div class="audit-list">
    <el-card>
      <div class="search-bar">
        <el-select v-model="statusFilter" placeholder="Status" clearable @change="loadData">
          <el-option label="All" value="" />
          <el-option label="Pending" :value="0" />
          <el-option label="Approved" :value="1" />
          <el-option label="Rejected" :value="2" />
        </el-select>
      </div>
      <el-table :data="tableData" v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="counselorId" label="Coach ID" width="100" />
        <el-table-column prop="auditStatus" label="Status" width="120">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.auditStatus)">{{ getStatusText(scope.row.auditStatus) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="submittedAt" label="Submitted At" />
        <el-table-column label="Actions" width="200">
          <template #default="scope">
            <el-button-group v-if="scope.row.auditStatus === 0">
              <el-button type="success" size="small" @click="handleApprove(scope.row)">Approve</el-button>
              <el-button type="danger" size="small" @click="handleReject(scope.row)">Reject</el-button>
            </el-button-group>
            <el-button type="primary" size="small" @click="viewDetail(scope.row)">View</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pagination.page" :page-size="pagination.pageSize" :total="total" @current-change="handlePageChange" style="margin-top: 20px" />
    </el-card>
    <el-dialog v-model="dialogVisible" title="Audit Details" width="600px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="Before Data">
          <pre>{{ dialogData.beforeData }}</pre>
        </el-descriptions-item>
        <el-descriptions-item label="After Data">
          <pre>{{ dialogData.afterData }}</pre>
        </el-descriptions-item>
      </el-descriptions>
      <el-form v-if="dialogData.auditStatus === 0" style="margin-top: 20px">
        <el-form-item label="Remark">
          <el-input v-model="auditRemark" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">Close</el-button>
        <el-button v-if="dialogData.auditStatus === 0" type="danger" @click="submitAudit(2)">Reject</el-button>
        <el-button v-if="dialogData.auditStatus === 0" type="success" @click="submitAudit(1)">Approve</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { counselorApi } from '@/api/counselor'

const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const statusFilter = ref('')
const pagination = ref({ page: 1, pageSize: 10 })
const dialogVisible = ref(false)
const dialogData = ref({})
const auditRemark = ref('')

const statusMap = { 0: 'Pending', 1: 'Approved', 2: 'Rejected' }
const getStatusText = (status) => statusMap[status] || 'Unknown'
const getStatusType = (status) => {
  const types = { 0: 'warning', 1: 'success', 2: 'danger' }
  return types[status] || 'info'
}

const loadData = async () => {
  loading.value = true
  try {
    const status = statusFilter.value === '' ? null : parseInt(statusFilter.value)
    const res = await counselorApi.getAuditList(pagination.value, status)
    if (res.code === 0) {
      tableData.value = res.data?.list || []
      total.value = res.data?.total || 0
    }
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page) => { pagination.value.page = page; loadData() }

const handleApprove = async (row) => {
  try {
    const res = await counselorApi.audit(row.id, { status: 1, remark: '' })
    if (res.code === 0) { ElMessage.success('Approved'); loadData() }
  } catch (e) { ElMessage.error('Operation failed') }
}

const handleReject = async (row) => {
  try {
    const res = await counselorApi.audit(row.id, { status: 2, remark: '' })
    if (res.code === 0) { ElMessage.success('Rejected'); loadData() }
  } catch (e) { ElMessage.error('Operation failed') }
}

const viewDetail = (row) => {
  dialogData.value = row
  auditRemark.value = ''
  dialogVisible.value = true
}

const submitAudit = async (status) => {
  try {
    const res = await counselorApi.audit(dialogData.value.id, { status, remark: auditRemark.value })
    if (res.code === 0) {
      ElMessage.success(status === 1 ? 'Approved' : 'Rejected')
      dialogVisible.value = false
      loadData()
    }
  } catch (e) { ElMessage.error('Operation failed') }
}

onMounted(loadData)
</script>

<style scoped>
.audit-list { padding: 0; }
.search-bar { margin-bottom: 20px; }
pre { white-space: pre-wrap; word-wrap: break-word; margin: 0; }
</style>
