import { error, success } from 'redux-saga-requests';

import * as types from 'types';
import { updateObject } from 'state'
import uiServiceConfig from 'reducers/uiServiceConfig'
import uiUsers from 'reducers/uiUsers'
import uiUserDetails from 'reducers/uiUserDetails'
import uiKafkaReader from 'reducers/uiKafkaReader'

const uiReducer = (state = {}, action) => {
    return updateObject(state, {
        login: uiLoginReducer(state.login, action),
        users: uiUsers.uiUsersReducer(state.users, action),
        summary: uiSummaryReducer(state.summary, action),
        serviceConfig: uiServiceConfig.uiServiceConfigReducer(state.serviceConfig, action),
        userDetails: uiUserDetails.uiUserDetailsReducer(state.userDetails, action),
        kafkaReader: uiKafkaReader.uiKafkaReaderReducer(state.kafkaReader, action),
    })
}

const uiLoginInitState = {
    isAuthorizing: false,
}
const uiLoginReducer = (state = uiLoginInitState, action) => {
    switch (action.type) {
        case types.LOGIN:
            return updateObject(state, {
                isAuthorizing: true 
            });
        case success(types.LOGIN):
            return updateObject(state, {
                isAuthorizing: false
            });
        case error(types.LOGIN):
            return updateObject(state, {
                isAuthorizing: false
            });
        default:
            return state;
    }
}

const uiSummaryInitState = {
    isUpdating: false,
    hasUpdated: false,
}
const uiSummaryReducer = (state = uiSummaryInitState, action) => {
    switch (action.type) {
        case types.GET_SYSTEM_SUMMARY:
            return updateObject(state, {
                isUpdating: true 
            });
        case success(types.GET_SYSTEM_SUMMARY):
            return updateObject(state, {
                isUpdating: false,
                hasUpdated: true,
            });
        case error(types.GET_SYSTEM_SUMMARY):
            return updateObject(state, {
                isUpdating: false,
                hasUpdated: true,
            });
        default:
            return state;
    }
}

export default { uiReducer }
