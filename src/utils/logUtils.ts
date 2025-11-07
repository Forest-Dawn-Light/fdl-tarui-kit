import { trace, info, debug, warn, error, attachConsole } from '@tauri-apps/plugin-log';

attachConsole().then();

/**
 * 将模板字符串和参数组合成最终的字符串
 * @param template 模板字符串，使用 {0}, {1}, {2} 等作为占位符
 * @param args 参数列表
 * @returns 组合后的字符串
 */
const formatLogTemplate = (template: string, ...args: unknown[]): string => {
  // 如果没有占位符，直接将所有参数用空格连接
  if (!template.includes('{')) {
    const allArgs = [template, ...args];
    return allArgs
      .map((arg) => {
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg);
          } catch (e) {
            return String(arg);
          }
        }
        return String(arg);
      })
      .join(' ');
  }

  // 如果有占位符，按照模板格式化
  let result = template;
  args.forEach((arg, index) => {
    const placeholder = `{${index}}`;
    let value: string;

    if (typeof arg === 'object') {
      try {
        value = JSON.stringify(arg);
      } catch (e) {
        value = String(arg);
      }
    } else {
      value = String(arg);
    }

    result = result.replace(new RegExp(placeholder, 'g'), value);
  });

  return result;
};

class LogUtils {
  public async log(message: string, ...params: unknown[]) {
    const messageWithParams = formatLogTemplate(message, params);
    await trace(messageWithParams);
  }

  public async info(message: string, ...params: unknown[]) {
    const messageWithParams = formatLogTemplate(message, params);
    await info(messageWithParams);
  }

  public async error(message: string, ...params: unknown[]) {
    const messageWithParams = formatLogTemplate(message, params);
    await error(messageWithParams);
  }

  public async debug(message: string, ...params: unknown[]) {
    const messageWithParams = formatLogTemplate(message, params);
    await debug(messageWithParams);
  }

  public async warn(message: string, ...params: unknown[]) {
    const messageWithParams = formatLogTemplate(message, params);
    await warn(messageWithParams);
  }
}

export const logUtils = new LogUtils();

export default logUtils;
