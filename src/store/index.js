import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    actions : {
        increment(context, value){
            // action 第一个参数是上下文对象，上承接 component 下续接mutation
            context.commit("increment", value)
        }
    },
    mutations: {
        // mutation 第一个参数是一个state, 第二个参数是action传递过来的value
        SET_TOKEN: (state, token) => {
            state.jwt = token
            localStorage.setItem("token", token)
        }
    },

    state: {
        jwt: ''
    }
})