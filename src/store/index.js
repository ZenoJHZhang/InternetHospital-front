import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import father_store from './testStore.js'
import treatment_process_store from './treatmentProcessStore.js'
import expert_appointment_store from './expertAppointmentStore.js'
import consultation_department_store from './consultationDepartmentStore.js'
import common_store from "./commonStore.js"
export default new Vuex.Store({
  state: {
    token:'',
    phone:''
  },
  mutations: {
      add_token(state,user){
        state.token = user.token;
        state.phone = user.phone;
        localStorage.setItem("token",user.token);
        localStorage.setItem("phone",user.phone)
      },
      remove_token(state){
        localStorage.removeItem("token");
        localStorage.removeItem("phone")
        state.token = '';
        state.phone = '';
      }
  },
  actions: {

  },
  modules: {
    father: father_store,
    treatmentProcessStore: treatment_process_store,
    expertAppointmentStore: expert_appointment_store,
    consultationDepartmentStore: consultation_department_store,
    commonStore: common_store
  }
})