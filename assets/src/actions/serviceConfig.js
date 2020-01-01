import * as types from 'types';
import { admin } from 'generated/services/admin/compiled';
import { createProtobufFormData } from './protobuf'


export const getDailyBonusConfig = () => ({
    type: types.GET_DAILY_BONUS_CONFIG,
    request: {
        method: 'post',
        responseType: 'arraybuffer',
        url: '/api/config/get/daily_bonus',
    }
})
export const setDailyBonusConfig = (config) => ({
    type: types.SET_DAILY_BONUS_CONFIG,
    request: {
        method: 'post',
        responseType: 'arraybuffer',
        url: '/api/config/set/daily_bonus',
        data: createProtobufFormData(admin.DailyBonusConfig, config),
    }
})

export const getUserAccountsConfig = () => ({
    type: types.GET_USER_ACCOUNTS_CONFIG,
    request: {
        method: 'post',
        responseType: 'arraybuffer',
        url: '/api/config/get/user_accounts',
    }
})
export const setUserAccountsConfig = (config) => ({
    type: types.SET_USER_ACCOUNTS_CONFIG,
    request: {
        method: 'post',
        responseType: 'arraybuffer',
        url: '/api/config/set/user_accounts',
        data: createProtobufFormData(admin.UserAccountsConfig, config),
    }
})

export const getUserDataConfig = () => ({
    type: types.GET_USER_DATA_CONFIG,
    request: {
        method: 'post',
        responseType: 'arraybuffer',
        url: '/api/config/get/user_data',
    }
})
export const setUserDataConfig = (config) => ({
    type: types.SET_USER_DATA_CONFIG,
    request: {
        method: 'post',
        responseType: 'arraybuffer',
        url: '/api/config/set/user_data',
        data: createProtobufFormData(admin.UserDataConfig, config),
    }
})

export const getBotConfig = () => ({
    type: types.GET_BOT_CONFIG,
    request: {
        method: 'post',
        responseType: 'arraybuffer',
        url: '/api/config/get/bot',
    }
})
export const setBotConfig = (config) => ({
    type: types.SET_BOT_CONFIG,
    request: {
        method: 'post',
        responseType: 'arraybuffer',
        url: '/api/config/set/bot',
        data: createProtobufFormData(admin.BotConfig, config),
    }
})

export const getMatchmakingProcessorConfig = () => ({
    type: types.GET_MATCHMAKING_PROCESSOR_CONFIG,
    request: {
        method: 'post',
        responseType: 'arraybuffer',
        url: '/api/config/get/matchmaking_processor',
    }
})
export const setMatchmakingProcessorConfig = (config) => ({
    type: types.SET_MATCHMAKING_PROCESSOR_CONFIG,
    request: {
        method: 'post',
        responseType: 'arraybuffer',
        url: '/api/config/set/matchmaking_processor',
        data: createProtobufFormData(admin.MatchmakingProcessorConfig, config),
    }
})

export const setUiBotConfig = (config) => ({
    type: types.SET_UI_BOT_CONFIG,
    config: config,
})
export const setUiDailyBonusConfig = (config) => ({
    type: types.SET_UI_DAILY_BONUS_CONFIG,
    config: config,
})
export const setUiMatchmakingProcessorConfig = (config) => ({
    type: types.SET_UI_MATCHMAKING_PROCESSOR_CONFIG,
    config: config,
})
export const setUiUserAccountsConfig = (config) => ({
    type: types.SET_UI_USER_ACCOUNTS_CONFIG,
    config: config,
})
export const setUiUserDataConfig = (config) => ({
    type: types.SET_UI_USER_DATA_CONFIG,
    config: config,
})
