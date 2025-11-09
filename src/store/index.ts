import { createPinia } from 'pinia';
import { useUserStore } from './user';
import { useAppStore } from './app';
import { useMenuStore } from './menu';
import { useSettingsStore } from './settings';
import { usePermissionStore } from './permission';

// 创建 pinia 实例
const pinia = createPinia();

// 导出所有 stores
export { useUserStore, useAppStore, useMenuStore, useSettingsStore, usePermissionStore };

// 导出 pinia 实例
export default pinia;