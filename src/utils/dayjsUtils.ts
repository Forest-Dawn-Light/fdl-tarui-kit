import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

// 扩展 dayjs 功能
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

// 设置默认语言为中文
dayjs.locale('zh-cn');

/**
 * Dayjs 工具类封装
 * 提供常用的日期时间处理方法
 */
export class DayjsUtils {
  /**
   * 获取当前时间
   * @returns dayjs 对象
   */
  public static now() {
    return dayjs();
  }

  /**
   * 解析日期字符串
   * @param date 日期字符串或时间戳
   * @param format 日期格式
   * @returns dayjs 对象
   */
  public static parse(date: string | number | Date | dayjs.Dayjs, format?: string) {
    return dayjs(date, format);
  }

  /**
   * 格式化日期时间
   * @param date 日期
   * @param format 格式字符串，默认为 'YYYY-MM-DD HH:mm:ss'
   * @returns 格式化后的字符串
   */
  public static format(date: string | number | Date | dayjs.Dayjs, format: string = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(date).format(format);
  }

  /**
   * 格式化为本地化日期时间
   * @param date 日期
   * @param format 格式，如 'LLLL' (完整日期)、'LLL' (日期+时间) 等
   * @returns 格式化后的字符串
   */
  public static formatLocalized(date: string | number | Date | dayjs.Dayjs, format: string = 'LLLL') {
    return dayjs(date).format(format);
  }

  /**
   * 获取相对时间描述
   * @param date 日期
   * @returns 相对时间描述，如 "2小时前"、"3天前" 等
   */
  public static fromNow(date: string | number | Date | dayjs.Dayjs) {
    return dayjs(date).fromNow();
  }

  /**
   * 获取时间差描述
   * @param date1 日期1
   * @param date2 日期2
   * @param unit 单位，如 'year'、'month'、'day'、'hour'、'minute'、'second'
   * @returns 时间差
   */
  public static diff(date1: string | number | Date | dayjs.Dayjs, date2: string | number | Date | dayjs.Dayjs, unit?: dayjs.OpUnitType) {
    return dayjs(date1).diff(dayjs(date2), unit);
  }

  /**
   * 添加时间
   * @param date 日期
   * @param amount 数量
   * @param unit 单位，如 'year'、'month'、'day'、'hour'、'minute'、'second'
   * @returns 新的 dayjs 对象
   */
  public static add(date: string | number | Date | dayjs.Dayjs, amount: number, unit: dayjs.ManipulateType) {
    return dayjs(date).add(amount, unit);
  }

  /**
   * 减去时间
   * @param date 日期
   * @param amount 数量
   * @param unit 单位，如 'year'、'month'、'day'、'hour'、'minute'、'second'
   * @returns 新的 dayjs 对象
   */
  public static subtract(date: string | number | Date | dayjs.Dayjs, amount: number, unit: dayjs.ManipulateType) {
    return dayjs(date).subtract(amount, unit);
  }

  /**
   * 设置时间
   * @param date 日期
   * @param unit 单位
   * @param value 值
   * @returns 新的 dayjs 对象
   */
  public static set(date: string | number | Date | dayjs.Dayjs, unit: dayjs.UnitType, value: number) {
    return dayjs(date).set(unit, value);
  }

  /**
   * 获取时间组件
   * @param date 日期
   * @param unit 单位
   * @returns 对应的值
   */
  public static get(date: string | number | Date | dayjs.Dayjs, unit: dayjs.UnitType) {
    return dayjs(date).get(unit);
  }

  /**
   * 判断是否为有效日期
   * @param date 日期
   * @returns 是否有效
   */
  public static isValid(date: any) {
    return dayjs(date).isValid();
  }

  /**
   * 判断是否为同一天
   * @param date1 日期1
   * @param date2 日期2
   * @returns 是否为同一天
   */
  public static isSameDay(date1: string | number | Date | dayjs.Dayjs, date2: string | number | Date | dayjs.Dayjs) {
    return dayjs(date1).isSame(dayjs(date2), 'day');
  }

  /**
   * 判断日期1是否在日期2之前
   * @param date1 日期1
   * @param date2 日期2
   * @param unit 比较单位
   * @returns 是否在之前
   */
  public static isBefore(date1: string | number | Date | dayjs.Dayjs, date2: string | number | Date | dayjs.Dayjs, unit?: dayjs.OpUnitType) {
    return dayjs(date1).isBefore(dayjs(date2), unit);
  }

