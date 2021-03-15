
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/scheduler',
        component: () => import('pages/Scheduler.vue')
      },
      {
        path: '/settings',
        component: () => import('pages/PageSettings.vue')
      },
      {
        path: '/settings/help',
        component: () => import('pages/PageHelp.vue')
      }]
  },
  {
    path: '/auth',
    component: () => import('layouts/Layout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/PageAuth.vue')
      }]
  },
  {
    path: '/login',
    component: () => import('pages/auth/login')
  },
  {
    path: '/success',
    component: () => import('pages/auth/success'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/verifyEmail',
    component: () => import('pages/auth/verifyEmail'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/completeAccount',
    component: () => import('pages/auth/completeAccount'),
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
