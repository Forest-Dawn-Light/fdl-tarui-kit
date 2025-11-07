<template>
  <button 
    class="custom-button" 
    :class="[{ secondary, danger, disabled }, $attrs.class]" 
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  secondary?: boolean
  danger?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  secondary: false,
  danger: false,
  disabled: false
})
</script>

<style lang="scss" scoped>
@import '../styles/global.scss';

.custom-button {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid $primary-color;
  background-color: $primary-color;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  font-size: $font-size-base;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &.secondary {
    background-color: transparent;
    color: $primary-color;
    
    &:hover {
      background-color: rgba($color: $primary-color, $alpha: 0.1);
    }
  }
  
  &.danger {
    border-color: $error-color;
    background-color: $error-color;
  }
  
  &.disabled {
    @include disabled;
  }
}
</style>