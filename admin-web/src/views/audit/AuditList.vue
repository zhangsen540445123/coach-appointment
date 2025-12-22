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
            <el-button type="primary" size="small" @click="viewDetail(scope.row)">查看审核内容</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pagination.page" :page-size="pagination.pageSize" :total="total" @current-change="handlePageChange" style="margin-top: 20px" />
    </el-card>

    <!-- 审核详情弹窗 - 优化版 -->
    <el-dialog v-model="dialogVisible" title="审核详情" width="900px" class="audit-detail-dialog">
      <!-- 展示模式切换 -->
      <div class="view-mode-switch">
        <el-radio-group v-model="viewMode" size="small">
          <el-radio-button label="diff">仅显示变更</el-radio-button>
          <el-radio-button label="all">显示全部</el-radio-button>
        </el-radio-group>
        <span class="change-summary" v-if="diffResult.changedFields.size > 0">
          共 <strong>{{ diffResult.changedFields.size }}</strong> 处变更
        </span>
      </div>

      <!-- 对比表格 -->
      <div class="diff-container">
        <table class="diff-table">
          <thead>
            <tr>
              <th class="field-col">字段名称</th>
              <th class="value-col before-col">修改前</th>
              <th class="value-col after-col">修改后</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="field in displayFields" :key="field">
              <tr :class="{ 'changed-row': diffResult.changedFields.has(field) }">
                <td class="field-name">
                  <span class="field-label">{{ getFieldLabel(field) }}</span>
                  <el-tag v-if="diffResult.changedFields.has(field)" type="warning" size="small" class="change-tag">已变更</el-tag>
                </td>
                <td class="field-value before-value" :class="{ 'has-change': diffResult.changedFields.has(field) }">
                  <div class="value-content">
                    <!-- 图片字段特殊处理 -->
                    <template v-if="isImageField(field) && diffResult.before[field]">
                      <el-image
                        :src="diffResult.before[field]"
                        :preview-src-list="[diffResult.before[field]]"
                        fit="cover"
                        class="field-image"
                        :preview-teleported="true"
                      >
                        <template #error>
                          <div class="image-error">加载失败</div>
                        </template>
                      </el-image>
                    </template>
                    <template v-else>
                      {{ formatFieldValue(field, diffResult.before[field]) }}
                    </template>
                  </div>
                </td>
                <td class="field-value after-value" :class="{ 'has-change': diffResult.changedFields.has(field) }">
                  <div class="value-content">
                    <!-- 图片字段特殊处理 -->
                    <template v-if="isImageField(field) && diffResult.after[field]">
                      <el-image
                        :src="diffResult.after[field]"
                        :preview-src-list="[diffResult.after[field]]"
                        fit="cover"
                        class="field-image"
                        :preview-teleported="true"
                      >
                        <template #error>
                          <div class="image-error">加载失败</div>
                        </template>
                      </el-image>
                    </template>
                    <template v-else>
                      {{ formatFieldValue(field, diffResult.after[field]) }}
                    </template>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <el-empty v-if="displayFields.length === 0" description="无数据变更" />
      </div>

      <!-- 审核操作 -->
      <el-form v-if="dialogData.auditStatus === 0" style="margin-top: 20px">
        <el-form-item label="审核备注">
          <el-input v-model="auditRemark" type="textarea" :rows="3" placeholder="请输入审核备注（可选）" />
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
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { counselorApi } from '@/api/counselor'
import { useDict } from '@/composables/useDict'
import { computeDiff, formatFieldValue, getFieldLabel } from '@/composables/useAuditFormat'

const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const statusFilter = ref('')
const pagination = ref({ page: 1, pageSize: 10 })
const dialogVisible = ref(false)
const dialogData = ref({})
const auditRemark = ref('')
const viewMode = ref('diff') // 'diff' 仅显示变更, 'all' 显示全部

// 使用字典数据
const { loadAllDict, getDictItems, getLabel, getStatusType: getDictStatusType } = useDict()
const auditStatusOptions = ref([])

// 计算差异结果
const diffResult = computed(() => {
  return computeDiff(dialogData.value.beforeData, dialogData.value.afterData)
})

// 根据显示模式过滤字段
const displayFields = computed(() => {
  if (viewMode.value === 'diff') {
    return diffResult.value.allFields.filter(f => diffResult.value.changedFields.has(f))
  }
  return diffResult.value.allFields
})

const getStatusText = (status) => getLabel('audit_status', status)
const getStatusType = (status) => getDictStatusType('audit_status', status)

// 判断是否为图片字段
const imageFields = ['headUrl', 'headUrlSquare']
const isImageField = (field) => imageFields.includes(field)

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

/* 审核详情弹窗样式 */
.view-mode-switch {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ebeef5;
}

.change-summary {
  color: #909399;
  font-size: 13px;
}

.change-summary strong {
  color: #e6a23c;
  font-size: 15px;
}

/* 差异对比表格 */
.diff-container {
  max-height: 500px;
  overflow-y: auto;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.diff-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.diff-table th,
.diff-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
  vertical-align: top;
}

.diff-table thead {
  background: #f5f7fa;
  position: sticky;
  top: 0;
  z-index: 1;
}

.diff-table th {
  font-weight: 600;
  color: #606266;
}

.field-col {
  width: 150px;
  min-width: 150px;
}

.value-col {
  width: 50%;
}

.before-col {
  background: #fef0f0;
}

.after-col {
  background: #f0f9eb;
}

/* 字段名称 */
.field-name {
  font-weight: 500;
  color: #303133;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field-label {
  word-break: keep-all;
}

.change-tag {
  width: fit-content;
}

/* 值内容 */
.field-value {
  color: #606266;
  background: #fff;
}

.value-content {
  word-break: break-word;
  white-space: pre-wrap;
  max-height: 150px;
  overflow-y: auto;
}

/* 变更行高亮 */
.changed-row {
  background: #fdf6ec;
}

.changed-row .field-name {
  color: #e6a23c;
}

.before-value.has-change {
  background: #fef0f0;
}

.before-value.has-change .value-content {
  color: #f56c6c;
}

.after-value.has-change {
  background: #f0f9eb;
}

.after-value.has-change .value-content {
  color: #67c23a;
}

/* 图片预览样式 */
.field-image {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #ebeef5;
  transition: transform 0.2s;
}

.field-image:hover {
  transform: scale(1.05);
  border-color: #409eff;
}

.image-error {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  color: #909399;
  font-size: 12px;
  border-radius: 4px;
}

/* 滚动条美化 */
.diff-container::-webkit-scrollbar,
.value-content::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.diff-container::-webkit-scrollbar-thumb,
.value-content::-webkit-scrollbar-thumb {
  background: #c0c4cc;
  border-radius: 3px;
}

.diff-container::-webkit-scrollbar-track,
.value-content::-webkit-scrollbar-track {
  background: #f5f7fa;
}
</style>
