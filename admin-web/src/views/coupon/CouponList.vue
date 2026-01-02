<template>
  <div class="coupon-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>优惠券管理</span>
          <el-button type="primary" @click="showAddDialog">
            <el-icon><Plus /></el-icon> 新增优惠券
          </el-button>
        </div>
      </template>

      <!-- 搜索栏 -->
      <el-form :inline="true" class="search-form">
        <el-form-item label="关键词">
          <el-input v-model="searchParams.keyword" placeholder="优惠券名称" clearable />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="searchParams.type" placeholder="全部" clearable>
            <el-option label="满减券" :value="1" />
            <el-option label="抵扣券" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchParams.status" placeholder="全部" clearable>
            <el-option label="启用" :value="1" />
            <el-option label="停用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadData">搜索</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="name" label="优惠券名称" width="180" />
        <el-table-column label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.type === 1 ? 'warning' : 'success'">
              {{ row.type === 1 ? '满减券' : '抵扣券' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="优惠内容" width="150">
          <template #default="{ row }">
            {{ row.type === 1 ? `满${row.minAmount}减${row.discountAmount}` : `立减${row.discountAmount}元` }}
          </template>
        </el-table-column>
        <el-table-column label="适用范围" width="120">
          <template #default="{ row }">
            {{ row.coachScope === 1 ? '全部教练' : '指定教练' }}
          </template>
        </el-table-column>
        <el-table-column label="有效期" width="200">
          <template #default="{ row }">
            <span v-if="row.startTime && row.endTime">
              {{ formatDate(row.startTime) }} ~ {{ formatDate(row.endTime) }}
            </span>
            <span v-else>永久有效</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-switch v-model="row.status" :active-value="1" :inactive-value="0"
              @change="toggleStatus(row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="320">
          <template #default="{ row }">
            <el-button type="primary" link @click="editCoupon(row)">编辑</el-button>
            <el-button type="success" link @click="showPushDialog(row)">推送</el-button>
            <el-button type="warning" link @click="showCodeDialog(row)">兑换码</el-button>
            <el-button type="info" link @click="viewDistribution(row)">发放记录</el-button>
            <el-button type="danger" link @click="deleteCoupon(row)">删除</el-button>
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

    <!-- 新增/编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="editingId ? '编辑优惠券' : '新增优惠券'" width="600px" class="coupon-dialog">
      <el-form :model="formData" :rules="formRules" ref="formRef" label-width="100px">
        <el-form-item label="优惠券名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入优惠券名称" />
        </el-form-item>
        <el-form-item label="优惠类型" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio :value="1">满减券</el-radio>
            <el-radio :value="2">抵扣券</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="满减门槛" prop="minAmount" v-if="formData.type === 1">
          <el-input-number v-model="formData.minAmount" :min="0" :precision="2" />
          <span class="form-tip">元</span>
        </el-form-item>
        <el-form-item label="优惠金额" prop="discountAmount">
          <el-input-number v-model="formData.discountAmount" :min="0" :precision="2" />
          <span class="form-tip">元</span>
        </el-form-item>
        <el-form-item label="适用范围" prop="coachScope">
          <el-radio-group v-model="formData.coachScope">
            <el-radio :value="1">全部教练</el-radio>
            <el-radio :value="2">指定教练</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择教练" v-if="formData.coachScope === 2">
          <el-select v-model="formData.coachIds" multiple placeholder="请选择教练" style="width: 100%">
            <el-option v-for="coach in coachList" :key="coach.id" :label="coach.name" :value="coach.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="有效期" class="date-range-item">
          <el-date-picker v-model="formData.dateRange" type="datetimerange"
            start-placeholder="开始时间" end-placeholder="结束时间"
            :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
            popper-class="coupon-date-picker" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveCoupon" :loading="saving"
          :disabled="formData.type === 1 && formData.discountAmount > formData.minAmount">保存</el-button>
      </template>
    </el-dialog>

    <!-- 推送对话框 -->
    <el-dialog v-model="pushDialogVisible" title="推送优惠券" width="500px">
      <el-form :model="pushForm" label-width="100px">
        <el-form-item label="推送方式">
          <el-radio-group v-model="pushForm.pushType">
            <el-radio value="all">全员推送</el-radio>
            <el-radio value="tag">按标签推送</el-radio>
            <el-radio value="users">指定用户</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户标签" v-if="pushForm.pushType === 'tag'">
          <el-select v-model="pushForm.userTag" placeholder="请选择用户标签" style="width: 100%">
            <el-option label="全部用户" value="" />
            <el-option v-for="tag in userTags" :key="tag" :label="tag" :value="tag" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择用户" v-if="pushForm.pushType === 'users'">
          <el-select
            v-model="pushForm.selectedUserIds"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入手机号或姓名搜索用户"
            :remote-method="searchUsers"
            :loading="searchingUsers"
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="user in userOptions"
              :key="user.id"
              :label="`${user.name} (${user.phone})`"
              :value="user.id"
            />
          </el-select>
          <div v-if="pushForm.selectedUserIds.length > 0" style="margin-top: 8px; color: #909399; font-size: 12px;">
            已选择 {{ pushForm.selectedUserIds.length }} 位用户
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="pushDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="pushCoupon" :loading="pushing">推送</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/api/request'

const router = useRouter()
const loading = ref(false)
const saving = ref(false)
const pushing = ref(false)
const searchingUsers = ref(false)
const tableData = ref([])
const coachList = ref([])
const userTags = ref([])
const userOptions = ref([])
const dialogVisible = ref(false)
const pushDialogVisible = ref(false)
const editingId = ref(null)
const formRef = ref(null)
const currentCoupon = ref(null)

const searchParams = reactive({ keyword: '', type: null, status: null })
const pagination = reactive({ page: 1, size: 10, total: 0 })

const formData = reactive({
  name: '', type: 1, discountAmount: 0, minAmount: 0,
  coachScope: 1, coachIds: [], dateRange: null
})

// 自定义校验：满减券时优惠金额不能超过满减门槛
const validateDiscountAmount = (rule, value, callback) => {
  if (formData.type === 1 && value > formData.minAmount) {
    callback(new Error('优惠金额不能超过满减门槛'))
  } else {
    callback()
  }
}

const formRules = {
  name: [{ required: true, message: '请输入优惠券名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择优惠类型', trigger: 'change' }],
  discountAmount: [
    { required: true, message: '请输入优惠金额', trigger: 'blur' },
    { validator: validateDiscountAmount, trigger: 'blur' }
  ],
  minAmount: [
    { validator: validateDiscountAmount, trigger: 'blur' }
  ]
}

const pushForm = reactive({ pushType: 'users', selectedUserIds: [], userTag: '' })

const loadData = async () => {
  loading.value = true
  try {
    const res = await request.get('/admin/coupon/list', {
      params: { ...searchParams, page: pagination.page, size: pagination.size }
    })
    if (res.code === 200) {
      tableData.value = res.data.list || []
      pagination.total = res.data.total || 0
    }
  } catch (e) {
    ElMessage.error('加载失败')
  } finally {
    loading.value = false
  }
}

const loadCoaches = async () => {
  try {
    const res = await request.get('/admin/coupon/coaches')
    console.log('Load coaches response:', res)
    if (res.code === 200) {
      coachList.value = res.data || []
      console.log('Loaded coaches:', coachList.value.length)
    } else {
      console.error('Failed to load coaches:', res)
      ElMessage.error(res.msg || '加载教练列表失败')
    }
  } catch (e) {
    console.error('Error loading coaches:', e)
    ElMessage.error('加载教练列表失败')
  }
}

const loadUserTags = async () => {
  try {
    const res = await request.get('/admin/coupon/user-tags')
    if (res.code === 200) {
      userTags.value = res.data || []
    } else {
      ElMessage.error(res.msg || '加载用户标签失败')
    }
  } catch (e) {
    console.error('Error loading user tags:', e)
    ElMessage.error('加载用户标签失败')
  }
}

const searchUsers = async (query) => {
  if (query === '') {
    // 如果搜索关键词为空，加载默认用户列表
    searchingUsers.value = true
    try {
      const res = await request.get('/admin/coupon/search-users')
      if (res.code === 200) {
        userOptions.value = res.data || []
      }
    } catch (e) {
      console.error('Error loading users:', e)
    } finally {
      searchingUsers.value = false
    }
    return
  }

  // 搜索用户
  searchingUsers.value = true
  try {
    const res = await request.get('/admin/coupon/search-users', {
      params: { keyword: query }
    })
    if (res.code === 200) {
      userOptions.value = res.data || []
    } else {
      ElMessage.error(res.msg || '搜索用户失败')
    }
  } catch (e) {
    console.error('Error searching users:', e)
    ElMessage.error('搜索用户失败')
  } finally {
    searchingUsers.value = false
  }
}

const showAddDialog = async () => {
  editingId.value = null
  Object.assign(formData, { name: '', type: 1, discountAmount: 0, minAmount: 0, coachScope: 1, coachIds: [], dateRange: null })
  // 打开对话框前加载教练列表
  await loadCoaches()
  dialogVisible.value = true
}

const editCoupon = async (row) => {
  editingId.value = row.id
  Object.assign(formData, {
    name: row.name, type: row.type, discountAmount: row.discountAmount,
    minAmount: row.minAmount, coachScope: row.coachScope,
    coachIds: row.coachIds ? JSON.parse(row.coachIds) : [],
    dateRange: row.startTime && row.endTime ? [new Date(row.startTime), new Date(row.endTime)] : null
  })
  // 打开对话框前加载教练列表
  await loadCoaches()
  dialogVisible.value = true
}

const saveCoupon = async () => {
  try {
    await formRef.value.validate()

    // 额外校验：满减券时优惠金额不能超过满减门槛
    if (formData.type === 1 && formData.discountAmount > formData.minAmount) {
      ElMessage.warning('优惠金额不能超过满减门槛')
      return
    }

    saving.value = true
    const data = {
      id: editingId.value, name: formData.name, type: formData.type,
      discountAmount: formData.discountAmount, minAmount: formData.type === 1 ? formData.minAmount : 0,
      coachScope: formData.coachScope, coachIds: formData.coachScope === 2 ? formData.coachIds : [],
      startTime: formData.dateRange?.[0], endTime: formData.dateRange?.[1], status: 1
    }
    console.log('Saving coupon data:', data)
    const res = await request.post('/admin/coupon/save', data)
    console.log('Save coupon response:', res)
    if (res.code === 200) {
      ElMessage.success('保存成功')
      dialogVisible.value = false
      loadData()
    } else {
      ElMessage.error(res.msg || '保存失败')
    }
  } catch (e) {
    console.error('Error saving coupon:', e)
  }
  finally { saving.value = false }
}

const toggleStatus = async (row) => {
  try {
    await request.post(`/admin/coupon/${row.id}/toggle-status`)
    ElMessage.success('状态更新成功')
  } catch (e) { ElMessage.error('更新失败') }
}

const deleteCoupon = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除该优惠券吗？', '确认删除', { type: 'warning' })
    await request.delete(`/admin/coupon/${row.id}`)
    ElMessage.success('删除成功')
    loadData()
  } catch (e) { if (e !== 'cancel') ElMessage.error('删除失败') }
}

