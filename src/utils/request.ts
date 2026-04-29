import axios from 'axios'
const baseURL = '/target'
import { useAdminStore } from '@/stores/admin'
//导入路由跳转组件
import router from '@/router'
const useAdmin = useAdminStore()

const axios_instance = axios.create({
  baseURL,
  timeout: 10000
})

// 添加请求拦截器
axios_instance.interceptors.request.use(function (request) {
  if (request.url !== '/api/register' && request.url !== '/api/login') {
    request.headers.Authorization = `Bearer ${useAdmin.adminAccount?.access}`
  }
  return request
})

// 添加响应拦截器
axios_instance.interceptors.response.use(
  function (response) {
    console.log('%%%%%%%%%%%%%%%', response)
    return response
  },
  function (error) {
    const code = error.response?.data?.code

    if (code === 'token_not_valid') {
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
export default axios_instance
