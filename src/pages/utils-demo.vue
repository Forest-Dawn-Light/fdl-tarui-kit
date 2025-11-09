<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { TypeUtils } from '../utils/typeUtils';
import { DayjsUtils } from '../utils/dayjsUtils';

// 类型转换测试数据
const typeTestData = ref<any>(null);
const dateTestData = ref<any>(null);

onMounted(() => {
  // 测试类型转换工具
  const typeTests = {
    // 测试 toNumber
    toNumber: {
      string: TypeUtils.toNumber('123'),
      boolean: TypeUtils.toNumber(true),
      null: TypeUtils.toNumber(null, -1),
      invalid: TypeUtils.toNumber('abc', 0)
    },
    
    // 测试 toString
    toString: {
      number: TypeUtils.toString(123),
      boolean: TypeUtils.toString(true),
      null: TypeUtils.toString(null, 'default')
    },
    
    // 测试 toBoolean
    toBoolean: {
      stringTrue: TypeUtils.toBoolean('true'),
      stringFalse: TypeUtils.toBoolean('false'),
      number: TypeUtils.toBoolean(1),
      zero: TypeUtils.toBoolean(0)
    },
    
    // 测试 toArray
    toArray: {
      single: TypeUtils.toArray('item'),
      array: TypeUtils.toArray([1, 2, 3]),
      null: TypeUtils.toArray(null)
    },
    
    // 测试安全数字转换
    safeNumbers: {
      safeNumber: TypeUtils.safeNumber('123.45'),
      safeInteger: TypeUtils.safeInteger('123.78'),
      clamp: TypeUtils.clamp(15, 1, 10, 5)
    }
  };
  
  // 测试日期工具
  const now = DayjsUtils.now();
  const dateTests = {
    // 基本格式化
    format: DayjsUtils.format(now),
    localized: DayjsUtils.formatLocalized(now, 'LLLL'),
    
    // 相对时间
    fromNow: DayjsUtils.fromNow(now.subtract(2, 'hour')),
    
    // 时间计算
    add: DayjsUtils.format(DayjsUtils.add(now, 7, 'day')),
    subtract: DayjsUtils.format(DayjsUtils.subtract(now, 3, 'month')),
    
    // 时间比较
    isBefore: DayjsUtils.isBefore(now, DayjsUtils.add(now, 1, 'day')),
    isAfter: DayjsUtils.isAfter(now, DayjsUtils.subtract(now, 1, 'day')),
    
    // 时间范围
    range: DayjsUtils.range(now, DayjsUtils.add(now, 5, 'day')).map(d => DayjsUtils.format(d, 'MM-DD')),
    
    // 特定时间组件
    components: {
      year: DayjsUtils.year(now),
      month: DayjsUtils.month(now),
      date: DayjsUtils.date(now),
      day: DayjsUtils.day(now),
      hour: DayjsUtils.hour(now)
    }
  };
  
  typeTestData.value = typeTests;
  dateTestData.value = dateTests;
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">工具类演示</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-semibold mb-2">类型转换工具</h2>
        
        <div class="space-y-4">
          <div>
            <h3 class="font-medium">数字转换:</h3>
            <pre class="bg-gray-100 p-2 rounded text-sm">{{ typeTestData?.toNumber }}</pre>
          </div>
          
          <div>
            <h3 class="font-medium">字符串转换:</h3>
            <pre class="bg-gray-100 p-2 rounded text-sm">{{ typeTestData?.toString }}</pre>
          </div>
          
          <div>
            <h3 class="font-medium">布尔值转换:</h3>
            <pre class="bg-gray-100 p-2 rounded text-sm">{{ typeTestData?.toBoolean }}</pre>
          </div>
          
          <div>
            <h3 class="font-medium">数组转换:</h3>
            <pre class="bg-gray-100 p-2 rounded text-sm">{{ typeTestData?.toArray }}</pre>
          </div>
          
          <div>
            <h3 class="font-medium">安全数字处理:</h3>
            <pre class="bg-gray-100 p-2 rounded text-sm">{{ typeTestData?.safeNumbers }}</pre>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-semibold mb-2">日期时间工具</h2>
        
        <div class="space-y-4">
          <div>
            <h3 class="font-medium">格式化:</h3>
            <p class="text-sm">标准格式: {{ dateTestData?.format }}</p>
            <p class="text-sm">本地化格式: {{ dateTestData?.localized }}</p>
          </div>
          
          <div>
            <h3 class="font-medium">相对时间:</h3>
            <p class="text-sm">{{ dateTestData?.fromNow }}</p>
          </div>
          
          <div>
            <h3 class="font-medium">时间计算:</h3>
            <p class="text-sm">加7天: {{ dateTestData?.add }}</p>
            <p class="text-sm">减3月: {{ dateTestData?.subtract }}</p>
          </div>
          
          <div>
            <h3 class="font-medium">时间比较:</h3>
            <p class="text-sm">是否在之后: {{ dateTestData?.isBefore }}</p>
            <p class="text-sm">是否在之前: {{ dateTestData?.isAfter }}</p>
          </div>
          
          <div>
            <h3 class="font-medium">日期范围:</h3>
            <p class="text-sm">{{ dateTestData?.range?.join(', ') }}</p>
          </div>
          
          <div>
            <h3 class="font-medium">时间组件:</h3>
            <pre class="bg-gray-100 p-2 rounded text-sm">{{ dateTestData?.components }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: 100%;
}
</style>