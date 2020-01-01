import * as types from 'types';
import { admin } from 'generated/services/admin/compiled';
import { createProtobufFormData } from './protobuf'

export const searchUsers = (searchText) => ({
    type: types.SEARCH_USERS,
    request: {
        method: 'post',
        responseType: 'arraybuffer',
        url: '/api/user/search',
        data: createProtobufFormData(admin.UserSearchRequest,
            {
                searchText: searchText
            })
    }
})
export const selectUser = (userID) => ({
    type: types.SELECT_USER,
    userID: userID,
})
export const selectUserPage = (page) => ({
    type: types.SELECT_USER_PAGE,
    page: page,
})
export const getUserDetails = (userID) => ({
    type: types.GET_USER_DETAILS,
    request: {
        method: 'post',
        responseType: 'arraybuffer',
        url: '/api/user/get/details',
        data: createProtobufFormData(admin.UserDetailsRequest,
            {
                userID: userID,
            })
    },
    userID: userID,
})
export const setUserDetails = (setUserDetailsRequest) => ({
    type: types.SET_USER_DETAILS,
    request: {
        method: 'post',
        responseType: 'arraybuffer',
        url: '/api/user/set/details',
        data: createProtobufFormData(admin.SetUserDetailsRequest, setUserDetailsRequest),
    },
    userID: setUserDetailsRequest.userID,
})
export const setUiUserDetails = (userID, userDetails) => ({
    type: types.SET_UI_USER_DETAILS,
    userID: userID,
    userDetails: userDetails,
})