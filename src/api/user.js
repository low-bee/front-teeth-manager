import request from '@/utils/request'


export function uploadImage(file) {
    return request({
        url: '/api/upload/image',
        method: 'post',
        data: {
            file: file
        }
    })
}

export function getUserDeal(param) {
    return request({
            url: '/api/user/userDealNum',
            method: 'get',
            param
        })
}
