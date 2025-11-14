import { ref, Ref } from 'vue'

export interface LoginFormState {
  username: string
  password: string
}

export interface UseLoginFormReturn {
  formData: Ref<LoginFormState>
  loading: Ref<boolean>
  handleInput: (field: keyof LoginFormState, value: string) => void
  handleSubmit: () => void
}

export const useLoginForm = (onLogin: (data: LoginFormState) => void): UseLoginFormReturn => {
  const formData = ref<LoginFormState>({
    username: '',
    password: ''
  })
  
  const loading = ref(false)
  
  const handleInput = (field: keyof LoginFormState, value: string) => {
    formData.value[field] = value
  }
  
  const handleSubmit = () => {
    loading.value = true
    // 模拟登录请求
    setTimeout(() => {
      loading.value = false
      onLogin({ ...formData.value })
    }, 1000)
  }
  
  return {
    formData,
    loading,
    handleInput,
    handleSubmit
  }
}