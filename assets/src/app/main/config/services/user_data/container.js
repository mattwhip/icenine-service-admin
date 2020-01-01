import { connect } from 'react-redux'

import Component from 'app/main/config/services/user_data/component'
import actions from 'actions'
import selectors from 'selectors'


const mapStateToProps = (state, ownProps) => {
    return {
        config: selectors.config.userData.getConfig(state),
        uiConfig: selectors.config.userData.getUiConfig(state),
        anyDirtyFlagSet: selectors.config.userData.getAnyDirtyFlagSet(state),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getConfig: () => {
        dispatch(actions.serviceConfig.getUserDataConfig())
    },
    setConfig: (config) => {
        dispatch(actions.serviceConfig.setUserDataConfig(config))
    },
    uiSetConfig: (config) => {
        dispatch(actions.serviceConfig.setUiUserDataConfig(config))
    },
})

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ConnectedComponent
