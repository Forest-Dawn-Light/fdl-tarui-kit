<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ValidatorUtils } from '../utils/validatorUtils';

// 验证测试数据
const testResults = ref<Record<string, any>>({});

onMounted(() => {
  // 测试各种验证方法
  const tests = {
    // 邮箱验证
    email: {
      valid: ValidatorUtils.isEmail('test@example.com'),
      invalid: ValidatorUtils.isEmail('invalid.email'),
      edgeCase: ValidatorUtils.isEmail('test@sub.example.com')
    },
    
    // 手机号验证
    mobile: {
      valid: ValidatorUtils.isMobile('13812345678'),
      invalid: ValidatorUtils.isMobile('12345678901'),
      tooShort: ValidatorUtils.isMobile('1381234567'),
      tooLong: ValidatorUtils.isMobile('138123456789')
    },
    
    // 用户名验证
    username: {
      valid: ValidatorUtils.isUsername('test_user'),
      invalidStartWithNumber: ValidatorUtils.isUsername('1testuser'),
      invalidChars: ValidatorUtils.isUsername('test-user!'),
      tooShort: ValidatorUtils.isUsername('ab'),
      tooLong: ValidatorUtils.isUsername('a'.repeat(21))
    },
    
    // 密码验证
    password: {
      valid: ValidatorUtils.isPassword('Test123!@#'),
      weak1: ValidatorUtils.isPassword('test123'),
      weak2: ValidatorUtils.isPassword('TEST123'),
      weak3: ValidatorUtils.isPassword('Testtest'),
      tooShort: ValidatorUtils.isPassword('T1!')
    },
    
    // 身份证验证
    idCard: {
      valid: ValidatorUtils.isIdCard('110101199001011234'),
      invalid: ValidatorUtils.isIdCard('11010119900101123X')
    },
    
    // 中文姓名验证
    chineseName: {
      valid: ValidatorUtils.isChineseName('张三'),
      invalid: ValidatorUtils.isChineseName('张'),
      invalidChars: ValidatorUtils.isChineseName('张三123')
    },
    
    // 组合验证
    combined: {
      emailOrMobile: ValidatorUtils.isEmailOrMobile('test@example.com'),
      usernameOrEmailOrMobile: ValidatorUtils.isUsernameOrEmailOrMobile('testuser')
    },
    
    // 其他验证
    others: {
      url: ValidatorUtils.isUrl('https://www.example.com'),
      ip: ValidatorUtils.isIP('192.168.1.1'),
      numeric: ValidatorUtils.isNumeric('123456'),
      chinese: ValidatorUtils.isChinese('中文测试'),
      length: ValidatorUtils.isLengthBetween('test', 2, 10)
    }
  };
  
  testResults.value = tests;
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">参数验证工具演示</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-semibold mb-2">基础验证</h2>
        
        <div class="space-y-4">
          <div>
            <h3 class="font-medium">邮箱验证:</h3>
            <pre class="bg-gray-100 p-2 rounded text-sm">{{ testResults?.email }}</pre>
          </div>
          
          <div>
            <h3 class="font-medium">手机号验证:</h3>
            <pre class="bg-gray-100 p-2 rounded text-sm">{{ testResults?.mobile }}</pre>
          </div>
          
          <div>
            <h3 class="font-medium">用户名验证:</h3>
            <pre class="bg-gray-100 p-2 rounded text-sm">{{ testResults?.username }}</pre>
          </div>
          
          <div>
            <h3 class="font-medium">密码验证:</h3>
            <pre class="bg-gray-100 p-2 rounded text-sm">{{ testResults?.password }}</pre>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-semibold mb-2">高级验证</h2>
        
        <div class="space-y-4">
          <div>
            <h3 class="font-medium">身份证验证:</h3>
            <pre class="bg-gray-100 p-2 rounded text-sm">{{ testResults?.idCard }}</pre>
          </div>
          
          <div>
            <h3 class="font-medium">中文姓名验证:</h3>
            <pre class="bg-gray-100 p-2 rounded text-sm">{{ testResults?.chineseName }}</pre>
          </div>
          
          <div>
            <h3 class="font-medium">组合验证:</h3>
            <pre class="bg-gray-100 p-2 rounded text-sm">{{ testResults?.combined }}</pre>
          </div>
          
          <div>
            <h3 class="font-medium">其他验证:</h3>
            <pre class="bg-gray-100 p-2 rounded text-sm">{{ testResults?.others }}</pre>
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