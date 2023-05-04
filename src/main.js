import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

/* 配置请求跟路径 */
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
/* 全局样式 */
import '@/assets/css/global.css'
import '@/assets/front/iconfont.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

/* 全局方法挂载 */
Vue.prototype.$axios = axios

const vm = new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

// console.log(vm)
