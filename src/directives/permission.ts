import { Directive, DirectiveBinding } from 'vue';
import { usePermissionStore } from '@/store/permission';

// 定义指令类型：支持传入权限标识（string 或 string[]）
type PermissionDirectiveValue = string | string[];

// 自定义权限指令
const permissionDirective: Directive<HTMLElement, PermissionDirectiveValue> = {
  mounted(
    el: HTMLElement,
    binding: DirectiveBinding<PermissionDirectiveValue>,
  ) {
    checkPermission(el, binding);
  },
  updated(
    el: HTMLElement,
    binding: DirectiveBinding<PermissionDirectiveValue>,
  ) {
    checkPermission(el, binding);
  },
};

function checkPermission(
  el: HTMLElement,
  binding: DirectiveBinding<PermissionDirectiveValue>,
): void {
  const { value: requiredPerms, modifiers } = binding;
  
  // 获取权限 store 实例
  const permissionStore = usePermissionStore();
  
  // 如果权限系统未启用，则不进行任何操作
  if (!permissionStore.isEnabled) return;

  // 如果没有提供权限，则不进行任何操作
  if (!requiredPerms) return;

  let hasPermission = false;
  
  // 处理单个权限或多个权限的情况
  if (typeof requiredPerms === 'string') {
    hasPermission = permissionStore.hasPermission(requiredPerms);
  } else if (Array.isArray(requiredPerms)) {
    // 对于数组，我们检查是否拥有其中任意一个权限（或所有权限，取决于需求）
    hasPermission = permissionStore.hasAnyPermission(requiredPerms);
  }

  // 检查修饰符
  const isDisabled = 'disabled' in modifiers;
  const isHide = 'hide' in modifiers;
  
  // 校验权限：无权限时隐藏或禁用
  if (!hasPermission) {
    if (isDisabled) {
      // 尝试设置 disabled 属性，但需要检查元素是否支持
      if ('disabled' in el) {
        (el as HTMLInputElement).disabled = true;
      }
      el.classList.add('is-disabled');
    } else {
      // 默认行为是隐藏元素，除非明确指定 hide 修饰符为 false
      if (isHide || !('hide' in modifiers)) {
        el.style.display = 'none';
      }
    }
  } else {
    // 有权限时恢复元素状态
    if (isDisabled) {
      // 尝试取消 disabled 属性
      if ('disabled' in el) {
        (el as HTMLInputElement).disabled = false;
      }
      el.classList.remove('is-disabled');
    } else {
      el.style.display = '';
    }
  }
}

export default permissionDirective;