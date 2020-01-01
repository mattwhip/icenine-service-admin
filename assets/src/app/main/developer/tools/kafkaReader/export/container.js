import { connect } from 'react-redux'

import Component from './component'
import actions from 'actions'
import selectors from 'selectors'


const mapStateToProps = (state, ownProps) => ({
    isTopicSelected: selectors.kafkaReader.getSelectedTopic(state) ? true : false,
    topicsExist: selectors.kafkaWebSocket.getSortedTopics(state).length > 0,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    exportSelectedTopic: () => {
        dispatch(actions.kafkaReader.exportSelectedTopic());
    },
    exportAllTopics: () => {
        dispatch(actions.kafkaReader.exportAllTopics());
    },
})

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ConnectedComponent
