import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes'

Vue.use(Router)

const newRouter = new Router({
  routes
})

newRouter.beforeEach((to, from, next) => {
  next()
})

export default newRouter
