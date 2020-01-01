import { connect } from 'react-redux'

import Component from 'app/main/config/services/daily_bonus/component'
import actions from 'actions'
import selectors from 'selectors'


const mapStateToProps = (state, ownProps) => {
    return {
        config: selectors.config.dailyBonus.getConfig(state),
        uiConfig: selectors.config.dailyBonus.getUiConfig(state),
        anyDirtyFlagSet: selectors.config.dailyBonus.getAnyDirtyFlagSet(state),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getConfig: () => {
        dispatch(actions.serviceConfig.getDailyBonusConfig())
    },
    setConfig: (config) => {
        dispatch(actions.serviceConfig.setDailyBonusConfig(config))
    },
    uiSetConfig: (config) => {
        dispatch(actions.serviceConfig.setUiDailyBonusConfig(config))
    },
})

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ConnectedComponent
