
export const getConfig = (state) => {
    return state.serviceConfig.bot || null;
}

export const getUiConfig = (state) => {
    return state.ui.serviceConfig.bot || null;
}

export const getAnyDirtyFlagSet = (state) => {
    let uiConfig = getUiConfig(state);
    if (!uiConfig) {
        return false;
    }
    return (
        uiConfig.blueprintsJSONDirtyFlag
    );
}
