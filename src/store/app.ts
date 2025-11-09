import { defineStore } from 'pinia';
import { useSettingsStore } from './settings';

// 定义状态类型
interface AppState {
  collapsed: boolean;
  theme: 'light' | 'dark';
  locale: string;
  loading: boolean;
  breadcrumbs: string[];
}

// 定义初始状态
const initialState = (): AppState => ({
  collapsed: false,
  theme: 'light',
  locale: 'zh-CN',
  loading: false,
  breadcrumbs: [],
});

export const useAppStore = defineStore('app', {
  state: initialState,

  getters: {
    // 获取侧边栏折叠状态
    getSiderCollapsed: (state): boolean => state.collapsed,

    // 获取主题
    getTheme: (state): 'light' | 'dark' => state.theme,

    // 获取语言
    getLocale: (state): string => state.locale,

    // 获取面包屑
    getBreadcrumbs: (state): string[] => state.breadcrumbs,
  },

  actions: {
    /**
     * 切换侧边栏折叠状态
     */
    toggleSiderCollapsed() {
      this.collapsed = !this.collapsed;
    },

    /**
     * 设置侧边栏折叠状态
     * @param collapsed 折叠状态
     */
    setSiderCollapsed(collapsed: boolean) {
      this.collapsed = collapsed;
    },

    /**
     * 切换主题
     */
    toggleTheme() {
      const settingsStore = useSettingsStore();
      const themes = ['light', 'dark', 'neumorphism', 'ghibli'];
      const currentIndex = themes.indexOf(settingsStore.getTheme);
      const nextIndex = (currentIndex + 1) % themes.length;
      settingsStore.setTheme(themes[nextIndex] as any);
      this.syncAppThemeWithSettings();
    },

    /**
     * 设置主题
     * @param theme 主题
     */
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme;
    },

    /**
     * 同步应用主题与设置存储
     */
    syncAppThemeWithSettings() {
      const settingsStore = useSettingsStore();
      if (settingsStore.getTheme === 'light' || settingsStore.getTheme === 'dark') {
        this.theme = settingsStore.getTheme;
      } else {
        // 对于自定义主题，我们保持为light以确保Ant Design组件正常工作
        this.theme = 'light';
      }
    },

    /**
     * 设置语言
     * @param locale 语言
     */
    setLocale(locale: string) {
      this.locale = locale;
    },

    /**
     * 显示全局加载状态
     */
    showLoading() {
      this.loading = true;
    },

    /**
     * 隐藏全局加载状态
     */
    hideLoading() {
      this.loading = false;
    },

    /**
     * 设置面包屑
     * @param breadcrumbs 面包屑数组
     */
    setBreadcrumbs(breadcrumbs: string[]) {
      this.breadcrumbs = breadcrumbs;
    },

    /**
     * 添加面包屑
     * @param breadcrumb 面包屑项
     */
    addBreadcrumb(breadcrumb: string) {
      if (!this.breadcrumbs.includes(breadcrumb)) {
        this.breadcrumbs.push(breadcrumb);
      }
    },
  },
});