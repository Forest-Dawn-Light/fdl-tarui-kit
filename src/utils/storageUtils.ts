/**
 * 本地存储工具类
 * 提供带 base64 加密解密的本地存储操作
 */

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

class StorageUtils {
  private static instance: StorageUtils;
  private prefix: string;

  private constructor(prefix: string = 'app_') {
    this.prefix = prefix;
  }

  /**
   * 获取 StorageUtils 实例（单例模式）
   * @param prefix 存储键前缀
   * @returns StorageUtils 实例
   */
  public static getInstance(prefix?: string): StorageUtils {
    if (!StorageUtils.instance) {
      StorageUtils.instance = new StorageUtils(prefix);
    }
    return StorageUtils.instance;
  }

  /**
   * 设置存储项
   * @param key 存储键
   * @param value 存储值
   * @param encrypt 是否加密存储
   */
  public setItem(key: string, value: any, encrypt: boolean = true): void {
    try {
      const fullKey = this.prefix + key;
      let stringValue = typeof value === 'string' ? value : JSON.stringify(value);

      // 如果需要加密，则进行 base64 编码
      if (encrypt) {
        stringValue = base64Encode(stringValue);
      }

      localStorage.setItem(fullKey, stringValue);
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
  public getItem<T = any>(
    key: string,
    defaultValue: T | null = null,
    decrypt: boolean = true,
  ): T | null {
    try {
      const fullKey = this.prefix + key;
      const storedValue = localStorage.getItem(fullKey);

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
  public removeItem(key: string): void {
    try {
      const fullKey = this.prefix + key;
      localStorage.removeItem(fullKey);
    } catch (error) {
      console.error('Storage removeItem error:', error);
    }
  }

  /**
   * 清空所有存储项
   */
  public clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  }

  /**
   * 检查是否存在指定的存储项
   * @param key 存储键
   * @returns 是否存在
   */
  public hasItem(key: string): boolean {
    try {
      const fullKey = this.prefix + key;
      return localStorage.getItem(fullKey) !== null;
    } catch (error) {
      console.error('Storage hasItem error:', error);
      return false;
    }
  }

  /**
   * 获取所有存储项的键
   * @returns 键数组
   */
  public getAllKeys(): string[] {
    try {
      const keys: string[] = [];
      const prefixLength = this.prefix.length;

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          keys.push(key.substring(prefixLength));
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
  public setItemWithExpire(key: string, value: any, expire: number, encrypt: boolean = true): void {
    try {
      const item = {
        value: value,
        expire: Date.now() + expire,
      };

      this.setItem(key, item, encrypt);
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
  public getItemWithExpire<T = any>(
    key: string,
    defaultValue: T | null = null,
    decrypt: boolean = true,
  ): T | null {
    try {
      const item: any = this.getItem(key, null, decrypt);

      if (item === null) {
        return defaultValue;
      }

      // 检查是否过期
      if (item.expire && Date.now() > item.expire) {
        this.removeItem(key);
        return null; // 过期时返回空值
      }

      return item.value !== undefined ? item.value : item;
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
  public getExpiredItem<T = any>(key: string, decrypt: boolean = true): T | null {
    return this.getItemWithExpire<T>(key, null, decrypt);
  }
}

const storageUtils = StorageUtils.getInstance();

export { storageUtils };
