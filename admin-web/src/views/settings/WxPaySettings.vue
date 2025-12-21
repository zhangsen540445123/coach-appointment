<template>
  <div class="wxpay-settings">
    <el-card v-loading="loading">
      <template #header>
        <div class="card-header">
          <span>微信支付配置</span>
          <el-tag v-if="form.id" type="success" size="small">已配置</el-tag>
          <el-tag v-else type="info" size="small">未配置</el-tag>
        </div>
      </template>
      
      <el-form ref="formRef" :model="form" :rules="rules" label-width="140px">
        <el-divider content-position="left">基础配置</el-divider>
        
        <el-form-item label="微信AppID" prop="appId">
          <el-input v-model="form.appId" placeholder="小程序的AppID" />
        </el-form-item>
        
        <el-form-item label="商户号 (Mch ID)" prop="mchId">
          <el-input v-model="form.mchId" placeholder="微信支付商户号" />
        </el-form-item>
        
        <el-form-item label="API密钥" prop="apiKey">
          <el-input v-model="form.apiKey" type="password" show-password placeholder="商户API密钥(V2)" />
          <div class="form-tip">用于签名验证，请在微信商户平台设置</div>
        </el-form-item>
        
        <el-form-item label="API V3密钥">
          <el-input v-model="form.apiV3Key" type="password" show-password placeholder="商户API V3密钥（可选）" />
          <div class="form-tip">如使用V3接口需要配置</div>
        </el-form-item>
        
        <el-divider content-position="left">证书配置</el-divider>
        
        <el-form-item label="证书路径">
          <el-input v-model="form.certPath" placeholder="商户证书路径（可选）" />
          <div class="form-tip">如需退款等操作需要配置证书，路径如：/cert/apiclient_cert.p12</div>
        </el-form-item>
        
        <el-form-item label="私钥路径">
          <el-input v-model="form.privateKeyPath" placeholder="商户私钥路径（可选）" />
        </el-form-item>
        
        <el-divider content-position="left">回调配置</el-divider>
        
        <el-form-item label="支付回调地址" prop="notifyUrl">
          <el-input v-model="form.notifyUrl" placeholder="微信支付结果通知回调URL" />
          <div class="form-tip">微信支付完成后会通知此地址，需确保能被外网访问</div>
        </el-form-item>
        
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0" active-text="启用" inactive-text="禁用" />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" :loading="submitting" @click="handleSave">
            {{ form.id ? '更新配置' : '保存配置' }}
          </el-button>
          <el-button v-if="form.id" type="danger" @click="handleDelete">删除配置</el-button>
        </el-form-item>
      </el-form>
      
      <el-divider />
      
      <div class="help-section">
        <h4>配置说明</h4>
        <ol>
          <li>登录<a href="https://pay.weixin.qq.com" target="_blank">微信商户平台</a>获取商户号和API密钥</li>
          <li>登录<a href="https://mp.weixin.qq.com" target="_blank">微信公众平台</a>获取小程序AppID</li>
          <li>在微信商户平台「账户中心」-「API安全」中设置API密钥</li>
          <li>回调地址必须是HTTPS，且能被外网访问</li>
        </ol>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { wxpayApi } from '@/api/wxpay'

const loading = ref(false)
const submitting = ref(false)
const formRef = ref(null)

const form = reactive({
  id: null,
  appId: '',
  mchId: '',
  apiKey: '',
  apiV3Key: '',
  certPath: '',
  privateKeyPath: '',
  notifyUrl: '',
  status: 1
})

const rules = {
  appId: [{ required: true, message: '请输入微信AppID', trigger: 'blur' }],
  mchId: [{ required: true, message: '请输入商户号', trigger: 'blur' }],
  apiKey: [{ required: true, message: '请输入API密钥', trigger: 'blur' }],
  notifyUrl: [{ required: true, message: '请输入支付回调地址', trigger: 'blur' }]
}

const loadConfig = async () => {
  loading.value = true
  try {
    console.log('Loading wxpay config...')
    const res = await wxpayApi.getConfig()
    console.log('Wxpay config response:', res)
    if (res.code === 200 && res.data) {
      Object.keys(form).forEach(key => {
        if (res.data[key] !== undefined) {
          form[key] = res.data[key]
        }
      })
      console.log('Loaded form:', form)
    } else {
      console.warn('Invalid response:', res)
    }
  } catch (e) {
    console.error('加载配置失败', e)
    ElMessage.error('加载配置失败')
  } finally {
    loading.value = false
  }
}

const handleSave = async () => {
  try {
    await formRef.value.validate()
    submitting.value = true
    const res = await wxpayApi.saveConfig(form)
    console.log('Save wxpay config response:', res)
    if (res.code === 200) {
      ElMessage({ message: '配置保存成功', type: 'success' })
      if (!form.id && res.data) {
        form.id = res.data
      }
      // 重新加载数据
      await loadConfig()
    } else {
      ElMessage.error(res.msg || '保存失败')
    }
  } catch (e) {
    console.error('Save wxpay config error:', e)
    if (e !== 'cancel') {
      ElMessage.error('保存失败: ' + (e.message || e))
    }
  } finally {
    submitting.value = false
  }
}

const handleDelete = async () => {
  try {
    await ElMessageBox.confirm('确定要删除微信支付配置吗？删除后将无法进行微信支付', '确认删除', { type: 'warning' })
    const res = await wxpayApi.deleteConfig(form.id)
    if (res.code === 200) {
      ElMessage.success('删除成功')
      Object.keys(form).forEach(key => { form[key] = key === 'status' ? 1 : (key === 'id' ? null : '') })
    }
  } catch (e) { /* cancelled */ }
}

onMounted(loadConfig)
</script>

<style scoped>
.wxpay-settings {
  padding: 0;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

.help-section {
  background: #f5f7fa;
  padding: 16px;
  border-radius: 4px;
}

.help-section h4 {
  margin: 0 0 10px 0;
  color: #606266;
}

.help-section ol {
  margin: 0;
  padding-left: 20px;
  color: #909399;
  line-height: 2;
}

.help-section a {
  color: #409eff;
  text-decoration: none;
}

.help-section a:hover {
  text-decoration: underline;
}
</style>

