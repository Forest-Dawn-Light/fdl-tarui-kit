<script setup lang="ts">
import { Menu } from 'ant-design-vue'
import type { MenuItem } from '../../types/layout'
import { h } from 'vue'
import * as antIcons from '@ant-design/icons-vue'
import { useAppStore } from '../../store/app'

interface Props {
  menuList?: MenuItem[]
  collapsed?: boolean
}

withDefaults(defineProps<Props>(), {
  menuList: () => [],
  collapsed: false
})

const appStore = useAppStore()

const emit = defineEmits<{
  (e: 'click', item: any): void
}>()

const handleClick = (item: any) => {
  console.log('Menu item clicked:', item)
  emit('click', item)
}

// 渲染图标
const renderIcon = (icon?: string | any) => {
  if (!icon) return null
  
  if (typeof icon === 'string' && Object.keys(antIcons).includes(icon)) {
    const IconComponent = (antIcons as any)[icon]
    return h(IconComponent)
  }
  
  if (typeof icon === 'object') {
    return h(icon)
  }
  
  return null
}
</script>

<template>
  <Menu
    mode="inline"
    :theme="appStore.getTheme"
    :inline-collapsed="collapsed"
    @click="({ key }) => {
      // 找到被点击的菜单项
      const findMenuItem = (items: MenuItem[]): MenuItem | null => {
        for (const item of items) {
          if (item.key === key) {
            return item
          }
          if (item.children) {
            const found = findMenuItem(item.children)
            if (found) {
              return found
            }
          }
        }
        return null
      }
      
      const menuItem = findMenuItem(menuList)
      if (menuItem) {
        handleClick(menuItem)
      }
    }"
  >
    <template v-for="item in menuList" :key="item.key">
      <Menu.Item v-if="!item.children || item.children.length === 0" :key="item.key">
        <template #icon>
          <component :is="renderIcon(item.icon)" />
        </template>
        <span>{{ item.title }}</span>
      </Menu.Item>
      
      <Menu.SubMenu v-else :key="item.key" :title="item.title">
        <template #icon>
          <component :is="renderIcon(item.icon)" />
        </template>
        <Menu.Item 
          v-for="child in item.children" 
          :key="child.key"
        >
          <span>{{ child.title }}</span>
        </Menu.Item>
      </Menu.SubMenu>
    </template>
  </Menu>
</template>

<style scoped>
/* 在这里添加一些额外的样式调整，确保在新拟物风格下有更好的表现 */
:deep(.ant-menu-item .ant-menu-title-content) {
  flex: 1;
  transition: all 0.3s ease;
}

:deep(.ant-menu-submenu-title .ant-menu-title-content) {
  flex: 1;
  transition: all 0.3s ease;
}
</style>