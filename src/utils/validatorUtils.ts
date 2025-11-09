/**
 * 参数验证工具类
 * 提供常用的参数类型校验方法
 */

export class ValidatorUtils {
  /**
   * 验证邮箱格式
   * @param email 邮箱地址
   * @returns 是否为有效邮箱
   */
  public static isEmail(email: string): boolean {
    if (typeof email !== 'string') return false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  /**
   * 验证手机号格式（中国大陆）
   * @param mobile 手机号
   * @returns 是否为有效手机号
   */
  public static isMobile(mobile: string): boolean {
    if (typeof mobile !== 'string') return false;
    const mobileRegex = /^1[3-9]\d{9}$/;
    return mobileRegex.test(mobile);
  }

  /**
   * 验证固定电话格式（中国）
   * @param phone 固定电话
   * @returns 是否为有效固定电话
   */
  public static isPhone(phone: string): boolean {
    if (typeof phone !== 'string') return false;
    const phoneRegex = /^(\d{3,4}-?)?\d{7,8}(-?\d{1,6})?$/;
    return phoneRegex.test(phone);
  }

  /**
   * 验证用户名格式
   * 用户名规则：3-20位，只能包含字母、数字、下划线和连字符，且不能以数字开头
   * @param username 用户名
   * @returns 是否为有效用户名
   */
  public static isUsername(username: string): boolean {
    if (typeof username !== 'string') return false;
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
    return usernameRegex.test(username);
  }

  /**
   * 验证密码强度
   * 密码规则：至少8位，包含大小写字母、数字和特殊字符中的至少3种
   * @param password 密码
   * @returns 是否为有效密码
   */
  public static isPassword(password: string): boolean {
    if (typeof password !== 'string') return false;
    if (password.length < 8) return false;
    
    // 检查包含的字符类型
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    const typesCount = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
    return typesCount >= 3;
  }

  /**
   * 验证身份证号格式（中国18位身份证）
   * @param idCard 身份证号
   * @returns 是否为有效身份证号
   */
  public static isIdCard(idCard: string): boolean {
    if (typeof idCard !== 'string') return false;
    const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    return idCardRegex.test(idCard);
  }

  /**
   * 验证邮政编码（中国）
   * @param postalCode 邮政编码
   * @returns 是否为有效邮政编码
   */
  public static isPostalCode(postalCode: string): boolean {
    if (typeof postalCode !== 'string') return false;
    const postalCodeRegex = /^\d{6}$/;
    return postalCodeRegex.test(postalCode);
  }

  /**
   * 验证URL格式
   * @param url URL地址
   * @returns 是否为有效URL
   */
  public static isUrl(url: string): boolean {
    if (typeof url !== 'string') return false;
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * 验证IP地址格式
   * @param ip IP地址
   * @returns 是否为有效IP地址
   */
  public static isIP(ip: string): boolean {
    if (typeof ip !== 'string') return false;
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ip)) return false;
    
    // 检查每个部分是否在0-255范围内
    const parts = ip.split('.');
    return parts.every(part => {
      const num = parseInt(part, 10);
      return num >= 0 && num <= 255 && part === num.toString();
    });
  }

  /**
   * 验证是否为纯数字
   * @param value 值
   * @returns 是否为纯数字
   */
  public static isNumeric(value: string): boolean {
    if (typeof value !== 'string') return false;
    const numericRegex = /^\d+$/;
    return numericRegex.test(value);
  }

  /**
   * 验证是否为纯字母
   * @param value 值
   * @returns 是否为纯字母
   */
  public static isAlpha(value: string): boolean {
    if (typeof value !== 'string') return false;
    const alphaRegex = /^[a-zA-Z]+$/;
    return alphaRegex.test(value);
  }

  /**
   * 验证是否为字母数字组合
   * @param value 值
   * @returns 是否为字母数字组合
   */
  public static isAlphanumeric(value: string): boolean {
    if (typeof value !== 'string') return false;
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(value);
  }

  /**
   * 验证是否为中文
   * @param value 值
   * @returns 是否为中文
   */
  public static isChinese(value: string): boolean {
    if (typeof value !== 'string') return false;
    const chineseRegex = /^[\u4e00-\u9fa5]+$/;
    return chineseRegex.test(value);
  }

