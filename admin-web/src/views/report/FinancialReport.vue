<template>
  <div class="financial-report">
    <!-- 筛选条件 -->
    <el-card class="filter-card">
      <el-form :inline="true">
        <el-form-item label="日期范围">
          <el-date-picker v-model="dateRange" type="daterange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="统计维度">
          <el-select v-model="dimension" style="width: 120px">
            <el-option label="按日" value="day" />
            <el-option label="按周" value="week" />
            <el-option label="按月" value="month" />
            <el-option label="按年" value="year" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadData">查询</el-button>
          <el-button @click="exportData">导出Excel</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 汇总卡片 -->
    <el-row :gutter="16" class="summary-row">
      <el-col :span="4">
        <el-card class="stat-card revenue">
          <div class="label">总收入</div>
          <div class="value">¥{{ formatMoney(summary.totalRevenue) }}</div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="stat-card">
          <div class="label">净收入</div>
          <div class="value">¥{{ formatMoney(summary.netRevenue) }}</div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="stat-card">
          <div class="label">退款金额</div>
          <div class="value refund">¥{{ formatMoney(summary.refundAmount) }}</div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="stat-card">
          <div class="label">订单总数</div>
          <div class="value">{{ summary.totalOrders || 0 }}</div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="stat-card">
          <div class="label">已完成订单</div>
          <div class="value success">{{ summary.completedOrders || 0 }}</div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="stat-card">
          <div class="label">平均单价</div>
          <div class="value">¥{{ formatMoney(summary.avgOrderAmount) }}</div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="16">
      <el-col :span="16">
        <el-card>
          <template #header>收入趋势</template>
          <div ref="revenueChartRef" style="height: 350px"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>咨询方式分布</template>
          <div ref="consultWayChartRef" style="height: 350px"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 教练收入排行 -->
    <el-card style="margin-top: 16px">
      <template #header>教练收入排行 TOP 10</template>
      <el-table :data="counselorRank" size="small">
        <el-table-column type="index" label="排名" width="60" />
        <el-table-column label="教练" width="200">
          <template #default="{ row }">
            <div style="display: flex; align-items: center;">
              <el-avatar :src="row.headUrl" :size="32" style="margin-right: 8px" />
              {{ row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="orderCount" label="订单数" width="100" />
        <el-table-column label="收入">
          <template #default="{ row }">¥{{ formatMoney(row.revenue) }}</template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { reportApi } from '@/api/report'
import * as echarts from 'echarts'

const dateRange = ref([])
const dimension = ref('day')
const summary = ref({})
const counselorRank = ref([])
const revenueChartRef = ref(null)
const consultWayChartRef = ref(null)
let revenueChart = null
let consultWayChart = null
let revenueTrendData = []

// 设置默认日期范围(最近30天)
const initDateRange = () => {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - 30)
  dateRange.value = [start.toISOString().split('T')[0], end.toISOString().split('T')[0]]
}

const formatMoney = (val) => {
  if (!val) return '0.00'
  return Number(val).toFixed(2)
}

const loadData = async () => {
  try {
    const params = { dimension: dimension.value }
    if (dateRange.value?.length === 2) {
      params.startDate = dateRange.value[0]
      params.endDate = dateRange.value[1]
    }
    console.log('Loading financial report with params:', params)
    const res = await reportApi.getFinancialReport(params)
    console.log('Financial report response:', res)
    if (res.code === 0 || res.code === 200) {
      summary.value = res.data?.summary || {}
      counselorRank.value = res.data?.counselorRank || []
      revenueTrendData = res.data?.revenueTrend || []
      renderRevenueChart(revenueTrendData)
      renderConsultWayChart(res.data?.consultWayDistribution || [])
    } else {
      ElMessage.error(res.msg || '加载失败')
    }
  } catch (e) {
    console.error('Load financial report failed', e)
    ElMessage.error('加载失败')
  }
}

const renderRevenueChart = (data) => {
  if (!revenueChart) {
    revenueChart = echarts.init(revenueChartRef.value)
  }
  const option = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['收入', '订单数'] },
    xAxis: { type: 'category', data: data.map(d => d.period) },
    yAxis: [{ type: 'value', name: '金额(元)' }, { type: 'value', name: '订单数' }],
    series: [
      { name: '收入', type: 'bar', data: data.map(d => d.amount), itemStyle: { color: '#409EFF' } },
      { name: '订单数', type: 'line', yAxisIndex: 1, data: data.map(d => d.orderCount), itemStyle: { color: '#67C23A' } }
    ]
  }
  revenueChart.setOption(option)
}

const consultWayLabels = { 0: '网络咨询', 1: '线下咨询', 2: '混合咨询' }
const renderConsultWayChart = (data) => {
  if (!consultWayChart) {
    consultWayChart = echarts.init(consultWayChartRef.value)
  }
  const option = {
    tooltip: { trigger: 'item', formatter: '{b}: ¥{c} ({d}%)' },
    series: [{
      type: 'pie', radius: ['40%', '70%'],
      data: data.map(d => ({ name: consultWayLabels[d.consultWay] || '未知', value: d.revenue }))
    }]
  }
  consultWayChart.setOption(option)
}

const exportData = () => {
  try {
    const params = new URLSearchParams({ dimension: dimension.value })
    if (dateRange.value?.length === 2) {
      params.append('startDate', dateRange.value[0])
      params.append('endDate', dateRange.value[1])
    }

    // 使用后端导出接口
    const url = `/api/admin/report/financial/export?${params.toString()}`
    window.open(url, '_blank')
    ElMessage.success('正在导出...')
  } catch (e) {
    console.error('Export failed:', e)
    ElMessage.error('导出失败')
  }
}

const handleResize = () => {
  revenueChart?.resize()
  consultWayChart?.resize()
}

onMounted(() => {
  initDateRange()
  loadData()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  revenueChart?.dispose()
  consultWayChart?.dispose()
})
</script>

<style scoped>
.financial-report { padding: 0; }
.filter-card { margin-bottom: 16px; }
.summary-row { margin-bottom: 16px; }
.stat-card { text-align: center; padding: 16px 0; }
.stat-card .label { color: #909399; font-size: 13px; margin-bottom: 8px; }
.stat-card .value { font-size: 24px; font-weight: bold; color: #303133; }
.stat-card .value.success { color: #67C23A; }
.stat-card .value.refund { color: #F56C6C; }
.stat-card.revenue { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.stat-card.revenue .label, .stat-card.revenue .value { color: #fff; }
</style>

