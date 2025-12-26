<template>
  <div class="dict-manage">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>基础数据管理</span>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <!-- 字典管理 Tab -->
        <el-tab-pane label="字典管理" name="dict">
          <div class="tab-header">
            <el-button type="primary" @click="showAddTypeDialog">新增字典类型</el-button>
          </div>
          <el-row :gutter="20">
            <!-- 左侧：字典类型列表 -->
            <el-col :span="8">
              <div class="type-list">
                <div v-for="type in dictTypes" :key="type.id"
                  :class="['type-item', { active: selectedType?.id === type.id }]"
                  @click="selectType(type)">
                  <div class="type-info">
                    <span class="type-name">{{ type.name }}</span>
                    <span class="type-code">{{ type.code }}</span>
                  </div>
                  <div class="type-actions">
                    <el-button link type="primary" size="small" @click.stop="editType(type)">编辑</el-button>
                    <el-button link type="danger" size="small" @click.stop="deleteType(type)">删除</el-button>
                  </div>
                </div>
              </div>
            </el-col>

            <!-- 右侧：字典项列表 -->
            <el-col :span="16">
              <div v-if="selectedType" class="item-list">
                <div class="item-header">
                  <span>{{ selectedType.name }} - 选项列表</span>
                  <el-button type="primary" size="small" @click="showAddItemDialog">新增选项</el-button>
                </div>
                <el-table :data="dictItems" border stripe>
                  <el-table-column prop="label" label="显示标签" />
                  <el-table-column prop="value" label="值" width="150" />
                  <el-table-column prop="sortOrder" label="排序" width="80" />
                  <el-table-column prop="enabled" label="状态" width="80">
                    <template #default="{ row }">
                      <el-tag :type="row.enabled === 1 ? 'success' : 'danger'">
                        {{ row.enabled === 1 ? '启用' : '禁用' }}
                      </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="150">
                    <template #default="{ row }">
                      <el-button link type="primary" size="small" @click="editItem(row)">编辑</el-button>
                      <el-button link type="danger" size="small" @click="deleteItem(row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-else class="no-selection">
                <el-empty description="请选择左侧的字典类型" />
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- 话题方向 Tab -->
        <el-tab-pane label="话题方向" name="topic">
          <div class="tab-header">
            <el-button type="primary" @click="showAddTopicDialog">新增话题方向</el-button>
          </div>
          <el-table :data="topicDirections" border stripe v-loading="topicLoading">
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="value" label="值" width="150">
              <template #default="{ row }">
                {{ row.value || '（全部）' }}
              </template>
            </el-table-column>
            <el-table-column prop="iconUrl" label="图标" width="100">
              <template #default="{ row }">
                <el-image v-if="row.iconUrl" :src="row.iconUrl" style="width: 32px; height: 32px" fit="contain" />
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column prop="sortOrder" label="排序" width="80" />
            <el-table-column prop="enabled" label="状态" width="80">
              <template #default="{ row }">
                <el-tag :type="row.enabled === 1 ? 'success' : 'danger'">
                  {{ row.enabled === 1 ? '启用' : '禁用' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template #default="{ row }">
                <el-button link type="primary" size="small" @click="editTopic(row)">编辑</el-button>
                <el-button link type="danger" size="small" @click="deleteTopic(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- 排序选项 Tab -->
        <el-tab-pane label="排序选项" name="sort">
          <div class="tab-header">
            <el-button type="primary" @click="showAddSortDialog">新增排序选项</el-button>
          </div>
          <el-table :data="sortOptions" border stripe v-loading="sortLoading">
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="value" label="值" width="100" />
            <el-table-column prop="sortOrder" label="排序" width="80" />
            <el-table-column prop="enabled" label="状态" width="80">
              <template #default="{ row }">
                <el-tag :type="row.enabled === 1 ? 'success' : 'danger'">
                  {{ row.enabled === 1 ? '启用' : '禁用' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template #default="{ row }">
                <el-button link type="primary" size="small" @click="editSort(row)">编辑</el-button>
                <el-button link type="danger" size="small" @click="deleteSort(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 字典类型对话框 -->
    <el-dialog v-model="typeDialogVisible" :title="typeDialogTitle" width="500px">
      <el-form :model="typeForm" label-width="100px">
        <el-form-item label="类型编码" required>
          <el-input v-model="typeForm.code" :disabled="!!typeForm.id" placeholder="如: qualification" />
        </el-form-item>
        <el-form-item label="类型名称" required>
          <el-input v-model="typeForm.name" placeholder="如: 资质认证" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="typeForm.description" type="textarea" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="typeForm.sortOrder" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="typeForm.enabled" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="typeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveType">保存</el-button>
      </template>
    </el-dialog>

    <!-- 字典项对话框 -->
    <el-dialog v-model="itemDialogVisible" :title="itemDialogTitle" width="500px">
      <el-form :model="itemForm" label-width="100px">
        <el-form-item label="显示标签" required>
          <el-input v-model="itemForm.label" placeholder="下拉框中显示的文字" />
        </el-form-item>
        <el-form-item label="值">
          <el-input v-model="itemForm.value" placeholder="存储的值（可选）" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="itemForm.sortOrder" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="itemForm.enabled" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="itemDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveItem">保存</el-button>
      </template>
    </el-dialog>

    <!-- 话题方向对话框 -->
    <el-dialog v-model="topicDialogVisible" :title="topicDialogTitle" width="500px">
      <el-form :model="topicForm" label-width="100px">
        <el-form-item label="名称" required>
          <el-input v-model="topicForm.name" placeholder="如：身心健康、人际关系" />
        </el-form-item>
        <el-form-item label="值">
          <el-input v-model="topicForm.value" placeholder="存储的值（留空表示'全部'）" />
        </el-form-item>
        <el-form-item label="图标URL">
          <el-input v-model="topicForm.iconUrl" placeholder="图标图片地址" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="topicForm.sortOrder" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="topicForm.enabled" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="topicDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveTopic">保存</el-button>
      </template>
    </el-dialog>

    <!-- 排序选项对话框 -->
    <el-dialog v-model="sortDialogVisible" :title="sortDialogTitle" width="500px">
      <el-form :model="sortForm" label-width="100px">
        <el-form-item label="名称" required>
          <el-input v-model="sortForm.name" placeholder="如：推荐排序、低价优先" />
        </el-form-item>
        <el-form-item label="值" required>
          <el-input-number v-model="sortForm.value" :min="0" placeholder="选项值（0=推荐, 1=低价, 2=高价, 3=近期可约）" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="sortForm.sortOrder" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="sortForm.enabled" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="sortDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveSort">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { dictApi } from '@/api/dict'
import { filterConfigApi } from '@/api/filterConfig'

// Tab 控制
const activeTab = ref('dict')

// 字典管理相关
const dictTypes = ref([])
const selectedType = ref(null)
const dictItems = ref([])

const typeDialogVisible = ref(false)
const typeDialogTitle = ref('新增字典类型')
const typeForm = ref({ code: '', name: '', sortOrder: 0, enabled: 1 })

const itemDialogVisible = ref(false)
const itemDialogTitle = ref('新增选项')
const itemForm = ref({ typeId: 0, label: '', value: '', sortOrder: 0, enabled: 1 })

// 话题方向相关
const topicDirections = ref([])
const topicLoading = ref(false)
const topicDialogVisible = ref(false)
const topicDialogTitle = ref('新增话题方向')
const topicForm = ref({ name: '', value: '', iconUrl: '', sortOrder: 0, enabled: 1 })

// 排序选项相关
const sortOptions = ref([])
const sortLoading = ref(false)
const sortDialogVisible = ref(false)
const sortDialogTitle = ref('新增排序选项')
const sortForm = ref({ name: '', value: 0, sortOrder: 0, enabled: 1 })

onMounted(() => { loadTypes() })

// 切换Tab时加载数据
watch(activeTab, (newVal) => {
  if (newVal === 'topic' && topicDirections.value.length === 0) {
    loadTopicDirections()
  }
  if (newVal === 'sort' && sortOptions.value.length === 0) {
    loadSortOptions()
  }
})

async function loadTypes() {
  const res = await dictApi.getAllTypes()
  if (res.code === 200) dictTypes.value = res.data || []
}

async function selectType(type) {
  selectedType.value = type
  const res = await dictApi.getItemsByTypeId(type.id)
  if (res.code === 200) dictItems.value = res.data || []
}

function showAddTypeDialog() {
  typeForm.value = { code: '', name: '', sortOrder: 0, enabled: 1 }
  typeDialogTitle.value = '新增字典类型'
  typeDialogVisible.value = true
}

function editType(type) {
  typeForm.value = { ...type }
  typeDialogTitle.value = '编辑字典类型'
  typeDialogVisible.value = true
}

async function saveType() {
  if (!typeForm.value.code || !typeForm.value.name) {
    ElMessage.warning('请填写类型编码和名称')
    return
  }
  const res = typeForm.value.id
    ? await dictApi.updateType(typeForm.value.id, typeForm.value)
    : await dictApi.createType(typeForm.value)
  if (res.code === 200) {
    ElMessage.success('保存成功')
    typeDialogVisible.value = false
    loadTypes()
  } else {
    ElMessage.error(res.message || '保存失败')
  }
}

async function deleteType(type) {
  await ElMessageBox.confirm(`确定删除字典类型"${type.name}"及其所有选项吗？`, '确认删除', { type: 'warning' })
  const res = await dictApi.deleteType(type.id)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    if (selectedType.value?.id === type.id) {
      selectedType.value = null
      dictItems.value = []
    }
    loadTypes()
  } else {
    ElMessage.error(res.message || '删除失败')
  }
}

function showAddItemDialog() {
  itemForm.value = { typeId: selectedType.value.id, label: '', value: '', sortOrder: 0, enabled: 1 }
  itemDialogTitle.value = '新增选项'
  itemDialogVisible.value = true
}

function editItem(item) {
  itemForm.value = { ...item }
  itemDialogTitle.value = '编辑选项'
  itemDialogVisible.value = true
}

async function saveItem() {
  if (!itemForm.value.label) {
    ElMessage.warning('请填写显示标签')
    return
  }
  const res = itemForm.value.id
    ? await dictApi.updateItem(itemForm.value.id, itemForm.value)
    : await dictApi.createItem(itemForm.value)
  if (res.code === 200) {
    ElMessage.success('保存成功')
    itemDialogVisible.value = false
    selectType(selectedType.value)
  } else {
    ElMessage.error(res.message || '保存失败')
  }
}

async function deleteItem(item) {
  await ElMessageBox.confirm(`确定删除选项"${item.label}"吗？`, '确认删除', { type: 'warning' })
  const res = await dictApi.deleteItem(item.id)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    selectType(selectedType.value)
  } else {
    ElMessage.error(res.message || '删除失败')
  }
}

// ==================== 话题方向管理 ====================

async function loadTopicDirections() {
  topicLoading.value = true
  try {
    const res = await filterConfigApi.getTopicDirectionList({ pageSize: 100 })
    if (res.code === 200) {
      topicDirections.value = res.data?.list || []
    }
  } catch (e) {
    ElMessage.error('加载话题方向失败')
  } finally {
    topicLoading.value = false
  }
}

function showAddTopicDialog() {
  topicForm.value = { name: '', value: '', iconUrl: '', sortOrder: 0, enabled: 1 }
  topicDialogTitle.value = '新增话题方向'
  topicDialogVisible.value = true
}

function editTopic(topic) {
  topicForm.value = { ...topic }
  topicDialogTitle.value = '编辑话题方向'
  topicDialogVisible.value = true
}

async function saveTopic() {
  if (!topicForm.value.name) {
    ElMessage.warning('请填写名称')
    return
  }
  try {
    const res = topicForm.value.id
      ? await filterConfigApi.updateTopicDirection(topicForm.value.id, topicForm.value)
      : await filterConfigApi.createTopicDirection(topicForm.value)
    if (res.code === 200) {
      ElMessage.success('保存成功')
      topicDialogVisible.value = false
      loadTopicDirections()
    } else {
      ElMessage.error(res.message || '保存失败')
    }
  } catch (e) {
    ElMessage.error('保存失败')
  }
}

async function deleteTopic(topic) {
  try {
    await ElMessageBox.confirm(`确定删除话题方向"${topic.name}"吗？`, '确认删除', { type: 'warning' })
    const res = await filterConfigApi.deleteTopicDirection(topic.id)
    if (res.code === 200) {
      ElMessage.success('删除成功')
      loadTopicDirections()
    } else {
      ElMessage.error(res.message || '删除失败')
    }
  } catch (e) {
    if (e !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

// ==================== 排序选项管理 ====================

async function loadSortOptions() {
  sortLoading.value = true
  try {
    const res = await filterConfigApi.getSortOptionList({ pageSize: 100 })
    if (res.code === 200) {
      sortOptions.value = res.data?.list || []
    }
  } catch (e) {
    ElMessage.error('加载排序选项失败')
  } finally {
    sortLoading.value = false
  }
}

function showAddSortDialog() {
  sortForm.value = { name: '', value: 0, sortOrder: 0, enabled: 1 }
  sortDialogTitle.value = '新增排序选项'
  sortDialogVisible.value = true
}

function editSort(sort) {
  sortForm.value = { ...sort }
  sortDialogTitle.value = '编辑排序选项'
  sortDialogVisible.value = true
}

async function saveSort() {
  if (!sortForm.value.name) {
    ElMessage.warning('请填写名称')
    return
  }
  if (sortForm.value.value === null || sortForm.value.value === undefined) {
    ElMessage.warning('请填写值')
    return
  }
  try {
    const res = sortForm.value.id
      ? await filterConfigApi.updateSortOption(sortForm.value.id, sortForm.value)
      : await filterConfigApi.createSortOption(sortForm.value)
    if (res.code === 200) {
      ElMessage.success('保存成功')
      sortDialogVisible.value = false
      loadSortOptions()
    } else {
      ElMessage.error(res.message || '保存失败')
    }
  } catch (e) {
    ElMessage.error('保存失败')
  }
}

async function deleteSort(sort) {
  try {
    await ElMessageBox.confirm(`确定删除排序选项"${sort.name}"吗？`, '确认删除', { type: 'warning' })
    const res = await filterConfigApi.deleteSortOption(sort.id)
    if (res.code === 200) {
      ElMessage.success('删除成功')
      loadSortOptions()
    } else {
      ElMessage.error(res.message || '删除失败')
    }
  } catch (e) {
    if (e !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}
</script>

<style scoped>
.dict-manage { padding: 20px; }
.card-header { display: flex; justify-content: space-between; align-items: center; }
.tab-header { display: flex; justify-content: flex-end; margin-bottom: 16px; }
.type-list { border: 1px solid #ebeef5; border-radius: 4px; max-height: 500px; overflow-y: auto; }
.type-item { padding: 12px 16px; border-bottom: 1px solid #ebeef5; cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
.type-item:hover { background-color: #f5f7fa; }
.type-item.active { background-color: #ecf5ff; border-left: 3px solid #409eff; }
.type-info { display: flex; flex-direction: column; }
.type-name { font-weight: 500; }
.type-code { font-size: 12px; color: #909399; }
.item-list { border: 1px solid #ebeef5; border-radius: 4px; padding: 16px; }
.item-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; font-weight: 500; }
.no-selection { display: flex; justify-content: center; align-items: center; height: 300px; }
</style>

