import { error, success } from 'redux-saga-requests';

import { updateObject } from 'state'
import ui from 'reducers/ui'
import serviceConfig from 'reducers/serviceConfig'
import userSearchResults from 'reducers/userSearchResults'
import userDetails from 'reducers/userDetails'
import auth from 'reducers/auth'
import summary from 'reducers/summary'
import kafkaReader from 'reducers/kafkaReader'
import kafkaWebSocket from 'reducers/kafkaWebSocket'

const rootReducer = (state = {}, action) => {
    return updateObject(state, {
        ui: ui.uiReducer(state.ui, action),
        auth: auth.authReducer(state.auth, action),
        userSearchResults: userSearchResults.userSearchResultsReducer(state.userSearchResults, action),
        userDetails: userDetails.userDetailsReducer(state.userDetails, action),
        summary: summary.summaryReducer(state.summary, action),
        serviceConfig: serviceConfig.serviceConfigReducer(state.serviceConfig, action),
        kafkaReader: kafkaReader.kafkaReaderReducer(state.kafkaReader, action),
        kafkaWebSocket: kafkaWebSocket.kafkaWebSocketReducer(state.kafkaWebSocket, action),
    })
}

export default { rootReducer }
