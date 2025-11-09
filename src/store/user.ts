import { defineStore } from 'pinia';
import type { UserInfo } from '../types/api';
import type { StoreActionResult } from './types';
import { logUtils } from '../utils/logUtils';
import UserService from '../services/request.ts';

// 定义状态类型
interface UserState {
  userInfo: UserInfo | null;
  token: string | null;
  isLogin: boolean;
  loading: boolean;
}

// 定义初始状态
const initialState = (): UserState => ({
  userInfo: null,
  token: localStorage.getItem('access_token') || null,
  isLogin: false,
  loading: false
});

export const useUserStore = defineStore('user', {
  state: initialState,

  getters: {
    // 获取用户信息
    getUserInfoState: (state): UserInfo | null => state.userInfo,

    // 获取登录状态
    getIsLogin: (state): boolean => state.isLogin,

    // 获取用户ID
    getUserId: (state): number | null => state.userInfo?.id || null,

    // 获取用户名
    getUsername: (state): string => state.userInfo?.username || '',
  },

  actions: {
    /**
     * 用户登录
     * @param username 用户名
     * @param password 密码
     */
    async login(
      username: string,
      password: string,
    ): Promise<StoreActionResult<{ token: string; userInfo: UserInfo }>> {
      this.loading = true;
      try {
        const response = await UserService.login({ username, password });
        if (response.code === 200) {
          this.token = response.data.token;
          this.userInfo = response.data.userInfo;
          this.isLogin = true;

          // 保存 token 到 localStorage
          localStorage.setItem('access_token', this.token);

          logUtils.info('[User Store] 登录成功').then();
          return { success: true, data: response.data };
        } else {
          logUtils.error('[User Store] 登录失败:', response.message);
          return { success: false, message: response.message };
        }
      } catch (error) {
        logUtils.error('[User Store] 登录异常:');
        return { success: false, message: '登录异常' };
      } finally {
        this.loading = false;
      }
    },

    /**
     * 获取用户信息
     */
    async fetchUserInfo(): Promise<StoreActionResult<UserInfo>> {
      if (!this.token) {
        logUtils.warn('[User Store] 未登录，无法获取用户信息');
        return { success: false, message: '未登录' };
      }

      this.loading = true;
      try {
        const response = await UserService.getUserInfo();
        if (response.code === 200) {
          this.userInfo = response.data;
          this.isLogin = true;
          logUtils.info('[User Store] 获取用户信息成功').then();
          return { success: true, data: response.data };
        } else {
          logUtils.error('[User Store] 获取用户信息失败:', response.message);
          return { success: false, message: response.message };
        }
      } catch (error) {
        logUtils.error('[User Store] 获取用户信息异常:', error);
        return { success: false, message: '获取用户信息异常' };
      } finally {
        this.loading = false;
      }
    },

    /**
     * 用户登出
     */
    logout() {
      this.userInfo = null;
      this.token = null;
      this.isLogin = false;

      // 清除 localStorage 中的 token
      localStorage.removeItem('access_token');

      logUtils.info('[User Store] 用户已登出');
    },

    /**
     * 更新用户信息
     * @param userInfo 新的用户信息
     */
    updateUserInfo(userInfo: UserInfo) {
      this.userInfo = { ...this.userInfo, ...userInfo };
      logUtils.info('[User Store] 用户信息已更新');
    },

    /**
     * 设置 token
     * @param token 访问令牌
     */
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('access_token', token);
    },

    /**
     * 清除 token
     */
    clearToken() {
      this.token = null;
      localStorage.removeItem('access_token');
    },
  },
});