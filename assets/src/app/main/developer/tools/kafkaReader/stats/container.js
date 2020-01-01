import { connect } from 'react-redux'

import Component from './component'
import selectors from 'selectors'


const mapStateToProps = (state, ownProps) => ({
    totalTopics: selectors.kafkaWebSocket.getTotalTopics(state),
    totalMessages: selectors.kafkaWebSocket.getTotalMessages(state),
    totalMessageBytesReceived: selectors.kafkaWebSocket.getTotalMessageBytesReceived(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ConnectedComponent
