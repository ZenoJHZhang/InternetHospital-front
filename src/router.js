import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: () => import('@/views/Home.vue'),
    children: [{
        path: '',
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
        path: 'reservationResult',
        name: 'reservationResult',
        component: () => import('@/views/diagnose/reservationResult.vue')
      },
      {
        path: 'personalCenter',
        name: 'personalCenter',
        component: () => import('@/views/diagnose/personalCenter'),
        children: [{
          path: '',
          component: () => import('@/views/diagnose/personalCenterPage/userReservationInformation.vue')
        }, {
          path: 'patientManagement',
          name: 'patientManagement',
          component: () => import('@/views/diagnose/personalCenterPage/patientManagement.vue')
        }, {
          path: 'insertPatient',
          name: 'insertPatient',
          component: () => import('@/views/diagnose/personalCenterPage/insertPatient.vue')
        }]
      },
      {
        path: 'waitDoctorCall',
        name: 'waitDoctorCall',
        component: () => import('@/views/diagnose/clinicResult/waitDoctorCall.vue')
      },
      {
        path: 'overCallNumber',
        name: 'overCallNumber',
        component: () => import('@/views/diagnose/clinicResult/overCallNumber.vue')
      }, {
        path: '401',
        name: '401',
        component: () => import('@/views/error/401.vue')
      },
      {
        path: '*',
        name: '404',
        component: () => import('@/views/error/404.vue')
      }
    ]
  }]
})