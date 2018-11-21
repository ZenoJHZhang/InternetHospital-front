import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import father_store from './testStore.js'
import treatment_process_store from './treatmentProcessStore.js'
import expert_appointment_store from './expertAppointmentStore.js'
import consultation_department_store from './consultationDepartmentStore.js'
export default new Vuex.Store({
  state: {
    token:''
  },
  mutations: {
      add_token(token){
        state.token = token;
        localStorage.setItem("token",token);
      },
      remove_token(){
        localStorage.removeItem("token");
        state.token = '';
      }
  },
  actions: {

  },
  modules: {
    father: father_store,
    treatmentProcessStore: treatment_process_store,
    expertAppointmentStore: expert_appointment_store,
    consultationDepartmentStore: consultation_department_store
  }
})