const Mock = require('mockjs');
const {Result} = require("element-ui");

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
    return Result;
})

