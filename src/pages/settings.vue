<template>
  <div class="settings-page">
    <h2>系统设置</h2>
    
    <div class="settings-section">
      <h3>外观设置</h3>
      <div class="settings-item">
        <label>主题</label>
        <a-select 
          :value="settingsStore.getTheme" 
          @update:value="settingsStore.setTheme"
          style="width: 200px"
        >
          <a-select-option value="light">浅色主题</a-select-option>
          <a-select-option value="dark">深色主题</a-select-option>
          <a-select-option value="auto">自动</a-select-option>
          <a-select-option value="neumorphism">新拟物风格</a-select-option>
          <a-select-option value="ghibli">吉卜力风格</a-select-option>
        </a-select>
      </div>
      
      <div class="settings-item">
        <label>语言</label>
        <a-select 
          :value="settingsStore.getLanguage" 
          @update:value="settingsStore.setLanguage"
          style="width: 200px"
        >
          <a-select-option value="zh-CN">简体中文</a-select-option>
          <a-select-option value="en-US">English</a-select-option>
        </a-select>
      </div>
      
      <div class="settings-item">
        <label>字体大小</label>
        <a-select 
          :value="settingsStore.getFontSize" 
          @update:value="settingsStore.setFontSize"
          style="width: 200px"
        >
          <a-select-option value="small">小</a-select-option>
          <a-select-option value="medium">中等</a-select-option>
          <a-select-option value="large">大</a-select-option>
        </a-select>
      </div>
    </div>
    
    <div class="settings-section">
      <h3>布局设置</h3>
      <div class="settings-item">
        <label>固定导航栏</label>
        <a-switch 
          :checked="settingsStore.navbarFixed" 
          @update:checked="settingsStore.toggleNavbarFixed"
        />
      </div>
      
      <div class="settings-item">
        <label>显示面包屑</label>
        <a-switch 
          :checked="settingsStore.showBreadcrumbs" 
          @update:checked="settingsStore.toggleBreadcrumbs"
        />
      </div>
    </div>
    
    <div class="settings-section">
      <h3>通知设置</h3>
      <div class="settings-item">
        <label>启用通知</label>
        <a-switch 
          :checked="settingsStore.getEnableNotifications" 
          @update:checked="settingsStore.setNotifications"
        />
      </div>
      
      <div class="settings-item">
        <label>通知声音</label>
        <a-switch 
          :checked="settingsStore.notificationSound" 
          @update:checked="settingsStore.setNotificationSound"
        />
      </div>
      
      <div class="settings-item">
        <label>邮件通知</label>
        <a-switch 
          :checked="settingsStore.emailNotifications" 
          @update:checked="settingsStore.setEmailNotifications"
        />
      </div>
    </div>
    
    <div class="settings-section">
      <h3>隐私设置</h3>
      <div class="settings-item">
        <label>允许数据跟踪</label>
        <a-switch 
          :checked="settingsStore.getAllowTracking" 
          @update:checked="settingsStore.setAllowTracking"
        />
      </div>
    </div>
    
    <div class="settings-section">
      <h3>系统设置</h3>
      <div class="settings-item">
        <label>自动保存</label>
        <a-switch 
          :checked="settingsStore.getAutoSave" 
          @update:checked="settingsStore.setAutoSave"
        />
      </div>
      
      <div class="settings-item">
        <label>自动备份</label>
        <a-switch 
          :checked="settingsStore.autoBackup" 
          @update:checked="settingsStore.setAutoBackup"
        />
      </div>
      
      <div class="settings-item" v-if="settingsStore.autoBackup">
        <label>备份位置</label>
        <a-input 
          :value="settingsStore.backupLocation" 
          @update:value="settingsStore.setBackupLocation"
          placeholder="请输入备份位置"
          style="width: 300px"
        />
      </div>
    </div>
    
    <div class="settings-section">
      <h3>网络设置</h3>
      <div class="settings-item">
        <label>启用代理</label>
        <a-switch 
          :checked="settingsStore.getProxyEnabled" 
          @update:checked="settingsStore.setProxyEnabled"
        />
      </div>
      
      <div class="settings-item" v-if="settingsStore.proxyEnabled">
        <label>代理地址</label>
        <a-input 
          :value="settingsStore.proxyUrl" 
          @update:value="settingsStore.setProxyUrl"
          placeholder="例如: http://proxy.example.com:8080"
          style="width: 300px"
        />
      </div>
      
      <div class="settings-item">
        <label>请求超时 (毫秒)</label>
        <a-input-number 
          :value="settingsStore.timeout" 
          @update:value="settingsStore.setTimeout"
          :min="1000"
          :max="60000"
          style="width: 200px"
        />
      </div>
    </div>
    
    <div class="settings-actions">
      <a-button type="primary" @click="saveSettings">保存设置</a-button>
      <a-button @click="resetSettings">重置设置</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useSettingsStore } from '../store/settings'
import { message } from 'ant-design-vue'

const settingsStore = useSettingsStore()

// 组件挂载时加载设置
onMounted(() => {
  settingsStore.loadSettings()
  applyTheme(settingsStore.getTheme)
})

// 监听主题变化
watch(() => settingsStore.getTheme, (newTheme) => {
  applyTheme(newTheme)
})

// 应用主题
const applyTheme = (theme: string) => {
  // 移除所有主题类
  document.documentElement.removeAttribute('data-theme')
  
  // 应用新主题
  if (theme !== 'light' && theme !== 'dark' && theme !== 'auto') {
    document.documentElement.setAttribute('data-theme', theme)
  }
  
  // 对于 light/dark/auto 主题，我们依赖 ant-design 的默认实现
}

// 保存设置
const saveSettings = () => {
  const result = settingsStore.saveSettings()
  if (result.success) {
    message.success('设置已保存')
  } else {
    message.error(result.message || '保存失败')
  }
}

// 重置设置
const resetSettings = () => {
  settingsStore.resetSettings()
  message.info('设置已重置')
  applyTheme(settingsStore.getTheme)
}
</script>

<style lang="scss" scoped>
.settings-page {
  padding: 24px;
  background: var(--component-background);
  min-height: 100%;
}

.settings-section {
  margin-bottom: 32px;
  
  h3 {
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border-color-split);
    color: var(--heading-color);
  }
}

.settings-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  
  label {
    width: 120px;
    margin-right: 16px;
    color: var(--text-color);
  }
}

.settings-actions {
  display: flex;
  gap: 16px;
  margin-top: 32px;
}
</style>