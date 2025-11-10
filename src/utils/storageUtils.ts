/**
 * 本地存储工具类
 * 提供带 base64 加密解密的本地存储操作
 */

import { Store } from '@tauri-apps/plugin-store';

// Base64 编码函数
function base64Encode(str: string): string {
  try {
    return btoa(encodeURIComponent(str));
  } catch (error) {
    console.error('Base64 encoding error:', error);
    return str;
  }
}

// Base64 解码函数
function base64Decode(str: string): string {
  try {
    return decodeURIComponent(atob(str));
  } catch (error) {
    console.error('Base64 decoding error:', error);
    return str;
  }
}

// 存储策略枚举
export enum StorageStrategy {
  LOCAL_STORAGE = 'localStorage',
  TAURI_STORE = 'tauriStore',
}

// 存储配置接口
interface StorageConfig {
  strategy: StorageStrategy;
  tauriStorePath?: string;
}

class StorageUtils {
  private static instance: StorageUtils;
  private readonly prefix: string;
  private strategy: StorageStrategy;
  private tauriStore: Store | null = null;
  private readonly tauriStorePath: string;

  private constructor(prefix: string = 'app_', config?: StorageConfig) {
    this.prefix = prefix;
    this.strategy = config?.strategy || StorageStrategy.LOCAL_STORAGE;
    this.tauriStorePath = config?.tauriStorePath || '.app_data.dat';

    // 如果策略是 Tauri Store，则初始化 Store
    if (this.strategy === StorageStrategy.TAURI_STORE) {
      this.initTauriStore().then();
    }
  }

  /**
   * 初始化 Tauri Store
   */
  private async initTauriStore(): Promise<void> {
    try {
      // 使用 Tauri Store 的正确方式
      this.tauriStore = await Store.load(this.tauriStorePath);
    } catch (error) {
      console.error('Failed to initialize Tauri Store:', error);
      // 如果 Tauri Store 初始化失败，回退到 localStorage
      this.strategy = StorageStrategy.LOCAL_STORAGE;
    }
  }

  /**
   * 获取 StorageUtils 实例（单例模式）
   * @param prefix 存储键前缀
   * @param config 存储配置
   * @returns StorageUtils 实例
   */
  public static getInstance(prefix?: string, config?: StorageConfig): StorageUtils {
    if (!StorageUtils.instance) {
      StorageUtils.instance = new StorageUtils(prefix, config);
    }
    return StorageUtils.instance;
  }

  /**
   * 设置存储项
   * @param key 存储键
   * @param value 存储值
   * @param encrypt 是否加密存储
   */
  public async setItem<T>(key: string, value: T, encrypt: boolean = true): Promise<void> {
    try {
      const fullKey = this.prefix + key;
      let stringValue = typeof value === 'string' ? value : JSON.stringify(value);

      // 如果需要加密，则进行 base64 编码
      if (encrypt) {
        stringValue = base64Encode(stringValue);
      }

      if (this.strategy === StorageStrategy.TAURI_STORE && this.tauriStore) {
        await this.tauriStore.set(fullKey, stringValue);
        await this.tauriStore.save();
      } else {
        localStorage.setItem(fullKey, stringValue);
      }
    } catch (error) {
      console.error('Storage setItem error:', error);
    }
  }

  /**
   * 获取存储项
   * @param key 存储键
   * @param defaultValue 默认值
   * @param decrypt 是否解密
   * @returns 存储值
   */
  public async getItem<T>(
    key: string,
    defaultValue: T | null = null,
    decrypt: boolean = true,
  ): Promise<T | null> {
    try {
      const fullKey = this.prefix + key;
      let storedValue: string | null = null;

      if (this.strategy === StorageStrategy.TAURI_STORE && this.tauriStore) {
        storedValue = (await this.tauriStore.get(fullKey)) as string | null;
      } else {
        storedValue = localStorage.getItem(fullKey);
      }

      if (storedValue === null) {
        return defaultValue;
      }

      let resultValue = storedValue;

      // 如果需要解密，则进行 base64 解码
      if (decrypt) {
        resultValue = base64Decode(storedValue);
      }

      // 尝试解析 JSON
      try {
        return JSON.parse(resultValue);
      } catch {
        // 如果解析失败，返回原始值
        return resultValue as unknown as T;
      }
    } catch (error) {
      console.error('Storage getItem error:', error);
      return defaultValue;
    }
  }

