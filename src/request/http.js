import axios from 'axios'
// import qs from 'axios'  //引入qs模块用来序列化post类型的数据
// import { Message } from 'element-ui'
// import store from 'store'
axios.defaults.timeout = 10000
axios.defaults.baseURL = 'http://localhost:9080/vue-shop/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

/**
 * axios发送前检验
 */
axios.interceptors.request.use(function(response) {
    // Do something before request is sent

    return response
}, function(error) {
    // Do something with request error

    return Promise.reject(error)
})

/*
 * @param {*} url
 * @param {*} params
 */
axios.interceptors.response.use(
    response => {
        console.log(response.status)
        if (response.status === 200) {
            // console.log(' ---------------- ')
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    }
)

/**
 * http.js
 * 封装axios，
 * 调用方法:
 * http.get('/api/enquiry/web/query',{id:1}).then((res)=>{你的操作})
 * http.post('/api/enquiry/web/update',{id:1}).then((res)=>{你的操作})
 * http.postFormData('/api/enquiry/web/update',{id:1,file:file}).then((res)=>{你的操作})
 */

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}
/**
 * postFormData方法，对应post请求，用来提交文件+数据
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
// function postFormData (url, params) {
//   return new Promise((resolve, reject) => {
//     axios({
//       headers: {
//         'Content-Type': 'multipart/form-data' // ;boundary=----WebKitFormBoundaryQ6d2Qh69dv9wad2u
//       },
//       transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
//         const formData = new FormData()
//         Object.keys(data).forEach(key => {
//           formData.append(key, data[key])
//         })
//         return formData
//       }],
//       url,
//       method: 'post',
//       data: params
//     }).then(res => {
//       resolve(res.data)
//     }).catch(err => {
//       reject(err)
//     })
//   })
// }

export default function http(method, url, params) {
    if (method === 'get') {
        return get(url, params)
    } else if (method === 'post') {
        return post(url, params)
    }
}