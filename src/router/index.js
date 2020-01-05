import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/user/users.vue'
Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [{
        path: '/welcome',
        component: Welcome
      }, {
        path: '/user',
        component: Welcome
      }]
    }
  ]
})

//挂在路由导航守卫
router.beforeEach((to, from, next) => {
  //to将要去的路径
  //from 代表从哪个路径跳转而来
  //next  函数 ，表示放行
  if (to.path === '/login') {
    return next();
  } else {
    const token = window.sessionStorage.getItem('token');
    if (!token) {
      return next('/login');
    } else {
      return next();
    }
  }
})
export default router
