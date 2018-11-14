import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import father_store from './testStore.js'
import treatment_process_store from './treatmentProcessStore.js'
export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    father: father_store,
    treatmentProcess: treatment_process_store
  }
})