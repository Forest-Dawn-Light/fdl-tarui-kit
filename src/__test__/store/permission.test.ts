import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { usePermissionStore } from '../../store/permission';

describe('Permission Store', () => {
  beforeEach(() => {
    // 创建新的 pinia 实例
    setActivePinia(createPinia());
  });

  it('should initialize with empty permissions', () => {
    const permissionStore = usePermissionStore();
    expect(permissionStore.permissions).toEqual([]);
  });

  it('should add and remove permissions correctly', () => {
    const permissionStore = usePermissionStore();
    
    // 添加权限
    permissionStore.addPermission('user:view');
    expect(permissionStore.permissions).toContain('user:view');
    
    // 再次添加相同权限不应重复
    permissionStore.addPermission('user:view');
    expect(permissionStore.permissions.filter(p => p === 'user:view').length).toBe(1);
    
    // 移除权限
    permissionStore.removePermission('user:view');
    expect(permissionStore.permissions).not.toContain('user:view');
  });

  it('should check permissions correctly', () => {
    const permissionStore = usePermissionStore();
    permissionStore.setPermissions(['user:view', 'user:create']);
    
    expect(permissionStore.hasPermission('user:view')).toBe(true);
    expect(permissionStore.hasPermission('user:edit')).toBe(false);
  });

  it('should check multiple permissions correctly', () => {
    const permissionStore = usePermissionStore();
    permissionStore.setPermissions(['user:view', 'user:create', 'role:view']);
    
    expect(permissionStore.hasAnyPermission(['user:view', 'user:edit'])).toBe(true);
    expect(permissionStore.hasAnyPermission(['user:edit', 'user:delete'])).toBe(false);
    
    expect(permissionStore.hasAllPermissions(['user:view', 'user:create'])).toBe(true);
    expect(permissionStore.hasAllPermissions(['user:view', 'user:delete'])).toBe(false);
  });

  it('should add and remove multiple permissions', () => {
    const permissionStore = usePermissionStore();
    
    permissionStore.addPermissions(['user:view', 'user:create']);
    expect(permissionStore.permissions).toEqual(['user:view', 'user:create']);
    
    permissionStore.removePermissions(['user:view']);
    expect(permissionStore.permissions).toEqual(['user:create']);
  });

  it('should clear all permissions', () => {
    const permissionStore = usePermissionStore();
    permissionStore.setPermissions(['user:view', 'user:create']);
    permissionStore.clearPermissions();
    expect(permissionStore.permissions).toEqual([]);
  });

  it('should grant all permissions when system is disabled', () => {
    // 模拟权限系统禁用的情况
    const originalEnv = import.meta.env.VITE_PERMISSION_ENABLED;
    import.meta.env.VITE_PERMISSION_ENABLED = 'false';
    
    // 重新创建 store 实例以获取新的环境变量值
    const permissionStore = usePermissionStore();
    permissionStore.setEnabled(false);
    
    // 即使没有设置权限，也应该返回 true
    expect(permissionStore.hasPermission('user:view')).toBe(true);
    expect(permissionStore.hasAnyPermission(['user:view', 'user:edit'])).toBe(true);
    expect(permissionStore.hasAllPermissions(['user:view', 'user:edit'])).toBe(true);
    
    // 恢复原始环境变量值
    import.meta.env.VITE_PERMISSION_ENABLED = originalEnv;
  });

  it('should fetch all permissions when system is disabled', async () => {
    // 模拟权限系统禁用的情况
    const originalEnv = import.meta.env.VITE_PERMISSION_ENABLED;
    import.meta.env.VITE_PERMISSION_ENABLED = 'false';
    
    const permissionStore = usePermissionStore();
    permissionStore.setEnabled(false);
    
    await permissionStore.fetchPermissions();
    expect(permissionStore.permissions).toEqual(['*']);
    
    // 恢复原始环境变量值
    import.meta.env.VITE_PERMISSION_ENABLED = originalEnv;
  });
});