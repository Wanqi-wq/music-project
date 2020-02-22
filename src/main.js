import Vue from 'vue'
import App from './App.vue'
import router from 'router'
import store from 'store'
import fastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload,{
  preLoad: 1.3,
  loading: require('assets/image/1.png'),
  error:require('assets/image/children.png')

})
//rem移动端适配
import  'common/rem.js'
import 'assets/stylus/index.styl'

Vue.config.productionTip = false
//解决300ms延时
fastClick.attach(document.body)

new Vue({
  router,
  store,  
  render: h => h(App),
}).$mount('#app')
