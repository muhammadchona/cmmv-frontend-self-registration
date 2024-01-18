// import { RouteRecordRaw } from 'vue-router';
//import AccessControlUtils from '../utils/AccessControlUtils';
// import { useLoading } from 'src/composables/shared/loading/loading';

const routes = [
  /* {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
        { path: '', component: () => import('src/pages/Login.vue') }
    ]
  }, */
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/Index.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
