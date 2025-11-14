import { defineComponent, PropType } from 'vue'
import styles from './LoginForm.module.scss'

interface FormData {
  username: string
  password: string
}

export default defineComponent({
  name: 'PureLoginForm',
  props: {
    formData: {
      type: Object as PropType<FormData>,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:username', 'update:password', 'submit'],
  setup(props, { emit }) {
    const handleUsernameInput = (value: string) => {
      emit('update:username', value)
    }

    const handlePasswordInput = (value: string) => {
      emit('update:password', value)
    }

    const handleSubmit = () => {
      emit('submit')
    }

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
            value={props.formData.username}
            onInput={(e) => handleUsernameInput((e.target as HTMLInputElement).value)}
            placeholder="请输入用户名"
            required
          />
        </div>
        
        <div class={styles['form-group']}>
          <label for="password">密码:</label>
          <input
            id="password"
            type="password"
            value={props.formData.password}
            onInput={(e) => handlePasswordInput((e.target as HTMLInputElement).value)}
            placeholder="请输入密码"
            required
          />
        </div>
        
        <button 
          type="submit" 
          class={styles['login-button']}
          disabled={props.loading}
        >
          {props.loading ? '登录中...' : '登录'}
        </button>
      </form>
    )
  }
})