<<<<<<< HEAD
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
=======
import { Form } from 'vant'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import SaoYiSao from '../views/SaoYiSao.vue'
Vue.use(VueRouter)

// 解决路由重复
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}


const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/home',
    component: Home,
    children:[
      // 主页
      {
        path:"index",
        component: () => import(
          /* webpackChunkName: "Index" */ 
          '../views/Index.vue'
          )
      },
      // 商品页
      {
        path:"sp",
        component: () => import(
          /* webpackChunkName: "Sp" */ 
          '../views/Sp.vue'
          )
      },
      // 订单详情页
      {
        path:"order",
        component: () => import(
          /* webpackChunkName: "Order" */ 
          '../views/Order.vue'
          )
      },
    ]
  },
  // 扫一扫
  {
    path:"/saoyisao",
    component: () => import(
      /* webpackChunkName: "SaoYiSao" */ 
      '../views/SaoYiSao.vue'
      )
  },
  // 消息
  {
    path:"/chat",
    component: () => import(
      /* webpackChunkName: "Chat" */ 
      '../views/Chat.vue'
      )
  },
  // 消息框
  {
    path:"/chatbox",
    component: () => import(
      /* webpackChunkName: "Chatbox" */ 
      '../views/Chatbox.vue'
      )
  },
  // 支付
  {
    path:"/payment",
    component: () => import(
      /* webpackChunkName: "Payment" */ 
      '../views/Payment.vue'
      )
  },
  // 钱包
  {
    path:"/wallet",
    component: () => import(
      /* webpackChunkName: "Wallet" */ 
      '../views/Wallet.vue'
      )
  },
  // 设置
  {
    path:"/setup",
    component: () => import(
      /* webpackChunkName: "SetUp" */ 
      '../views/SetUp.vue'
      )
  },
  // 个人信息
  {
    path:"/user",
    component: () => import(
      /* webpackChunkName: "User" */ 
      '../views/User.vue'
      )
  },
  // 消费记录
  {
    path:"/record",
    component: () => import(
      /* webpackChunkName: "Record" */ 
      '../views/Record.vue'
      )
  },
  // 优惠券
  {
    path:"/coupon",
    component: () => import(
      /* webpackChunkName: "Coupon" */ 
      '../views/Coupon.vue'
      )
  },
  // 地址
  {
    path:"/address",
    component: () => import(
      /* webpackChunkName: "Address" */ 
      '../views/Address.vue'
      )
  },
  // 评价
  {
    path:"/estimate",
    component: () => import(
      /* webpackChunkName: "Estimate" */ 
      '../views/Estimate.vue'
      )
  },
  // 登录
  {
    path:"/login",
    component: () => import(
      /* webpackChunkName: "Login" */ 
      '../views/Login.vue'
      )
  },
  //搜索
  {
    path:"/search",
    component: () => import(
      /* webpackChunkName: "Search" */ 
      '../views/Search.vue'
      )
  },
  {
    path: '*',
    name: 'notfound',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NotFound.vue')
  },
>>>>>>> 0756acf (wangjing-v 1.0.0.1)
]

const router = new VueRouter({
  routes
})

export default router
