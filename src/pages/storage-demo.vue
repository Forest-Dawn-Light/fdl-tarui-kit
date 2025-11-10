<template>
  <div class="storage-demo">
    <h2>本地存储工具演示</h2>
    
    <div class="demo-section">
      <h3>基本操作</h3>
      <div class="form-group">
        <a-input 
          v-model:value="form.key" 
          placeholder="键名"
          style="width: 200px; margin-right: 10px;"
        />
        <a-input 
          v-model:value="form.value" 
          placeholder="值"
          style="width: 200px; margin-right: 10px;"
        />
        <a-button type="primary" @click="handleSetItem">设置</a-button>
      </div>
      
      <div class="form-group">
        <a-input 
          v-model:value="getKey" 
          placeholder="键名"
          style="width: 200px; margin-right: 10px;"
        />
        <a-button @click="handleGetItem">获取</a-button>
        <a-button @click="handleRemoveItem" danger>删除</a-button>
      </div>
      
      <div class="result" v-if="getResult !== null">
        <p>获取结果: {{ getResult }}</p>
      </div>
    </div>
    
    <div class="demo-section">
      <h3>加密存储演示</h3>
      <div class="form-group">
        <a-input 
          v-model:value="encryptForm.key" 
          placeholder="键名"
          style="width: 200px; margin-right: 10px;"
        />
        <a-input 
          v-model:value="encryptForm.value" 
          placeholder="值"
          style="width: 200px; margin-right: 10px;"
        />
        <a-button type="primary" @click="handleSetEncryptedItem">加密设置</a-button>
      </div>
      
      <div class="form-group">
        <a-input 
          v-model:value="getEncryptedKey" 
          placeholder="键名"
          style="width: 200px; margin-right: 10px;"
        />
        <a-button @click="handleGetEncryptedItem">解密获取</a-button>
      </div>
      
      <div class="result" v-if="getEncryptedResult !== null">
        <p>解密结果: {{ getEncryptedResult }}</p>
      </div>
    </div>
    
    <div class="demo-section">
      <h3>过期时间演示</h3>
      <div class="form-group">
        <a-input 
          v-model:value="expireForm.key" 
          placeholder="键名"
          style="width: 150px; margin-right: 10px;"
        />
        <a-input 
          v-model:value="expireForm.value" 
          placeholder="值"
          style="width: 150px; margin-right: 10px;"
        />
        <a-input-number 
          v-model:value="expireForm.expire" 
          :min="1000"
          :step="1000"
          placeholder="过期时间(毫秒)"
          style="width: 150px; margin-right: 10px;"
        />
        <a-button type="primary" @click="handleSetItemWithExpire">设置(带过期)</a-button>
      </div>
      
      <div class="form-group">
        <a-input 
          v-model:value="getExpireKey" 
          placeholder="键名"
          style="width: 200px; margin-right: 10px;"
        />
        <a-button @click="handleGetItemWithExpire">获取(带过期)</a-button>
      </div>
      
      <div class="result" v-if="getExpireResult !== null">
        <p>过期获取结果: {{ getExpireResult }}</p>
      </div>
    </div>
    
    <div class="demo-section">
      <h3>工具方法</h3>
      <div class="form-group">
        <a-button @click="handleGetAllKeys">获取所有键</a-button>
        <a-button @click="handleClear" danger>清空所有</a-button>
      </div>
      
      <div class="result" v-if="allKeys.length > 0">
        <p>所有键名: {{ allKeys.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useStorageStore } from '../store/storage'
import { message } from 'ant-design-vue'

const storageStore = useStorageStore()

// 基本操作表单
const form = reactive({
  key: '',
  value: ''
})

const getKey = ref('')
const getResult = ref<any>(null)

// 加密存储表单
const encryptForm = reactive({
  key: '',
  value: ''
})

const getEncryptedKey = ref('')
const getEncryptedResult = ref<any>(null)

// 过期时间表单
const expireForm = reactive({
  key: '',
  value: '',
  expire: 5000 // 默认5秒
})

const getExpireKey = ref('')
const getExpireResult = ref<any>(null)

// 所有键
const allKeys = ref<string[]>([])

// 基本操作方法
const handleSetItem = async () => {
  if (!form.key || !form.value) {
    message.warning('请输入键名和值')
    return
  }
  
  const result = await storageStore.setItem(form.key, form.value, false)
  if (result.success) {
    message.success('设置成功')
  } else {
    message.error(result.message || '设置失败')
  }
}

const handleGetItem = async () => {
  if (!getKey.value) {
    message.warning('请输入键名')
    return
  }
  
  const result = await storageStore.getItem(getKey.value, null, false)
  if (result.success) {
    getResult.value = result.data
    message.success('获取成功')
  } else {
    message.error(result.message || '获取失败')
  }
}

const handleRemoveItem = async () => {
  if (!getKey.value) {
    message.warning('请输入键名')
    return
  }
  
  const result = await storageStore.removeItem(getKey.value)
  if (result.success) {
    message.success('删除成功')
    getResult.value = null
  } else {
    message.error(result.message || '删除失败')
  }
}

// 加密存储方法
const handleSetEncryptedItem = async () => {
  if (!encryptForm.key || !encryptForm.value) {
    message.warning('请输入键名和值')
    return
  }
  
  const result = await storageStore.setItem(encryptForm.key, encryptForm.value, true)
  if (result.success) {
    message.success('加密设置成功')
  } else {
    message.error(result.message || '加密设置失败')
  }
}

const handleGetEncryptedItem = async () => {
  if (!getEncryptedKey.value) {
    message.warning('请输入键名')
    return
  }
  
  const result = await storageStore.getItem(getEncryptedKey.value, null, true)
  if (result.success) {
    getEncryptedResult.value = result.data
    message.success('解密获取成功')
  } else {
    message.error(result.message || '解密获取失败')
  }
}

// 过期时间方法
const handleSetItemWithExpire = async () => {
  if (!expireForm.key || !expireForm.value || !expireForm.expire) {
    message.warning('请输入键名、值和过期时间')
    return
  }
  
  const result = await storageStore.setItemWithExpire(
    expireForm.key, 
    expireForm.value, 
    expireForm.expire, 
    false
  )
  
  if (result.success) {
    message.success('设置成功（带过期时间）')
  } else {
    message.error(result.message || '设置失败')
  }
}

const handleGetItemWithExpire = async () => {
  if (!getExpireKey.value) {
    message.warning('请输入键名')
    return
  }
  
  const result = await storageStore.getItemWithExpire(getExpireKey.value, null, false)
  if (result.success) {
    getExpireResult.value = result.data
    message.success('获取成功')
  } else {
    message.error(result.message || '获取失败')
  }
}

// 工具方法
const handleGetAllKeys = async () => {
  const result = await storageStore.getAllKeys()
  if (result.success) {
    allKeys.value = result.data || []
    message.success('获取所有键成功')
  } else {
    message.error(result.message || '获取所有键失败')
  }
}

const handleClear = async () => {
  const result = await storageStore.clear()
  if (result.success) {
    message.success('清空所有存储成功')
    allKeys.value = []
    getResult.value = null
    getEncryptedResult.value = null
    getExpireResult.value = null
  } else {
    message.error(result.message || '清空所有存储失败')
  }
}
</script>

<style lang="scss" scoped>
.storage-demo {
  padding: 24px;
  background: var(--component-background);
  min-height: 100%;
}

.demo-section {
  margin-bottom: 32px;
  
  h3 {
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border-color-split);
    color: var(--heading-color);
  }
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 10px;
}

.result {
  margin-top: 16px;
  padding: 12px;
  background: var(--background-color-light);
  border-radius: var(--border-radius-base);
  
  p {
    margin: 0;
    color: var(--text-color);
  }
}
</style>