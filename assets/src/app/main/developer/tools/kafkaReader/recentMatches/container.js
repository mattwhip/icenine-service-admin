import { connect } from 'react-redux'

import Component from './component'
import actions from 'actions'
import selectors from 'selectors'


const mapStateToProps = (state, ownProps) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    addTopics: (topicOffsetMap) => {
        dispatch(actions.kafkaWebSocket.addTopics(topicOffsetMap))
    }
})

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ConnectedComponent