  /**
   * 删除存储项
   * @param key 存储键
   */
  public async removeItem(key: string): Promise<void> {
    try {
      const fullKey = this.prefix + key;

      if (this.strategy === StorageStrategy.TAURI_STORE && this.tauriStore) {
        await this.tauriStore.delete(fullKey);
        await this.tauriStore.save();
      } else {
        localStorage.removeItem(fullKey);
      }
    } catch (error) {
      console.error('Storage removeItem error:', error);
    }
  }

  /**
   * 清空所有存储项
   */
  public async clear(): Promise<void> {
    try {
      if (this.strategy === StorageStrategy.TAURI_STORE && this.tauriStore) {
        await this.tauriStore.clear();
        await this.tauriStore.save();
      } else {
        localStorage.clear();
      }
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  }

  /**
   * 检查是否存在指定的存储项
   * @param key 存储键
   * @returns 是否存在
   */
  public async hasItem(key: string): Promise<boolean> {
    try {
      const fullKey = this.prefix + key;

      if (this.strategy === StorageStrategy.TAURI_STORE && this.tauriStore) {
        const keys = await this.tauriStore.keys();
        return keys.includes(fullKey);
      } else {
        return localStorage.getItem(fullKey) !== null;
      }
    } catch (error) {
      console.error('Storage hasItem error:', error);
      return false;
    }
  }

  /**
   * 获取所有存储项的键
   * @returns 键数组
   */
  public async getAllKeys(): Promise<string[]> {
    try {
      const prefixLength = this.prefix.length;
      let keys: string[] = [];

      if (this.strategy === StorageStrategy.TAURI_STORE && this.tauriStore) {
        const allKeys = await this.tauriStore.keys();
        keys = allKeys
          .filter((key) => key.startsWith(this.prefix))
          .map((key) => key.substring(prefixLength));
      } else {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith(this.prefix)) {
            keys.push(key.substring(prefixLength));
          }
        }
      }

      return keys;
    } catch (error) {
      console.error('Storage getAllKeys error:', error);
      return [];
    }
  }

  /**
   * 设置存储项的过期时间
   * @param key 存储键
   * @param value 存储值
   * @param expire 过期时间（毫秒）
   * @param encrypt 是否加密存储
   */
  public async setItemWithExpire<T>(
    key: string,
    value: T,
    expire: number,
    encrypt: boolean = true,
  ): Promise<void> {
    try {
      const item = {
        value: value,
        expire: Date.now() + expire,
      };

      await this.setItem(key, item, encrypt);
    } catch (error) {
      console.error('Storage setItemWithExpire error:', error);
    }
  }

  /**
   * 获取存储项（支持过期时间）
   * @param key 存储键
   * @param defaultValue 默认值
   * @param decrypt 是否解密
   * @returns 存储值
   */
  public async getItemWithExpire<T>(
    key: string,
    defaultValue: T | null = null,
    decrypt: boolean = true,
  ): Promise<T | null> {
    try {
      const item = await this.getItem<{ value: T; expire: number }>(key, null, decrypt);

      if (item === null) {
        return defaultValue;
      }

      // 检查是否过期
      if (item.expire && Date.now() > item.expire) {
        await this.removeItem(key);
        return null; // 过期时返回空值
      }

      return item.value !== undefined ? item.value : (item as unknown as T);
    } catch (error) {
      console.error('Storage getItemWithExpire error:', error);
      return defaultValue;
    }
  }

  /**
   * 获取存储项（支持过期时间），过期时返回null
   * @param key 存储键
   * @param decrypt 是否解密
   * @returns 存储值或null（如果过期或不存在）
   */
  public async getExpiredItem<T>(key: string, decrypt: boolean = true): Promise<T | null> {
    return await this.getItemWithExpire<T>(key, null, decrypt);
  }

  /**
   * 设置存储策略
   * @param strategy 存储策略
   */
  public setStrategy(strategy: StorageStrategy): void {
    this.strategy = strategy;

    // 如果切换到 Tauri Store 且尚未初始化，则初始化
    if (strategy === StorageStrategy.TAURI_STORE && !this.tauriStore) {
      this.initTauriStore().then();
    }
  }

  /**
   * 获取当前存储策略
   * @returns 当前存储策略
   */
  public getStrategy(): StorageStrategy {
    return this.strategy;
  }
}

const storageUtils = StorageUtils.getInstance();

export { storageUtils, StorageUtils };
