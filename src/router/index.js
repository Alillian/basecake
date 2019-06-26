import Vue from 'vue'
import Router from 'vue-router'
import api from '@/core/api/index'
// console.log(global.getParam())


Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: '/',
    component: resolve => require(['@/components/home'], resolve),
    redirect: "index",
    children: [{
        path: 'index',
        name: 'index',
        meta:{
          keepAlive:false,
         title:"首页"
        },
        component: resolve => require(['@/components/main/index'], resolve)
      },
      {
        path: 'class',
        name: 'class',
        meta:{
          keepAlive: false,
          title:"列表"
        },
        component: resolve => require(['@/components/main/class'], resolve),
      },
      {
        path: 'cart',
        name: 'cart',
        meta: {
          title:"购物车"
        },
        component: resolve => require(['@/components/main/cart'], resolve),
      },
      {
        path: 'user',
        name: 'user',
        meta: {
          title:"我的"
        },
        component: resolve => require(['@/components/main/user'], resolve),
      },
      {
        path: 'show',
        name: 'show',
        meta: {
          title:"详情"
        },
        component: resolve => require(['@/components/main/show'], resolve),
      },
      {
        path: 'edit',
        name: 'edit',
        meta: {
          title:"注册"
        },
        component: resolve => require(['@/components/main/edit'], resolve),
      }
    ]
  }]
})

export default router;
