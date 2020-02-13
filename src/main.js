import Vue from 'vue'
import App from './App.vue'
import router from 'router'
import fastClick from 'fastclick'



import 'assets/stylus/index.styl'

Vue.config.productionTip = false
//解决300ms延时
fastClick.attach(document.body)

new Vue({
  router,  
  render: h => h(App),
}).$mount('#app')
