/* eslint-disable no-new */
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'

// 声明式使用插件
// 内部会给vm对象和组件对象添加一个属性: $http (get,post)
Vue.use(VueResource)

new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})
