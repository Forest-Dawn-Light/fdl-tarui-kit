import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../pages/home.vue'
import Settings from '../pages/settings.vue'
import LodashDemo from '../pages/lodash-demo.vue'
import UtilsDemo from '../pages/utils-demo.vue'
import ValidatorDemo from '../pages/validator-demo.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/lodash',
    name: 'LodashDemo',
    component: LodashDemo
  },
  {
    path: '/utils',
    name: 'UtilsDemo',
    component: UtilsDemo
  },
  {
    path: '/validator',
    name: 'ValidatorDemo',
    component: ValidatorDemo
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router