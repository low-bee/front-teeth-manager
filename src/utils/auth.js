// import axios from '../axios'

// let token = '';

// export function getToken(){
//     axios.get('/image/token').then(res => {
//         if (res.status === 200) {
//             token = res.data.data.token
//         }
//     })
// }

import Cookies from 'js-cookie'
import Config from '@/settings'

const TokenKey = Config.TokenKey

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token, rememberMe) {
    if (rememberMe) {
        return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })
    } else return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}


// getToken()
// export {token};

