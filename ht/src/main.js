// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment'


Vue.use(ElementUI);

Vue.config.productionTip = false




Vue.prototype.$ = $;
Vue.prototype.$http = axios;
import qs from 'qs'
Vue.prototype.$qs = qs;

import commoncom from './components/common'
for (var i in commoncom) {
  Vue.component(i, commoncom[i])
}


Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD';
  return moment(value).format(formatString); // value可以是普通日期 20170723
  // return moment.unix(value).format(formatString); // 这是时间戳转时间
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
