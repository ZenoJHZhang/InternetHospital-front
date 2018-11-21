import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children :[
      {
        path: '/',
        name: 'index',
        component: () => import('./views/diagnose/index.vue')
      },
      {
        path: '/netTreatRoom',
        name: 'netTreatRoom',
        component: () => import('./views/diagnose/netTreatRoom.vue')
      },
      {
        path: '/reservationData',
        name: 'reservationData',
        component: () => import('./views/diagnose/reservationData.vue')
      }
    ]
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('./views/test/test.vue')
    }
  ]
})
