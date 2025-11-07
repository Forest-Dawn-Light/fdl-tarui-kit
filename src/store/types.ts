// 定义 store 相关的通用类型

/**
 * 通用 store 操作结果类型
 */
export interface StoreActionResult<T = any> {
  success: boolean
  data?: T
  message?: string
}

/**
 * 分页参数类型
 */
export interface PageParams {
  page?: number
  pageSize?: number
  [key: string]: any
}

/**
 * 分页数据类型
 */
export interface PageData<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}