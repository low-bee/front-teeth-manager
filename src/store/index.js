import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters";

Vue.use(Vuex)
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})


const store = new Vuex.Store({
    modules,
    getters
})

export default store

// export default new Vuex.Store({
//     actions : {
//         increment(context, value){
//             // action 第一个参数是上下文对象，上承接 component 下续接mutation
//             context.commit("increment", value)
//         }
//     },
//     mutations: {
//         // mutation 第一个参数是一个state, 第二个参数是action传递过来的value
//         SET_TOKEN: (state, token) => {
//             state.jwt = token
//             localStorage.setItem("token", token)
//         },
//         resetState: (state) => {
//             state.jwt = ''
//         },
//         resetUserInfo: (state, value) => {
//             state.userInfo = value
//         },
//         uploadAvatar: (state, imageUrl) => {
//             state.userInfo.avatar = imageUrl
//         }
//     },
//
//     state: {
//         jwt: '',
//         userInfo: {
//             username: "",
//             gender: "",
//             phone: "",
//             email: "",
//             avatar:""
//         }
//     }
// })
