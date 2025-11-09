<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import LayoutHead from './LayoutHead.vue';
import LayoutFooter from './LayoutFooter.vue';
import { Layout as AntLayout, LayoutSider, LayoutContent } from 'ant-design-vue';
import LayoutMenu from './components/LayoutMenu.vue';
import {
  DashboardOutlined,
  SettingOutlined,
  ToolOutlined,
  DatabaseOutlined,
} from '@ant-design/icons-vue';
import { useAppStore } from '../store/app';
import { useMenuStore } from '../store/menu';
import { useRouter } from 'vue-router';

// 使用 store
const appStore = useAppStore();
const menuStore = useMenuStore();
const router = useRouter();

// 定义菜单数据
const menuList = reactive([
  {
    key: 'dashboard',
    title: '仪表盘',
    icon: DashboardOutlined,
  },
  {
    key: 'system',
    title: '系统管理',
    icon: SettingOutlined,
    children: [
      {
        key: 'users',
        title: '用户管理',
      },
      {
        key: 'roles',
        title: '角色管理',
      },
      {
        key: 'settings',
        title: '系统设置',
      },
    ],
  },
  {
    key: 'tools',
    title: '工具演示',
    icon: ToolOutlined,
    children: [
      {
        key: 'storage',
        title: '存储工具',
        icon: DatabaseOutlined,
      },
      {
        key: 'lodash',
        title: 'Lodash 工具',
        icon: DatabaseOutlined,
      },
      {
        key: 'utils',
        title: '通用工具',
        icon: DatabaseOutlined,
      },
      {
        key: 'validator',
        title: '验证工具',
        icon: DatabaseOutlined,
      },
    ],
  },
]);

// 设置菜单列表到 store
onMounted(() => {
  menuStore.setMenuList(menuList);
  console.log('菜单列表:', menuList);
});

const handleMenuClick = (item: any) => {
  console.log('点击菜单项:', item);
  menuStore.setActiveMenuKey(item.key);

  // 根据菜单项导航到对应页面
  switch (item.key) {
    case 'dashboard':
      router.push('/');
      break;
    case 'settings':
      router.push('/settings');
      break;
    case 'lodash':
      router.push('/lodash');
      break;
    case 'utils':
      router.push('/utils');
      break;
    case 'validator':
      router.push('/validator');
      break;
    case 'storage':
      router.push('/storage');
      break;
    default:
      // 处理子菜单项
      if (item.key) {
        router.push(`/${item.key}`);
      }
      console.log('未找到对应的路由:', item.key);
  }
};

const layoutMainClass = computed(() => {
  return ['layout-main', { collapsed: appStore.collapsed }];
});
</script>

<template>
  <AntLayout class="layout-container">
    <LayoutSider
      v-model:collapsed="appStore.collapsed"
      :trigger="null"
      collapsible
      width="256"
      :theme="appStore.getTheme"
      class="layout-sider"
    >
      <div class="logo">
        <h1 v-if="!appStore.collapsed">FDL管理系统</h1>
        <h1 v-else>FDL</h1>
      </div>
      <div class="layout-menu">
        <LayoutMenu
          :menu-list="menuStore.getMenuList"
          :collapsed="appStore.collapsed"
          @click="handleMenuClick"
        />
      </div>
    </LayoutSider>

    <AntLayout :class="layoutMainClass">
      <LayoutHead v-model:collapsed="appStore.collapsed" />

      <LayoutContent class="layout-content">
        <div class="content-wrapper">
          <router-view />
        </div>
      </LayoutContent>

      <LayoutFooter />
    </AntLayout>
  </AntLayout>
</template>

<style scoped>
.layout-container {
  min-height: 100vh;
}

.layout-sider {
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  z-index: 100;
  transition: width 0.3s;
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.3);
  margin-bottom: 16px;
}

.logo h1 {
  color: white;
  font-size: 18px;
  margin: 0;
}

.layout-menu {
  padding: 0 16px;
}

.layout-main {
  margin-left: 256px;
  transition: margin-left 0.3s;
  height: 100vh;
  overflow-y: auto;
}

.layout-main.collapsed {
  margin-left: 80px;
}

.layout-content {
  margin: 24px 16px 0;
  overflow: initial;
}

.content-wrapper {
  padding: 24px;
  background: #fff;
  min-height: 360px;
}
/* 使用 UnoCSS 类 */
.flex-center {
  @apply flex items-center justify-center;
}

.text-primary {
  @apply text-[#1890ff];
}
</style>
