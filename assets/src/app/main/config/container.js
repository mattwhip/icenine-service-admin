import { connect } from 'react-redux'

import Component from './component'
import selectors from 'selectors'


const mapStateToProps = (state, ownProps) => {
    return {
        anyBotDirtyFlagSet: selectors.config.bot.getAnyDirtyFlagSet(state),
        anyDailyBonusDirtyFlagSet: selectors.config.dailyBonus.getAnyDirtyFlagSet(state),
        anyUserAccountsDirtyFlagSet: selectors.config.userAccounts.getAnyDirtyFlagSet(state),
        anyUserDataDirtyFlagSet: selectors.config.userData.getAnyDirtyFlagSet(state),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({

})

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ConnectedComponent
