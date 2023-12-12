import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'create-menu',
        component: () => import('pages/CreateMenu.vue'),
      },
      {
        path: 'configure-displays',
        component: () => import('pages/ConfigureDisplays.vue'),
      },
      {
        path: 'manage-menus',
        component: () => import('pages/ManageMenus.vue'),
      },
      {
        path: 'menu-analytics',
        component: () => import('pages/MenuAnalytics.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