const showPushDialog = async (row) => {
  currentCoupon.value = row
  pushForm.pushType = 'users'
  pushForm.selectedUserIds = []
  pushForm.userTag = ''
  userOptions.value = []
  pushDialogVisible.value = true
  // 加载用户标签列表
  await loadUserTags()
  // 加载默认用户列表
  await searchUsers('')
}

const pushCoupon = async () => {
  // 验证：如果是指定用户推送，必须选择至少一个用户
  if (pushForm.pushType === 'users' && pushForm.selectedUserIds.length === 0) {
    ElMessage.warning('请至少选择一个用户')
    return
  }

  // 验证：如果是按标签推送，必须选择标签
  if (pushForm.pushType === 'tag' && !pushForm.userTag) {
    ElMessage.warning('请选择用户标签')
    return
  }

  pushing.value = true
  try {
    const payload = {
      couponId: currentCoupon.value.id,
      pushType: pushForm.pushType,
      userIds: pushForm.pushType === 'users' ? pushForm.selectedUserIds : []
    }
    // 如果是按标签推送，添加userTag参数
    if (pushForm.pushType === 'tag') {
      payload.userTag = pushForm.userTag
    }
    const res = await request.post('/admin/coupon/push', payload)
    if (res.code === 200) {
      ElMessage.success(res.data || '推送成功')
      pushDialogVisible.value = false
    } else {
      ElMessage.error(res.msg || '推送失败')
    }
  } catch (e) { ElMessage.error('推送失败') }
  finally { pushing.value = false }
}

