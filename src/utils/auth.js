import axios from '../axios'

let token = '';

function getToken(){
    axios.get('/image/token').then(res => {
        if (res.status === 200) {
            token = res.data.data.token
        }
    })
}

getToken()
export {token};

