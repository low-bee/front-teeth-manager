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
import Create from '../views/sys/Create'
import UserInfo from "@/views/user/UserInfo";
import AddressInfo from "@/views/user/AddressInfo";
import SecurityInfo from "@/views/user/SecurityInfo";
import HabitInfo from "@/views/user/HabitInfo";
import MedicineInfo from "@/views/user/MedicineInfo";
import NewInfomation from "@/views/user/NewInfomation";
import BaseInfo from "@/views/create/BaseInfo";
import ImageForm from "@/views/create/ImageForm";
import CaseForm from "@/views/create/CaseForm";
import ToothModel from "@/views/create/ToothModelForm";
import SubmitForm from "@/views/create/SubmitForm";

const routers = new VueRouter({
    //配置一个路由
    routes: [
        {
            path: "/login",
            username: "Login",
            component: Login
        },
        {
            path: "/",
            username: "Home",
            component: Home,
            // component: Index,
            children: [
                // 配置index为Home的子路由，这样我们就通过router-view动态的变化这个
                {
                    path: '/index',
                    username: 'Index',
                    meta: {
                        title: "首页"
                    },
                    component: Index
                },
                // 新建病例路由
                {
                    path: '/create',
                    username: 'Create',
                    meta: {
                        title: "新建病例"
                    },
                    component: Create,
                    children: [
                        {
                            path: '/create/base/:id',
                            username: "CreateCaseBase",
                            meta: {
                                title: "基本信息"
                            },
                            component: BaseInfo
                        },
                        {
                            path: '/create/image/:id',
                            username: "CreateImageBase",
                            meta: {
                                title: "照片上传"
                            },
                            component: ImageForm
                        },
                        {
                            path: '/create/case/:id',
                            username: "CreateCaseForm",
                            meta: {
                                title: "病例单提交"
                            },
                            component: CaseForm
                        },
                        {
                            path: '/create/tooth_model/:id',
                            username: "CreateToothModel",
                            meta: {
                                title: "牙齿模型"
                            },
                            component: ToothModel
                        },
                        {
                            path: '/create/submit/:id',
                            username: "CreateSubmit",
                            meta: {
                                title: "预览并提交"
                            },
                            component: SubmitForm
                        },
                    ]
                },
                // 用户中心路由
                {
                    path: '/user-center',
                    username: 'UserCenter',
                    meta: {
                        title: "个人中心"
                    },
                    component: () => import('../views/UserCenter'),
                    children: [
                        {
                            path: '/user/info',
                            username: "UserCenterInfo",
                            meta: {
                                title: "个人信息"
                            },
                            component: UserInfo
                        },
                        {
                            path: '/user/security',
                            username: "UserSecurityInfo",
                            meta: {
                                title: "用户安全"
                            },
                            component: SecurityInfo
                        },
                        {
                            path: '/user/address',
                            username: "UserAddressInfo",
                            meta: {
                                title: "医生地址信息"
                            },
                            component: AddressInfo
                        },
                        {
                            path: '/user/habit',
                            username: "UserHabitInfo",
                            meta: {
                                title: "医生临床偏好"
                            },
                            component: HabitInfo
                        },
                        {
                            path: '/user/medicine',
                            username: "UserMedicineInfo",
                            meta: {
                                title: "多点执医"
                            },
                            component: MedicineInfo
                        },
                        {
                            path: '/user/information',
                            username: "UserInformation",
                            meta: {
                                title: "消息推送"
                            },
                            component: NewInfomation
                        },
                    ]
                },
                {
                    path: '/patient-manage',
                    username: 'PatientManage',
                    meta: {
                        title: "病例管理"
                    },
                    component: PatientManage
                },
                // 保持器路由
                {
                    path: '/keep-patient-manage',
                    username: 'KeepPatientManage',
                    meta: {
                        title: "保持器病例管理"
                    },
                    component: KeepPatientManage
                },

                {
                    path: '/sys/users',
                    username: 'SysUser',
                    meta: {
                        title: "用户管理"
                    },
                    component: User
                },
                {
                    path: '/sys/roles',
                    username: 'SysRole',
                    meta: {
                        title: "角色管理"
                    },
                    component: Role
                },
                {
                    path: '/sys/menus',
                    username: 'SysMenus',
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

