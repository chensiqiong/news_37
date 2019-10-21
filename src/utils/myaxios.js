// 实现axios的封装

import axios from 'axios'
import {
  Toast
} from 'vant'

axios.defaults.baseURL = 'http://127.0.0.1:3000'
localStorage.setItem('baseURL_37', axios.defaults.baseURL)

// 添加请求拦截器   - 在这里这个请求拦截器不是必须要的，因为新闻app中不必每个页面都要加token，只有少数页面是需要登录过后才能操作的，其他大多数页面都是可以直接浏览的
axios.interceptors.request.use(function (config) {
  // console.log(config)
  // 在发送请求之前做些什么  - 将token写入请求头中
  const token = localStorage.getItem('news_37')
  // 如果有token，将token写入请求头中
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么 - 处理所有状态码为401的错误以及一个“用户信息验证失败”的错误
  // console.log(response);
  let {
    message,
    statusCode
  } = response.data
  // 处理所有401
  if (statusCode === 401) {
    Toast.fail(message)
  }
  if (message === '用户信息验证失败') {
    // 这个错误说明没有token或者token失效，需要重新登录
    window.location = '#/login'
  }

  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default axios
