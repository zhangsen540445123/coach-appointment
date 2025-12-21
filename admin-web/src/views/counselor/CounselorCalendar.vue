<template>
  <div class="counselor-calendar">
    <el-card v-loading="loading">
      <template #header>
        <div class="header-row">
          <span>{{ t('scheduleManagement') }} - {{ counselorName }}</span>
          <el-button @click="$router.back()">{{ t('back') }}</el-button>
        </div>
      </template>

      <el-form :inline="true" style="margin-bottom: 20px">
        <el-form-item :label="t('selectDate')">
          <el-date-picker v-model="selectedDate" type="date" :placeholder="t('selectDate')" value-format="YYYY-MM-DD" @change="handleDateChange" />
        </el-form-item>
        <el-form-item :label="t('consultWay')">
          <el-select v-model="newSlot.consultWay" style="width: 120px">
            <el-option :value="1" :label="t('video')" />
            <el-option :value="2" :label="t('voice')" />
            <el-option :value="3" :label="t('offline')" />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('consultType')">
          <el-select v-model="newSlot.consultType" style="width: 120px">
            <el-option :value="4" :label="t('standard')" />
            <el-option :value="0" :label="t('video')" />
          </el-select>
        </el-form-item>
      </el-form>

      <div class="time-slots">
        <div class="time-slot-header">{{ t('availableTimes') }}</div>
        <div class="time-slot-grid">
          <div v-for="hour in timeSlots" :key="hour" 
               :class="['time-slot', isSlotSelected(hour) ? 'selected' : '']"
               @click="toggleSlot(hour)">
            {{ hour }}
          </div>
        </div>
      </div>

      <div style="margin-top: 20px">
        <el-button type="primary" @click="saveCalendar" :loading="saving">{{ t('save') }}</el-button>
      </div>

      <el-divider />

      <div class="existing-slots">
        <div class="slots-header">{{ t('existingSlots') }}</div>
        <el-table :data="existingSlots" style="margin-top: 10px">
          <el-table-column prop="date" :label="t('date')" width="120" />
          <el-table-column prop="startTime" :label="t('time')" width="100" />
          <el-table-column prop="consultWay" :label="t('consultWay')" width="100">
            <template #default="scope">
              {{ scope.row.consultWay === 1 ? t('video') : scope.row.consultWay === 2 ? t('voice') : t('offline') }}
            </template>
          </el-table-column>
          <el-table-column prop="status" :label="t('status')" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.status === 0 ? 'success' : 'danger'">
                {{ scope.row.status === 0 ? t('available') : t('booked') }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="t('actions')" width="100">
            <template #default="scope">
              <el-button type="danger" size="small" @click="deleteSlot(scope.row)">{{ t('delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { counselorApi } from '@/api/counselor'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const saving = ref(false)
const counselorId = route.params.id
const counselorName = ref('')
const selectedDate = ref('')
const existingSlots = ref([])
const selectedSlots = ref([])

const newSlot = reactive({ consultWay: 1, consultType: 4 })

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']

const translations = {
  zh: { scheduleManagement: '预约时间管理', back: '返回', selectDate: '选择日期', consultWay: '咨询方式', consultType: '咨询类型',
    video: '视频', voice: '语音', offline: '面询', standard: '标准咨询', availableTimes: '可选时间段（点击选择/取消）',
    save: '保存选中时间', existingSlots: '已设置的可预约时间', date: '日期', time: '时间', status: '状态',
    available: '可预约', booked: '已预约', actions: '操作', delete: '删除' },
  en: { scheduleManagement: 'Schedule Management', back: 'Back', selectDate: 'Select Date', consultWay: 'Consult Way', consultType: 'Consult Type',
    video: 'Video', voice: 'Voice', offline: 'Offline', standard: 'Standard', availableTimes: 'Available Times (Click to select/deselect)',
    save: 'Save Selected', existingSlots: 'Existing Slots', date: 'Date', time: 'Time', status: 'Status',
    available: 'Available', booked: 'Booked', actions: 'Actions', delete: 'Delete' }
}
const t = (key) => translations['zh'][key] || key

const isSlotSelected = (hour) => selectedSlots.value.includes(hour)

const toggleSlot = (hour) => {
  const index = selectedSlots.value.indexOf(hour)
  if (index > -1) selectedSlots.value.splice(index, 1)
  else selectedSlots.value.push(hour)
}

const loadCalendar = async () => {
  loading.value = true
  try {
    const res = await counselorApi.getCalendar(counselorId)
    if (res.code === 200) {
      existingSlots.value = res.data || []
      // 如果当前没有选择日期，但有已设置的时间，自动选择第一个日期
      if (!selectedDate.value && existingSlots.value.length > 0) {
        // 获取所有不重复的日期，按日期排序
        const dates = [...new Set(existingSlots.value.map(s => s.date))].sort()
        if (dates.length > 0) {
          selectedDate.value = dates[0]
        }
      }
      // 同步更新选中的时间段
      if (selectedDate.value) {
        selectedSlots.value = existingSlots.value
          .filter(s => s.date === selectedDate.value)
          .map(s => s.startTime)
      }
    }
  } finally { loading.value = false }
}

const loadCounselor = async () => {
  const res = await counselorApi.getById(counselorId)
  if (res.code === 200) counselorName.value = res.data?.name || ''
}

const handleDateChange = () => {
  selectedSlots.value = existingSlots.value
    .filter(s => s.date === selectedDate.value)
    .map(s => s.startTime)
}

const saveCalendar = async () => {
  if (!selectedDate.value) { ElMessage.warning('请先选择日期'); return }
  saving.value = true
  try {
    const slots = selectedSlots.value.map(time => ({
      date: selectedDate.value, startTime: time, consultWay: newSlot.consultWay, consultType: newSlot.consultType
    }))
    const res = await counselorApi.saveCalendar(counselorId, slots)
    if (res.code === 200) {
      ElMessage.success('保存成功')
      // 重新加载数据，loadCalendar 会自动同步 selectedSlots
      await loadCalendar()
    } else {
      ElMessage.error(res.msg || '保存失败')
    }
  } finally { saving.value = false }
}

const deleteSlot = async (row) => {
  try {
    const res = await counselorApi.deleteCalendarSlot(row.id)
    if (res.code === 200) {
      ElMessage.success('删除成功')
      // 重新加载数据，loadCalendar 会自动同步 selectedSlots
      await loadCalendar()
    }
  } catch (e) { ElMessage.error('删除失败') }
}

onMounted(() => { loadCounselor(); loadCalendar() })
</script>

<style scoped>
.header-row { display: flex; justify-content: space-between; align-items: center; }
.time-slots { background: #f5f7fa; padding: 16px; border-radius: 8px; }
.time-slot-header { font-weight: bold; margin-bottom: 12px; }
.time-slot-grid { display: flex; flex-wrap: wrap; gap: 10px; }
.time-slot { padding: 8px 16px; border: 1px solid #dcdfe6; border-radius: 4px; cursor: pointer; background: #fff; }
.time-slot:hover { border-color: #409eff; }
.time-slot.selected { background: #409eff; color: #fff; border-color: #409eff; }
</style>

