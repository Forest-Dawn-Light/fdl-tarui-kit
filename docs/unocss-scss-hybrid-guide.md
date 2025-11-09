# UnoCSS 与 SCSS 混合使用指南

本文档旨在为项目中 UnoCSS 与 SCSS 混合使用提供指导和最佳实践。

## 1. 概述

本项目同时使用了 UnoCSS（原子化 CSS 引擎）和 SCSS（Sass 预处理器），两者可以协同工作，各自发挥优势：
- **UnoCSS**：提供原子化 CSS 类，快速构建 UI，减少 CSS 代码量
- **SCSS**：提供变量、嵌套、mixins 等预处理功能，增强样式可维护性

## 2. 使用场景

### 2.1 何时使用 UnoCSS

1. **快速原型开发**
   ```html
   <div class="flex items-center justify-center p-4 bg-blue-500 text-white">
     快速布局
   </div>
   ```

2. **常见样式组合**
   ```html
   <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
     按钮
   </button>
   ```

3. **响应式设计**
   ```html
   <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
     响应式网格
   </div>
   ```

### 2.2 何时使用 SCSS

1. **复杂样式逻辑**
   ```scss
   .custom-card {
     background: var(--component-background);
     border-radius: var(--border-radius-base);
     box-shadow: var(--box-shadow-base);
     
     .card-header {
       border-bottom: 1px solid var(--border-color-split);
       
       h3 {
         margin: 0;
         color: var(--heading-color);
       }
     }
   }
   ```

2. **主题变量使用**
   ```scss
   .theme-button {
     background-color: $primary-color;
     border: 1px solid $border-color;
   }
   ```

3. **Mixin 复用**
   ```scss
   .scrollable {
     @include scrollbar;
   }
   ```

## 3. 混合使用最佳实践

### 3.1 在组件中混合使用

```vue
<template>
  <div class="p-4 bg-white rounded shadow-md">
    <h2 class="text-xl font-bold mb-2 custom-title">标题</h2>
    <p class="text-gray-600 mb-4">描述文本</p>
    <button class="btn btn-primary">操作按钮</button>
  </div>
</template>

<style lang="scss" scoped>
.custom-title {
  color: var(--heading-color);
  &:hover {
    color: var(--primary-color);
  }
}
</style>
```

### 3.2 在 SCSS 中使用 UnoCSS 类

通过 `@apply` 指令在 SCSS 中使用 UnoCSS 类：

```scss
.primary-button {
  @apply px-4 py-2 bg-blue-500 text-white rounded;
  
  &:hover {
    @apply bg-blue-600;
  }
  
  &:disabled {
    @apply opacity-50 cursor-not-allowed;
  }
}
```

### 3.3 定义 UnoCSS 快捷类

在 [uno.config.ts](../../uno.config.ts) 中定义快捷类组合：

```ts
export default defineConfig({
  shortcuts: {
    'btn': 'px-4 py-2 rounded cursor-pointer transition-all duration-300',
    'btn-primary': 'btn bg-primary text-white hover:opacity-80',
    'flex-center': 'flex items-center justify-center',
    'card': 'bg-white rounded shadow-md p-4'
  }
})
```

使用快捷类：
```html
<button class="btn btn-primary">主要按钮</button>
<div class="card flex-center">卡片内容</div>
```

## 4. 主题和变量集成

### 4.1 SCSS 变量与 UnoCSS 集成

在 SCSS 中定义主题变量：
```scss
// variables.scss
$primary-color: #1890ff;
$success-color: #52c41a;
```

在 UnoCSS 配置中引用：
```ts
// uno.config.ts
export default defineConfig({
  theme: {
    colors: {
      primary: '#1890ff',
      success: '#52c41a',
    }
  }
})
```

### 4.2 项目中的变量配置

项目中已经配置了统一的主题变量，可以在 UnoCSS 和 SCSS 中使用：

