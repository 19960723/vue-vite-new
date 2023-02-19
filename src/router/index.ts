import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/user/register.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error',
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/notFound/index.vue'),
  },
];
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
export default router;
