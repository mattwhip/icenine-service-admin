import { connect } from 'react-redux'

import Component from 'app/main/config/services/bot/component'
import actions from 'actions'
import selectors from 'selectors'


const mapStateToProps = (state, ownProps) => {
    return {
        config: selectors.config.bot.getConfig(state),
        uiConfig: selectors.config.bot.getUiConfig(state),
        anyDirtyFlagSet: selectors.config.bot.getAnyDirtyFlagSet(state),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getConfig: () => {
        dispatch(actions.serviceConfig.getBotConfig())
    },
    setConfig: (config) => {
        dispatch(actions.serviceConfig.setBotConfig(config))
    },
    uiSetConfig: (config) => {
        dispatch(actions.serviceConfig.setUiBotConfig(config))
    },
})

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ConnectedComponent
