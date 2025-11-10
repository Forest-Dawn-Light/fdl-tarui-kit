import { logUtils } from '@/utils';

export interface WebsocketOptions {
  url: string;
  defaultData: any;
  onUpdate: (data: any) => void;
}

/**
 * 使用 WebSocket 组件
 * @param props
 */
export function useWebsocket<T>(props: WebsocketOptions) {
  const { url, defaultData, onUpdate } = props;
  const data = ref<T>(defaultData);
  const isConnected = ref<boolean>(false);
  const socket = ref<WebSocket | null>(null);

  const connect = () => {
    socket.value = new WebSocket(url);
    // TODO: 创建一个 WebSocket 链接
    socket.value.onopen = () => {
      isConnected.value = true;
    };

    socket.value.onmessage = (event) => {
      // TODO: 判断是否是 JSON 数据
      if (!event.data || typeof event.data !== 'string') {
        return;
      }
      data.value = JSON.parse(event.data);
      onUpdate(JSON.parse(event.data));
    };

    socket.value.onclose = () => {
      console.log('WebSocket 已关闭');
      isConnected.value = false;
      connect();
    };

    socket.value.onerror = (error) => {
      logUtils.error('WebSocket 错误:', error);
      connect();
    };
  };

  onMounted(() => {
    connect();
  });

  onUnmounted(() => {
    // TODO: 在组件卸载时关闭 WebSocket 连接
    socket.value?.close();
    socket.value = null;
  });

  return {
    data,
    isConnected,
  };
}
