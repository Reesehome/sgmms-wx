import axios from 'axios'
import {Auth} from './dataHandle.js'
axios.defaults.timeout = 5000;
axios.defaults.adapter = function (config) {
    return new Promise((resolve, reject) => {
        console.log(config)
        // TODO wx.request(...)
        wx.request({
            url: config.url,
            data: config.data,
            header: config.headers,
            method: config.method,
            success: res =>{
               console.log(res) 
            }
        })
    })
}
//请求拦截器
axios.interceptors.request.use(config => {
    config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    let token = Auth.getToken();
    if (token) {
        config.headers.common['Authorization'] = 'Bearer ' + token;
    }
    return config
}, err => {
    Message.error({
        message: '请求加载超时'
    })
    return Promise.reject(error);
});

//响应拦截器
axios.interceptors.response.use(response => {
    const data = response.data;
    if (data && !data.success) {
        // 若不是正确的返回code，就抛出错误
        const err = new Error(data.description)
        err.data = data
        err.response = response
        throw err
    } else {
        return data;
    }
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '请求错误'
                break

            case 401:
                err.message = '未登录'
                break

            case 403:
                err.message = '您没有权限访问'
                break

            case 404:
                err.message = `请求地址出错: ${err.response.config.url}`
                break

            case 408:
                err.message = '请求超时'
                break

            case 500:
                err.message = '服务器内部错误'
                break

            case 501:
                err.message = '服务未实现'
                break

            case 502:
                err.message = '网关错误'
                break

            case 503:
                err.message = '服务不可用'
                break

            case 504:
                err.message = '网关超时'
                break

            case 505:
                err.message = 'HTTP版本不受支持'
                break

            default:
        }
    }
    // Message.error({
    //     message: '响应加载超时'
    // })
    return Promise.reject(err);
})

axios.install = (Vue) => {
    Vue.prototype.$axios = axios
}

export default axios