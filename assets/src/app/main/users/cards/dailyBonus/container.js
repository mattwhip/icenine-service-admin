import { connect } from 'react-redux'

import Component from 'app/main/users/cards/dailyBonus/component'
import actions from 'actions'
import selectors from 'selectors'


const mapStateToProps = (state, ownProps) => {
    let userDetails = selectors.users.getSelectedUserDetails(state);
    let uiUserDetails = selectors.users.getSelectedUiUserDetails(state);
    return {
        userDetails: userDetails,
        uiUserDetails: uiUserDetails,
        disabled: !selectors.users.getIsUserSelected(state),
        userID: selectors.users.getSelectedUserID(state),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    setUiUserDetails: (userID, userDetails) => {
        dispatch(actions.users.setUiUserDetails(userID, userDetails))
    },
})

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ConnectedComponent
