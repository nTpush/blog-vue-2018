import Vue from 'vue'
import axios, {AxiosInstance, AxiosPromise} from 'axios'
import config from './config'
import router from '@/router/index.js'
import root from '@/service/root.js'

const request = axios.create(config)
let msg = null
let show = true  // loading只存在1个
// 设置请求拦截
request.interceptors.request.use(function (config) {
  if (config.showLoading && show) {
    show = false
    msg = Vue.prototype.$Message.loading({
      content: 'Loading...',
      duration: 0
    })
  }
  return config
}, function (err) {
  return Promise.reject(err)
})

// 设置响应拦截
request.interceptors.response.use(function (response) {
  setTimeout(msg, 500)
  setTimeout(() => {
    show = true
  }, 500)
  if (response.status === 200) {
    const data = response.data
    if (data.success) {
      if (data.message === '无权限') {
        router.push('/')
      }
      return response.data.body
    } else {
      // if(window.location.href.split('/')[3]) {
      Vue.prototype.$Message.error(data.message)
      // }
    }
  } else {
    Vue.prototype.$Message.error('服务器错误')
  }
}, function (err) {
  setTimeout(msg, 500)
  setTimeout(() => {
    show = true
  }, 500)
  Vue.prototype.$Message.error('服务器错误,请联系管理员')
  return Promise.reject(err)
})

export default {
  post (url, params, showLoading = true) {
    return request({
      url: root.httpUrl + url,
      method: 'post',
      showLoading: showLoading,
      transformRequest: [function (data) {
// Do whatever you want to transform the data
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      data: params
    })
  },
  get (url, params, showLoading = true) {
    return request({
      url: root.httpUrl + url,
      method: 'get',
      showLoading: showLoading,
      data: params
    })
  },
  image (url, file, showLoading = true) {
    return request({
      url: root.httpUrl + url,
      method: 'post',
      data: file,
      showLoading: showLoading,
      headers: {'Content-Type': 'multipart/form-data'}
    })
  },
  put (url, params, showLoading = true) {
    return request({
      url: root.httpUrl + url,
      method: 'put',
      showLoading: showLoading,
      transformRequest: [function (data) {
// Do whatever you want to transform the data
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      data: params
    })
  },
  delete (url, params, showLoading = true) {
    return request({
      url: root.httpUrl + url,
      method: 'delete',
      showLoading: showLoading,
      data: params
    })
  }
}
