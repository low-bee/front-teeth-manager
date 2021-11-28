import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";
import Index from "../views/Index"

const routers = new VueRouter({
    //配置一个路由
    routes: [
        {
            path: "/login",
            name: "Login",
            component: Login
        },
        {
            path: "/",
            name: "Home",
            component: Home,
            children: [
                {
                    path: "/index",
                    name: "Index",
                    component: Index
                }
            ]
        },
    ],

    // mode: "history",
    // base: process.env.BASE_URL
})

export default routers

