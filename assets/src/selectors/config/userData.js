export const getConfig = (state) => {
    return state.serviceConfig.userData || null;
}

export const getUiConfig = (state) => {
    return state.ui.serviceConfig.userData || null;
}

export const getAnyDirtyFlagSet = (state) => {
    let uiConfig = getUiConfig(state);
    if (!uiConfig) {
        return false;
    }
    return (
        uiConfig.initialCoinsDirtyFlag ||
        uiConfig.initialRatingDirtyFlag ||
        uiConfig.initialRatingDeviationDirtyFlag ||
        uiConfig.initialRatingVolatilityDirtyFlag
    );
}
