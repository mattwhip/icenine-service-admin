import { error, success } from 'redux-saga-requests'

import * as types from 'types'
import requestStates from 'requestStates'
import { updateObject } from 'state'
import { admin } from "generated/services/admin/compiled";
import requestErrors from 'requestErrors'


const userDetailsReducer = (state = {}, action) => {
    let now = new Date();
    switch (action.type) {
        // GET_USER_DETAILS
        case types.GET_USER_DETAILS:
        {
            let userID = action.userID;
            let currentUserDetails = state[userID] || {};
            let newUserDetails = {
                state: requestStates.GETTING,
                stateTime: now,
            }
            newUserDetails = updateObject(currentUserDetails, newUserDetails);
            let newState = {};
            newState[userID] = newUserDetails;
            return updateObject(state, newState);
        }
        case success(types.GET_USER_DETAILS):
        {
            let buffer = new Uint8Array(action.data);
            let response = admin.UserDetailsResponse.decode(buffer);
            let newUserDetails = {
                state: requestStates.GET_SUCCESS,
                stateTime: now,
            };
            newUserDetails = updateObject(newUserDetails, response);
            let newState = {};
            newState[response.userID] = newUserDetails;
            return updateObject(state, newState);
        }
        case error(types.GET_USER_DETAILS):
        {   
            let userID = action.meta.requestAction.userID;
            let currentUserDetails = state[userID] || {};
            let newUserDetails = {
                state: requestStates.GET_ERROR,
                stateTime: now,
            };
            newUserDetails = updateObject(currentUserDetails, newUserDetails);
            let newState = {};
            newState[userID] = newUserDetails;
            return updateObject(state, newState);
        }
        // SET_USER_DETAILS
        case success(types.SET_USER_DETAILS):
        {
            let buffer = new Uint8Array(action.data);
            let response = admin.UserDetailsResponse.decode(buffer);
            let newUserDetails = {
                state: requestStates.SET_SUCCESS,
                stateTime: now,
            };
            newUserDetails = updateObject(newUserDetails, response);
            let newState = {};
            newState[response.userID] = newUserDetails;
            return updateObject(state, newState);
        }
        case error(types.SET_USER_DETAILS):
        {
            let userID = action.meta.requestAction.userID;
            let currentUserDetails = state[userID] || {};
            let newUserDetails = {
                state: requestStates.SET_ERROR,
                stateTime: now,
            };
            newUserDetails = updateObject(currentUserDetails, newUserDetails);
            let newState = {};
            newState[userID] = newUserDetails;
            return updateObject(state, newState);
        }
        default:
            return state;
    }
}

export default { userDetailsReducer }
