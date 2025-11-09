<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePermissionStore } from '@/store/permission';
import { hasPermission, hasAnyPermission, hasAllPermissions, isPermissionEnabled, PERMISSIONS } from '@/utils/permissionUtils';

// 使用 store
const permissionStore = usePermissionStore();

// 使用工具函数
const canViewUser = ref(false);
const canEditUser = ref(false);
const hasAnyAdminPermission = ref(false);
const hasAllUserPermissions = ref(false);
const permissionEnabled = ref(false);

onMounted(() => {
  // 检查权限系统是否启用
  permissionEnabled.value = isPermissionEnabled();
  
  // 直接使用 store 方法
  canViewUser.value = permissionStore.hasPermission('user:view');
  canEditUser.value = permissionStore.hasPermission('user:edit');
  
  // 使用工具函数
  hasAnyAdminPermission.value = hasAnyPermission(['role:view', 'role:edit']);
  hasAllUserPermissions.value = hasAllPermissions([
    PERMISSIONS.USER.VIEW,
    PERMISSIONS.USER.CREATE,
    PERMISSIONS.USER.EDIT,
    PERMISSIONS.USER.DELETE
  ]);
});

// 添加权限示例
const addPermission = () => {
  permissionStore.addPermission('test:permission');
};

// 移除权限示例
const removePermission = () => {
  permissionStore.removePermission('test:permission');
};

// 切换权限系统启用状态
const togglePermissionSystem = () => {
  permissionStore.setEnabled(!permissionStore.isEnabled);
  // 重新加载权限
  permissionStore.fetchPermissions();
};
</script>

<template>
  <div class="permission-demo">
    <h2>权限系统演示</h2>
    
    <div class="permission-status">
      <p>权限系统启用状态: {{ permissionEnabled }}</p>
      <p>权限系统当前状态: {{ permissionStore.isEnabled ? '已启用' : '已禁用' }}</p>
      <p>拥有用户查看权限: {{ canViewUser }}</p>
      <p>拥有用户编辑权限: {{ canEditUser }}</p>
      <p>拥有任意管理员权限: {{ hasAnyAdminPermission }}</p>
      <p>拥有所有用户管理权限: {{ hasAllUserPermissions }}</p>
    </div>
    
    <div class="permission-actions">
      <button @click="addPermission">添加测试权限</button>
      <button @click="removePermission">移除测试权限</button>
      <button @click="permissionStore.fetchPermissions">获取权限列表</button>
      <button @click="permissionStore.clearPermissions">清空权限</button>
      <button @click="togglePermissionSystem">
        {{ permissionStore.isEnabled ? '禁用' : '启用' }}权限系统
      </button>
    </div>
    
    <div class="directive-examples">
      <h3>指令使用示例</h3>
      
      <!-- 只有拥有 user:create 权限的用户才能看到这个按钮 -->
      <button v-permission="'user:create'">创建用户 (需要 user:create 权限)</button>
      
      <!-- 没有权限时禁用而不是隐藏 -->
      <button v-permission.disabled="'user:delete'">删除用户 (需要 user:delete 权限)</button>
      
      <!-- 拥有任意一个权限即可显示 -->
      <button v-permission="['role:create', 'role:edit']">角色管理 (需要 role:create 或 role:edit 权限)</button>
      
      <!-- 当权限系统禁用时，这些按钮应该始终可见 -->
      <div v-if="!permissionStore.isEnabled" class="notice">
        <p>注意：权限系统当前已禁用，以上按钮的权限控制不会生效</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.permission-demo {
  padding: 20px;
}

.permission-status p {
  margin: 8px 0;
}

.permission-actions {
  margin: 20px 0;
}

.permission-actions button {
  margin-right: 10px;
  margin-bottom: 10px;
}

.directive-examples {
  margin-top: 30px;
}

.directive-examples button {
  display: block;
  margin: 10px 0;
}

.notice {
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 4px;
  padding: 15px;
  margin-top: 20px;
}

.notice p {
  margin: 0;
  color: #856404;
}
</style>