// 职责：创建一个router实例 导出给main使用
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Test from '@/views/test/com-parent'
import Article from '@/views/article'

Vue.use(VueRouter)

const router = new VueRouter({
  // 定义路由规则（路径==>组件）
  routes: [
    // name选项作用  找到对应的路由规则
    // 跳转方便一些：$router.push('/login') 或者 $router.push({name:'login'})
    { path: '/login', name: 'login', component: Login },
    { path: '/test', name: 'test', component: Test },
    {
      path: '/',
      component: Home,
      children: [
        // 路由规则  子路由有名称  父路由不需要设置name属性
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article }
      ]
    },
    { path: '*', name: '404', component: NotFound }
  ]
})

// 前置守卫
router.beforeEach((to, from, next) => {
  // // 1. 去的路径是登录的时候  放行
  // if (to.path === '/login') return next()
  // // 2. 不是登录的时候 且 并没有登录  拦截 登录页面
  // if (!store.getUser().token) return next('/login')
  // // 3. 其他情况 放行
  // next()
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})

export default router
