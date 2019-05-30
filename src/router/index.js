import Router from 'vue-router';

import Login from './modules/login'
import Product from './modules/product';
import Order from './modules/order';

const router = new Router({
  mode: 'history',
  routes:[
    {
      path: '/',
      redirect: { name: 'login' }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home.vue')
    },
    ...Login,
    ...Product,
    ...Order
  ]
})

export default router;