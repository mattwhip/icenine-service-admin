import { error, success } from 'redux-saga-requests';

import * as types from 'types';
import requestErrors from 'requestErrors';
import { updateObject } from 'state'
import { admin } from "generated/services/admin/compiled";

const uiServiceConfigReducer = (state = {}, action) => {
    return updateObject(state, {
        bot: uiBotConfigReducer(state.bot, action),
        dailyBonus: uiDailyBonusConfigReducer(state.dailyBonus, action),
        matchmakingProcessor: uiMatchmakingProcessorConfigReducer(state.matchmakingProcessor, action),
        userAccounts: uiUserAccountsConfigReducer(state.userAccounts, action),
        userData: uiUserDataConfigReducer(state.userData, action),
    })
}

const uiBotConfigInitState = {
    blueprintsJSON: "{}",
    blueprintsJSONDirtyFlag: false,
    errorText: "",
    comments: "",
}
const uiBotConfigReducer = (state = uiBotConfigInitState, action) => {
    switch (action.type) {
        case types.SET_UI_BOT_CONFIG:
            return updateObject(state, action.config);
        case success(types.SET_BOT_CONFIG):
        {
            let buffer = new Uint8Array(action.data);
            let response = admin.BotConfig.decode(buffer);
            let newState = {
                blueprintsJSONDirtyFlag: false,
                comments: "",
                errorText: "",
            };
            newState = updateObject(newState, response)
            return updateObject(state, newState);
        }
        case success(types.GET_BOT_CONFIG):
        {
            // Clear error text only
            let newState = {
                errorText: "",
            };
            return updateObject(state, newState);
        }
        case error(types.GET_BOT_CONFIG):
        {
            let errorText = requestErrors.getErrorActionMessage(action);
            let newState = {
                errorText: errorText,
            }
            return updateObject(state, newState)
        }
        case error(types.SET_BOT_CONFIG):
        {
            let errorText = requestErrors.getErrorActionMessage(action);
            let newState = {
                errorText: errorText,
            }
            return updateObject(state, newState)
        }
        default:
            return state;
    }
}

const uiDailyBonusConfigInitState = {
    resetSecondsDirtyFlag: false,
    resetSeconds: "",
    streakBreakSecondsDirtyFlag: false,
    streakBreakSeconds: "",
    wheelsJSON: "{}",
    wheelsJSONDirtyFlag: false,
    comments: "",
    errorText: "",
}
const uiDailyBonusConfigReducer = (state = uiDailyBonusConfigInitState, action) => {
    switch (action.type) {
        case types.SET_UI_DAILY_BONUS_CONFIG:
            return updateObject(state, action.config);
        case success(types.SET_DAILY_BONUS_CONFIG):
        {
            let buffer = new Uint8Array(action.data);
            let response = admin.DailyBonusConfig.decode(buffer);
            let newState = {
                resetSecondsDirtyFlag: false,
                streakBreakSecondsDirtyFlag: false,
                wheelsJSONDirtyFlag: false,
                comments: "",
                errorText: "",
            };
            newState = updateObject(newState, response)
            return updateObject(state, newState);
        }
        case success(types.GET_DAILY_BONUS_CONFIG):
        {
            // Clear error text only
            let newState = {
                errorText: "",
            };
            return updateObject(state, newState);
        }
        case error(types.GET_DAILY_BONUS_CONFIG):
        {
            let errorText = requestErrors.getErrorActionMessage(action);
            let newState = {
                errorText: errorText,
            }
            return updateObject(state, newState)
        }
        case error(types.SET_DAILY_BONUS_CONFIG):
        {
            let errorText = requestErrors.getErrorActionMessage(action);
            let newState = {
                errorText: errorText,
            }
            return updateObject(state, newState)
        }
        default:
            return state;
    }
}

