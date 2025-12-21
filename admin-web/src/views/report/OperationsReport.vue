<template>
  <div class="operations-report">
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
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadData">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 核心指标卡片 -->
    <el-row :gutter="16" class="summary-row">
      <el-col :span="4">
        <el-card class="stat-card users">
          <div class="icon"><el-icon :size="28"><User /></el-icon></div>
          <div class="info">
            <div class="label">用户总数</div>
            <div class="value">{{ userStats.totalUsers || 0 }}</div>
            <div class="sub">新增 +{{ userStats.newUsers || 0 }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="stat-card counselors">
          <div class="icon"><el-icon :size="28"><Avatar /></el-icon></div>
          <div class="info">
            <div class="label">教练总数</div>
            <div class="value">{{ counselorStats.totalCounselors || 0 }}</div>
            <div class="sub">活跃 {{ counselorStats.activeCounselors || 0 }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="stat-card orders">
          <div class="icon"><el-icon :size="28"><List /></el-icon></div>
          <div class="info">
            <div class="label">订单总数</div>
            <div class="value">{{ orderStats.totalOrders || 0 }}</div>
            <div class="sub">完成率 {{ orderStats.completionRate || 0 }}%</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="stat-card stars">
          <div class="icon"><el-icon :size="28"><Star /></el-icon></div>
          <div class="info">
            <div class="label">收藏总数</div>
            <div class="value">{{ starStats.totalStars || 0 }}</div>
            <div class="sub">新增 +{{ starStats.newStars || 0 }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="stat-card rating">
          <div class="icon"><el-icon :size="28"><Star /></el-icon></div>
          <div class="info">
            <div class="label">平均评分</div>
            <div class="value">{{ averageRating }}</div>
            <div class="sub">满分5分</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="stat-card completed">
          <div class="icon"><el-icon :size="28"><Select /></el-icon></div>
          <div class="info">
            <div class="label">已完成订单</div>
            <div class="value">{{ orderStats.completedOrders || 0 }}</div>
            <div class="sub">本期间</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 趋势图表 -->
    <el-row :gutter="16">
      <el-col :span="12">
        <el-card>
          <template #header>订单趋势</template>
          <div ref="orderChartRef" style="height: 300px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>用户增长趋势</template>
          <div ref="userChartRef" style="height: 300px"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16" style="margin-top: 16px">
      <el-col :span="12">
        <el-card>
          <template #header>收藏趋势</template>
          <div ref="starChartRef" style="height: 300px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>热门城市分布 TOP 10</template>
          <div ref="cityChartRef" style="height: 300px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { reportApi } from '@/api/report'
import * as echarts from 'echarts'
import { User, Avatar, List, Star, Select } from '@element-plus/icons-vue'

const dateRange = ref([])
const dimension = ref('day')
const userStats = ref({})
const counselorStats = ref({})
const orderStats = ref({})
const starStats = ref({})
const averageRating = ref(0)

const orderChartRef = ref(null)
const userChartRef = ref(null)
const starChartRef = ref(null)
const cityChartRef = ref(null)
let orderChart = null, userChart = null, starChart = null, cityChart = null

const initDateRange = () => {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - 30)
  dateRange.value = [start.toISOString().split('T')[0], end.toISOString().split('T')[0]]
}

const loadData = async () => {
  try {
    const params = { dimension: dimension.value }
    if (dateRange.value?.length === 2) {
      params.startDate = dateRange.value[0]
      params.endDate = dateRange.value[1]
    }
    console.log('Loading operations report with params:', params)
    const res = await reportApi.getOperationsReport(params)
    console.log('Operations report response:', res)
    if (res.code === 200) {
      userStats.value = res.data?.userStats || {}
      counselorStats.value = res.data?.counselorStats || {}
      orderStats.value = res.data?.orderStats || {}
      starStats.value = res.data?.starStats || {}
      averageRating.value = res.data?.averageRating || 0
      renderOrderChart(res.data?.orderTrend || [])
      renderUserChart(res.data?.userTrend || [])
      renderStarChart(res.data?.starTrend || [])
      renderCityChart(res.data?.cityDistribution || [])
    } else {
      ElMessage.error(res.msg || '加载失败')
    }
  } catch (e) {
    console.error('Load operations report failed', e)
    ElMessage.error('加载失败')
  }
}

// 监听筛选条件变化
watch([dateRange, dimension], () => {
  if (dateRange.value?.length === 2) {
    loadData()
  }
})

const renderOrderChart = (data) => {
  if (!orderChart) orderChart = echarts.init(orderChartRef.value)
  orderChart.setOption({
    tooltip: { trigger: 'axis' },
    legend: { data: ['总订单', '已支付', '已完成', '已取消'] },
    xAxis: { type: 'category', data: data.map(d => d.period) },
    yAxis: { type: 'value' },
    series: [
      { name: '总订单', type: 'line', data: data.map(d => d.total), smooth: true },
      { name: '已支付', type: 'line', data: data.map(d => d.paid), smooth: true },
      { name: '已完成', type: 'line', data: data.map(d => d.completed), smooth: true, itemStyle: { color: '#67C23A' } },
      { name: '已取消', type: 'line', data: data.map(d => d.cancelled), smooth: true, itemStyle: { color: '#F56C6C' } }
    ]
  })
}

const renderUserChart = (data) => {
  if (!userChart) userChart = echarts.init(userChartRef.value)
  userChart.setOption({
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: data.map(d => d.period) },
    yAxis: { type: 'value' },
    series: [{ name: '新增用户', type: 'bar', data: data.map(d => d.count), itemStyle: { color: '#409EFF' } }]
  })
}

const renderStarChart = (data) => {
  if (!starChart) starChart = echarts.init(starChartRef.value)
  starChart.setOption({
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: data.map(d => d.period) },
    yAxis: { type: 'value' },
    series: [{ name: '新增收藏', type: 'line', data: data.map(d => d.count), smooth: true, areaStyle: {}, itemStyle: { color: '#E6A23C' } }]
  })
}

const renderCityChart = (data) => {
  if (!cityChart) cityChart = echarts.init(cityChartRef.value)
  cityChart.setOption({
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie', radius: '60%',
      data: data.map(d => ({ name: d.city, value: d.count })),
      emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
    }]
  })
}

const handleResize = () => {
  orderChart?.resize(); userChart?.resize(); starChart?.resize(); cityChart?.resize()
}

onMounted(() => { initDateRange(); loadData(); window.addEventListener('resize', handleResize) })
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  orderChart?.dispose(); userChart?.dispose(); starChart?.dispose(); cityChart?.dispose()
})
</script>

<style scoped>
.operations-report { padding: 0; }
.filter-card { margin-bottom: 16px; }
.summary-row { margin-bottom: 16px; }
.stat-card { display: flex; align-items: center; padding: 16px; }
.stat-card .icon { width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 12px; color: #fff; }
.stat-card .info .label { color: #909399; font-size: 12px; }
.stat-card .info .value { font-size: 22px; font-weight: bold; color: #303133; }
.stat-card .info .sub { font-size: 12px; color: #67C23A; }
.stat-card.users .icon { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.stat-card.counselors .icon { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
.stat-card.orders .icon { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.stat-card.stars .icon { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
.stat-card.rating .icon { background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: #333; }
.stat-card.completed .icon { background: linear-gradient(135deg, #d299c2 0%, #fef9d7 100%); color: #333; }
</style>

