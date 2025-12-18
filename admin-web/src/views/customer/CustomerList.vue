<template>
  <div class="customer-list">
    <el-card>
      <div class="search-bar">
        <el-input v-model="queryParams.keyword" placeholder="搜索姓名/城市/职业" style="width: 300px" clearable @keyup.enter="handleSearch" />
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="age" label="年龄" width="60" />
        <el-table-column prop="sex" label="性别" width="60">
          <template #default="scope">{{ scope.row.sex === 1 ? '男' : '女' }}</template>
        </el-table-column>
        <el-table-column prop="otherCity" label="城市" width="120" />
        <el-table-column prop="otherCareer" label="职业" width="100" />
        <el-table-column prop="otherMarrage" label="情感状态" width="80" />
        <el-table-column prop="otherChildren" label="有无子女" width="80" />
        <el-table-column prop="otherIncome" label="教练目标" width="150" show-overflow-tooltip />
        <el-table-column prop="otherUm" label="成长会会员" width="90">
          <template #default="scope">
            <el-tag :type="scope.row.otherUm === 1 ? 'success' : 'info'">{{ scope.row.otherUm === 1 ? '是' : '否' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="consultOther" label="有过教练对话" width="100">
          <template #default="scope">{{ scope.row.consultOther === 1 ? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column prop="realizeChannel" label="来源渠道" width="120">
          <template #default="scope">{{ getChannelText(scope.row.realizeChannel) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next, total"
          :total="total" :page-size="queryParams.pageSize" v-model:current-page="queryParams.page" @current-change="fetchData" />
      </div>
    </el-card>

    <!-- 编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px">
      <el-form :model="form" label-width="130px">
        <el-divider content-position="left">客户信息（必填）</el-divider>
        <el-form-item label="真实姓名" required><el-input v-model="form.name" :disabled="isReadonly" /></el-form-item>
        <el-form-item label="年龄" required><el-input-number v-model="form.age" :min="1" :max="120" :disabled="isReadonly" /></el-form-item>
        <el-form-item label="性别" required>
          <el-radio-group v-model="form.sex" :disabled="isReadonly">
            <el-radio :value="1">男</el-radio>
            <el-radio :value="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-divider content-position="left">其他信息（非必填）</el-divider>
        <el-form-item label="现居城市"><el-input v-model="form.otherCity" :disabled="isReadonly" /></el-form-item>
        <el-form-item label="职业">
          <el-select v-model="form.otherCareer" placeholder="请选择" :disabled="isReadonly" clearable>
            <el-option v-for="item in careerOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="情感状态">
          <el-select v-model="form.otherMarrage" placeholder="请选择" :disabled="isReadonly" clearable>
            <el-option v-for="item in marriageOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="有无子女">
          <el-select v-model="form.otherChildren" placeholder="请选择" :disabled="isReadonly" clearable>
            <el-option v-for="item in childrenOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="教练目标"><el-input v-model="form.otherIncome" type="textarea" :rows="3" :disabled="isReadonly" /></el-form-item>
        <el-form-item label="成长会会员">
          <el-radio-group v-model="form.otherUm" :disabled="isReadonly">
            <el-radio :value="1">是</el-radio>
            <el-radio :value="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="有过教练对话">
          <el-radio-group v-model="form.consultOther" :disabled="isReadonly">
            <el-radio :value="1">是</el-radio>
            <el-radio :value="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="来源渠道">
          <el-select v-model="form.realizeChannel" placeholder="请选择" :disabled="isReadonly" clearable>
            <el-option v-for="item in channelOptions" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave" v-if="!isReadonly">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { customerApi } from '@/api/customer'
import { dictApi } from '@/api/dict'

const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const queryParams = reactive({ page: 1, pageSize: 10, keyword: '' })
const dialogVisible = ref(false)
const dialogTitle = ref('编辑客户信息')
const isReadonly = ref(false)

// 选项数据（从字典动态加载）
const careerOptions = ref([])
const marriageOptions = ref([])
const childrenOptions = ref([])
const channelOptions = ref([])

// 加载字典数据
const loadDictOptions = async () => {
  try {
    const res = await dictApi.getAllData()
    if (res.code === 0 && res.data) {
      careerOptions.value = res.data.career || []
      marriageOptions.value = res.data.marriage || []
      childrenOptions.value = res.data.children || []
      // 渠道需要转换格式
      const channels = res.data.channel || []
      channelOptions.value = channels.map((text, idx) => ({ value: idx + 1, text }))
    }
  } catch (e) {
    console.error('加载字典数据失败', e)
  }
}

const form = reactive({
  id: null, name: '', age: null, sex: 1, otherCity: '', otherCareer: '',
  otherMarrage: '', otherChildren: '', otherIncome: '', otherUm: 0,
  consultOther: 0, realizeChannel: null
})

const getChannelText = (value) => {
  const item = channelOptions.value.find(c => c.value === value)
  return item ? item.text : ''
}

const fetchData = async () => {
  loading.value = true
  try {
    const res = await customerApi.getList(queryParams)
    if (res.code === 200) { tableData.value = res.data.list; total.value = res.data.total }
  } finally { loading.value = false }
}

const handleSearch = () => { queryParams.page = 1; fetchData() }

const handleEdit = (row) => {
  dialogTitle.value = '编辑客户信息'; isReadonly.value = false
  Object.assign(form, row)
  dialogVisible.value = true
}

const handleSave = async () => {
  if (!form.name) { ElMessage.warning('请输入真实姓名'); return }
  if (!form.age) { ElMessage.warning('请输入年龄'); return }
  if (form.sex === null) { ElMessage.warning('请选择性别'); return }
  try {
    const res = await customerApi.update(form.id, form)
    if (res.code === 200) { ElMessage.success('保存成功'); dialogVisible.value = false; fetchData() }
    else { ElMessage.error(res.msg || '保存失败') }
  } catch (e) { ElMessage.error('保存失败') }
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除该客户信息吗？', '提示', { type: 'warning' })
    const res = await customerApi.delete(row.id)
    if (res.code === 200) { ElMessage.success('删除成功'); fetchData() }
    else { ElMessage.error(res.msg || '删除失败') }
  } catch (e) { if (e !== 'cancel') ElMessage.error('删除失败') }
}

onMounted(() => {
  loadDictOptions()
  fetchData()
})
</script>

<style scoped>
.customer-list { padding: 20px; }
.search-bar { margin-bottom: 20px; display: flex; gap: 10px; }
.pagination { margin-top: 20px; display: flex; justify-content: flex-end; }
</style>

