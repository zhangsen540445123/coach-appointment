<template>
  <div class="settings">
    <el-card v-loading="loading">
      <template #header>系统设置</template>
      <el-form ref="formRef" :model="form" label-width="200px">
        <el-form-item label="网站名称">
          <el-input v-model="form.siteName" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.contactPhone" />
        </el-form-item>
        <el-form-item label="联系邮箱">
          <el-input v-model="form.contactEmail" />
        </el-form-item>
        <el-form-item label="服务协议URL">
          <el-input v-model="form.serviceAgreementUrl" />
        </el-form-item>
        <el-form-item label="隐私政策URL">
          <el-input v-model="form.privacyPolicyUrl" />
        </el-form-item>
        <el-form-item label="关于我们">
          <el-input v-model="form.aboutUs" type="textarea" :rows="5" />
        </el-form-item>
        <el-divider>助理设置</el-divider>
        <el-form-item label="助理二维码图片">
          <div class="upload-container">
            <el-upload
              class="qrcode-uploader"
              action="/api/file/upload"
              :show-file-list="false"
              :on-success="(res) => handleUploadSuccess(res, 'assistantQrCode')"
              :before-upload="beforeUpload"
            >
              <img v-if="form.assistantQrCode" :src="getImageUrl(form.assistantQrCode)" class="qrcode-image" />
              <el-icon v-else class="qrcode-uploader-icon"><Plus /></el-icon>
            </el-upload>
            <div class="upload-tip">点击上传助理二维码图片（支持JPG/PNG，最大10MB）</div>
          </div>
        </el-form-item>
        <el-form-item label="是否在小程序显示">
          <el-switch v-model="form.showAssistantAtMp" />
        </el-form-item>
        <el-divider>客服设置</el-divider>
        <el-form-item label="客服微信二维码">
          <div class="upload-container">
            <el-upload
              class="qrcode-uploader"
              action="/api/file/upload"
              :show-file-list="false"
              :on-success="(res) => handleUploadSuccess(res, 'customerServiceQrCode')"
              :before-upload="beforeUpload"
            >
              <img v-if="form.customerServiceQrCode" :src="getImageUrl(form.customerServiceQrCode)" class="qrcode-image" />
              <el-icon v-else class="qrcode-uploader-icon"><Plus /></el-icon>
            </el-upload>
            <div class="upload-tip">点击上传客服二维码图片（支持JPG/PNG，最大10MB）</div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="submitting" @click="handleSave">保存设置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { settingsApi } from '@/api/settings'

const loading = ref(false)
const submitting = ref(false)

const form = reactive({
  siteName: '',
  contactPhone: '',
  contactEmail: '',
  serviceAgreementUrl: '',
  privacyPolicyUrl: '',
  aboutUs: '',
  assistantQrCode: '',
  showAssistantAtMp: true,
  customerServiceQrCode: ''
})

// 获取图片完整URL
const getImageUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return url.startsWith('/') ? url : '/' + url
}

// 上传前验证
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt10M = file.size / 1024 / 1024 < 10
  if (!isImage) ElMessage.error('只能上传图片文件')
  if (!isLt10M) ElMessage.error('图片大小不能超过10MB')
  return isImage && isLt10M
}

// 上传成功处理
const handleUploadSuccess = (res, field) => {
  if (res.code === 200 && res.data) {
    form[field] = res.data.url
    ElMessage.success('上传成功')
  } else {
    ElMessage.error('上传失败')
  }
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await settingsApi.getAll()
    if (res.code === 200 && res.data) {
      Object.keys(form).forEach(key => {
        if (res.data[key] !== undefined) {
          form[key] = res.data[key]
        }
      })
      // 处理助理设置（从concat_sys_agent_settings解析）
      if (res.data.concat_sys_agent_settings) {
        try {
          const agentSettings = JSON.parse(res.data.concat_sys_agent_settings)
          if (agentSettings.qrCodeImageUrl) {
            form.assistantQrCode = agentSettings.qrCodeImageUrl
          }
          form.showAssistantAtMp = agentSettings.showAtMp === '1' || agentSettings.showAtMp === true
        } catch (e) {
          console.error('解析助理设置失败', e)
        }
      }
      // 处理客服二维码
      if (res.data.customerServiceQrCode) {
        form.customerServiceQrCode = res.data.customerServiceQrCode
      }
    }
  } finally {
    loading.value = false
  }
}

const handleSave = async () => {
  submitting.value = true
  try {
    // 保存普通设置项
    const normalKeys = ['siteName', 'contactPhone', 'contactEmail', 'serviceAgreementUrl', 'privacyPolicyUrl', 'aboutUs']
    const promises = normalKeys.map(key =>
      settingsApi.update(key, form[key])
    )

    // 保存助理设置（合并为JSON）
    const agentSettings = {
      qrCodeImageUrl: form.assistantQrCode,
      showAtMp: form.showAssistantAtMp ? '1' : '0'
    }
    promises.push(settingsApi.update('concat_sys_agent_settings', JSON.stringify(agentSettings)))

    // 保存客服二维码
    promises.push(settingsApi.update('customerServiceQrCode', form.customerServiceQrCode))

    await Promise.all(promises)
    ElMessage.success('设置保存成功')
  } catch (e) {
    ElMessage.error('保存失败')
  } finally {
    submitting.value = false
  }
}

onMounted(loadData)
</script>

<style scoped>
.settings { padding: 0; }

.upload-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.qrcode-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s;
}

.qrcode-uploader:hover {
  border-color: #409eff;
}

.qrcode-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.qrcode-image {
  width: 150px;
  height: 150px;
  display: block;
  object-fit: contain;
}

.upload-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #909399;
}
</style>