**SCSS 变量** ([global.scss](../../src/styles/global.scss)):
```scss
$primary-color: #1890ff;
$success-color: #52c41a;
$warning-color: #faad14;
$error-color: #ff4d4f;
```

**CSS 变量** ([global.scss](../../src/styles/global.scss)):
```scss
:root {
  --primary-color: #1890ff;
  --success-color: #52c41a;
  --warning-color: #faad14;
  --error-color: #ff4d4f;
  --heading-color: rgba(0, 0, 0, 0.85);
  --text-color: rgba(0, 0, 0, 0.65);
}
```

**UnoCSS 颜色配置** ([uno.config.ts](../../uno.config.ts)):
```ts
theme: {
  colors: {
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
  }
}
```

### 4.3 使用项目变量

在 SCSS 中使用：
```scss
.button {
  background-color: $primary-color;
  color: $component-background;
}
```

在 UnoCSS 中使用：
```html
<div class="bg-primary text-white">内容</div>
```

使用 CSS 变量：
```scss
.title {
  color: var(--heading-color);
}
```

```html
<div class="text-[var(--heading-color)]">内容</div>
```

## 5. 性能优化建议

### 5.1 避免重复样式

❌ 不推荐：
```html
<div class="p-4 bg-white rounded shadow-md p-4"> <!-- 重复的 p-4 -->
  内容
</div>
```

✅ 推荐：
```html
<div class="p-4 bg-white rounded shadow-md">
  内容
</div>
```

### 5.2 合理使用 @apply

❌ 不推荐在 SCSS 中大量使用 @apply：
```scss
.bad-example {
  @apply flex items-center justify-center p-4 m-2 bg-white rounded shadow text-lg font-bold text-blue-500;
}
```

✅ 推荐：
```scss
.good-example {
  @apply p-4 bg-white rounded shadow;
  
  .title {
    @apply text-lg font-bold text-blue-500;
  }
  
  .content {
    @apply m-2;
  }
}
```

## 6. 组件设计规范

### 6.1 原子类优先原则

对于简单的样式，优先使用原子类：
```html
<!-- 推荐 -->
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  按钮
</button>
```

### 6.2 语义化类名

对于复杂或可复用的样式，使用语义化类名：
```vue
<template>
  <div class="user-card">
    <img class="avatar" :src="user.avatar" />
    <div class="user-info">
      <h3 class="username">{{ user.name }}</h3>
      <p class="bio">{{ user.bio }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-card {
  @apply flex items-center p-4 bg-white rounded shadow;
  
  .avatar {
    @apply w-12 h-12 rounded-full mr-4;
  }
  
  .user-info {
    .username {
      @apply text-lg font-bold;
    }
    
    .bio {
      @apply text-gray-600 text-sm;
    }
  }
}
</style>
```

## 7. 注意事项

1. **避免样式冲突**：UnoCSS 类的优先级可能与 SCSS 样式冲突，注意选择器特异性
2. **构建性能**：过多的原子类可能增加 HTML 大小，合理使用
3. **团队一致性**：团队成员应遵循相同的混合使用规范
4. **维护性**：定期审查和重构样式代码，保持一致性

## 8. 常见问题解决

### 8.1 样式不生效

检查以下几点：
1. 确认 UnoCSS 插件已正确配置
2. 确认 `virtual:uno.css` 已在入口文件中导入
3. 检查类名拼写是否正确
4. 确认 SCSS 嵌套层级是否过深

### 8.2 样式优先级问题

UnoCSS 默认使用 `!important`，如需调整：
```ts
// uno.config.ts
export default defineConfig({
  important: true // 或指定特定选择器
})
```

或在 SCSS 中使用 `!important`：
```scss
.custom-class {
  color: red !important;
}
```

## 9. 参考资源

- [UnoCSS 官方文档](https://unocss.dev/)
- [Sass 官方文档](https://sass-lang.com/documentation/)
- [项目 UnoCSS 配置](../../uno.config.ts)
- [项目 SCSS 样式文件](../../src/styles/)