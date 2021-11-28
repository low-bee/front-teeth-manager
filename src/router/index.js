import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";

const routers = new VueRouter({
    //配置一个路由
    routes: [
        {
            path: "/",
            name: "Login",
            component: Login
        },
        {
            path: "/login",
            name: "Login",
            component: Login
        },
        {
            path: "/home",
            name: "Home",
            component: Home
        }
    ],

    // mode: "history",
    // base: process.env.BASE_URL
})

export default routers

