import Router from 'vue-router';

import Login from './modules/login'

const router = new Router({
  mode: 'history',
  routes:[
    {
      path: '/',
      redirect: { name: 'login' }
    },
    ...Login
  ]
})

export default router;