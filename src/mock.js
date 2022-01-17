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

//
Mock.mock('/sys/userInfo', 'get',  () => {
    result.data = {
        id: "1",
        username: "xiaolong",
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
Mock.mock("/image/posts/", 'post',  () => {
    result.data = {
        code: 200,
        imageUrl: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.haodoo.net%2Fhhd%2Fimages%2F353a.jpg&imgrefurl=http%3A%2F%2Fwww.haodoo.net%2F%3FM%3Dhhd%26P%3D353&tbnid=gmdN2gRjHjLU7M&vet=12ahUKEwjOgJWj59X0AhWCRvUHHfiIBkEQMygDegUIARCyAQ..i&docid=9wgDdjhaKJ3luM&w=500&h=352&itg=1&q=%E6%88%90%E5%8A%9F&ved=2ahUKEwjOgJWj59X0AhWCRvUHHfiIBkEQMygDegUIARCyAQ'
    }
    return result
})


Mock.mock("/create/id", 'get',  () => {
    result.data = {
        id: 'dasdasdasdasdasd-asdasdasdasda-dasddasdadfsc'
    }
    return result
})

Mock.mock("/image/token", 'get',  () => {
    result.data = {
        token: 'jksklkdljfndasd-adgkflgnsda-dasddassdfoomvdfsc'
    }
    return result
})

Mock.mock("/sys/upload", 'get',  () => {
    result.data = {
        appId: '1302193597',
        SecretId: 'AKID72i7G8qHRKxOYR3PUIq9BxSgdIgogHbf',
        SecretKey: 'pNdcLo0vYv1qOXQ2NQDjxvd4E6i37uQh',
        Bucket: 'tooth-1302193597',
        Region: 'ap-guangzhou'
    }
    return result
})

