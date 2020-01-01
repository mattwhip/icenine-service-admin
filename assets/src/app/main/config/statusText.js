import requestStates from 'requestStates'

export function createConfigStatusText(configState, configStateTime) {
    let statusText = "";
    switch (configState) {
        case requestStates.INITIAL:
            break;
        case requestStates.GETTING:
            statusText = "Retrieving config...";
            break;
        case requestStates.GET_SUCCESS:
            statusText = `Successfully retrieved config at ${configStateTime.toLocaleString()}`;
            break;
        case requestStates.GET_ERROR:
            statusText = `Error encountered retrieving config at ${configStateTime.toLocaleString()}`;
            break;
        case requestStates.SETTING:
            statusText = "Saving config...";
            break;
        case requestStates.SET_SUCCESS:
            statusText = `Successfully saved config at ${configStateTime.toLocaleString()}`;
            break;
        case requestStates.SET_ERROR:
            statusText = `Error encountered saving config at ${configStateTime.toLocaleString()}`;
            break;
        default:
            statusText = "Status unknown";
    }
    return statusText;
}
