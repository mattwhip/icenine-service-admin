import Component from 'app/main/users/component'
import { connect } from 'react-redux'

import actions from 'actions'
import selectors from 'selectors'

const mapStateToProps = (state, ownProps) => {
    const total = selectors.users.getUserSearchResultsTotal(state);
    return {
        resultsReceivedAt: state.ui.users.resultsReceivedAt,
        usersInSelectedPage: selectors.users.getUserIDsInSelectedPage(state),
        searchResultCount: total,
        usersPerPage: selectors.users.userIDsPerPage,
        pageCount: Math.ceil(total / selectors.users.userIDsPerPage),
        selectedPage: state.ui.users.selectedPage,
        selectedUserID: state.ui.users.selectedUserID,
        searchErrorText: state.ui.users.searchErrorText,
        selectedUserDetails: selectors.users.getSelectedUserDetails(state),
        selectedUiUserDetails: selectors.users.getSelectedUiUserDetails(state),
        anySelectedUserDirtyFlagSet: selectors.users.getAnySelectedUserDirtyFlagSet(state),
        userDirtyFlags: selectors.users.getUserDirtyFlags(state),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSearch: (searchText) => {
        dispatch(actions.users.searchUsers(searchText))
    },
    onSelectUser: (userID) => {
        dispatch(actions.users.selectUser(userID))
        dispatch(actions.users.getUserDetails(userID))
    },
    onSelectPage: (pageNum) => {
        dispatch(actions.users.selectUserPage(pageNum))
    },
    onSetUiUserDetails: (userID, userDetails) => {
        dispatch(actions.users.setUiUserDetails(userID, userDetails))
    },
    onSetUserDetails: (setUserDetailsRequest) => {
        dispatch(actions.users.setUserDetails(setUserDetailsRequest))
    },
    onGetUserDetails: (userID) => {
        dispatch(actions.users.getUserDetails(userID))
    },
})

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ConnectedComponent
