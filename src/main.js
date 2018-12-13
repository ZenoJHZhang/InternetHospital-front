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
    let token = localStorage.getItem('token');
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
    console.log(error)
    if (error.response) {
      // 返回 401 
      if (error.response.status == 401) {
        console.log(error.response)
        //身份认证失败,清除token信息并跳转到登录页面
        if (error.response.data.returnData == 40101) {
          store.commit('remove_token');
          store.state.errorTokenVisible = true;
          store.state.errorTokenMessage = error.response.data.returnType;
          router.push("/");
        }
        //权限不够，直接跳转无需清除
        if (error.response.data.returnData == 40102) {
          store.state.errorTokenVisible = true;
          store.state.errorTokenMessage = error.response.data.returnType;
          router.push("/");
        }
      } else {
        store.state.errorTokenVisible = true;
        store.state.errorTokenMessage = error.response.data.returnType;
      }
    } else if (error.message) {
      store.commit('remove_token');
      store.state.errorTokenVisible = true;
      store.state.errorTokenMessage = error.message;
      router.push("/");
    }
  });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')