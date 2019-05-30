export default [
    {
        path: '/product',
        name: 'product',
        redirect: { name: 'product-list' },
        component: () => import('@/views/common.vue'),
        children: [
            {
                path: 'list',
                name: 'product-list',
                component: () => import('@/views/product/product-list.vue')
            }
        ]
    }
]