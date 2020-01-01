export const getConfig = (state) => {
    return state.serviceConfig.dailyBonus || null;
}

export const getUiConfig = (state) => {
    return state.ui.serviceConfig.dailyBonus || null;
}

export const getAnyDirtyFlagSet = (state) => {
    let uiConfig = getUiConfig(state);
    if (!uiConfig) {
        return false;
    }
    return (
        uiConfig.resetSecondsDirtyFlag ||
        uiConfig.streakBreakSecondsDirtyFlag ||
        uiConfig.wheelsJSONDirtyFlag
    );
}
