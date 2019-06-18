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
            },
            {
                path: 'add',
                name: 'add-product',
                component: () => import('@/views/product/add-product.vue')
            },
            {
                path: 'add-category',
                name: 'add-category',
                component: () => import('@/views/product/add-category.vue')
            }
        ]
    }
]