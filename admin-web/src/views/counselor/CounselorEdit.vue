<template>
  <div class="counselor-edit">
    <el-card v-loading="loading">
      <template #header>
        <div class="header-row">
          <span>{{ isEdit ? t('editCoach') : t('addCoach') }}</span>
          <el-switch v-model="isEnglish" :active-text="'EN'" :inactive-text="'中'" size="small" />
        </div>
      </template>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="160px">
        <!-- 基本信息 -->
        <el-divider content-position="left">{{ t('basicInfo') }}</el-divider>

        <el-form-item :label="t('name')" prop="name">
          <el-input v-model="form.name" :placeholder="t('enterName')" />
        </el-form-item>

        <el-form-item :label="t('gender')">
          <el-radio-group v-model="form.gender">
            <el-radio :label="1">{{ t('male') }}</el-radio>
            <el-radio :label="2">{{ t('female') }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item :label="t('city')">
          <el-select v-model="form.cityName" :placeholder="t('selectCity')" filterable allow-create style="width: 100%">
            <el-option v-for="city in cities" :key="city" :label="city" :value="city" />
          </el-select>
        </el-form-item>

        <!-- 头像上传 -->
        <el-divider content-position="left">{{ t('avatarUpload') }}</el-divider>

        <el-form-item :label="t('avatar')">
          <div class="upload-container">
            <el-upload
              class="avatar-uploader"
              action="/api/file/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.headUrl" :src="getImageUrl(form.headUrl)" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
            <div class="upload-tip">{{ t('avatarTip') }}</div>
          </div>
        </el-form-item>

        <el-form-item :label="t('squareAvatar')">
          <div class="upload-container">
            <el-upload
              class="avatar-uploader"
              action="/api/file/upload"
              :show-file-list="false"
              :on-success="handleSquareAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.headUrlSquare" :src="getImageUrl(form.headUrlSquare)" class="avatar square" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
            <div class="upload-tip">{{ t('squareAvatarTip') }}</div>
          </div>
        </el-form-item>

        <!-- 专业信息 -->
        <el-divider content-position="left">{{ t('professionalInfo') }}</el-divider>

        <el-form-item :label="t('qualifications')">
          <el-select v-model="form.qualificationsList" multiple filterable allow-create :placeholder="t('selectQualifications')" style="width: 100%">
            <el-option v-for="q in qualificationOptions" :key="q" :label="q" :value="q" />
          </el-select>
        </el-form-item>

        <el-form-item :label="t('school')">
          <el-select v-model="form.schoolList" multiple filterable allow-create :placeholder="t('selectSchool')" style="width: 100%">
            <el-option v-for="s in schoolOptions" :key="s" :label="s" :value="s" />
          </el-select>
        </el-form-item>

        <el-form-item :label="t('introduction')">
          <el-input v-model="form.introduction" type="textarea" :rows="5" :placeholder="t('enterIntroduction')" />
        </el-form-item>

        <el-form-item :label="t('special')">
          <el-input v-model="form.special" type="textarea" :rows="4" :placeholder="t('enterSpecial')" />
        </el-form-item>

        <el-form-item :label="t('experienceDate')">
          <el-date-picker v-model="form.experienceDate" type="date" :placeholder="t('selectDate')" />
        </el-form-item>

        <el-form-item :label="t('experienceTime')">
          <el-input v-model="form.experienceTime" :placeholder="t('enterExperienceTime')" />
        </el-form-item>

        <el-form-item :label="t('consultMsg')">
          <el-input v-model="form.consultMsg" type="textarea" :rows="3" :placeholder="t('enterConsultMsg')" />
        </el-form-item>

        <!-- 擅长领域 -->
        <el-divider content-position="left">{{ t('directionsTitle') }}</el-divider>
        <el-form-item :label="t('directions')">
          <div class="directions-editor">
            <div v-for="(dir, dirIndex) in form.directionsList" :key="dirIndex" class="direction-item">
              <div class="direction-header">
                <el-select v-model="dir.name" filterable allow-create :placeholder="t('selectDirection')" style="width: 200px">
                  <el-option v-for="d in directionOptions" :key="d" :label="d" :value="d" />
                </el-select>
                <el-button type="danger" size="small" @click="removeDirection(dirIndex)">{{ t('delete') }}</el-button>
              </div>
              <div class="direction-children">
                <el-tag v-for="(child, childIndex) in dir.child" :key="childIndex" closable @close="removeDirectionChild(dirIndex, childIndex)" style="margin: 2px">
                  {{ child.name }}
                </el-tag>
                <el-input v-model="newChildName[dirIndex]" :placeholder="t('addSubDirection')" size="small" style="width: 150px; margin-left: 8px" @keyup.enter="addDirectionChild(dirIndex)">
                  <template #append>
                    <el-button @click="addDirectionChild(dirIndex)">+</el-button>
                  </template>
                </el-input>
              </div>
            </div>
            <el-button type="primary" size="small" @click="addDirection">{{ t('addDirection') }}</el-button>
          </div>
        </el-form-item>

        <!-- 受训背景 -->
        <el-divider content-position="left">{{ t('trainingTitle') }}</el-divider>
        <el-form-item :label="t('training')">
          <div class="training-editor">
            <div v-for="(train, trainIndex) in form.trainingList" :key="trainIndex" class="training-item">
              <el-input v-model="train.content" :placeholder="t('trainingContent')" style="width: 350px" />
              <el-date-picker v-model="train.beginDate" type="date" :placeholder="t('startDate')" value-format="YYYY-MM-DD" style="width: 140px" />
              <span>-</span>
              <el-date-picker v-model="train.endDate" type="date" :placeholder="t('endDate')" value-format="YYYY-MM-DD" style="width: 140px" />
              <el-button type="danger" size="small" @click="removeTraining(trainIndex)">{{ t('delete') }}</el-button>
            </div>
            <el-button type="primary" size="small" @click="addTraining">{{ t('addTraining') }}</el-button>
          </div>
        </el-form-item>

        <!-- 咨询项目 -->
        <el-divider content-position="left">{{ t('consultTitle') }}</el-divider>
        <el-form-item :label="t('consultItems')">
          <div class="consult-editor">
            <div v-for="(item, itemIndex) in form.consultList" :key="itemIndex" class="consult-item">
              <el-select v-model="item.consultType" :placeholder="t('consultType')" style="width: 150px">
                <el-option v-for="(label, index) in consultTypeOptions" :key="index" :value="index" :label="label" />
              </el-select>
              <el-input-number v-model="item.consultPrice" :min="0" :step="50" :placeholder="t('price')" />
              <span>{{ t('yuan') }}</span>
              <el-button type="danger" size="small" @click="removeConsultItem(itemIndex)">{{ t('delete') }}</el-button>
            </div>
            <el-button type="primary" size="small" @click="addConsultItem">{{ t('addConsultItem') }}</el-button>
          </div>
        </el-form-item>

        <!-- 媒体资源 -->
        <el-divider content-position="left">{{ t('mediaResources') }}</el-divider>

        <el-form-item :label="t('videoUrl')">
          <el-input v-model="form.videoUrl" :placeholder="t('enterVideoUrl')" />
        </el-form-item>

        <el-form-item :label="t('imageUrls')">
          <el-upload
            class="image-uploader"
            action="/api/file/upload"
            list-type="picture-card"
            :file-list="imageFileList"
            :on-success="handleImageSuccess"
            :on-remove="handleImageRemove"
            :before-upload="beforeAvatarUpload"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <!-- 服务信息 -->
        <el-divider content-position="left">{{ t('serviceInfo') }}</el-divider>

        <el-form-item :label="t('price')" prop="consultPrice">
          <el-input-number v-model="form.consultPrice" :min="0" :step="50" />
          <span class="unit">{{ t('yuan') }}</span>
        </el-form-item>

        <el-form-item :label="t('serviceType')">
          <el-checkbox-group v-model="form.consultTypeList">
            <el-checkbox v-for="(label, index) in consultWayOptions" :key="index" :label="index">{{ label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item :label="t('supportOnline')">
          <el-switch v-model="form.supportOnlineConsult" :active-value="1" :inactive-value="0" />
        </el-form-item>

        <el-form-item :label="t('supportOffline')">
          <el-switch v-model="form.supportOfflineConsult" :active-value="1" :inactive-value="0" />
        </el-form-item>

        <el-form-item :label="t('starNum')">
          <el-rate v-model="form.starNum" :max="5" />
        </el-form-item>

        <!-- 状态设置 -->
        <el-divider content-position="left">{{ t('statusSettings') }}</el-divider>

        <el-form-item :label="t('canConsult')">
          <el-switch v-model="form.canConsult" :active-value="1" :inactive-value="0" :active-text="t('available')" :inactive-text="t('unavailable')" />
        </el-form-item>

        <el-form-item>
          <el-button @click="$router.back()">{{ t('cancel') }}</el-button>
          <el-button type="primary" :loading="submitting" @click="handleSubmit">{{ isEdit ? t('update') : t('create') }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { counselorApi } from '@/api/counselor'
import { dictApi } from '@/api/dict'
import { cities } from '@/utils/cities'

const route = useRoute()
const router = useRouter()
const formRef = ref(null)
const loading = ref(false)
const submitting = ref(false)
const isEnglish = ref(false)

const isEdit = computed(() => !!route.params.id)

// 中英文翻译
const translations = {
  zh: {
    editCoach: '编辑教练', addCoach: '添加教练', basicInfo: '基本信息',
    name: '姓名', enterName: '请输入姓名', gender: '性别', male: '男', female: '女',
    city: '城市', selectCity: '请选择城市',
    avatarUpload: '头像上传', avatar: '头像', avatarTip: '点击上传头像图片',
    squareAvatar: '方形头像', squareAvatarTip: '点击上传方形头像',
    professionalInfo: '专业信息', qualifications: '资质认证', selectQualifications: '选择或输入资质',
    school: '流派', selectSchool: '选择或输入流派',
    introduction: '个人简介', enterIntroduction: '请输入个人简介',
    special: '特别说明', enterSpecial: '请输入特别说明',
    experienceDate: '从业日期', selectDate: '选择日期',
    experienceTime: '从业时长', enterExperienceTime: '如：5000小时',
    consultMsg: '咨询须知', enterConsultMsg: '请输入咨询须知',
    mediaResources: '媒体资源', videoUrl: '视频链接', enterVideoUrl: '请输入视频链接',
    imageUrls: '展示图片',
    serviceInfo: '服务信息', price: '咨询价格', yuan: '元/次',
    serviceType: '咨询方式', onlineVideo: '线上视频', onlineVoice: '线上语音', offline: '线下面询',
    supportOnline: '支持线上', supportOffline: '支持线下', starNum: '星级评分',
    statusSettings: '状态设置', canConsult: '可预约', available: '可约', unavailable: '不可约',
    cancel: '取消', update: '更新', create: '创建', delete: '删除',
    directionsTitle: '擅长领域', directions: '擅长方向', selectDirection: '选择方向',
    addDirection: '添加方向', addSubDirection: '添加子方向',
    trainingTitle: '受训背景', training: '培训经历', trainingContent: '培训内容',
    startDate: '开始日期', endDate: '结束日期', addTraining: '添加培训',
    consultTitle: '咨询项目', consultItems: '咨询项目', consultType: '咨询类型',
    standard: '标准咨询', addConsultItem: '添加咨询项目'
  },
  en: {
    editCoach: 'Edit Coach', addCoach: 'Add Coach', basicInfo: 'Basic Info',
    name: 'Name', enterName: 'Enter name', gender: 'Gender', male: 'Male', female: 'Female',
    city: 'City', enterCity: 'Enter city',
    avatarUpload: 'Avatar Upload', avatar: 'Avatar', avatarTip: 'Click to upload avatar',
    squareAvatar: 'Square Avatar', squareAvatarTip: 'Click to upload square avatar',
    professionalInfo: 'Professional Info', qualifications: 'Qualifications', selectQualifications: 'Select or enter qualifications',
    school: 'School/Approach', selectSchool: 'Select or enter school',
    introduction: 'Introduction', enterIntroduction: 'Enter introduction',
    special: 'Special Notes', enterSpecial: 'Enter special notes',
    experienceDate: 'Start Date', selectDate: 'Select date',
    experienceTime: 'Experience', enterExperienceTime: 'e.g. 5000 hours',
    consultMsg: 'Consultation Notice', enterConsultMsg: 'Enter consultation notice',
    mediaResources: 'Media Resources', videoUrl: 'Video URL', enterVideoUrl: 'Enter video URL',
    imageUrls: 'Gallery Images',
    serviceInfo: 'Service Info', price: 'Price', yuan: 'CNY/session',
    serviceType: 'Service Type', onlineVideo: 'Online Video', onlineVoice: 'Online Voice', offline: 'Offline',
    supportOnline: 'Support Online', supportOffline: 'Support Offline', starNum: 'Star Rating',
    statusSettings: 'Status Settings', canConsult: 'Available', available: 'Yes', unavailable: 'No',
    cancel: 'Cancel', update: 'Update', create: 'Create', delete: 'Delete',
    directionsTitle: 'Expertise Areas', directions: 'Directions', selectDirection: 'Select direction',
    addDirection: 'Add Direction', addSubDirection: 'Add sub-direction',
    trainingTitle: 'Training Background', training: 'Training', trainingContent: 'Training content',
    startDate: 'Start Date', endDate: 'End Date', addTraining: 'Add Training',
    consultTitle: 'Consultation Items', consultItems: 'Consult Items', consultType: 'Consult Type',
    standard: 'Standard', addConsultItem: 'Add Consult Item'
  }
}

const t = (key) => translations[isEnglish.value ? 'en' : 'zh'][key] || key

// 动态选项（从字典加载）
const qualificationOptions = ref([])
const schoolOptions = ref([])
const directionOptions = ref([])
const consultTypeOptions = ref([])
const consultWayOptions = ref([])

// 加载字典数据
const loadDictOptions = async () => {
  try {
    const [qRes, sRes, dRes, ctRes, cwRes] = await Promise.all([
      dictApi.getDataByCode('qualification'),
      dictApi.getDataByCode('school'),
      dictApi.getDataByCode('direction'),
      dictApi.getDataByCode('consult_type'),
      dictApi.getDataByCode('consult_way')
    ])
    if (qRes.code === 200) qualificationOptions.value = qRes.data || []
    if (sRes.code === 200) schoolOptions.value = sRes.data || []
    if (dRes.code === 200) directionOptions.value = dRes.data || []
    if (ctRes.code === 200) consultTypeOptions.value = ctRes.data || []
    if (cwRes.code === 200) consultWayOptions.value = cwRes.data || []
  } catch (e) {
    console.error('加载字典数据失败', e)
  }
}

const imageFileList = ref([])
const newChildName = ref({})

const form = reactive({
  name: '', gender: 1, headUrl: '', headUrlSquare: '', videoUrl: '',
  qualificationsList: [], schoolList: [],
  introduction: '', special: '', consultMsg: '', consultPrice: 0, serviceType: 1, cityName: '',
  experienceDate: null, experienceTime: '', canConsult: 1,
  consultTypeList: [], supportOnlineConsult: 1, supportOfflineConsult: 0, starNum: 5,
  imageUrls: [],
  directionsList: [], // 擅长领域 [{name, value, child: [{name, value}]}]
  trainingList: [], // 受训背景 [{content, beginDate, endDate}]
  consultList: [] // 咨询项目 [{consultType, consultPrice}]
})

// 擅长领域操作
const addDirection = () => {
  form.directionsList.push({ name: '', value: form.directionsList.length, child: [] })
}
const removeDirection = (index) => {
  form.directionsList.splice(index, 1)
}
const addDirectionChild = (dirIndex) => {
  const childName = newChildName.value[dirIndex]
  if (childName && childName.trim()) {
    form.directionsList[dirIndex].child.push({
      name: childName.trim(),
      value: form.directionsList[dirIndex].child.length + 1
    })
    newChildName.value[dirIndex] = ''
  }
}
const removeDirectionChild = (dirIndex, childIndex) => {
  form.directionsList[dirIndex].child.splice(childIndex, 1)
}

// 受训背景操作
const addTraining = () => {
  form.trainingList.push({ content: '', beginDate: '', endDate: '' })
}
const removeTraining = (index) => {
  form.trainingList.splice(index, 1)
}

// 咨询项目操作
const addConsultItem = () => {
  form.consultList.push({ consultType: 4, consultPrice: form.consultPrice || 500 })
}
const removeConsultItem = (index) => {
  form.consultList.splice(index, 1)
}

const rules = {
  name: [{ required: true, message: () => t('enterName'), trigger: 'blur' }],
  consultPrice: [{ required: true, message: 'Please enter price', trigger: 'blur' }]
}

const getImageUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  if (url.startsWith('/api')) return url
  return '/api/file/image/' + url
}

const handleAvatarSuccess = (res) => {
  if (res.code === 200 && res.data) {
    form.headUrl = res.data.url
    ElMessage.success('上传成功')
  }
}

const handleSquareAvatarSuccess = (res) => {
  if (res.code === 200 && res.data) {
    form.headUrlSquare = res.data.url
    ElMessage.success('上传成功')
  }
}

const beforeAvatarUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt10M = file.size / 1024 / 1024 < 10
  if (!isImage) ElMessage.error('只能上传图片文件')
  if (!isLt10M) ElMessage.error('图片大小不能超过10MB')
  return isImage && isLt10M
}

const handleImageSuccess = (res) => {
  if (res.code === 200 && res.data) {
    form.imageUrls.push(res.data.url)
    ElMessage.success('上传成功')
  }
}

const handleImageRemove = (file) => {
  const url = file.url || file.response?.data?.url
  const index = form.imageUrls.indexOf(url)
  if (index > -1) form.imageUrls.splice(index, 1)
}

const loadData = async () => {
  if (!isEdit.value) return
  loading.value = true
  try {
    const res = await counselorApi.getById(route.params.id)
    if (res.code === 200 && res.data) {
      const data = res.data
      Object.assign(form, {
        ...data,
        qualificationsList: data.qualifications || [],
        schoolList: data.school || [],
        consultTypeList: data.consultType || [],
        imageUrls: data.imageUrls || [],
        directionsList: Array.isArray(data.directions) ? data.directions.map((d, i) =>
          typeof d === 'string' ? { name: d, value: i, child: [] } : d
        ) : [],
        trainingList: data.training || [],
        consultList: data.consult || []
      })
      // 初始化图片列表
      imageFileList.value = (data.imageUrls || []).map((url, i) => ({ name: `image-${i}`, url }))
    }
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    submitting.value = true
    try {
      const submitData = {
        ...form,
        qualifications: form.qualificationsList,
        school: form.schoolList,
        consultType: form.consultTypeList,
        directions: form.directionsList,
        training: form.trainingList,
        consult: form.consultList
      }
      const res = isEdit.value
        ? await counselorApi.update(route.params.id, submitData)
        : await counselorApi.create(submitData)
      if (res.code === 200) {
        ElMessage.success(isEdit.value ? t('update') + '成功' : t('create') + '成功')
        router.push('/counselor')
      } else {
        ElMessage.error(res.msg || res.message || 'Operation failed')
      }
    } catch (e) {
      ElMessage.error('Operation failed')
    } finally {
      submitting.value = false
    }
  })
}

onMounted(() => {
  loadDictOptions()
  loadData()
})
</script>

<style scoped>
.counselor-edit { padding: 0; }
.header-row { display: flex; justify-content: space-between; align-items: center; }
.upload-container { display: flex; align-items: center; gap: 16px; }
.upload-tip { color: #909399; font-size: 12px; }
.avatar-uploader { border: 1px dashed #d9d9d9; border-radius: 6px; cursor: pointer; overflow: hidden; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; }
.avatar-uploader:hover { border-color: #409eff; }
.avatar { width: 100px; height: 100px; object-fit: cover; }
.avatar.square { border-radius: 0; }
.avatar-uploader-icon { font-size: 28px; color: #8c939d; }
.unit { margin-left: 8px; color: #606266; }
.directions-editor, .training-editor, .consult-editor { display: flex; flex-direction: column; gap: 12px; }
.direction-item { background: #f5f7fa; padding: 12px; border-radius: 4px; }
.direction-header { display: flex; gap: 10px; align-items: center; margin-bottom: 8px; }
.direction-children { display: flex; flex-wrap: wrap; align-items: center; }
.training-item, .consult-item { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
</style>
