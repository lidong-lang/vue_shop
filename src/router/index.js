import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
 {path:'/',redirect:'/login'},
 {path:'/login',component:Login},
 {path:'/home',component:Home}

]

const router = new VueRouter({
  routes
})
// router挂载导航守卫
router.beforeEach(function(to,from,next){
 if(to.path==='/login') return next()
//  获取token
let tokenStr=window.sessionStorage.getItem('token')
if(!tokenStr)return next('/login')
next()
})

export default router
