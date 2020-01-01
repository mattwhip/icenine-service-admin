import { connect } from 'react-redux'

import Component from './component'
import actions from 'actions'
import selectors from 'selectors'


const mapStateToProps = (state, ownProps) => ({
    sortedTopics: selectors.kafkaWebSocket.getSortedTopics(state),
    webSocketState: selectors.kafkaWebSocket.getWebSocketState(state),
    webSocketError: selectors.kafkaWebSocket.getWebSocketError(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    addTopics: (topicOffsetMap) => {
        dispatch(actions.kafkaWebSocket.addTopics(topicOffsetMap))
    },
    removeTopics: (topics) => {
        dispatch(actions.kafkaWebSocket.removeTopics(topics));
    },
    connectWebSocket: () => {
        dispatch(actions.kafkaWebSocket.connect());
    },
    closeWebSocket: () => {
        dispatch(actions.kafkaWebSocket.close());
    },
})

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ConnectedComponent
