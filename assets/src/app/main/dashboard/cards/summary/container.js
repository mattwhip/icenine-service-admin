import { connect } from 'react-redux'

import Component from 'app/main/dashboard/cards/summary/component'
import actions from 'actions'
import selectors from 'selectors'


const mapStateToProps = (state, ownProps) => {
    let summary = selectors.summary.getSummary(state);
    let disabled = false;
    if (summary == null || summary.errorText.length > 0) {
        disabled = true;
        summary = {
            totalUsers: 0,
            aliveUsers: 0,
            totalDevices: 0,
            totalAccounts: 0,
            lastUpdatedUnixTime: 0,
            errorText: summary.errorText,
        };
    }
    return {
        aliveUsers: summary.aliveUsers,
        totalUsers: summary.totalUsers,
        totalDevices: summary.totalDevices,
        totalAccounts: summary.totalAccounts,
        lastUpdatedUnixTime: summary.lastUpdatedUnixTime,
        disabled: disabled,
        isUpdating: state.ui.summary.isUpdating,
        hasUpdated: state.ui.summary.hasUpdated,
        errorText: summary.errorText,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onUpdateSummary: (forceUpdate) => {
        dispatch(actions.summary.getSystemSummary(forceUpdate))
    },
})

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ConnectedComponent
