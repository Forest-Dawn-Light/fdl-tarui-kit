import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ImageCardList from '../../components/ImageCardList/ImageCardList.vue'

describe('ImageCardList', () => {
  const mockCards = [
    {
      id: 1,
      imageUrl: 'https://example.com/image1.jpg',
      title: 'Card 1',
      description: 'Description 1'
    }
  ]

  it('should render correctly with cards', () => {
    const wrapper = mount(ImageCardList, {
      props: {
        cards: mockCards
      }
    })

    // 检查根元素是否存在
    expect(wrapper.exists()).toBe(true)
    
    // 检查文本内容是否正确渲染
    const renderedText = wrapper.text()
    expect(renderedText).toContain('Card 1')
    expect(renderedText).toContain('Description 1')
  })

  it('should render correctly without descriptions', () => {
    const cardsWithoutDescriptions = [{
      id: 1,
      imageUrl: 'https://example.com/image1.jpg',
      title: 'Card 1'
    }]

    const wrapper = mount(ImageCardList, {
      props: {
        cards: cardsWithoutDescriptions
      }
    })

    // 检查是否不包含描述文字
    const renderedText = wrapper.text()
    expect(renderedText).toContain('Card 1')
    // 因为描述文本未提供，所以不应该包含这些内容
    expect(renderedText).not.toContain('Description 1')
  })
})