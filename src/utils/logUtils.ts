// 检查是否在Tauri环境中运行
const isTauri = typeof window !== 'undefined' && (window as any).__TAURI__;

let traceFn: (message: string) => Promise<void>;
let infoFn: (message: string) => Promise<void>;
let debugFn: (message: string) => Promise<void>;
let warnFn: (message: string) => Promise<void>;
let errorFn: (message: string) => Promise<void>;
let attachConsoleFn: () => Promise<void>;

if (isTauri) {
  import('@tauri-apps/plugin-log')
    .then((log) => {
      traceFn = log.trace;
      infoFn = log.info;
      debugFn = log.debug;
      warnFn = log.warn;
      errorFn = log.error;
      // attachConsoleFn = log.attachConsole;

      // 尝试附加控制台
      attachConsoleFn().catch((err) => {
        console.warn('Failed to attach Tauri console:', err);
      });
    })
    .catch((err) => {
      console.warn('Failed to load Tauri log plugin:', err);
      // Fallback to console
      traceFn = (message: string) => Promise.resolve(console.log(`[TRACE] ${message}`));
      infoFn = (message: string) => Promise.resolve(console.info(`[INFO] ${message}`));
      debugFn = (message: string) => Promise.resolve(console.debug(`[DEBUG] ${message}`));
      warnFn = (message: string) => Promise.resolve(console.warn(`[WARN] ${message}`));
      errorFn = (message: string) => Promise.resolve(console.error(`[ERROR] ${message}`));
      attachConsoleFn = () => Promise.resolve();
    });
} else {
  // 在浏览器环境中使用console
  traceFn = (message: string) => Promise.resolve(console.log(`[TRACE] ${message}`));
  infoFn = (message: string) => Promise.resolve(console.info(`[INFO] ${message}`));
  debugFn = (message: string) => Promise.resolve(console.debug(`[DEBUG] ${message}`));
  warnFn = (message: string) => Promise.resolve(console.warn(`[WARN] ${message}`));
  errorFn = (message: string) => Promise.resolve(console.error(`[ERROR] ${message}`));
  attachConsoleFn = () => Promise.resolve();
}

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
    if (traceFn) {
      await traceFn(messageWithParams);
    } else {
      console.log(`[TRACE] ${messageWithParams}`);
    }
  }

  public async info(message: string, ...params: unknown[]) {
    const messageWithParams = formatLogTemplate(message, params);
    if (infoFn) {
      await infoFn(messageWithParams);
    } else {
      console.info(`[INFO] ${messageWithParams}`);
    }
  }

  public async error(message: string, ...params: unknown[]) {
    const messageWithParams = formatLogTemplate(message, params);
    if (errorFn) {
      await errorFn(messageWithParams);
    } else {
      console.error(`[ERROR] ${messageWithParams}`);
    }
  }

  public async debug(message: string, ...params: unknown[]) {
    const messageWithParams = formatLogTemplate(message, params);
    if (debugFn) {
      await debugFn(messageWithParams);
    } else {
      console.debug(`[DEBUG] ${messageWithParams}`);
    }
  }

  public async warn(message: string, ...params: unknown[]) {
    const messageWithParams = formatLogTemplate(message, params);
    if (warnFn) {
      await warnFn(messageWithParams);
    } else {
      console.warn(`[WARN] ${messageWithParams}`);
    }
  }
}

export const logUtils = new LogUtils();

export default logUtils;
