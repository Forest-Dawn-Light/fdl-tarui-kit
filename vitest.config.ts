import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue(), vueJsx()],
  test: {
    // 启用类似 jest 的全局测试 API
    globals: true,

    // 使用 jsdom 环境模拟浏览器 API
    environment: 'jsdom',

    // 启用 Vue 相关的测试支持
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },

    // 匹配测试文件
    include: [
      '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'src/__test__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],

    // 排除不需要测试的文件
    exclude: ['node_modules', 'dist', 'src-tauri', '.idea', '.git', '.cache'],

    // 覆盖率配置
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'src-tauri/',
        'coverage/',
        'vitest.config.*',
        '**/*.d.ts',
        '**/{vite,vitest,eslint,prettier}.config.*',
      ],
      // 包含源文件和测试文件
      include: ['src/**/*.{js,jsx,ts,tsx,vue}', 'src/__test__/**/*.{js,jsx,ts,tsx,vue}'],
    },

    // 设置别名
    alias: {
      '@': './src',
    },

    // 配置 setup 文件
    setupFiles: ['./vitest.setup.ts'],

    // 启用隔离
    isolate: true,
  },
  resolve: {
    alias: {
      '@': './src',
    },
  },
});
