import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";
// import UserCenter from "../views/UserCenter";
import Index from "../views/Index"
import PatientManage from "../views/sys/PatientManage"
import KeepPatientManage from "../views/sys/KeepPatientManage"
import User from  '../views/sys/User'
import Menu from  '../views/sys/Menu'
import Role from  '../views/sys/Role'

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
                // 配置index为Home的子路由，这样我们就通过router-view动态的变化这个
                {
                    path: '/index',
                    name: 'Index',
                    meta: {
                        title: "首页"
                    },
                    component: Index
                },
                {
                    path: '/user-center',
                    name: 'UserCenter',
                    meta: {
                        title: "个人中心"
                    },
                    component: () => import('../views/UserCenter')
                },
                {
                    path: '/patient-manage',
                    name: 'PatientManage',
                    meta: {
                        title: "病例管理"
                    },
                    component: PatientManage
                },
                {
                    path: '/keep-patient-manage',
                    name: 'KeepPatientManage',
                    meta: {
                        title: "保持器病例管理"
                    },
                    component: KeepPatientManage
                },

                {
                    path: '/sys/users',
                    name: 'SysUser',
                    meta: {
                        title: "用户管理"
                    },
                    component: User
                },
                {
                    path: '/sys/roles',
                    name: 'SysRole',
                    meta: {
                        title: "角色管理"
                    },
                    component: Role
                },
                {
                    path: '/sys/menus',
                    name: 'SysMenus',
                    meta: {
                        title: "菜单管理"
                    },
                    component: Menu
                },

            ]
        },
    ],

    mode: "history",
    base: process.env.BASE_URL
})

export default routers

