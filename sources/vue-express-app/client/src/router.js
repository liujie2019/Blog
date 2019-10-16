import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/Index.vue';
import Home from './views/Home.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import NotFound from './views/404.vue';
import InfoShow from './views/InfoShow.vue';
import FoundList from './views/FoundList.vue';

Vue.use(Router);


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '*', name: '/404', component: NotFound },
    { path: '/', redirect: '/index' },
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    {
      path: '/index',
      // name: 'index',
      component: Index,
      children: [
        { path: '', component: Home },
        { path: '/home', name: 'home', component: Home },
        { path: '/infoshow', name: 'infoshow', component: InfoShow },
        { path: '/foundlist', name: 'foundlist', component: FoundList },
      ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // }
  ],
});
// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken;
  if (to.path === '/login' || to.path === '/register') {
    next();
  } else {
    // eslint-disable-next-line no-unused-expressions
    isLogin ? next() : next('/login');
  }
});
export default router;
