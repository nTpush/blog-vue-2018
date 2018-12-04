import './assets/css/clear.css'
import 'iview/dist/styles/iview.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'vuetify/dist/vuetify.min.css'
import './assets/css/reset.css'
import 'mavon-editor/dist/css/index.css'
import 'highlight.js/styles/atom-one-dark.css'
import './blog/less/style1.less'
import './blog/less/style2.less'

import $ from 'jquery'
import Vue from 'vue'
import App from './App'
import router from './router'
import { setMetaTitle } from './Help.js'
import request from '@/service/index.js'
import Vuetify from 'vuetify'
import hljs from 'highlight.js'
import VueLazyLoad from 'vue-lazyload'
import mavonEditor from 'mavon-editor'
import iview, { Message } from 'iview'
import ELEMENT from 'element-ui'
import store from '@/store/index.js'

Vue.prototype.$http = request
Vue.prototype.$loading = Message

Vue.use(Vuetify)
Vue.use(iview)
Vue.use(ELEMENT)
Vue.use(mavonEditor)
Vue.use(VueLazyLoad, {
  error: 'https://blog-static-ntpush.oss-cn-beijing.aliyuncs.com/images/loading.gif',
  loading: 'https://blog-static-ntpush.oss-cn-beijing.aliyuncs.com/images/loading.gif'
})

Vue.config.productionTip = false

/**
 * 代码区域高亮
 */
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code')
  setTimeout(() => {
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
      // $('pre code').each(function () {
      //   var lines = $(this).text().split('\n').length - 1
      //   var $numbering = $('<ul/>').addClass('pre-numbering')
      //   $(this)
      //     .addClass('has-numbering')
      //     .parent()
      //     .append($numbering)
      //   for (var i = 1; i <= lines; i++) {
      //     var addZero = ''
      //     if (i < 10) {
      //       addZero = '0' + i
      //     } else {
      //       addZero = i
      //     }
      //     $numbering.append($('<li/>').text(addZero + '.'))
      //   }
      // })
    })
  }, 200)
})

Vue.directive('title', {
  inserted: function (el, binding) {
    setMetaTitle(binding.value)
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
