const Mock = require('mockjs');


const Random = Mock.Random

let result = {
    code: 200,
    msg: "操作成功",
    data: null
}

Mock.mock('/captcha', 'get',  () => {
    result.data = {
        token: Random.string(32),
        captchaImg: Random.dataImage('50x25', Random.string(4))
    }
    return result
})

Mock.mock('/login', 'post',  () => {
    result.code = 200
    return result;
})

Mock.mock('/sys/userInfo', 'get',  () => {
    result.data = {
        id: "1",
        username: "test",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    }
    return result
})

Mock.mock('/patient/list?paramsList=keepLive,animationAwaitDeal,treating,dealWith,awaitCommit,completed,archived', 'get',  () => {
    result.data = {
        keepLive: 1,
        animationAwaitDeal: 0,
        treating: 0,
        dealWith: 0,
        awaitCommit: 0,
        completed: 0,
        archived: 0
    }
    return result
})

Mock.mock('/patient_keep/list?paramsList=keepLive,awaitCommit,committing,committed,archived', 'get',  () => {
    result.data = {
        keepLive: 0,
        awaitCommit: 1,
        committing: 0,
        committed: 0,
        archived: 0
    }
    return result
})

Mock.mock('/sys/user/updatePassword', 'post',  () => {
    result.data = {

    }
    return result
})

Mock.mock('/logout', 'post',  () => {
    result.data = {
        flag: true
    }
    return result
})

