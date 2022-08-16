import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../components/common/login.vue'
// import Home from '../components/common/home.vue'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/', name: 'Main',  
      component: () => import('../components/common/main.vue'),
      // redirect:'/home',
      children: [
        // { path: '/home',name:'home', component: () => import('../views/home') },
        // { path: '/user',name:'user', component: () => import('../views/user') },
        // { path: '/mall',name:'mall', component: () => import('../views/mall') },
        // // {path:'/other',component: () => import('../views/other')},
        // { path: '/page1',name:'page1', component: () => import('../views/other/pageone.vue') },
        // { path: '/page2',name:'page2', component: () => import('../views/other/pagetwo.vue') }
      ]
    },
    {
      path: '/login', component: () => import('../components/common/login'),
      name: 'login'
    },
  ],
  mode: 'history'
})

export default router
