import Vue from 'vue'
import axios from 'axios'

const requests = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/',
  timeout: 5000
})
/* 请求拦截器 */
requests.interceptors.request.use((config) => {
  return config
})

requests.interceptors.response.use(
  (res) => {
    return res.data
  },
  (erro) => {
    return Promise.reject(new Error('faile'))
  }
)

export default requests
