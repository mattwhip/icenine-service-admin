import { connect } from 'react-redux'

import Component from 'app/main/config/services/user_accounts/component'
import actions from 'actions'
import selectors from 'selectors'


const mapStateToProps = (state, ownProps) => {
    return {
        config: selectors.config.userAccounts.getConfig(state),
        uiConfig: selectors.config.userAccounts.getUiConfig(state),
        anyDirtyFlagSet: selectors.config.userAccounts.getAnyDirtyFlagSet(state),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getConfig: () => {
        dispatch(actions.serviceConfig.getUserAccountsConfig())
    },
    setConfig: (config) => {
        dispatch(actions.serviceConfig.setUserAccountsConfig(config))
    },
    uiSetConfig: (config) => {
        dispatch(actions.serviceConfig.setUiUserAccountsConfig(config))
    },
})

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ConnectedComponent
