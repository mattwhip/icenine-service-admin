import { connect } from 'react-redux'

import Component from './component'
import selectors from 'selectors'


const mapStateToProps = (state, ownProps) => {
    return {
        anyConfigDirtyFlagSet: selectors.config.getAnyDirtyFlagSet(state),
        anyUserDirtyFlagSet: selectors.users.getAnyDirtyFlagSet(state),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({

})

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ConnectedComponent
