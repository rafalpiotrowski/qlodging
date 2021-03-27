
const routes = [
  {
    path: '/auth',
    component: () => import('layouts/Layout.vue'),
    children: [
      {
        path: 'login',
        component: () => import('pages/PageAuth.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/todo',
        component: () => import('src/pages/PageTasks.vue')
      },
      {
        path: '/settings',
        component: () => import('pages/PageSettings.vue')
      },
      {
        path: '/settings/help',
        component: () => import('pages/PageHelp.vue')
      },
      {
        path: '/verifyEmail',
        component: () => import('pages/PageVerifyEmail')
      },
      {
        path: '/scheduler',
        component: () => import('pages/PageScheduler')
      },
      {
        path: '/resources',
        component: () => import('pages/PageResources')
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
