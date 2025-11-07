<script setup lang="ts">
import { Menu } from 'ant-design-vue'
import type { MenuItem } from '../../types/layout'
import { h } from 'vue'
import * as antIcons from '@ant-design/icons-vue'

interface Props {
  menuList?: MenuItem[]
  collapsed?: boolean
}

withDefaults(defineProps<Props>(), {
  menuList: () => [],
  collapsed: false
})

const handleClick = (item: any) => {
  console.log('Menu item clicked:', item)
}

// 渲染图标
const renderIcon = (icon?: string | any) => {
  if (!icon) return null
  
  if (typeof icon === 'string' && Object.keys(antIcons).includes(icon)) {
    const IconComponent = (antIcons as any)[icon]
    return h(IconComponent)
  }
  
  return h(icon)
}
</script>

<template>
  <Menu
    mode="inline"
    :inline-collapsed="collapsed"
    @click="handleClick"
  >
    <template v-for="item in menuList" :key="item.key">
      <Menu.Item v-if="!item.children || item.children.length === 0" :key="item.key + '-item'">
        <template #icon>
          <component :is="renderIcon(item.icon)" />
        </template>
        <span>{{ item.title }}</span>
      </Menu.Item>
      
      <Menu.SubMenu v-else :key="item.key + '-submenu'" :title="item.title">
        <template #icon>
          <component :is="renderIcon(item.icon)" />
        </template>
        <Menu.Item 
          v-for="child in item.children" 
          :key="child.key"
        >
          {{ child.title }}
        </Menu.Item>
      </Menu.SubMenu>
    </template>
  </Menu>
</template>

<style scoped></style>