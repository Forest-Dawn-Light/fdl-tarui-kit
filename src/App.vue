<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useAppStore } from './store/app'
import { useSettingsStore } from './store/settings'
import { useUserStore } from './store/user'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'
import Layout from './layout/Layout.vue'

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const userStore = useUserStore()

// 组件挂载时加载设置和用户信息
onMounted(() => {
  settingsStore.loadSettings()
  userStore.fetchUserInfo()
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
  
  // 同步应用主题与设置存储
  appStore.syncAppThemeWithSettings()
}

// 根据语言设置计算 antd 的 locale
const locale = computed(() => {
  switch (settingsStore.getLanguage) {
    case 'en-US':
      return enUS
    case 'zh-CN':
    default:
      return zhCN
  }
})
</script>

<template>
  <a-config-provider :locale="locale">
    <Layout />
  </a-config-provider>
</template>

<style lang="scss">
@import './styles/global.scss';

#app {
  height: 100%;
}

// 响应式设计
@include mobile {
  .layout-content {
    margin: 8px;
    padding: 12px;
  }
}

@include tablet {
  .layout-content {
    margin: 12px;
    padding: 16px;
  }
}
</style>