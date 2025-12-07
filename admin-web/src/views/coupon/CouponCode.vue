<template>
  <div class="coupon-code">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>兑换码管理 - {{ couponName }}</span>
          <el-button type="primary" @click="showGenerateDialog">
            <el-icon><Plus /></el-icon> 生成兑换码
          </el-button>
        </div>
      </template>

      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="code" label="兑换码" width="150" />
        <el-table-column prop="couponName" label="优惠券" width="180" />
        <el-table-column label="使用情况" width="120">
          <template #default="{ row }">
            {{ row.usedCount }} / {{ row.totalCount }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-switch v-model="row.status" :active-value="1" :inactive-value="0"
              @change="toggleStatus(row)" />
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="180">
          <template #default="{ row }">{{ formatDateTime(row.createdAt) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button type="primary" link @click="copyCode(row.code)">复制</el-button>
            <el-button type="danger" link @click="deleteCode(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.size"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next"
        @change="loadData"
      />
    </el-card>

    <!-- 生成兑换码对话框 -->
    <el-dialog v-model="generateDialogVisible" title="生成兑换码" width="400px">
      <el-form :model="generateForm" label-width="100px">
        <el-form-item label="生成数量">
          <el-input-number v-model="generateForm.count" :min="1" :max="100" />
          <span class="form-tip">个</span>
        </el-form-item>
        <el-form-item label="每码可用次数">
          <el-input-number v-model="generateForm.quantity" :min="1" :max="9999" />
          <span class="form-tip">次</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="generateDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="generateCodes" :loading="generating">生成</el-button>
      </template>
    </el-dialog>

    <!-- 生成结果对话框 -->
    <el-dialog v-model="resultDialogVisible" title="生成成功" width="500px">
      <div class="result-codes">
        <div v-for="code in generatedCodes" :key="code" class="code-item">
          {{ code }}
          <el-button type="primary" link size="small" @click="copyCode(code)">复制</el-button>
        </div>
      </div>
      <template #footer>
        <el-button @click="copyAllCodes">复制全部</el-button>
        <el-button type="primary" @click="resultDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/api/request'

const route = useRoute()
const couponId = ref(route.params.couponId)
const couponName = ref('')
const loading = ref(false)
const generating = ref(false)
const tableData = ref([])
const generateDialogVisible = ref(false)
const resultDialogVisible = ref(false)
const generatedCodes = ref([])

const pagination = reactive({ page: 1, size: 10, total: 0 })
const generateForm = reactive({ count: 1, quantity: 1 })

const loadData = async () => {
  loading.value = true
  try {
    const res = await request.get('/admin/coupon/code/list', {
      params: { couponId: couponId.value, page: pagination.page, size: pagination.size }
    })
    if (res.code === 200) {
      tableData.value = res.data.list || []
      pagination.total = res.data.total || 0
      if (tableData.value.length > 0) couponName.value = tableData.value[0].couponName
    }
  } catch (e) { ElMessage.error('加载失败') }
  finally { loading.value = false }
}

const showGenerateDialog = () => {
  generateForm.count = 1
  generateForm.quantity = 1
  generateDialogVisible.value = true
}

const generateCodes = async () => {
  generating.value = true
  try {
    const res = await request.post('/admin/coupon/code/generate', {
      couponId: couponId.value, count: generateForm.count, quantity: generateForm.quantity
    })
    if (res.code === 200) {
      generatedCodes.value = res.data || []
      generateDialogVisible.value = false
      resultDialogVisible.value = true
      loadData()
    } else { ElMessage.error(res.msg || '生成失败') }
  } catch (e) { ElMessage.error('生成失败') }
  finally { generating.value = false }
}

const toggleStatus = async (row) => {
  try {
    await request.post(`/admin/coupon/code/${row.id}/toggle-status`)
    ElMessage.success('状态更新成功')
  } catch (e) { ElMessage.error('更新失败') }
}

const deleteCode = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除该兑换码吗？', '确认删除', { type: 'warning' })
    await request.delete(`/admin/coupon/code/${row.id}`)
    ElMessage.success('删除成功')
    loadData()
  } catch (e) { if (e !== 'cancel') ElMessage.error('删除失败') }
}

const copyCode = (code) => {
  navigator.clipboard.writeText(code)
  ElMessage.success('已复制: ' + code)
}

const copyAllCodes = () => {
  navigator.clipboard.writeText(generatedCodes.value.join('\n'))
  ElMessage.success('已复制全部兑换码')
}

const formatDateTime = (str) => {
  if (!str) return ''
  const d = new Date(str)
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}

onMounted(() => { loadData() })
</script>

<style scoped>
.card-header { display: flex; justify-content: space-between; align-items: center; }
.form-tip { margin-left: 10px; color: #999; }
.el-pagination { margin-top: 20px; justify-content: flex-end; }
.result-codes { max-height: 300px; overflow-y: auto; }
.code-item { padding: 8px 12px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
</style>

