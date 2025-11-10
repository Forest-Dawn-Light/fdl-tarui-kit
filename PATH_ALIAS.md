# 路径别名配置说明

## 配置概述

本项目已配置路径别名，可以使用 `@` 符号来引用 `src` 目录，简化导入路径。

## 配置文件

### 1. Vite 配置 (vite.config.ts)

```typescript
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
```

### 2. TypeScript 配置 (tsconfig.json)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## 使用方法

配置完成后，你可以使用 `@` 符号来代替相对路径导入：

### 之前的方式（相对路径）：
```typescript
import { usePermissionStore } from '../store/permission';
import { PERMISSIONS } from '../utils/permissionUtils';
import type { MenuItem } from '../types/layout';
```

### 之后的方式（路径别名）：
```typescript
import { usePermissionStore } from '@/store/permission';
import { PERMISSIONS } from '@/utils/permissionUtils';
import type { MenuItem } from '@/types/layout';
```

## 优势

1. **简化路径**：避免使用复杂的相对路径（如 `../../../store`）
2. **提高可读性**：路径更加清晰易懂
3. **便于重构**：移动文件时不需要更新导入路径
4. **减少错误**：避免因相对路径错误导致的导入失败

## 注意事项

1. 确保在 `tsconfig.json` 和 `vite.config.ts` 中都配置了路径映射
2. IDE 需要重新加载项目或重启以识别新的路径别名
3. 路径别名仅在项目内部使用，不适用于发布到 npm 的库