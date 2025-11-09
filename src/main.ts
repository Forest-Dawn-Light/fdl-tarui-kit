import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import pinia from './store';
import router from './router';
import './styles/global.scss';
// 导入 UnoCSS 样式
import 'virtual:uno.css';
import permissionDirective from './directives/permission';

const app = createApp(App);
// 注册自定义指令
app.directive('permission', permissionDirective);

app.use(Antd);
app.use(pinia);
app.use(router);
app.mount('#app');
