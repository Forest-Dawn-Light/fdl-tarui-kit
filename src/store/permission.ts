import { defineStore } from 'pinia';

// 定义权限类型
export type PermissionType = string;

interface PermissionState {
  permissions: PermissionType[]; // 存储用户拥有的权限标识
  isEnabled: boolean; // 权限系统是否启用
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    permissions: [],
    isEnabled: import.meta.env.VITE_PERMISSION_ENABLED === 'true', // 从环境变量读取配置
  }),
  actions: {
    // 设置权限系统启用状态
    setEnabled(enabled: boolean): void {
      this.isEnabled = enabled;
    },
    
    // 设置权限列表
    setPermissions(permissions: PermissionType[]): void {
      this.permissions = permissions;
    },
    
    // 从后端获取权限列表
    async fetchPermissions(): Promise<void> {
      // 如果权限系统未启用，则不获取权限
      if (!this.isEnabled) {
        this.permissions = ['*']; // 给予所有权限
        return;
      }
      
      // 实际项目中替换为真实接口
      const mockRes = await Promise.resolve({
        data: { permissions: ['user:view', 'user:create', 'user:edit', 'user:delete', 'btn:add', 'switch:edit'] },
      });
      this.permissions = mockRes.data.permissions;
    },
    
    // 添加单个权限
    addPermission(permission: PermissionType): void {
      if (!this.permissions.includes(permission)) {
        this.permissions.push(permission);
      }
    },
    
    // 移除单个权限
    removePermission(permission: PermissionType): void {
      const index = this.permissions.indexOf(permission);
      if (index > -1) {
        this.permissions.splice(index, 1);
      }
    },
    
    // 批量添加权限
    addPermissions(permissions: PermissionType[]): void {
      permissions.forEach(permission => {
        this.addPermission(permission);
      });
    },
    
    // 批量移除权限
    removePermissions(permissions: PermissionType[]): void {
      permissions.forEach(permission => {
        this.removePermission(permission);
      });
    },
    
    // 清空权限（退出登录时用）
    clearPermissions(): void {
      this.permissions = [];
    },
  },
  getters: {
    // 判断是否拥有某个权限
    hasPermission:
      (state) =>
      (perm: PermissionType): boolean => {
        // 如果权限系统未启用，则所有权限都通过
        if (!state.isEnabled) return true;
        return state.permissions.includes(perm) || state.permissions.includes('*');
      },
      
    // 判断是否拥有多个权限中的任意一个
    hasAnyPermission:
      (state) =>
      (perms: PermissionType[]): boolean => {
        // 如果权限系统未启用，则所有权限都通过
        if (!state.isEnabled) return true;
        return perms.some(perm => state.permissions.includes(perm)) || state.permissions.includes('*');
      },
      
    // 判断是否拥有所有指定的权限
    hasAllPermissions:
      (state) =>
      (perms: PermissionType[]): boolean => {
        // 如果权限系统未启用，则所有权限都通过
        if (!state.isEnabled) return true;
        return perms.every(perm => state.permissions.includes(perm)) || state.permissions.includes('*');
      },
  },
});