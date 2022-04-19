import axios from "axios";
import router from "./router";
import Element from "element-ui";

axios.defaults.baseURL = "http://localhost:8888"

const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': "application/json; charset=utf-8"
    }
})
request.interceptors.request.use(
    config => {
        // 每一个请求都要附带一个带有身份的请求头
        // console.log("当前Token： " + localStorage.getItem("token"))
        config.headers['authorization'] = localStorage.getItem("token")
        return config;
    }
)

request.interceptors.response.use(

    response => {
        // console.log(response)
        let res = response.data;
        if (res.code === 200) {
            return response;
        } else if (res.code === 401){
            router.push("/login").then(r => {
                console.log(r)
                Element.Message.error( res.msg ? res.msg :'token过期，请重新登录')
            })
            return Promise.reject(response.data.msg)
        } else {
            if  (router.currentRoute.name !== '/login') {
                router.push("/login")
            }
            Element.Message.error( res.msg ? res.msg :'系统异常！')
            return Promise.reject(response.data.msg)
        }


    }
    ,error => {
        console.log(error + "出现异常")
        // 如果返回数据出现异常
        if (error.response.data) {
            error.message = error.response.data.msg
        }
        // 如果状态码为401，代表没有权限，跳转到登录页面
        if (error.response.status === 401) {
            // router.push("/login").then(r => {
            //     console.log(r)
            //     Element.Message.error(error.message + ", 请重新登录")
            // })
        }
        Element.Message.error(error.message)
        return Promise.reject(error)
    }
)

export default request;
