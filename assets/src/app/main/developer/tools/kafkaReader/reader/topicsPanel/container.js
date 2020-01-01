import { connect } from 'react-redux'

import Component from './component'
import actions from 'actions'
import selectors from 'selectors'
import uiKafkaReader from '../../../../../../../reducers/uiKafkaReader';


const mapStateToProps = (state, ownProps) => ({
    sortedTopics: selectors.kafkaWebSocket.getSortedTopics(state),
    webSocketState: selectors.kafkaWebSocket.getWebSocketState(state),
    webSocketError: selectors.kafkaWebSocket.getWebSocketError(state),
    selectedTopic: selectors.kafkaReader.getSelectedTopic(state),
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
    setSelectedTopic: (topic) => {
        dispatch(actions.kafkaReader.setSelectedTopic(topic));
    },
})

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ConnectedComponent
