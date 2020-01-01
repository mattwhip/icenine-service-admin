import { error, success } from 'redux-saga-requests';

import * as types from 'types';
import requestStates from 'requestStates';
import { updateObject } from 'state'
import { admin } from "generated/services/admin/compiled";

const summaryInitState = {
    errorText: "",
    totalUsers: 0,
    aliveUsers: 0,
    totalDevices: 0,
    totalAccounts: 0,
    lastUpdatedUnixTime: 0,
}
const summaryReducer = (state = summaryInitState, action) => {
    switch (action.type) {
        case success(types.GET_SYSTEM_SUMMARY):
        {
            let buffer = new Uint8Array(action.data);
            let response = admin.SummaryResponse.decode(buffer);
            let newState = {
                errorText: "",
            }
            newState = updateObject(newState, response)
            return updateObject(state, newState);
        }
        case error(types.GET_SYSTEM_SUMMARY):
        {
            let errorText = "";
            if (action.error.response !== undefined) {
                let buffer = new Uint8Array(action.error.response.data);
                let response = admin.ErrorResponse.decode(buffer);
                errorText = response.message;
            } else {
                errorText = "Unknown error (the admin service could be down)"
            }
            let newState = {
                errorText: errorText,
            }
            return updateObject(state, newState)
        }
        default:
            return state;
    }
}

export default { summaryReducer }