const showCodeDialog = (row) => {
  router.push(`/coupon/code/${row.id}`)
}

const viewDistribution = (row) => {
  router.push(`/coupon/distribution/${row.id}`)
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

onMounted(() => { loadData(); loadCoaches() })
</script>

<style scoped>
.card-header { display: flex; justify-content: space-between; align-items: center; }
.search-form { margin-bottom: 20px; }
.form-tip { margin-left: 10px; color: #999; }
.el-pagination { margin-top: 20px; justify-content: flex-end; }

/* 优化对话框样式 */
.coupon-dialog :deep(.el-dialog__body) {
  max-height: 65vh;
  overflow-y: auto;
  padding-bottom: 20px;
}

.coupon-dialog :deep(.el-date-editor) {
  width: 100%;
}

/* 优化有效期表单项的布局 */
.date-range-item :deep(.el-form-item__content) {
  line-height: normal;
}
</style>

<style>
/* 全局样式：优化时间选择器弹出框的位置 */
.coupon-date-picker {
  margin-top: 5px !important;
}

.coupon-date-picker .el-picker-panel__body {
  margin-bottom: 10px;
}

.coupon-date-picker .el-picker-panel__footer {
  padding: 8px 12px;
  background-color: #fff;
  border-top: 1px solid #e4e7ed;
}
</style>

