import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import { useUserStore } from '@/store/modules/user';

import emailRouter from './modules/email';
import bookRouter from './modules/book';
import messageRouter from './modules/message';
import documentRouter from './modules/document';
import workRouter from './modules/work';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
    meta: {
      keepAlive: true,
    },
    redirect: 'message',
    children: [
      {
        path: '/book',
        name: 'book',
        component: () => import('@/views/book/index.vue'),
      },
      {
        path: '/email',
        name: 'email',
        component: () => import('@/views/email/index.vue'),
      },
      {
        path: '/message',
        name: 'message',
        component: () => import('@/views/message/index.vue'),
      },
      {
        path: '/work',
        name: 'work',
        component: () => import('@/views/work/index.vue'),
      },
      {
        path: '/document',
        name: 'document',
        component: () => import('@/views/document/index.vue'),
      },
    ],
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
  ...emailRouter,
  ...bookRouter,
  ...messageRouter,
  ...documentRouter,
  ...workRouter,
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

//  路由守护
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isLogin = userStore.token;
  if (to.path === '/login' || to.path === '/register') {
    isLogin ? next('/') : next();
  } else {
    isLogin ? next() : next('/login');
  }
});

export default router;
