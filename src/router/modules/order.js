export default [
  {
    path: '/order',
    name: 'order',
    redirect: { name: 'order-list' },
    component: () => import('@/views/common.vue'),
    children: [
      {
        path: 'list',
        name: 'order-list',
        component: () => import('@/views/order/order-list.vue')
      }
    ]
  }
]