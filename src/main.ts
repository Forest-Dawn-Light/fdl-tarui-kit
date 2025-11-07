import { createApp } from "vue";
import App from "./App.vue";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import pinia from './store';
import './styles/global.scss';

const app = createApp(App);
app.use(Antd);
app.use(pinia);
app.mount("#app");