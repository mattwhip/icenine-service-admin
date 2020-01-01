import { error, success } from 'redux-saga-requests'

import * as types from 'types'
import { updateObject } from 'state'
import { admin } from "generated/services/admin/compiled";
import requestErrors from 'requestErrors'


const uiUserDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        // SET_UI_USER_DETAILS
        case types.SET_UI_USER_DETAILS:
        {
            let userID = action.userID;
            let newUserDetails = action.userDetails;
            return updateUserDetails(state, userID, newUserDetails);
        }
        // GET_USER_DETAILS
        case success(types.GET_USER_DETAILS):
        {
            let buffer = new Uint8Array(action.data);
            let response = admin.UserDetailsResponse.decode(buffer);
            let userID = response.userID;
            let newUserDetails = {
                // Clear error text only
                errorText: '',
            };
            return updateUserDetails(state, userID, newUserDetails);
        }
        case error(types.GET_USER_DETAILS):
        {
            let userID = action.meta.requestAction.userID;
            let errorText = requestErrors.getErrorActionMessage(action);
            let newUserDetails = {
                errorText: errorText,
            };
            return updateUserDetails(state, userID, newUserDetails);
        }
        // SET_USER_DETAILS
        case success(types.SET_USER_DETAILS):
        {
            let buffer = new Uint8Array(action.data);
            let response = admin.UserDetailsResponse.decode(buffer);
            let userID = response.userID;
            // Clear all ui user details
            let newUserDetails = {};
            let newState = {};
            newState[userID] = newUserDetails;
            return updateObject(state, newState);
        }
        case error(types.SET_USER_DETAILS):
        {
            let userID = action.meta.requestAction.userID;
            let errorText = requestErrors.getErrorActionMessage(action);
            let newUserDetails = {
                errorText: errorText,
            };
            return updateUserDetails(state, userID, newUserDetails);
        }
        default:
            return state;
    }
}

function updateUserDetails(state, userID, newUserDetails) {
    let currentUserDetails = state[userID];
    newUserDetails = updateObject(currentUserDetails, newUserDetails);
    let newState = {};
    newState[userID] = newUserDetails;
    return updateObject(state, newState);
}

export default { uiUserDetailsReducer }
