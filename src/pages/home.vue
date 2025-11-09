<script setup lang="ts">
// 首页内容
</script>

<template>
  <div class="home-page">
    <h2 class="text-2xl font-bold mb-4">欢迎来到 FDL 管理系统</h2>
    <p class="text-gray-600 text-base leading-relaxed">这是一个基于 Tauri + Vue3 + Ant Design Vue 构建的桌面应用程序。</p>
    
    <div class="mt-8 p-4 bg-white rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-2">系统特性</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li class="text-gray-700">现代化的 UI 设计</li>
        <li class="text-gray-700">响应式布局</li>
        <li class="text-gray-700">主题切换功能</li>
        <li class="text-gray-700">模块化组件架构</li>
      </ul>
    </div>
    
    <div class="mt-6 flex items-center justify-center gap-4">
      <button class="btn btn-primary">开始使用</button>
      <button class="btn px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition-colors">
        了解更多
      </button>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  padding: 24px;
}

/* 可以混合使用传统 CSS 和 UnoCSS */
.home-page h2 {
  color: #1d2024;
}

.home-page p {
  color: #666;
  font-size: 16px;
  line-height: 1.5;
}
</style>