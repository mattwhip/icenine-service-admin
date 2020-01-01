import { error, success } from 'redux-saga-requests'

import * as types from 'types'
import requestStates from 'requestStates'
import { updateObject } from 'state'
import { admin } from "generated/services/admin/compiled";
import requestErrors from 'requestErrors'

const uiUsersInitState = {
    isSearching: false,
    resultsReceivedAt: new Date(),
    selectedUserID: '',
    searchErrorText: '',
    selectedPage: 0,
}
const uiUsersReducer = (state = uiUsersInitState, action) => {
    switch (action.type) {
        // SEARCH_USERS
        case types.SEARCH_USERS:
            return updateObject(state, {
                isSearching: true
            });
        case success(types.SEARCH_USERS):
        {
            let now = new Date();
            return updateObject(state, {
                isSearching: false,
                resultsReceivedAt: now,
                searchErrorText: '',
                selectedPage: 0,
            });
        }
        case error(types.SEARCH_USERS):
        {
            let now = new Date();
            let searchErrorText = requestErrors.getErrorActionMessage(action);
            let newState = {
                searchErrorText: searchErrorText,
                dataState: requestStates.GET_ERROR,
                isSearching: false,
                resultsReceivedAt: now,
            }
            return updateObject(state, newState);
        }
        // SELECT_USER
        case types.SELECT_USER:
            return updateObject(state, {
                selectedUserID: action.userID,
            })
        // SELECT_USER_PAGE
        case types.SELECT_USER_PAGE:
            return updateObject(state, {
                selectedPage: action.page,
            })
        default:
            return state;
    }
}

export default { uiUsersReducer }