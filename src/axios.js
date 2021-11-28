import axios from "axios";
import router from "./router";
import Element from "element-ui";

// axios.defaults.baseURL = "http://localhost:8081"

const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': "application/json; charset=utf-8"
    }
})
request.interceptors.request.use(
    config => {
        // 每一个请求都要附带一个带有身份的请求头
        config.headers['Authorization'] = localStorage.getItem("token")
        return config;
    }
)

request.interceptors.response.use(

    response => {
        let res = response.data;
        if (res.code === 200) {
            return response;
        } else {
            Element.Message.error( res.msg ? res.msg :'系统异常')
            return Promise.reject(response.data.msg)
        }
    }
    ,error => {
        // 如果返回数据出现异常
        if (error.response.data) {
            error.message = error.response.data.msg
        }
        // 如果状态码为401，代表没有权限，跳转到登录页面
        if (error.response.status === 401) {
            router.push("/login")
        }
        Element.Message.error(error.message, {duration: 2000})
        return Promise.reject(error)
    }
)

export default request;
