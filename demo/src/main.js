import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import $ from 'jquery'
import router from './router/router.js'
import "./font/font-awesome-4.7.0/css/font-awesome.min.css"
import './global/global.css'
import store from './vuex/store.js'
import VueLazyload from 'vue-lazyload'
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './global/style.min.css'

Vue.use(VueQuillEditor)

Vue.use(VueLazyload)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})
