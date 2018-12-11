import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import PersonalCenter from '@/views/diagnose/personalCenter'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children :[
      {
        path: '/',
        name: 'index',
        component: () => import('@/views/diagnose/index.vue')
      },
      {
        path: 'netTreatRoom',
        name: 'netTreatRoom',
        component: () => import('@/views/diagnose/netTreatRoom.vue')
      },
      {
        path: 'reservationData',
        name: 'reservationData',
        component: () => import('@/views/diagnose/reservationData.vue')
      },
      {
        path: 'receptionDepartment',
        name: 'receptionDepartment',
        component: () => import('@/views/diagnose/receptionDepartment.vue')
      },
      {
        path: 'receptionExpert',
        name: 'receptionExpert',
        component: () => import('@/views/diagnose/receptionExpert.vue')
      },
      {
        path: 'personalCenter',
        name: 'personalCenter',
        component: () => import('@/views/diagnose/personalCenter'),
        children: [{
          path: '',
          name: 'userReservationInformation',
          component: () => import('@/views/diagnose/personalCenterPage/userReservationInformation.vue')
        }, {
          path: 'userReservationInformation',
          name: 'userReservationInformation',
          component: () => import('@/views/diagnose/personalCenterPage/userReservationInformation.vue')
        }, {
          path: 'patientManagement',
          name: 'patientManagement',
          component: () => import('@/views/diagnose/personalCenterPage/patientManagement.vue')
        }]
      }
    ]
  }]
})