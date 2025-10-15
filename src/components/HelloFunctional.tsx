import { ref } from 'vue';

// 定义 Props 类型（两种方式）
// 方式 1：通过接口定义
interface HelloTsxProps {
  title: string;
  count?: number; // 可选属性
}

// 方式 2：通过 defineProps 直接定义（更简洁）
// const props = defineProps<{
//   title: string;
//   count?: number;
// }>()

export default function HelloFunctional(props: HelloTsxProps) {
  // 初始化响应式变量
  const currentCount = ref(props.count || 0);

  // 计数更新函数
  const handleIncrement = (step: number) => {
    currentCount.value += step;
    // 可添加日志验证是否执行
    console.log('当前值:', currentCount.value);
  };

  return (
    <div class="hello-tsx">
      <h1>{props.title}</h1>
      <p>当前计数：{currentCount.value}</p>
      <button onClick={() => handleIncrement(1)}>加 1</button>
      <button onClick={() => handleIncrement(-1)}>减 1</button>
    </div>
  );
}
