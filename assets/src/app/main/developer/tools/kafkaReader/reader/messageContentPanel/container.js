import { connect } from 'react-redux'

import Component from './component'
import selectors from 'selectors'


const mapStateToProps = (state, ownProps) => {
    return {
        topic: selectors.kafkaReader.getSelectedTopic(state),
        message: selectors.kafkaReader.getSelectedMessage(state),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({

})

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ConnectedComponent
