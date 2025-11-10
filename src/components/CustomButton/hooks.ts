import { computed } from 'vue';

export interface CustomButtonProps {
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

export const useCustomButton = (props: CustomButtonProps) => {
  const buttonClasses = computed(() => ({
    secondary: props.secondary,
    danger: props.danger,
    disabled: props.disabled
  }));

  return {
    buttonClasses
  };
};