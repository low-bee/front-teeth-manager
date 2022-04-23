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
