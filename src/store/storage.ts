import { defineStore } from 'pinia';
import { storageUtils } from '../utils';
import type { StoreActionResult } from './types';

// 定义存储状态类型
interface StorageState {
  // 可以添加一些运行时状态
  initialized: boolean;
}

// 定义初始状态
const initialState = (): StorageState => ({
  initialized: true,
});

export const useStorageStore = defineStore('storage', {
  state: initialState,

  actions: {
    /**
     * 设置存储项
     * @param key 存储键
     * @param value 存储值
     * @param encrypt 是否加密存储
     */
    async setItem<T>(key: string, value: T, encrypt: boolean = true): Promise<StoreActionResult> {
      try {
        await storageUtils.setItem(key, value, encrypt);
        return { success: true };
      } catch (error) {
        return { success: false, message: `设置存储项失败: ${error}` };
      }
    },

    /**
     * 获取存储项
     * @param key 存储键
     * @param defaultValue 默认值
     * @param decrypt 是否解密
     * @returns 存储值
     */
    async getItem<T>(
      key: string,
      defaultValue: T | null = null,
      decrypt: boolean = true,
    ): Promise<StoreActionResult<T | null>> {
      try {
        const value = await storageUtils.getItem<T>(key, defaultValue, decrypt);
        return { success: true, data: value as T };
      } catch (error) {
        return { success: false, message: `获取存储项失败: ${error}` };
      }
    },

    /**
     * 删除存储项
     * @param key 存储键
     */
    async removeItem(key: string): Promise<StoreActionResult> {
      try {
        await storageUtils.removeItem(key);
        return { success: true };
      } catch (error) {
        return { success: false, message: `删除存储项失败: ${error}` };
      }
    },

    /**
     * 清空所有存储项
     */
    async clear(): Promise<StoreActionResult> {
      try {
        await storageUtils.clear();
        return { success: true };
      } catch (error) {
        return { success: false, message: `清空存储失败: ${error}` };
      }
    },

    /**
     * 检查是否存在指定的存储项
     * @param key 存储键
     * @returns 是否存在
     */
    async hasItem(key: string): Promise<StoreActionResult<boolean>> {
      try {
        const exists = await storageUtils.hasItem(key);
        return { success: true, data: exists };
      } catch (error) {
        return { success: false, message: `检查存储项失败: ${error}` };
      }
    },

    /**
     * 获取所有存储项的键
     * @returns 键数组
     */
    async getAllKeys(): Promise<StoreActionResult<string[]>> {
      try {
        const keys = await storageUtils.getAllKeys();
        return { success: true, data: keys };
      } catch (error) {
        return { success: false, message: `获取存储键列表失败: ${error}` };
      }
    },

    /**
     * 设置存储项的过期时间
     * @param key 存储键
     * @param value 存储值
     * @param expire 过期时间（毫秒）
     * @param encrypt 是否加密存储
     */
    async setItemWithExpire<T>(
      key: string,
      value: T,
      expire: number,
      encrypt: boolean = true,
    ): Promise<StoreActionResult> {
      try {
        await storageUtils.setItemWithExpire(key, value, expire, encrypt);
        return { success: true };
      } catch (error) {
        return { success: false, message: `设置带过期时间的存储项失败: ${error}` };
      }
    },

    /**
     * 获取存储项（支持过期时间）
     * @param key 存储键
     * @param defaultValue 默认值
     * @param decrypt 是否解密
     * @returns 存储值
     */
    async getItemWithExpire<T>(
      key: string,
      defaultValue: T | null = null,
      decrypt: boolean = true,
    ): Promise<StoreActionResult<T | null>> {
      try {
        const value = await storageUtils.getItemWithExpire<T>(key, defaultValue, decrypt);
        return { success: true, data: value as T };
      } catch (error) {
        return { success: false, message: `获取带过期时间的存储项失败: ${error}` };
      }
    },
  },
});