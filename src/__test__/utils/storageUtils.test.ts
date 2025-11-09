import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { storageUtils } from '../../utils/storageUtils'

describe('storageUtils', () => {
  beforeEach(() => {
    // 清空 localStorage
    localStorage.clear()
  })

  afterEach(() => {
    // 恢复所有模拟
    vi.restoreAllMocks()
  })

  it('should set and get item correctly', () => {
    storageUtils.setItem('testKey', 'testValue')
    const result = storageUtils.getItem('testKey')
    expect(result).toBe('testValue')
  })

  it('should return null for non-existent keys', () => {
    const result = storageUtils.getItem('nonExistentKey')
    expect(result).toBeNull()
  })

  it('should remove item correctly', () => {
    storageUtils.setItem('testKey', 'testValue')
    storageUtils.removeItem('testKey')
    const result = storageUtils.getItem('testKey')
    expect(result).toBeNull()
  })

  it('should clear all items', () => {
    storageUtils.setItem('key1', 'value1')
    storageUtils.setItem('key2', 'value2')
    storageUtils.clear()
    
    expect(storageUtils.getItem('key1')).toBeNull()
    expect(storageUtils.getItem('key2')).toBeNull()
  })

  it('should check if item exists', () => {
    storageUtils.setItem('testKey', 'testValue')
    expect(storageUtils.hasItem('testKey')).toBe(true)
    expect(storageUtils.hasItem('nonExistentKey')).toBe(false)
  })

  it('should handle encrypted storage', () => {
    storageUtils.setItem('encryptedKey', 'sensitiveData', true)
    const result = storageUtils.getItem('encryptedKey', null, true)
    expect(result).toBe('sensitiveData')
  })

  it('should handle non-encrypted storage', () => {
    storageUtils.setItem('plainKey', 'plainData', false)
    const result = storageUtils.getItem('plainKey', null, false)
    expect(result).toBe('plainData')
  })

  it('should handle item with expiration', async () => {
    // 设置一个 100ms 后过期的项
    storageUtils.setItemWithExpire('expiringKey', 'expiringValue', 100)
    
    // 立即获取应该成功
    const result1 = storageUtils.getItemWithExpire('expiringKey')
    expect(result1).toBe('expiringValue')
    
    // 等待过期
    await new Promise(resolve => setTimeout(resolve, 150))
    const result2 = storageUtils.getItemWithExpire('expiringKey')
    expect(result2).toBeNull()
  })

  it('should handle getExpiredItem method', async () => {
    storageUtils.setItemWithExpire('tempKey', 'tempValue', 100)
    
    // 立即获取应该成功
    const result1 = storageUtils.getExpiredItem('tempKey')
    expect(result1).toBe('tempValue')
    
    // 等待过期
    await new Promise(resolve => setTimeout(resolve, 150))
    const result2 = storageUtils.getExpiredItem('tempKey')
    expect(result2).toBeNull()
  })
})