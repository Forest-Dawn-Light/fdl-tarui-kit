import { usePermissionStore } from '@/store/permission';

/**
 * 权限检查工具函数
 */

/**
 * 检查权限系统是否启用
 * @returns boolean
 */
export function isPermissionEnabled(): boolean {
  const permissionStore = usePermissionStore();
  return permissionStore.isEnabled;
}

/**
 * 检查是否拥有指定权限
 * @param permission 权限标识
 * @returns boolean
 */
export function hasPermission(permission: string): boolean {
  // 如果权限系统未启用，则所有权限都通过
  const permissionStore = usePermissionStore();
  if (!permissionStore.isEnabled) return true;
  
  return permissionStore.hasPermission(permission);
}

/**
 * 检查是否拥有多个权限中的任意一个
 * @param permissions 权限标识数组
 * @returns boolean
 */
export function hasAnyPermission(permissions: string[]): boolean {
  // 如果权限系统未启用，则所有权限都通过
  const permissionStore = usePermissionStore();
  if (!permissionStore.isEnabled) return true;
  
  return permissionStore.hasAnyPermission(permissions);
}

/**
 * 检查是否拥有所有指定权限
 * @param permissions 权限标识数组
 * @returns boolean
 */
export function hasAllPermissions(permissions: string[]): boolean {
  // 如果权限系统未启用，则所有权限都通过
  const permissionStore = usePermissionStore();
  if (!permissionStore.isEnabled) return true;
  
  return permissionStore.hasAllPermissions(permissions);
}

/**
 * 预定义的常用权限常量
 */
export const PERMISSIONS = {
  // 用户管理相关权限
  USER: {
    VIEW: 'user:view',
    CREATE: 'user:create',
    EDIT: 'user:edit',
    DELETE: 'user:delete',
  },
  
  // 角色管理相关权限
  ROLE: {
    VIEW: 'role:view',
    CREATE: 'role:create',
    EDIT: 'role:edit',
    DELETE: 'role:delete',
  },
  
  // 系统设置相关权限
  SYSTEM: {
    SETTINGS_VIEW: 'system:settings:view',
    SETTINGS_EDIT: 'system:settings:edit',
  },
  
  // 按钮级别权限
  BUTTON: {
    ADD: 'btn:add',
    EDIT: 'btn:edit',
    DELETE: 'btn:delete',
    EXPORT: 'btn:export',
  },
} as const;

export type PermissionKey = keyof typeof PERMISSIONS;