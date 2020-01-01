import * as types from 'types'
import { admin } from 'generated/services/admin/compiled'
import { createProtobufFormData } from './protobuf'

export const submitLoginRequest = (user, pass) => ({
    type: types.LOGIN,
    request: {
        method: 'post',
        responseType: 'arraybuffer',
        url: '/login',
        data: createProtobufFormData(admin.LoginRequest,
            {
                user: user,
                password: pass,
            })
    }
})
