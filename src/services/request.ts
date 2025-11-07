/**
 * 请求接口封装
 */

import axiosUtils from '../utils/axioUtils.ts';
import type { BaseResponse, PageResponse } from '../types/api.ts';
import type { UserInfo, LoginRequest, LoginResponse } from '../types/api.ts';

// API 接口定义
class UserService {
  /**
   * 用户登录
   */
  static async login(data: LoginRequest): Promise<BaseResponse<LoginResponse>> {
    return axiosUtils.post('/auth/login', data);
  }

  /**
   * 获取用户信息
   */
  static async getUserInfo(): Promise<BaseResponse<UserInfo>> {
    return axiosUtils.get('/user/info');
  }

  /**
   * 获取用户列表
   */
  static async getUserList(params?: any): Promise<BaseResponse<PageResponse<UserInfo>>> {
    return axiosUtils.get('/user/list', params);
  }

  /**
   * 创建用户
   */
  static async createUser(data: Partial<UserInfo>): Promise<BaseResponse<UserInfo>> {
    return axiosUtils.post('/user/create', data);
  }

  /**
   * 更新用户
   */
  static async updateUser(id: number, data: Partial<UserInfo>): Promise<BaseResponse<UserInfo>> {
    return axiosUtils.put(`/user/update/${id}`, data);
  }

  /**
   * 删除用户
   */
  static async deleteUser(id: number): Promise<BaseResponse<null>> {
    return axiosUtils.delete(`/user/delete/${id}`);
  }
}

export default UserService;
