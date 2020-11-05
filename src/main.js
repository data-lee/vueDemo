/* eslint-disable no-new */
import Vue from 'vue'
import App from './App'
import { Button, Cell } from 'mint-ui'

Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
/* 或写为
 * Vue.use(Button)
 * Vue.use(Cell)
 */

new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})
