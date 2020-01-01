import { error, success } from 'redux-saga-requests';

import * as types from 'types';
import requestStates from 'requestStates';
import { updateObject } from 'state'
import { admin } from "generated/services/admin/compiled";

const serviceConfigReducer = (state = {}, action) => {
    return updateObject(state, {
        bot: serviceConfigBotReducer(state.bot, action),
        dailyBonus: serviceConfigDailyBonusReducer(state.dailyBonus, action),
        userAccounts: serviceConfigUserAccountsReducer(state.userAccounts, action),
        userData: serviceConfigUserDataReducer(state.userData, action),
    })
}

const serviceConfigBotInitState = {
    state: requestStates.INITIAL,
}
const serviceConfigBotReducer = (state = serviceConfigBotInitState, action) => {
    let now = new Date();
    switch (action.type) {
        /////////////////////////
        // GET_BOT_CONFIG
        case types.GET_BOT_CONFIG:
            return updateObject(state, {
                state: requestStates.GETTING,
            });
        case success(types.GET_BOT_CONFIG):
        {
            let buffer = new Uint8Array(action.data);
            let response = admin.BotConfig.decode(buffer);
            let newState = {
                state: requestStates.GET_SUCCESS,
                stateTime: now,
            };
            newState = updateObject(newState, response)
            return updateObject(state, newState);
        }
        case error(types.GET_BOT_CONFIG):
        {
            return updateObject(state, {
                state: requestStates.GET_ERROR,
                stateTime: now,
            });
        }
        /////////////////////////
        // SET_BOT_CONFIG
        case types.SET_BOT_CONFIG:
            return updateObject(state, {
                state: requestStates.SETTING,
            });
        case success(types.SET_BOT_CONFIG):
        {
            let buffer = new Uint8Array(action.data);
            let response = admin.BotConfig.decode(buffer);
            let newState = {
                state: requestStates.SET_SUCCESS,
                stateTime: now,
            };
            newState = updateObject(newState, response)
            return updateObject(state, newState);
        }
        case error(types.SET_BOT_CONFIG):
        {
            return updateObject(state, {
                state: requestStates.SET_ERROR,
                stateTime: now,
            });
        }
        default:
            return state;
    }
}

const serviceConfigDailyBonusInitState = {
    state: requestStates.INITIAL,
}
const serviceConfigDailyBonusReducer = (state = serviceConfigDailyBonusInitState, action) => {
    let now = new Date();
    switch (action.type) {
        /////////////////////////
        // GET_DAILY_BONUS_CONFIG
        case types.GET_DAILY_BONUS_CONFIG:
            return updateObject(state, {
                state: requestStates.GETTING,
            });
        case success(types.GET_DAILY_BONUS_CONFIG):
        {
            let buffer = new Uint8Array(action.data);
            let response = admin.DailyBonusConfig.decode(buffer);
            let newState = {
                state: requestStates.GET_SUCCESS,
                stateTime: now,
            };
            newState = updateObject(newState, response)
            return updateObject(state, newState);
        }
        case error(types.GET_DAILY_BONUS_CONFIG):
        {
            return updateObject(state, {
                state: requestStates.GET_ERROR,
                stateTime: now,
            });
        }
        /////////////////////////
        // SET_DAILY_BONUS_CONFIG
        case types.SET_DAILY_BONUS_CONFIG:
            return updateObject(state, {
                state: requestStates.SETTING,
            });
        case success(types.SET_DAILY_BONUS_CONFIG):
        {
            let buffer = new Uint8Array(action.data);
            let response = admin.DailyBonusConfig.decode(buffer);
            let newState = {
                state: requestStates.SET_SUCCESS,
                stateTime: now,
            };
            newState = updateObject(newState, response)
            return updateObject(state, newState);
        }
        case error(types.SET_DAILY_BONUS_CONFIG):
        {
            return updateObject(state, {
                state: requestStates.SET_ERROR,
                stateTime: now,
            });
        }
        default:
            return state;
    }
}

const serviceConfigUserAccountsInitState = {
    state: requestStates.INITIAL,
}
const serviceConfigUserAccountsReducer = (state = serviceConfigUserAccountsInitState, action) => {
    let now = new Date();
    switch (action.type) {
        /////////////////////////
        // GET_USER_ACCOUNTS_CONFIG
        case types.GET_USER_ACCOUNTS_CONFIG:
            return updateObject(state, {
                state: requestStates.GETTING,
            });
        case success(types.GET_USER_ACCOUNTS_CONFIG):
        {
            let buffer = new Uint8Array(action.data);
            let response = admin.UserAccountsConfig.decode(buffer);
            let newState = {
                state: requestStates.GET_SUCCESS,
                stateTime: now,
            };
            newState = updateObject(newState, response)
            return updateObject(state, newState);
        }
        case error(types.GET_USER_ACCOUNTS_CONFIG):
        {
            return updateObject(state, {
                state: requestStates.GET_ERROR,
                stateTime: now,
            });
        }
        /////////////////////////
        // SET_USER_ACCOUNTS_CONFIG
        case types.SET_USER_ACCOUNTS_CONFIG:
            return updateObject(state, {
                state: requestStates.SETTING,
            });
        case success(types.SET_USER_ACCOUNTS_CONFIG):
        {
            let buffer = new Uint8Array(action.data);
            let response = admin.UserAccountsConfig.decode(buffer);
            let newState = {
                state: requestStates.SET_SUCCESS,
                stateTime: now,
            };
            newState = updateObject(newState, response)
            return updateObject(state, newState);
        }
        case error(types.SET_USER_ACCOUNTS_CONFIG):
        {
            return updateObject(state, {
                state: requestStates.SET_ERROR,
                stateTime: now,
            });
        }
        default:
            return state;
    }
}

const serviceConfigUserDataInitState = {
    state: requestStates.INITIAL,
}
const serviceConfigUserDataReducer = (state = serviceConfigUserDataInitState, action) => {
    let now = new Date();
    switch (action.type) {
        /////////////////////////
        // GET_USER_DATA_CONFIG
        case types.GET_USER_DATA_CONFIG:
            return updateObject(state, {
                state: requestStates.GETTING,
            });
        case success(types.GET_USER_DATA_CONFIG):
        {
            let buffer = new Uint8Array(action.data);
            let response = admin.UserDataConfig.decode(buffer);
            let newState = {
                state: requestStates.GET_SUCCESS,
                stateTime: now,
            };
            newState = updateObject(newState, response)
            return updateObject(state, newState);
        }
        case error(types.GET_USER_DATA_CONFIG):
        {
            return updateObject(state, {
                state: requestStates.GET_ERROR,
                stateTime: now,
            });
        }
        /////////////////////////
        // SET_USER_DATA_CONFIG
        case types.SET_USER_DATA_CONFIG:
            return updateObject(state, {
                state: requestStates.SETTING,
            });
        case success(types.SET_USER_DATA_CONFIG):
        {
            let buffer = new Uint8Array(action.data);
            let response = admin.UserDataConfig.decode(buffer);
            let newState = {
                state: requestStates.SET_SUCCESS,
                stateTime: now,
            };
            newState = updateObject(newState, response)
            return updateObject(state, newState);
        }
        case error(types.SET_USER_DATA_CONFIG):
        {
            return updateObject(state, {
                state: requestStates.SET_ERROR,
                stateTime: now,
            });
        }
        default:
            return state;
    }
}

export default { serviceConfigReducer }
