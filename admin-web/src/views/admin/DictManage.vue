<template>
  <div class="dict-manage">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>基础数据管理</span>
          <el-button type="primary" @click="showAddTypeDialog">新增字典类型</el-button>
        </div>
      </template>

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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { dictApi } from '@/api/dict'

const dictTypes = ref([])
const selectedType = ref(null)
const dictItems = ref([])

const typeDialogVisible = ref(false)
const typeDialogTitle = ref('新增字典类型')
const typeForm = ref({ code: '', name: '', sortOrder: 0, enabled: 1 })

const itemDialogVisible = ref(false)
const itemDialogTitle = ref('新增选项')
const itemForm = ref({ typeId: 0, label: '', value: '', sortOrder: 0, enabled: 1 })

onMounted(() => { loadTypes() })

async function loadTypes() {
  const res = await dictApi.getAllTypes()
  if (res.code === 0) dictTypes.value = res.data || []
}

async function selectType(type) {
  selectedType.value = type
  const res = await dictApi.getItemsByTypeId(type.id)
  if (res.code === 0) dictItems.value = res.data || []
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
  if (res.code === 0) {
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
  if (res.code === 0) {
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
  if (res.code === 0) {
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
  if (res.code === 0) {
    ElMessage.success('删除成功')
    selectType(selectedType.value)
  } else {
    ElMessage.error(res.message || '删除失败')
  }
}
</script>

<style scoped>
.dict-manage { padding: 20px; }
.card-header { display: flex; justify-content: space-between; align-items: center; }
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

