import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/element.js'
import './utils/normalize.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

Vue.config.productionTip = false

//http request拦截器
axios.interceptors.request.use(
  config => {
    var token = localStorage.getItem('token');
    store.state.token = token;
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

//http response拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.commit('remove_token');
          this.$message('这是一条消息提示');
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

