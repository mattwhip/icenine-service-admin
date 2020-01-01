import { error, success } from 'redux-saga-requests';

import * as types from 'types';
import requestStates from 'requestStates';
import { updateObject } from 'state'
import { admin } from "generated/services/admin/compiled";

const userSearchResultsReducer = (state = {}, action) => {
    switch (action.type) {
        case success(types.SEARCH_USERS): 
            let buffer = new Uint8Array(action.data);
            let response = admin.UserSearchResponse.decode(buffer);
            let newState = {};
            for (let resultIndex = 0; resultIndex < response.results.length; resultIndex++) {
                let result = response.results[resultIndex];
                newState[result.userID] = result;
            }
            // Throw away old state, and return completely new state each time search results are received
            return newState;
        default:
            return state;
    }
}

export default { userSearchResultsReducer }
