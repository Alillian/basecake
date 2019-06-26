
import Vue from 'vue'
import App from './App'
import router from './router'

import "@/common/css/index.scss"
import 'lib-flexible/flexible.js'

// 引入core.config.js
import core from "@/core/core.config"
Vue.use(core);
Vue.config.productionTip = false

//引入vuex数据仓库
import store from "@/core/store/index"
// import MintUI from 'mint-ui'
// Vue.use(MintUI)
import 'font-awesome/css/font-awesome.css'

//图片懒加载

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('@/assets/laz.jpg')
})
//动态title
Vue.use(require('vue-wechat-title'));


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
