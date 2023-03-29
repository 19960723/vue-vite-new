import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/room',
    name: 'room',
    component: () => import('@/views/room/index.vue'),
  },
  {
    path: '/empty',
    name: 'empty',
    component: () => import('@/views/empty/index.vue'),
  },
];
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
export default router;
