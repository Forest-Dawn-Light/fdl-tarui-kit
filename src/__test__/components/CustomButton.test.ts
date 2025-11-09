import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomButton from '../../components/CustomButton.vue'

describe('CustomButton', () => {
  it('should render correctly', () => {
    const wrapper = mount(CustomButton, {
      slots: {
        default: 'Click me'
      }
    })
    
    expect(wrapper.text()).toContain('Click me')
  })

  it('should apply secondary prop when secondary prop is true', () => {
    const wrapper = mount(CustomButton, {
      props: {
        secondary: true
      },
      slots: {
        default: 'Secondary Button'
      }
    })
    
    // 检查 HTML 中是否包含 secondary 类
    expect(wrapper.html()).toContain('secondary')
  })

  it('should apply danger prop when danger prop is true', () => {
    const wrapper = mount(CustomButton, {
      props: {
        danger: true
      },
      slots: {
        default: 'Danger Button'
      }
    })
    
    // 检查 HTML 中是否包含 danger 类
    expect(wrapper.html()).toContain('danger')
  })

  it('should apply disabled prop when disabled prop is true', () => {
    const wrapper = mount(CustomButton, {
      props: {
        disabled: true
      },
      slots: {
        default: 'Disabled Button'
      }
    })
    
    // 检查 HTML 中是否包含 disabled 类
    expect(wrapper.html()).toContain('disabled')
  })
})