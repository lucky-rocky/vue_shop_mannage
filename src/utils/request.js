import axios from 'axios'
import { token } from '@/config'
import { getItem } from '@/utils/storage'
import Vue from 'vue'

// 实例化axios
const instance = axios.create()

// 在具体事例对象上配置拦截器
instance.interceptors.request.use(
  config => {
    // 配置基准路径
    config.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
    // console.log(config.url) // =>login
    const Token = getItem(token)
    if (!Token && config.url !== 'login') {
      Vue.prototype.$message.error('请重新登录')
      location.hash = '/login'
    }

    // whiteList will not emit validate
    config.headers.Authorization = Token
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  res => {
    return res.data
  },
  // do something with error
  error => {
    console.log(error)
    this.$message(error.message)
    return Promise.reject(error)
  }
)

// export this instance
export const request = instance
