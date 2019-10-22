import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/pages/login.vue'
import Personal from '@/pages/personal.vue'
import Register from '@/pages/register.vue'
import EditPersonal from '@/pages/editPersonal.vue'
import MyFocus from '@/pages/myFocus.vue'
import MyComments from '@/pages/myComments.vue'
import MyCollection from '@/pages/myCollection.vue'
import Index from '@/pages/index.vue'
import ArticleDetails from '@/pages/articleDetails.vue'
import GoodComments from '@/pages/goodComments.vue'
import Search from '@/pages/search.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    name: 'Index',
    path: '/',
    component: Index
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  }, {
    name: 'Personal',
    path: '/personal',
    component: Personal
  }, {
    name: 'Register',
    path: '/register',
    component: Register
  }, {
    name: 'EditPersonal',
    path: '/editPersonal',
    component: EditPersonal
  }, {
    name: 'MyFocus',
    path: '/myFocus',
    component: MyFocus
  }, {
    name: 'MyComments',
    path: '/myComments',
    component: MyComments
  }, {
    name: 'MyCollection',
    path: '/myCollection',
    component: MyCollection
  }, {
    name: 'ArticleDetails',
    path: '/articleDetails/:id',
    component: ArticleDetails
  }, {
    name: 'GoodComments',
    path: '/goodComments/:id',
    component: GoodComments
  },
  {
    name: 'Search',
    path: '/search',
    component: Search
  }
  ]
})

// 添加导航守卫
// vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航
router.beforeEach((to, from, next) => {
  // 判断用户是否登陆过
  if (to.path === '/personal') {
    let token = localStorage.getItem('news_37')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
