/**
 * 类型转换工具类
 * 提供常用的类型检查和转换方法
 */

export class TypeUtils {
  /**
   * 将字符串转换为数字
   * @param value 要转换的值
   * @param defaultValue 默认值
   * @returns 转换后的数字或默认值
   */
  public static toNumber(value: any, defaultValue: number = 0): number {
    if (typeof value === 'number') return value;
    if (value === null || value === undefined) return defaultValue;
    
    const parsed = Number(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }

  /**
   * 将值转换为字符串
   * @param value 要转换的值
   * @param defaultValue 默认值
   * @returns 转换后的字符串
   */
  public static toString(value: any, defaultValue: string = ''): string {
    if (typeof value === 'string') return value;
    if (value === null || value === undefined) return defaultValue;
    
    try {
      return String(value);
    } catch (error) {
      return defaultValue;
    }
  }

  /**
   * 将值转换为布尔值
   * @param value 要转换的值
   * @returns 转换后的布尔值
   */
  public static toBoolean(value: any): boolean {
    if (typeof value === 'boolean') return value;
    if (value === null || value === undefined) return false;
    
    if (typeof value === 'string') {
      const lower = value.toLowerCase();
      return lower === 'true' || lower === '1' || lower === 'yes' || lower === 'on';
    }
    
    if (typeof value === 'number') {
      return value !== 0;
    }
    
    return Boolean(value);
  }

  /**
   * 将值转换为数组
   * @param value 要转换的值
   * @returns 转换后的数组
   */
  public static toArray<T>(value: T | T[]): T[] {
    if (Array.isArray(value)) return value;
    if (value === null || value === undefined) return [];
    return [value];
  }

  /**
   * 将值转换为对象
   * @param value 要转换的值
   * @returns 转换后的对象
   */
  public static toObject(value: any): Record<string, any> {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return value;
    }
    
    if (value === null || value === undefined) {
      return {};
    }
    
    try {
      if (typeof value === 'string') {
        return JSON.parse(value);
      }
      return { value };
    } catch (error) {
      return { value };
    }
  }

  /**
   * 安全地获取数字（确保返回数字类型）
   * @param value 值
   * @param defaultValue 默认值
   * @returns 数字
   */
  public static safeNumber(value: any, defaultValue: number = 0): number {
    const result = this.toNumber(value, defaultValue);
    return isFinite(result) ? result : defaultValue;
  }

  /**
   * 安全地获取整数
   * @param value 值
   * @param defaultValue 默认值
   * @returns 整数
   */
  public static safeInteger(value: any, defaultValue: number = 0): number {
    const result = this.toNumber(value, defaultValue);
    return isFinite(result) ? Math.floor(result) : defaultValue;
  }

  /**
   * 将值转换为日期对象
   * @param value 要转换的值
   * @returns Date对象或null
   */
  public static toDate(value: any): Date | null {
    if (value instanceof Date) return value;
    if (value === null || value === undefined) return null;
    
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  }

  /**
   * 将值转换为JSON字符串
   * @param value 要转换的值
   * @param defaultValue 默认值
   * @returns JSON字符串
   */
  public static toJson(value: any, defaultValue: string = '{}'): string {
    if (typeof value === 'string') {
      try {
        JSON.parse(value);
        return value;
      } catch (error) {
        // 不是有效的JSON字符串
      }
    }
    
    try {
      return JSON.stringify(value);
    } catch (error) {
      return defaultValue;
    }
  }

  /**
   * 解析JSON字符串
   * @param value JSON字符串
   * @param defaultValue 默认值
   * @returns 解析后的对象
   */
  public static parseJson<T = any>(value: string, defaultValue: T | null = null): T | null {
    if (typeof value !== 'string') return defaultValue;
    
    try {
      return JSON.parse(value);
    } catch (error) {
      return defaultValue;
    }
  }

  /**
   * 确保值在指定范围内
   * @param value 值
   * @param min 最小值
   * @param max 最大值
   * @param defaultValue 默认值
   * @returns 范围内的值
   */
  public static clamp(value: any, min: number, max: number, defaultValue: number = 0): number {
    const num = this.toNumber(value, defaultValue);
    return Math.min(Math.max(num, min), max);
  }

  /**
   * 将值转换为百分比
   * @param value 值
   * @param total 总数
   * @param defaultValue 默认值
   * @returns 百分比
   */
  public static toPercentage(value: any, total: number, defaultValue: number = 0): number {
    const num = this.toNumber(value, defaultValue);
    if (total === 0) return 0;
    return (num / total) * 100;
  }
}

export default TypeUtils;