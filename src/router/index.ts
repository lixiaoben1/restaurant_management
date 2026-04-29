import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/info', // 将根路径重定向到 /home
      component: () => import('@/views/backstage_manage/backstage_main.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/backstage_manage/components/dashboard.vue')
        },
        {
          path: 'database',
          component: () => import('@/views/backstage_manage/components/database.vue')
        },
        {
          path: 'info',
          component: () => import('@/views/backstage_manage/components/brief_info.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login_page/index.vue')
    }
  ]
})
export default router
