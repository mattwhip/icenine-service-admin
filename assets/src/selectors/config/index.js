import * as bot from './bot'
import * as dailyBonus from './dailyBonus'
import * as userAccounts from './userAccounts'
import * as userData from './userData'

const getAnyDirtyFlagSet = function (state) {
    return (
        bot.getAnyDirtyFlagSet(state) ||
        dailyBonus.getAnyDirtyFlagSet(state) ||
        userAccounts.getAnyDirtyFlagSet(state) ||
        userData.getAnyDirtyFlagSet(state)
    );
}

export default {
    getAnyDirtyFlagSet,
    bot,
    dailyBonus,
    userAccounts,
    userData,
}
