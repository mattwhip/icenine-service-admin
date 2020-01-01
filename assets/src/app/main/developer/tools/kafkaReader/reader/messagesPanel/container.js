import { connect } from 'react-redux'

import Component from './component'
import actions from 'actions'
import selectors from 'selectors'


const mapStateToProps = (state, ownProps) => {
    const topic = selectors.kafkaReader.getSelectedTopic(state);
    const topicData = selectors.kafkaWebSocket.getTopic(state, topic);
    return {
        topic: topic,
        messages: selectors.kafkaWebSocket.getMessages(topicData),
        selectedMessageOffset: selectors.kafkaReader.getSelectedMessageOffset(state),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    setSelectedOffset: (topic, offset) => {
        dispatch(actions.kafkaReader.setSelectedMessageOffset(topic, offset));
    },
})

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ConnectedComponent
