import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// 定义请求配置接口
interface RequestConfig extends AxiosRequestConfig {
  hideLoading?: boolean;
  hideErrorToast?: boolean;
}

// 定义响应数据接口
interface HttpResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

class AxiosUtils {
  private axiosInstance: AxiosInstance;
  private loadingCount = 0;

  constructor() {
    // 创建 axios 实例
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || '',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });

    // 设置请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 添加认证 token（如果存在）
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // 显示加载状态
        if (!(config as RequestConfig).hideLoading) {
          this.showLoading();
        }

        return config;
      },
      (error) => {
        this.hideLoading();
        return Promise.reject(error);
      },
    );

    // 设置响应拦截器
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        this.hideLoading();

        const { data } = response;

        // 根据业务代码处理响应
        if (data.code === 200) {
          return data;
        } else {
          // 处理业务错误
          if (!(response.config as RequestConfig).hideErrorToast) {
            this.showErrorToast(data.message || '请求失败');
          }
          return Promise.reject(new Error(data.message || 'Error'));
        }
      },
      (error) => {
        this.hideLoading();

        // 处理网络错误
        if (!(error.config as RequestConfig)?.hideErrorToast) {
          this.handleNetworkError(error);
        }

        return Promise.reject(error);
      },
    );
  }

  /**
   * 获取认证 token
   */
  private getToken(): string | null {
    // 这里可以根据你的应用实际情况获取 token
    // 比如从 localStorage、store 或其他地方获取
    return localStorage.getItem('access_token');
  }

  /**
   * 显示加载状态
   */
  private showLoading(): void {
    this.loadingCount++;
    // 这里可以集成具体的加载提示组件
    // 例如: message.loading('加载中...', 0);
  }

  /**
   * 隐藏加载状态
   */
  private hideLoading(): void {
    if (this.loadingCount > 0) {
      this.loadingCount--;
    }
    // 当所有请求都完成后隐藏加载提示
    if (this.loadingCount === 0) {
      // 隐藏加载提示
      // 例如: message.destroy();
    }
  }

  /**
   * 显示错误提示
   */
  private showErrorToast(message: string): void {
    // 可以集成具体的 UI 组件库提示方法
    // 例如: message.error(message);
    console.error(message);
  }

  /**
   * 处理网络错误
   */
  private handleNetworkError(error: any): void {
    let message = '网络错误';

    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          message = data?.message || '请求参数错误';
          break;
        case 401:
          message = '未授权，请重新登录';
          // 可以在这里处理登出逻辑
          // 例如: localStorage.removeItem('access_token');
          this.clearToken();
          break;
        case 403:
          message = '拒绝访问';
          break;
        case 404:
          message = '请求资源不存在';
          break;
        case 500:
          message = '服务器内部错误';
          break;
        default:
          message = `连接错误${status}`;
      }
    } else if (error.request) {
      message = '网络连接超时';
    } else {
      message = error.message || '网络错误';
    }

    this.showErrorToast(message);
  }

  /**
   * 清除 token
   */
  private clearToken(): void {
    localStorage.removeItem('access_token');
  }

  /**
   * GET 请求
   */
  get<T = any>(url: string, params?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
    return this.axiosInstance.get(url, { params, ...config });
  }

  /**
   * POST 请求
   */
  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
    return this.axiosInstance.post(url, data, config);
  }

  /**
   * PUT 请求
   */
  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
    return this.axiosInstance.put(url, data, config);
  }

  /**
   * DELETE 请求
   */
  delete<T = any>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
    return this.axiosInstance.delete(url, config);
  }

  /**
   * PATCH 请求
   */
  patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
    return this.axiosInstance.patch(url, data, config);
  }
}

// 创建实例并导出
export const axiosUtils = new AxiosUtils();

export default axiosUtils;

// 导出类型定义
export type { HttpResponse, RequestConfig };