const uiMatchmakingProcessorConfigInitState = {
    processorChainBlueprintsJSON: "{}",
    processorChainBlueprintsJSONDirtyFlag: false,
    tableBlueprintsJSON: "{}",
    tableBlueprintsJSONDirtyFlag: false,
    errorText: "",
    comments: "",
}
const uiMatchmakingProcessorConfigReducer = (state = uiMatchmakingProcessorConfigInitState, action) => {
    switch (action.type) {
        case types.SET_UI_MATCHMAKING_PROCESSOR_CONFIG:
            return updateObject(state, action.config);
        case success(types.SET_MATCHMAKING_PROCESSOR_CONFIG):
        {
            let buffer = new Uint8Array(action.data);
            let response = admin.MatchmakingProcessorConfig.decode(buffer);
            let newState = {
                processorChainBlueprintsJSONDirtyFlag: false,
                tableBlueprintsJSONDirtyFlag: false,
                comments: "",
                errorText: "",
            };
            newState = updateObject(newState, response)
            return updateObject(state, newState);
        }
        case success(types.GET_MATCHMAKING_PROCESSOR_CONFIG):
        {
            // Clear error text only
            let newState = {
                errorText: "",
            };
            return updateObject(state, newState);
        }
        case error(types.GET_MATCHMAKING_PROCESSOR_CONFIG):
        {
            let errorText = requestErrors.getErrorActionMessage(action);
            let newState = {
                errorText: errorText,
            }
            return updateObject(state, newState)
        }
        case error(types.SET_MATCHMAKING_PROCESSOR_CONFIG):
        {
            let errorText = requestErrors.getErrorActionMessage(action);
            let newState = {
                errorText: errorText,
            }
            return updateObject(state, newState)
        }
        default:
            return state;
    }
}

const uiUserAccountsConfigInitState = {
    jwtExpirationSecondsDirtyFlag: false,
    jwtExpirationSeconds: "",
    comments: "",
    errorText: "",
}
const uiUserAccountsConfigReducer = (state = uiUserAccountsConfigInitState, action) => {
    switch (action.type) {
        case types.SET_UI_USER_ACCOUNTS_CONFIG:
            return updateObject(state, action.config);
        case success(types.SET_USER_ACCOUNTS_CONFIG):
        {
            let buffer = new Uint8Array(action.data);
            let response = admin.UserAccountsConfig.decode(buffer);
            let newState = {
                jwtExpirationSecondsDirtyFlag: false,
                comments: "",
                errorText: "",
            };
            newState = updateObject(newState, response)
            return updateObject(state, newState);
        }
        case success(types.GET_USER_ACCOUNTS_CONFIG):
        {
            // Clear error text only
            let newState = {
                errorText: "",
            };
            return updateObject(state, newState);
        }
        case error(types.GET_USER_ACCOUNTS_CONFIG):
        {
            let errorText = requestErrors.getErrorActionMessage(action);
            let newState = {
                errorText: errorText,
            }
            return updateObject(state, newState)
        }
        case error(types.SET_USER_ACCOUNTS_CONFIG):
        {
            let errorText = requestErrors.getErrorActionMessage(action);
            let newState = {
                errorText: errorText,
            }
            return updateObject(state, newState)
        }
        default:
            return state;
    }
}

const uiUserDataConfigInitState = {
    initialCoinsDirtyFlag: false,
    initialCoins: 0,
    initialRatingDirtyFlag: false,
    initialRating: 0,
    initialRatingDeviationDirtyFlag: false,
    initialRatingDeviation: 0,
    initialRatingVolatilityDirtyFlag: false,
    initialRatingVolatility: 0,
    comments: "",
    errorText: "",
}
const uiUserDataConfigReducer = (state = uiUserDataConfigInitState, action) => {
    switch (action.type) {
        case types.SET_UI_USER_DATA_CONFIG:
            return updateObject(state, action.config);
        case success(types.SET_USER_DATA_CONFIG):
        {
            let buffer = new Uint8Array(action.data);
            let response = admin.UserDataConfig.decode(buffer);
            let newState = {
                initialCoinsDirtyFlag: false,
                initialRatingDirtyFlag: false,
                initialRatingDeviationDirtyFlag: false,
                initialRatingVolatilityDirtyFlag: false,
                comments: "",
                errorText: "",
            };
            newState = updateObject(newState, response)
            return updateObject(state, newState);
        }
        case success(types.GET_USER_DATA_CONFIG):
        {
            // Clear error text only
            let newState = {
                errorText: "",
            };
            return updateObject(state, newState);
        }
        case error(types.GET_USER_DATA_CONFIG):
        {
            let errorText = requestErrors.getErrorActionMessage(action);
            let newState = {
                errorText: errorText,
            }
            return updateObject(state, newState)
        }
        case error(types.SET_USER_DATA_CONFIG):
        {
            let errorText = requestErrors.getErrorActionMessage(action);
            let newState = {
                errorText: errorText,
            }
            return updateObject(state, newState)
        }
        default:
            return state;
    }
}

export default { uiServiceConfigReducer }
