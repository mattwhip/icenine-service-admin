import { error, success } from 'redux-saga-requests';

import * as types from 'types';
import requestStates from 'requestStates';
import { updateObject } from 'state'
import { admin } from "generated/services/admin/compiled";

const kafkaReaderInitState = {
    recentMatchesState: requestStates.INITIAL,
    recentMatchesErrorText: "",
    recentMatches: [],
};
const kafkaReaderReducer = (state = kafkaReaderInitState, action) => {
    switch (action.type) {
        case types.GET_RECENT_MATCHES:
        {
            return updateObject(state, {
                recentMatchesErrorText: "",
                recentMatchesState: requestStates.GETTING,
            })
        }
        case success(types.GET_RECENT_MATCHES):
        {
            let buffer = new Uint8Array(action.data);
            let response = admin.RecentMatchesResponse.decode(buffer);
            let newState = {
                recentMatchesErrorText: "",
                recentMatches: response.matches,
                recentMatchesState: requestStates.GET_SUCCESS,
            }
            return updateObject(state, newState);
        }
        case error(types.GET_RECENT_MATCHES):
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
                recentMatchesErrorText: errorText,
                recentMatchesState: requestStates.GET_ERROR,
            }
            return updateObject(state, newState)
        }
        default:
            return state;
    }
}

export default { kafkaReaderReducer }
