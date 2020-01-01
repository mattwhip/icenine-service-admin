import { all, takeEvery } from 'redux-saga/effects';
import { getRequestInstance } from 'redux-saga-requests';
import { success } from 'redux-saga-requests';
import { admin } from "generated/services/admin/compiled";

import * as types from 'types';

// Set the authorization header to use the newly received JWT for every request
// made with saga-requests/axios.
function* setDefaultAuthorizationHeader(action) {
    const axiosInstance = yield getRequestInstance();

    let buffer = new Uint8Array(action.data);
    let response = admin.LoginResponse.decode(buffer);

    axiosInstance.defaults.headers.common['Authorization'] = 'JWT ' + response.jwt;
}

function* authSagas() {
    yield takeEvery(success(types.LOGIN), setDefaultAuthorizationHeader);
}

export default authSagas
