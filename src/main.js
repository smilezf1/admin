// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './http.js'
import {
  Modal
} from 'iview'
//引入VueUeditorWrap组件
import VueUeditorWrap from 'vue-ueditor-wrap'
Vue.config.productionTip = false
Vue.use(iView);
Vue.use(ElementUI);
Vue.prototype.http = http;
Vue.prototype.$Modal = Modal;

/* eslint-disable no-new */
Vue.component('vue-ueditor-wrap', VueUeditorWrap)
new Vue({
  el: '#app',
  router,
  components: {
    App,
  },
  template: '<App/>'
})
