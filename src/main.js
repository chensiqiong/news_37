import Vue from 'vue'
import App from './App.vue'

// 引入全局样式
import '@/styles/reset.less'

// 引入路由
import router from '@/router/index.js'

// 引入全局Vant
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  // 注入路由
  router,
  render: h => h(App)
}).$mount('#app')
