/**
 * API 接口类型定义
 */

// 基础响应格式
export interface BaseResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

// 分页响应格式
export interface PageResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 用户信息
export interface UserInfo {
  id: number;
  username: string;
  email?: string;
  avatar?: string;
  createdAt: string;
}

// 登录请求参数
export interface LoginRequest {
  username: string;
  password: string;
}

// 登录响应数据
export interface LoginResponse {
  token: string;
  userInfo: UserInfo;
}