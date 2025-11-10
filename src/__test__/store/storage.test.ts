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

  it('should set and get item correctly', async () => {
    const storageStore = useStorageStore()
    
    const setResult = await storageStore.setItem('testKey', 'testValue')
    expect(setResult.success).toBe(true)
    
    const getResult = await storageStore.getItem('testKey')
    expect(getResult.success).toBe(true)
    expect(getResult.data).toBe('testValue')
  })

  it('should return null for non-existent keys', async () => {
    const storageStore = useStorageStore()
    
    const result = await storageStore.getItem('nonExistentKey')
    expect(result.success).toBe(true)
    expect(result.data).toBeNull()
  })

  it('should remove item correctly', async () => {
    const storageStore = useStorageStore()
    
    await storageStore.setItem('testKey', 'testValue')
    const removeResult = await storageStore.removeItem('testKey')
    expect(removeResult.success).toBe(true)
    
    const getResult = await storageStore.getItem('testKey')
    expect(getResult.success).toBe(true)
    expect(getResult.data).toBeNull()
  })

  it('should check if item exists', async () => {
    const storageStore = useStorageStore()
    
    await storageStore.setItem('testKey', 'testValue')
    const hasItemResult = await storageStore.hasItem('testKey')
    expect(hasItemResult.success).toBe(true)
    expect(hasItemResult.data).toBe(true)
    
    const hasNotItemResult = await storageStore.hasItem('nonExistentKey')
    expect(hasNotItemResult.success).toBe(true)
    expect(hasNotItemResult.data).toBe(false)
  })

  it('should handle item with expiration', async () => {
    const storageStore = useStorageStore()
    
    // 设置一个 100ms 后过期的项
    const setExpireResult = await storageStore.setItemWithExpire('expiringKey', 'expiringValue', 100)
    expect(setExpireResult.success).toBe(true)
    
    // 立即获取应该成功
    const getExpireResult1 = await storageStore.getItemWithExpire('expiringKey')
    expect(getExpireResult1.success).toBe(true)
    expect(getExpireResult1.data).toBe('expiringValue')
    
    // 等待过期
    await new Promise(resolve => setTimeout(resolve, 150))
    const getExpireResult2 = await storageStore.getItemWithExpire('expiringKey')
    expect(getExpireResult2.success).toBe(true)
    expect(getExpireResult2.data).toBeNull()
  })

  it('should get all keys', async () => {
    const storageStore = useStorageStore()
    
    await storageStore.setItem('key1', 'value1')
    await storageStore.setItem('key2', 'value2')
    
    const result = await storageStore.getAllKeys()
    expect(result.success).toBe(true)
    expect(result.data).toContain('key1')
    expect(result.data).toContain('key2')
  })

  it('should clear all items', async () => {
    const storageStore = useStorageStore()
    
    await storageStore.setItem('key1', 'value1')
    await storageStore.setItem('key2', 'value2')
    
    const clearResult = await storageStore.clear()
    expect(clearResult.success).toBe(true)
    
    const getResult1 = await storageStore.getItem('key1')
    const getResult2 = await storageStore.getItem('key2')
    expect(getResult1.data).toBeNull()
    expect(getResult2.data).toBeNull()
  })
})