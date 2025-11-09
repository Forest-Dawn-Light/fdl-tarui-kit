<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { lodashUtils } from '../utils/lodashUtils';

// 测试数据
const testData = ref<any>(null);
const testResult = ref<any>(null);

onMounted(() => {
  // 测试深拷贝
  const originalObj = {
    name: 'Test',
    age: 25,
    hobbies: ['reading', 'coding'],
    address: {
      city: 'Beijing',
      country: 'China'
    }
  };
  
  const clonedObj = lodashUtils.cloneDeep(originalObj);
  clonedObj.address.city = 'Shanghai';
  
  // 测试数组去重
  const numbers = [1, 2, 2, 3, 4, 4, 5];
  const uniqueNumbers = lodashUtils.uniq(numbers);
  
  // 测试数组分组
  const users = [
    { name: 'Alice', age: 25, role: 'admin' },
    { name: 'Bob', age: 30, role: 'user' },
    { name: 'Charlie', age: 35, role: 'admin' }
  ];
  const groupedUsers = lodashUtils.groupBy(users, 'role');
  
  // 测试对象属性获取
  const city = lodashUtils.get(originalObj, 'address.city', 'Unknown');
  
  // 测试防抖函数
  const debouncedFunction = lodashUtils.debounce(() => {
    console.log('防抖函数执行');
  }, 300);
  
  // 测试节流函数
  const throttledFunction = lodashUtils.throttle(() => {
    console.log('节流函数执行');
  }, 1000);
  
  // 测试字符串处理
  const camelCaseStr = lodashUtils.camelCase('hello-world-test');
  const kebabCaseStr = lodashUtils.kebabCase('HelloWorldTest');
  
  testData.value = {
    originalObj,
    clonedObj
  };
  
  testResult.value = {
    uniqueNumbers,
    groupedUsers,
    city,
    camelCaseStr,
    kebabCaseStr
  };
  
  // 触发防抖和节流函数进行测试
  debouncedFunction();
  throttledFunction();
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Lodash 工具类演示</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-semibold mb-2">深拷贝测试</h2>
        <div class="mb-2">
          <h3 class="font-medium">原始对象:</h3>
          <pre class="bg-gray-100 p-2 rounded">{{ testData?.originalObj }}</pre>
        </div>
        <div>
          <h3 class="font-medium">克隆对象:</h3>
          <pre class="bg-gray-100 p-2 rounded">{{ testData?.clonedObj }}</pre>
        </div>
      </div>
      
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-semibold mb-2">数组和对象操作</h2>
        <div class="mb-2">
          <h3 class="font-medium">数组去重:</h3>
          <p>{{ testResult?.uniqueNumbers?.join(', ') }}</p>
        </div>
        <div class="mb-2">
          <h3 class="font-medium">对象分组:</h3>
          <pre class="bg-gray-100 p-2 rounded text-sm">{{ testResult?.groupedUsers }}</pre>
        </div>
        <div>
          <h3 class="font-medium">属性获取:</h3>
          <p>城市: {{ testResult?.city }}</p>
        </div>
      </div>
      
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-semibold mb-2">字符串处理</h2>
        <div class="mb-2">
          <h3 class="font-medium">驼峰命名:</h3>
          <p>hello-world-test → {{ testResult?.camelCaseStr }}</p>
        </div>
        <div>
          <h3 class="font-medium">短横线命名:</h3>
          <p>HelloWorldTest → {{ testResult?.kebabCaseStr }}</p>
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