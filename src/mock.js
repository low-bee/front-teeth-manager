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
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        level: 1,
        gender: "男",
        phone: "18515888888",
        email: "xiaolongorigin@gmail.com",
        telephone: "",
        detail: [
            {
                id:1,
                hospital: "邯郸市中心医院",
                address: "河北省邯郸市丛台区",
                addressDetail: "邯郸市中心医院东区"
            },
            {
                id:2,
                hospital: "协和医院",
                address: "北京市",
                addressDetail: "东城区"
            }
        ],

        hospital: ["邯郸市中心医院", "协和医院"],
        address: "河北省邯郸市丛台区",
        addressDetail: "邯郸市中心医院东区",

        percentage: 10,
        flag: true
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

Mock.mock('/user/userDealNum', 'get',  () => {
    result.data = {
        knockdown:2,
        lastYearCompleted:1
    }
    return result
})

Mock.mock("/user/updateUserInfo", 'post',  () => {
    result.data = {
    }
    return result
})

Mock.mock("/image/post/avatar", 'post',  () => {
    result.data = {
        code: 200
    }
    return result
})

Mock.mock("/create/id", 'get',  () => {
    result.data = {
        id: 'dasdasdasdasdasd-asdasdasdasda-dasddasdadfsc'
    }
    return result
})

