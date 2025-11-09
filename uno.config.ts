import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  theme: {
    colors: {
      // 可以在这里自定义颜色
      primary: '#1890ff',
      success: '#52c41a',
      warning: '#faad14',
      error: '#ff4d4f',
    }
  },
  shortcuts: {
    // 可以在这里定义常用的类组合
    'flex-center': 'flex items-center justify-center',
    'btn': 'px-4 py-2 rounded cursor-pointer transition-all duration-300',
    'btn-primary': 'btn bg-primary text-white hover:opacity-80',
  }
})