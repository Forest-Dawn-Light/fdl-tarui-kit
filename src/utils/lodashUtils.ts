import {
  debounce,
  throttle,
  cloneDeep,
  isEqual,
  pick,
  omit,
  merge,
  get,
  set,
  has,
  isEmpty,
  isNil,
  isUndefined,
  isNull,
  isString,
  isNumber,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  isDate,
  isRegExp,
  isPlainObject,
  uniq,
  uniqBy,
  groupBy,
  sortBy,
  orderBy,
  chunk,
  flatten,
  flattenDeep,
  compact,
  difference,
  intersection,
  union,
  map,
  filter,
  find,
  some,
  every,
  reduce,
  forEach,
  keys,
  values,
  entries,
  toPairs,
  fromPairs,
  camelCase,
  kebabCase,
  snakeCase,
  startCase,
  upperFirst,
  lowerFirst,
  capitalize,
  trim,
  trimStart,
  trimEnd,
  pad,
  padStart,
  padEnd,
  truncate,
  escape,
  unescape,
  template,
  random,
  range,
  shuffle,
  sample,
  sampleSize,
  without,
  pull,
  pullAt,
  take,
  takeRight,
  drop,
  dropRight,
  head,
  last,
  nth,
  indexOf,
  findIndex,
  includes
} from 'lodash-es';

/**
 * Lodash 工具类封装
 * 提供常用的 Lodash 方法，便于统一管理和使用
 */
class LodashUtils {
  // 防抖函数
  public debounce = debounce;
  
  // 节流函数
  public throttle = throttle;
  
  // 深拷贝
  public cloneDeep = cloneDeep;
  
  // 比较两个值是否相等
  public isEqual = isEqual;
  
  // 选择对象的部分属性
  public pick = pick;
  
  // 排除对象的部分属性
  public omit = omit;
  
  // 合并对象
  public merge = merge;
  
  // 获取对象属性值
  public get = get;
  
  // 设置对象属性值
  public set = set;
  
  // 检查对象是否有指定属性
  public has = has;
  
  // 检查值是否为空
  public isEmpty = isEmpty;
  
  // 检查值是否为 null 或 undefined
  public isNil = isNil;
  
  // 检查值是否为 undefined
  public isUndefined = isUndefined;
  
  // 检查值是否为 null
  public isNull = isNull;
  
  // 检查值是否为字符串
  public isString = isString;
  
  // 检查值是否为数字
  public isNumber = isNumber;
  
  // 检查值是否为布尔值
  public isBoolean = isBoolean;
  
  // 检查值是否为数组
  public isArray = isArray;
  
  // 检查值是否为对象
  public isObject = isObject;
  
  // 检查值是否为函数
  public isFunction = isFunction;
  
  // 检查值是否为日期对象
  public isDate = isDate;
  
  // 检查值是否为正则表达式
  public isRegExp = isRegExp;
  
  // 检查值是否为普通对象
  public isPlainObject = isPlainObject;
  
  // 数组去重
  public uniq = uniq;
  
  // 根据指定条件数组去重
  public uniqBy = uniqBy;
  
  // 根据指定条件分组
  public groupBy = groupBy;
  
  // 数组排序
  public sortBy = sortBy;
  
  // 数组排序（可指定排序规则）
  public orderBy = orderBy;
  
  // 将数组拆分成多个指定长度的块
  public chunk = chunk;
  
  // 扁平化数组（一级）
  public flatten = flatten;
  
  // 扁平化数组（深层）
  public flattenDeep = flattenDeep;
  
  // 过滤掉假值元素
  public compact = compact;
  
  // 返回数组中不同的元素
  public difference = difference;
  
  // 返回数组中相同的元素
  public intersection = intersection;
  
  // 返回数组的并集
  public union = union;
  
  // 映射数组或对象
  public map = map;
  
  // 过滤数组或对象
  public filter = filter;
  
  // 查找元素
  public find = find;
  
  // 检查是否有元素满足条件
  public some = some;
  
  // 检查是否所有元素都满足条件
  public every = every;
  
  // 归纳数组或对象
  public reduce = reduce;
  
  // 遍历数组或对象
  public forEach = forEach;
  
  // 获取对象的所有键
  public keys = keys;
  
  // 获取对象的所有值
  public values = values;
  
  // 获取对象的键值对数组
  public entries = entries;
  
  // 获取对象的键值对数组（别名）
  public toPairs = toPairs;
  
  // 从键值对数组创建对象
  public fromPairs = fromPairs;
  
  // 转换为驼峰命名
  public camelCase = camelCase;
  
  // 转换为短横线命名
  public kebabCase = kebabCase;
  
  // 转换为下划线命名
  public snakeCase = snakeCase;
  
  // 转换为起始空格分隔的单词
  public startCase = startCase;
  
  // 首字母大写
  public upperFirst = upperFirst;
  
  // 首字母小写
  public lowerFirst = lowerFirst;
  
  // 首字母大写（整个字符串）
  public capitalize = capitalize;
  
  // 去除首尾空格
  public trim = trim;
  
  // 去除开头空格
  public trimStart = trimStart;
  
  // 去除结尾空格
  public trimEnd = trimEnd;
  
  // 在两侧填充字符
  public pad = pad;
  
  // 在开头填充字符
  public padStart = padStart;
  
  // 在结尾填充字符
  public padEnd = padEnd;
  
  // 截断字符串
  public truncate = truncate;
  
  // 转义 HTML 字符
  public escape = escape;
  
  // 反转义 HTML 字符
  public unescape = unescape;
  
  // 模板函数
  public template = template;
  
  // 生成随机数
  public random = random;
  
  // 生成数字范围数组
  public range = range;
  
  // 打乱数组
  public shuffle = shuffle;
  
  // 从数组中随机取一个元素
  public sample = sample;
  
  // 从数组中随机取指定数量的元素
  public sampleSize = sampleSize;
  
  // 过滤掉指定的元素
  public without = without;
  
  // 移除指定的元素
  public pull = pull;
  
  // 移除指定索引的元素
  public pullAt = pullAt;
  
  // 获取数组前 N 个元素
  public take = take;
  
  // 获取数组后 N 个元素
  public takeRight = takeRight;
  
  // 跳过数组前 N 个元素
  public drop = drop;
  
  // 跳过数组后 N 个元素
  public dropRight = dropRight;
  
  // 获取数组第一个元素
  public head = head;
  
  // 获取数组最后一个元素
  public last = last;
  
  // 获取数组第 N 个元素
  public nth = nth;
  
  // 获取元素在数组中的索引
  public indexOf = indexOf;
  
  // 查找元素的索引
  public findIndex = findIndex;
  
  // 检查数组是否包含指定元素
  public includes = includes;
}

// 创建实例并导出
export const lodashUtils = new LodashUtils();

export default lodashUtils;