import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'

import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme


import 'nprogress/nprogress.css'
import nProgress from 'nprogress'

Vue.component('tree-table', TreeTable)
// 配置请求的跟路径
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  // console.log(config);
  nProgress.start()
  config.headers.Authorization = sessionStorage.getItem('token')
  return config

})
axios.interceptors.response.use(config => {
  // console.log(config);
  nProgress.done()
  return config

})
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(VueQuillEditor)

Vue.filter('dataFormat', originVal => {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return y+'-'+m+'-'+ d+' '+ hh+':'+mm+':'+ss
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
