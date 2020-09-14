export const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/welcome',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/Home'),
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/Welcome.vue')
      },
      {
        path: '/users',
        name: 'users',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/index.vue')
      },
      {
        path: '/roles',
        name: 'roles',
        component: () =>
          import(/* webpackChunkName: "roles" */ '@/views/roles/index.vue')
      },
      {
        path: '/categories',
        name: 'categories',
        component: () =>
          import(/* webpackChunkName: "goods" */ '@/views/goods/Categories')
      }
    ]
  }
]
