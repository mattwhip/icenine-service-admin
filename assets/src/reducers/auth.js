import { error, success } from 'redux-saga-requests';

import * as types from 'types';
import requestStates from 'requestStates';
import { updateObject } from 'state'
import { admin } from "generated/services/admin/compiled";

const authInitState = {
    jwt: '',
    isAuthorized: false,
}
const authReducer = (state = authInitState, action) => {
    switch (action.type) {
        case success(types.LOGIN):
            let buffer = new Uint8Array(action.data);
            let response = admin.LoginResponse.decode(buffer);
            return updateObject(state, {
                jwt: response.jwt,
                isAuthorized: true,
            });
        default:
            return state;
    }
}

export default { authReducer }
