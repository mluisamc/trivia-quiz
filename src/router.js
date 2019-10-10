import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Questions from './views/Questions.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/questions',
      name: 'questions',
      component: Questions,
      params: { category: null }
    }
  ]
})
