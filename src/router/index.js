import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import home from '@/components/home'
import goods from '@/components/goods'
import users from '@/views/users'
import welcome from '@/views/welcome'

Vue.use(VueRouter)

const routes = [
  /* 设置重定向到登录页 */
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: home,
    redirect: '/home/welcome',
    children: [
      {
        path: 'users',
        component: users
      },
      {
        path: 'welcome',
        component: welcome
      }
    ]
  },
  {
    path: '/goods',
    component: goods
  }
]

const router = new VueRouter({
  routes
})

/* 导航守卫 */
router.beforeEach((to, from, next) => {
  /* 根据本地存储是否存在 token 没有就强制到login */
  if (to.path === '/login') {
    next()
  } else {
    if (window.sessionStorage.getItem('token')) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
