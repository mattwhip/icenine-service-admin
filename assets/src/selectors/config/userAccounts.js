export const getConfig = (state) => {
    return state.serviceConfig.userAccounts || null;
}

export const getUiConfig = (state) => {
    return state.ui.serviceConfig.userAccounts || null;
}

export const getAnyDirtyFlagSet = (state) => {
    let uiConfig = getUiConfig(state);
    if (!uiConfig) {
        return false;
    }
    return (
        uiConfig.jwtExpirationSecondsDirtyFlag
    );
}