  /**
   * 判断日期1是否在日期2之后
   * @param date1 日期1
   * @param date2 日期2
   * @param unit 比较单位
   * @returns 是否在之后
   */
  public static isAfter(date1: string | number | Date | dayjs.Dayjs, date2: string | number | Date | dayjs.Dayjs, unit?: dayjs.OpUnitType) {
    return dayjs(date1).isAfter(dayjs(date2), unit);
  }

  /**
   * 获取开始时间
   * @param date 日期
   * @param unit 单位，如 'year'、'month'、'day'、'hour'、'minute'、'second'
   * @returns 新的 dayjs 对象
   */
  public static startOf(date: string | number | Date | dayjs.Dayjs, unit: dayjs.OpUnitType) {
    return dayjs(date).startOf(unit);
  }

  /**
   * 获取结束时间
   * @param date 日期
   * @param unit 单位，如 'year'、'month'、'day'、'hour'、'minute'、'second'
   * @returns 新的 dayjs 对象
   */
  public static endOf(date: string | number | Date | dayjs.Dayjs, unit: dayjs.OpUnitType) {
    return dayjs(date).endOf(unit);
  }

  /**
   * 获取月份的第一天
   * @param date 日期
   * @returns 新的 dayjs 对象
   */
  public static startOfMonth(date: string | number | Date | dayjs.Dayjs) {
    return dayjs(date).startOf('month');
  }

  /**
   * 获取月份的最后一天
   * @param date 日期
   * @returns 新的 dayjs 对象
   */
  public static endOfMonth(date: string | number | Date | dayjs.Dayjs) {
    return dayjs(date).endOf('month');
  }

  /**
   * 获取年份的第一天
   * @param date 日期
   * @returns 新的 dayjs 对象
   */
  public static startOfYear(date: string | number | Date | dayjs.Dayjs) {
    return dayjs(date).startOf('year');
  }

  /**
   * 获取年份的最后一天
   * @param date 日期
   * @returns 新的 dayjs 对象
   */
  public static endOfYear(date: string | number | Date | dayjs.Dayjs) {
    return dayjs(date).endOf('year');
  }

  /**
   * 获取星期几 (0-6, 0为周日)
   * @param date 日期
   * @returns 星期几
   */
  public static day(date: string | number | Date | dayjs.Dayjs) {
    return dayjs(date).day();
  }

  /**
   * 获取日期 (1-31)
   * @param date 日期
   * @returns 日期
   */
  public static date(date: string | number | Date | dayjs.Dayjs) {
    return dayjs(date).date();
  }

  /**
   * 获取月份 (0-11)
   * @param date 日期
   * @returns 月份
   */
  public static month(date: string | number | Date | dayjs.Dayjs) {
    return dayjs(date).month();
  }

  /**
   * 获取年份
   * @param date 日期
   * @returns 年份
   */
  public static year(date: string | number | Date | dayjs.Dayjs) {
    return dayjs(date).year();
  }

  /**
   * 获取小时 (0-23)
   * @param date 日期
   * @returns 小时
   */
  public static hour(date: string | number | Date | dayjs.Dayjs) {
    return dayjs(date).hour();
  }

  /**
   * 获取分钟 (0-59)
   * @param date 日期
   * @returns 分钟
   */
  public static minute(date: string | number | Date | dayjs.Dayjs) {
    return dayjs(date).minute();
  }

  /**
   * 获取秒 (0-59)
   * @param date 日期
   * @returns 秒
   */
  public static second(date: string | number | Date | dayjs.Dayjs) {
    return dayjs(date).second();
  }

  /**
   * 生成日期范围
   * @param start 开始日期
   * @param end 结束日期
   * @param unit 单位
   * @returns 日期数组
   */
  public static range(
    start: string | number | Date | dayjs.Dayjs,
    end: string | number | Date | dayjs.Dayjs,
    unit: dayjs.ManipulateType = 'day'
  ): dayjs.Dayjs[] {
    const range: dayjs.Dayjs[] = [];
    let current = dayjs(start);
    const endTime = dayjs(end);
    
    while (current.isSame(endTime, unit) || current.isBefore(endTime, unit)) {
      range.push(current);
      current = current.add(1, unit);
    }
    
    return range;
  }

  /**
   * 格式化为 UTC 时间
   * @param date 日期
   * @param format 格式
   * @returns 格式化后的字符串
   */
  public static formatUTC(date: string | number | Date | dayjs.Dayjs, format: string = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(date).utc().format(format);
  }

  /**
   * 时区转换
   * @param date 日期
   * @param timezone 时区
   * @param format 格式
   * @returns 格式化后的字符串
   */
  public static formatTimezone(date: string | number | Date | dayjs.Dayjs, timezone: string, format: string = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(date).tz(timezone).format(format);
  }
}

export default DayjsUtils;