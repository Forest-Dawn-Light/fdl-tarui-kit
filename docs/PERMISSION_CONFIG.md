# 权限系统配置说明

## 环境变量配置

权限系统可以通过环境变量来控制是否启用。这样可以在不同的环境中灵活配置权限系统的启用状态。

### 环境变量文件

项目支持以下环境变量文件：

1. `.env` - 默认环境变量文件
2. `.env.development` - 开发环境变量文件
3. `.env.production` - 生产环境变量文件

### 配置项

```env
# 权限系统启用配置
VITE_PERMISSION_ENABLED=true
```

- `true`: 启用权限系统，按照实际权限进行控制
- `false`: 禁用权限系统，所有权限检查都会通过

## 使用方法

### 1. 配置环境变量

在相应的环境变量文件中设置：

```env
# .env.development - 开发环境禁用权限系统
VITE_PERMISSION_ENABLED=false

# .env.production - 生产环境启用权限系统
VITE_PERMISSION_ENABLED=true
```

### 2. 在代码中使用

权限系统提供了多种使用方式：

#### 使用 Store

```typescript
import { usePermissionStore } from '@/store/permission';

const permissionStore = usePermissionStore();

// 检查权限系统是否启用
if (permissionStore.isEnabled) {
  // 权限系统已启用
}

// 检查权限
if (permissionStore.hasPermission('user:view')) {
  // 有权限
}
```

#### 使用工具函数

```typescript
import { 
  isPermissionEnabled, 
  hasPermission, 
  hasAnyPermission, 
  hasAllPermissions 
} from '@/utils/permissionUtils';

// 检查权限系统是否启用
if (isPermissionEnabled()) {
  // 权限系统已启用
}

// 检查权限
if (hasPermission('user:view')) {
  // 有权限
}
```

#### 使用指令

```vue
<template>
  <!-- 只有拥有 user:create 权限的用户才能看到这个按钮 -->
  <button v-permission="'user:create'">创建用户</button>
  
  <!-- 没有权限时禁用而不是隐藏 -->
  <button v-permission.disabled="'user:delete'">删除用户</button>
</template>
```

### 3. 动态切换权限系统状态

权限系统支持在运行时动态切换启用状态：

```typescript
import { usePermissionStore } from '@/store/permission';

const permissionStore = usePermissionStore();

// 禁用权限系统
permissionStore.setEnabled(false);

// 启用权限系统
permissionStore.setEnabled(true);
```

## 工作原理

当权限系统禁用时：

1. 所有权限检查函数（[hasPermission](file:///Users/mengxiang/Projects/Company/FDL/fdl-tarui-kit/src/utils/permissionUtils.ts#L11-L14)、[hasAnyPermission](file:///Users/mengxiang/Projects/Company/FDL/fdl-tarui-kit/src/utils/permissionUtils.ts#L21-L24)、[hasAllPermissions](file:///Users/mengxiang/Projects/Company/FDL/fdl-tarui-kit/src/utils/permissionUtils.ts#L31-L34)）都会返回 `true`
2. 权限指令不会对元素进行任何操作（既不隐藏也不禁用）
3. 调用 [fetchPermissions](file:///Users/mengxiang/Projects/Company/FDL/fdl-tarui-kit/src/store/permission.ts#L35-L44) 时会自动赋予所有权限（用 `*` 表示）
4. 这样可以确保在权限系统禁用时，所有功能都对用户可见和可用

## 最佳实践

1. 在开发环境中可以禁用权限系统，方便开发和测试所有功能
2. 在生产环境中启用权限系统，确保安全性
3. 可以通过管理界面动态切换权限系统状态，用于调试或紧急处理
4. 在界面中显示权限系统当前状态，让用户了解权限控制情况