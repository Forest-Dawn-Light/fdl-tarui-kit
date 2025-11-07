<script setup lang="ts">
import { ref } from 'vue'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { useAppStore } from '../store/app'

const appStore = useAppStore()

interface Props {
  collapsed?: boolean
}

interface Emits {
  (e: 'update:collapsed', collapsed: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false
})

const emit = defineEmits<Emits>()

const toggleCollapsed = () => {
  appStore.toggleSiderCollapsed()
}
</script>

<template>
  <div class="layout-header">
    <div class="trigger" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="appStore.getSiderCollapsed" />
      <MenuFoldOutlined v-else />
    </div>
    <div class="header-content">
      <slot name="headerContent"></slot>
    </div>
  </div>
</template>

<style scoped>
.layout-header {
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 64px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 10;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.header-content {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
</style>