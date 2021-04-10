import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location) {
  return originalPush.call(this, location).catch(err => {})
};
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/home/searchPopup',
        name: 'SearchPopup',
        component: () => import(/* webpackChunkName: "searchPopup" */ '../views/SearchPopup.vue')
      }
    ],
    // 跟路径相关的变量定义在meta这里(不同路径有不同的值)
    meta:{
      activeNum:0,
      isShowTabbar:true
    }
  },
  {
    path: '/topic',
    name: 'Topic',
    component: () => import(/* webpackChunkName: "Topic" */ '../views/Topic.vue'),
    meta:{
      activeNum:1,
      isShowTabbar:true
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import(/* webpackChunkName: "Category" */ '../views/Category.vue'),
    meta:{
      activeNum:2,
      isShowTabbar:true
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "Cart" */ '../views/Cart.vue'),
    meta:{
      activeNum:3,
      isShowTabbar:true
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "User" */ '../views/User.vue'),
    meta:{
      activeNum:4,
      isShowTabbar:true
    }
  },
  {
    path: '/productDetail',
    name: 'ProductDetail',
    component: () => import(/* webpackChunkName: "ProductDetail" */ '../views/ProductDetail.vue'),
    meta:{
      isShowTabbar:false
    }
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由拦截/路由守卫,  在跳转路由之前拦截下来，判断是否能够获取到token
router.beforeEach((to,from,next)=>{
  // 简单理解，每一次跳转之前都会执行这个函数
  // to是要去往的路由对象  （ to.path == "/cart"假如成立，就表示即将要要转到购物车页面）
  // from 是从哪里出发的这个路由对象
  // console.log("to",to);
  // console.log("from",from);
  // 效果： 点击购物车， 如果登录直接进入页面，如果没登录，就弹出提示请登录，然后跳转到“我的”页面
  // 需求：去往购物车页面之前，先判断是否能够获取到token，如果获取到直接next()
  // 获取不到就跳转 “我的”页面
  
  let token = localStorage.getItem("token");
  if(to.path == "/cart"){  // 判断是否来到购物车页面
    
    if(token){
      next()
    }else{
      // 提示没有登录
      Vue.prototype.$toast('请先登录！');
      // 跳转 “我的”页面
      setTimeout(()=>{
        next("/user")  
      },1000)
    } 
    return
  }
  next() // 必须调用next() 才能到达要跳转到的这个页面
})





export default router
