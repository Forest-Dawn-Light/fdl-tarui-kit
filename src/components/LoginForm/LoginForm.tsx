import { defineComponent } from 'vue'
import { useLoginForm } from './hooks'
import styles from './LoginForm.module.scss'

interface FormData {
  username: string
  password: string
}

export default defineComponent({
  name: 'LoginForm',
  emits: ['login'],
  setup(props, { emit }) {
    const { formData, loading, handleInput, handleSubmit } = useLoginForm((data) => {
      emit('login', data)
    })
    
    return () => (
      <form class={styles['login-form']} onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}>
        <div class={styles['form-group']}>
          <label for="username">用户名:</label>
          <input
            id="username"
            type="text"
            value={formData.value.username}
            onInput={(e) => handleInput('username', (e.target as HTMLInputElement).value)}
            placeholder="请输入用户名"
            required
          />
        </div>
        
        <div class={styles['form-group']}>
          <label for="password">密码:</label>
          <input
            id="password"
            type="password"
            value={formData.value.password}
            onInput={(e) => handleInput('password', (e.target as HTMLInputElement).value)}
            placeholder="请输入密码"
            required
          />
        </div>
        
        <button 
          type="submit" 
          class={styles['login-button']}
          disabled={loading.value}
        >
          {loading.value ? '登录中...' : '登录'}
        </button>
      </form>
    )
  }
})