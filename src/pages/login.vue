<template>
  <div :class="styles['login-page']">
    <div :class="styles['login-container']">
      <h1>用户登录</h1>
      <PureLoginForm 
        :form-data="formData"
        :loading="loading"
        @update:username="updateUsername"
        @update:password="updatePassword"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PureLoginForm from '@/components/LoginForm/PureLoginForm.tsx'
import styles from '@/components/LoginForm/LoginForm.module.scss'

const formData = ref({
  username: '',
  password: ''
})

const loading = ref(false)

const updateUsername = (username: string) => {
  formData.value.username = username
}

const updatePassword = (password: string) => {
  formData.value.password = password
}

const handleSubmit = () => {
  loading.value = true
  // 模拟登录请求
  setTimeout(() => {
    loading.value = false
    console.log('Login attempt with:', formData.value)
    // 实际应用中，这里会调用登录API
  }, 1000)
}
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
  }
}
</style>