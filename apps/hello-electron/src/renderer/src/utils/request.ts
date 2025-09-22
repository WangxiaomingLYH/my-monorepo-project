import axios from "axios";

const server = axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_API_BASEURL
})

// 请求拦截器
server.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})

// 响应拦截器
server.interceptors.response.use((response) => {
    return response
}, (error) => {
    return Promise.reject(error)
})

export default server