<script setup lang="ts">
import { computed } from 'vue';
import { useMenuStore } from '@/store/menu';
import { useRouter, useRoute } from 'vue-router';
import type { MenuItem } from '@/types/layout';
import {
  HomeOutlined,
  SettingOutlined,
  DatabaseOutlined,
  ToolOutlined,
  SafetyCertificateOutlined,
  ExperimentOutlined,
} from '@ant-design/icons-vue';
import { useAppStore } from '@/store';

// 使用 store 和 router
const menuStore = useMenuStore();
const router = useRouter();
const route = useRoute();
const appStore = useAppStore();

// 定义菜单数据
const menuData = computed<MenuItem[]>(() => [
  {
    key: 'home',
    title: '首页',
    icon: HomeOutlined,
  },
  {
    key: 'settings',
    title: '系统设置',
    icon: SettingOutlined,
  },
  {
    key: 'utils',
    title: '工具演示',
    icon: ToolOutlined,
    children: [
      {
        key: 'lodash',
        title: 'Lodash 工具',
      },
      {
        key: 'utils',
        title: '常用工具',
      },
      {
        key: 'validator',
        title: '验证工具',
      },
      {
        key: 'storage',
        title: '存储工具',
      },
      {
        key: 'permission',
        title: '权限系统',
        icon: SafetyCertificateOutlined,
      },
      {
        key: 'alias-test',
        title: '路径别名测试',
        icon: ExperimentOutlined,
      },
    ],
  },
  {
    key: 'data',
    title: '数据管理',
    icon: DatabaseOutlined,
    children: [
      {
        key: 'data-list',
        title: '数据列表',
      },
      {
        key: 'data-analysis',
        title: '数据分析',
      },
    ],
  },
]);

// 设置菜单列表
menuStore.setMenuList(menuData.value);

// 处理菜单点击
const handleMenuClick = ({ key }: { key: string }) => {
  menuStore.setActiveMenuKey(key);
  router.push({ name: getKeyToRouteMap()[key] || 'Home' });
};

// 菜单 key 到路由 name 的映射
const getKeyToRouteMap = (): Record<string, string> => ({
  home: 'Home',
  settings: 'Settings',
  lodash: 'LodashDemo',
  utils: 'UtilsDemo',
  validator: 'ValidatorDemo',
  storage: 'StorageDemo',
  permission: 'PermissionDemo',
  'alias-test': 'AliasTest',
  'data-list': 'DataList',
  'data-analysis': 'DataAnalysis',
});

// 计算激活的菜单 key
const selectedKeys = computed(() => [menuStore.getActiveMenuKey || route.name || 'home']);

// 计算展开的菜单 keys
const openKeys = computed(() => menuStore.getOpenKeys);
</script>

<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    mode="inline"
    :theme="appStore.getTheme"
    @click="handleMenuClick"
  >
    <template v-for="item in menuData" :key="item.key">
      <a-sub-menu v-if="item.children" :key="item.key">
        <template #title>
          <component v-if="item.icon" :is="item.icon" />
          <span>{{ item.title }}</span>
        </template>
        <a-menu-item v-for="child in item.children" :key="child.key">
          <component v-if="child.icon" :is="child.icon" />
          <span>{{ child.title }}</span>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-else :key="item.key">
        <component v-if="item.icon" :is="item.icon" />
        <span>{{ item.title }}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>