  /**
   * 验证是否为中文姓名（2-10个中文字符）
   * @param name 姓名
   * @returns 是否为有效中文姓名
   */
  public static isChineseName(name: string): boolean {
    if (typeof name !== 'string') return false;
    const nameRegex = /^[\u4e00-\u9fa5]{2,10}$/;
    return nameRegex.test(name);
  }

  /**
   * 验证是否为英文姓名（允许空格和连字符）
   * @param name 姓名
   * @returns 是否为有效英文姓名
   */
  public static isEnglishName(name: string): boolean {
    if (typeof name !== 'string') return false;
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    return nameRegex.test(name);
  }

  /**
   * 验证是否为QQ号
   * @param qq QQ号
   * @returns 是否为有效QQ号
   */
  public static isQQ(qq: string): boolean {
    if (typeof qq !== 'string') return false;
    const qqRegex = /^[1-9]\d{4,10}$/;
    return qqRegex.test(qq);
  }

  /**
   * 验证是否为微信账号
   * 微信账号规则：6-20位，只能包含字母、数字、下划线和连字符，且不能以数字开头
   * @param wechat 微信账号
   * @returns 是否为有效微信账号
   */
  public static isWechat(wechat: string): boolean {
    if (typeof wechat !== 'string') return false;
    const wechatRegex = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;
    return wechatRegex.test(wechat);
  }

  /**
   * 验证是否为车牌号（中国）
   * @param plateNumber 车牌号
   * @returns 是否为有效车牌号
   */
  public static isPlateNumber(plateNumber: string): boolean {
    if (typeof plateNumber !== 'string') return false;
    const plateNumberRegex = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-Z0-9]{4,5}[A-Z0-9挂学警港澳]$/;
    return plateNumberRegex.test(plateNumber);
  }

  /**
   * 验证是否为银行卡号（简单验证）
   * @param bankCard 银行卡号
   * @returns 是否为有效银行卡号
   */
  public static isBankCard(bankCard: string): boolean {
    if (typeof bankCard !== 'string') return false;
    // 简单验证：16-19位数字
    const bankCardRegex = /^\d{16,19}$/;
    return bankCardRegex.test(bankCard);
  }

  /**
   * 验证是否为统一社会信用代码（中国）
   * @param creditCode 统一社会信用代码
   * @returns 是否为有效统一社会信用代码
   */
  public static isCreditCode(creditCode: string): boolean {
    if (typeof creditCode !== 'string') return false;
    const creditCodeRegex = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;
    return creditCodeRegex.test(creditCode);
  }

  /**
   * 组合验证器 - 邮箱或手机号
   * @param value 值
   * @returns 是否为邮箱或手机号
   */
  public static isEmailOrMobile(value: string): boolean {
    return this.isEmail(value) || this.isMobile(value);
  }

  /**
   * 组合验证器 - 用户名或邮箱或手机号
   * @param value 值
   * @returns 是否为用户名或邮箱或手机号
   */
  public static isUsernameOrEmailOrMobile(value: string): boolean {
    return this.isUsername(value) || this.isEmail(value) || this.isMobile(value);
  }

  /**
   * 验证字符串长度范围
   * @param value 值
   * @param min 最小长度
   * @param max 最大长度
   * @returns 是否在指定长度范围内
   */
  public static isLengthBetween(value: string, min: number, max: number): boolean {
    if (typeof value !== 'string') return false;
    return value.length >= min && value.length <= max;
  }

  /**
   * 验证是否包含特殊字符
   * @param value 值
   * @returns 是否包含特殊字符
   */
  public static hasSpecialChars(value: string): boolean {
    if (typeof value !== 'string') return false;
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
  }

  /**
   * 验证是否包含空格
   * @param value 值
   * @returns 是否包含空格
   */
  public static hasSpaces(value: string): boolean {
    if (typeof value !== 'string') return false;
    return /\s/.test(value);
  }

  /**
   * 验证是否包含中文字符
   * @param value 值
   * @returns 是否包含中文字符
   */
  public static hasChineseChars(value: string): boolean {
    if (typeof value !== 'string') return false;
    return /[\u4e00-\u9fa5]/.test(value);
  }
}

export default ValidatorUtils;