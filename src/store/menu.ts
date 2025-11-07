import { defineStore } from 'pinia'
import type { MenuItem } from '../types/layout'

// 定义状态类型
interface MenuState {
  menuList: MenuItem[]
  activeMenuKey: string
  openKeys: string[]
}

// 定义初始状态
const initialState = (): MenuState => ({
  menuList: [],
  activeMenuKey: '',
  openKeys: []
})

export const useMenuStore = defineStore('menu', {
  state: initialState,
  
  getters: {
    // 获取菜单列表
    getMenuList: (state): MenuItem[] => state.menuList,
    
    // 获取激活的菜单key
    getActiveMenuKey: (state): string => state.activeMenuKey,
    
    // 获取展开的菜单keys
    getOpenKeys: (state): string[] => state.openKeys
  },
  
  actions: {
    /**
     * 设置菜单列表
     * @param menuList 菜单列表
     */
    setMenuList(menuList: MenuItem[]) {
      this.menuList = menuList
    },
    
    /**
     * 设置激活的菜单key
     * @param key 菜单key
     */
    setActiveMenuKey(key: string) {
      this.activeMenuKey = key
    },
    
    /**
     * 设置展开的菜单keys
     * @param keys 展开的菜单keys
     */
    setOpenKeys(keys: string[]) {
      this.openKeys = keys
    },
    
    /**
     * 添加展开的菜单key
     * @param key 菜单key
     */
    addOpenKey(key: string) {
      if (!this.openKeys.includes(key)) {
        this.openKeys.push(key)
      }
    },
    
    /**
     * 移除展开的菜单key
     * @param key 菜单key
     */
    removeOpenKey(key: string) {
      const index = this.openKeys.indexOf(key)
      if (index > -1) {
        this.openKeys.splice(index, 1)
      }
    },
    
    /**
     * 清空菜单状态
     */
    clearMenuState() {
      this.menuList = []
      this.activeMenuKey = ''
      this.openKeys = []
    }
  }
})