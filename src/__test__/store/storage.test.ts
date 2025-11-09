import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useStorageStore } from '../../store/storage'

describe('storageStore', () => {
  beforeEach(() => {
    // 创建新的 pinia 实例并激活
    setActivePinia(createPinia())
    
    // 清空 localStorage
    localStorage.clear()
  })

  it('should set and get item correctly', () => {
    const storageStore = useStorageStore()
    
    const setResult = storageStore.setItem('testKey', 'testValue')
    expect(setResult.success).toBe(true)
    
    const getResult = storageStore.getItem('testKey')
    expect(getResult.success).toBe(true)
    expect(getResult.data).toBe('testValue')
  })

  it('should return null for non-existent keys', () => {
    const storageStore = useStorageStore()
    
    const result = storageStore.getItem('nonExistentKey')
    expect(result.success).toBe(true)
    expect(result.data).toBeNull()
  })

  it('should remove item correctly', () => {
    const storageStore = useStorageStore()
    
    storageStore.setItem('testKey', 'testValue')
    const removeResult = storageStore.removeItem('testKey')
    expect(removeResult.success).toBe(true)
    
    const getResult = storageStore.getItem('testKey')
    expect(getResult.success).toBe(true)
    expect(getResult.data).toBeNull()
  })

  it('should check if item exists', () => {
    const storageStore = useStorageStore()
    
    storageStore.setItem('testKey', 'testValue')
    const hasItemResult = storageStore.hasItem('testKey')
    expect(hasItemResult.success).toBe(true)
    expect(hasItemResult.data).toBe(true)
    
    const hasNotItemResult = storageStore.hasItem('nonExistentKey')
    expect(hasNotItemResult.success).toBe(true)
    expect(hasNotItemResult.data).toBe(false)
  })

  it('should handle item with expiration', async () => {
    const storageStore = useStorageStore()
    
    // 设置一个 100ms 后过期的项
    const setExpireResult = storageStore.setItemWithExpire('expiringKey', 'expiringValue', 100)
    expect(setExpireResult.success).toBe(true)
    
    // 立即获取应该成功
    const getExpireResult1 = storageStore.getItemWithExpire('expiringKey')
    expect(getExpireResult1.success).toBe(true)
    expect(getExpireResult1.data).toBe('expiringValue')
    
    // 等待过期
    await new Promise(resolve => setTimeout(resolve, 150))
    const getExpireResult2 = storageStore.getItemWithExpire('expiringKey')
    expect(getExpireResult2.success).toBe(true)
    expect(getExpireResult2.data).toBeNull()
  })
})