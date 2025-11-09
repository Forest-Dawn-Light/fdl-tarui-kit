import { defineStore } from 'pinia'
import type { StoreActionResult } from './types'

// 定义设置状态类型
interface SettingsState {
  // 外观设置
  theme: 'light' | 'dark' | 'auto' | 'neumorphism' | 'ghibli'
  language: string
  fontSize: 'small' | 'medium' | 'large'
  
  // 布局设置
  sidebarCollapsed: boolean
  navbarFixed: boolean
  showBreadcrumbs: boolean
  
  // 通知设置
  enableNotifications: boolean
  notificationSound: boolean
  emailNotifications: boolean
  
  // 隐私设置
  allowTracking: boolean
  savePreferencesLocally: boolean
  
  // 系统设置
  autoSave: boolean
  autoBackup: boolean
  backupLocation: string
  
  // 网络设置
  proxyEnabled: boolean
  proxyUrl: string
  timeout: number
}

// 定义初始状态
const initialState = (): SettingsState => ({
  // 外观设置
  theme: 'light',
  language: 'zh-CN',
  fontSize: 'medium',
  
  // 布局设置
  sidebarCollapsed: false,
  navbarFixed: true,
  showBreadcrumbs: true,
  
  // 通知设置
  enableNotifications: true,
  notificationSound: true,
  emailNotifications: false,
  
  // 隐私设置
  allowTracking: true,
  savePreferencesLocally: true,
  
  // 系统设置
  autoSave: true,
  autoBackup: false,
  backupLocation: '',
  
  // 网络设置
  proxyEnabled: false,
  proxyUrl: '',
  timeout: 10000
})

export const useSettingsStore = defineStore('settings', {
  state: initialState,
  
  getters: {
    // 获取主题设置
    getTheme: (state): 'light' | 'dark' | 'auto' | 'neumorphism' | 'ghibli' => state.theme,
    
    // 获取语言设置
    getLanguage: (state): string => state.language,
    
    // 获取字体大小设置
    getFontSize: (state): 'small' | 'medium' | 'large' => state.fontSize,
    
    // 获取侧边栏状态
    getSidebarCollapsed: (state): boolean => state.sidebarCollapsed,
    
    // 获取通知设置
    getEnableNotifications: (state): boolean => state.enableNotifications,
    
    // 获取隐私设置
    getAllowTracking: (state): boolean => state.allowTracking,
    
    // 获取系统设置
    getAutoSave: (state): boolean => state.autoSave,
    
    // 获取网络设置
    getProxyEnabled: (state): boolean => state.proxyEnabled
  },
  
  actions: {
    /**
     * 更新主题设置
     * @param theme 主题
     */
    setTheme(theme: 'light' | 'dark' | 'auto' | 'neumorphism' | 'ghibli'): StoreActionResult {
      this.theme = theme
      return { success: true }
    },
    
    /**
     * 更新语言设置
     * @param language 语言
     */
    setLanguage(language: string): StoreActionResult {
      this.language = language
      return { success: true }
    },
    
    /**
     * 更新字体大小设置
     * @param size 字体大小
     */
    setFontSize(size: 'small' | 'medium' | 'large'): StoreActionResult {
      this.fontSize = size
      return { success: true }
    },
    
    /**
     * 切换侧边栏折叠状态
     */
    toggleSidebar(): StoreActionResult {
      this.sidebarCollapsed = !this.sidebarCollapsed
      return { success: true }
    },
    
    /**
     * 设置侧边栏折叠状态
     * @param collapsed 折叠状态
     */
    setSidebarCollapsed(collapsed: boolean): StoreActionResult {
      this.sidebarCollapsed = collapsed
      return { success: true }
    },
    
    /**
     * 切换导航栏固定状态
     */
    toggleNavbarFixed(): StoreActionResult {
      this.navbarFixed = !this.navbarFixed
      return { success: true }
    },
    
    /**
     * 切换面包屑显示状态
     */
    toggleBreadcrumbs(): StoreActionResult {
      this.showBreadcrumbs = !this.showBreadcrumbs
      return { success: true }
    },
    
    /**
     * 更新通知设置
     * @param enabled 是否启用通知
     */
    setNotifications(enabled: boolean): StoreActionResult {
      this.enableNotifications = enabled
      return { success: true }
    },
    
    /**
     * 更新通知声音设置
     * @param sound 是否启用声音
     */
    setNotificationSound(sound: boolean): StoreActionResult {
      this.notificationSound = sound
      return { success: true }
    },
    
    /**
     * 更新邮件通知设置
     * @param email 是否启用邮件通知
     */
    setEmailNotifications(email: boolean): StoreActionResult {
      this.emailNotifications = email
      return { success: true }
    },
    
    /**
     * 更新隐私设置
     * @param tracking 是否允许跟踪
     */
    setAllowTracking(tracking: boolean): StoreActionResult {
      this.allowTracking = tracking
      return { success: true }
    },
    
    /**
     * 更新自动保存设置
     * @param autoSave 是否自动保存
     */
    setAutoSave(autoSave: boolean): StoreActionResult {
      this.autoSave = autoSave
      return { success: true }
    },
    
    /**
     * 更新自动备份设置
     * @param autoBackup 是否自动备份
     */
    setAutoBackup(autoBackup: boolean): StoreActionResult {
      this.autoBackup = autoBackup
      return { success: true }
    },
    
    /**
     * 更新备份位置
     * @param location 备份位置
     */
    setBackupLocation(location: string): StoreActionResult {
      this.backupLocation = location
      return { success: true }
    },
    
    /**
     * 更新代理设置
     * @param enabled 是否启用代理
     */
    setProxyEnabled(enabled: boolean): StoreActionResult {
      this.proxyEnabled = enabled
      return { success: true }
    },
    
    /**
     * 更新代理URL
     * @param url 代理URL
     */
    setProxyUrl(url: string): StoreActionResult {
      this.proxyUrl = url
      return { success: true }
    },
    
    /**
     * 更新超时设置
     * @param timeout 超时时间（毫秒）
     */
    setTimeout(timeout: number): StoreActionResult {
      this.timeout = timeout
      return { success: true }
    },
    
    /**
     * 重置所有设置为默认值
     */
    resetSettings(): StoreActionResult {
      Object.assign(this, initialState())
      return { success: true }
    },
    
    /**
     * 从本地存储加载设置
     */
    loadSettings(): StoreActionResult {
      try {
        const savedSettings = localStorage.getItem('app_settings')
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings)
          Object.assign(this, parsedSettings)
        }
        return { success: true }
      } catch (error) {
        return { success: false, message: '加载设置失败' }
      }
    },
    
    /**
     * 保存设置到本地存储
     */
    saveSettings(): StoreActionResult {
      try {
        if (this.savePreferencesLocally) {
          const settingsToSave = { ...this.$state }
          localStorage.setItem('app_settings', JSON.stringify(settingsToSave))
        }
        return { success: true }
      } catch (error) {
        return { success: false, message: '保存设置失败' }
      }
    }
  }
})