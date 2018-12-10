import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import treatment_process_store from './treatmentProcessStore.js'
import consultation_department_store from './consultationDepartmentStore.js'
import common_store from "./commonStore.js"
export default new Vuex.Store({
  state: {
    token:'',
    phone:'',
    errorTokenVisible:false
  },
  mutations: {
      add_token(state,user){
        state.phone = user.phone;
        localStorage.setItem("token",user.token);
      },
      remove_token(state){
        localStorage.clear();
        sessionStorage.clear();
        state.phone = '';
        state.commonStore.isUserLogin = false;
      }
  },
  actions: {

  },
  modules: {
    treatmentProcessStore: treatment_process_store,
    consultationDepartmentStore: consultation_department_store,
    commonStore: common_store
  }
})