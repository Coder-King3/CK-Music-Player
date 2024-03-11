import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      timestamp: Date.now(),
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    if (response.data.code === -460) message.warning(response.data.message)

    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 封装get方法
export const httpGet = (url, params) => {
  return instance.get(url, { params })
}
// 封装post方法
export const httpPost = (url, data) => {
  return instance.post(url, data)
}
