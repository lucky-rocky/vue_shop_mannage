import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import { routes } from './routes'
import { token } from '@/config'
import { getItem } from '@/utils/storage'

Vue.use(VueRouter)

// 解决重复点击hash报错的问题  new Vuerouter之前
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'hash',
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  if (!getItem(token)) {
    Vue.prototype.$message('未登录,请重新登录')
    return next('login')
  }
  next()
})

export default router
