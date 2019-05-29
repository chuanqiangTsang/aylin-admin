import Router from 'vue-router';

import Login from './modules/login'

import Home from './modules/home'

const router = new Router({
  mode: 'history',
  routes:[
    {
      path: '/',
      redirect: { name: 'login' }
    },
    ...Login,
    ...Home
  ]
})

export default router;