import { connect } from 'react-redux'

import Component from 'app/main/users/cards/user/component'
import actions from 'actions'
import selectors from 'selectors'


const mapStateToProps = (state, ownProps) => {
    let selectedUserID = selectors.users.getSelectedUserID(state);
    let userDetails = selectors.users.getSelectedUserDetails(state);
    let uiUserDetails = selectors.users.getSelectedUiUserDetails(state);
    let disabled = userDetails == undefined || userDetails == null;
    return {
        userID: selectedUserID,
        userDetails,
        uiUserDetails,
        disabled: disabled,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getUserDetails: (userID) => {
        dispatch(actions.users.getUserDetails(userID))
    },
    setUserDetails: (userID, userDetails) => {
        dispatch(actions.users.setUserDetails(userID, userDetails))
    },
    uiSetUserDetails: (userID, userDetails) => {
        dispatch(actions.users.setUiUserDetails(userID, userDetails))
    },
})

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ConnectedComponent
