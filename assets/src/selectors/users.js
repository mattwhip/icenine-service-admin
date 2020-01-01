import { createSelector } from 'reselect'

export const userIDsPerPage = 10;

const allSortedUserIDsInSearchResultsSelector = createSelector(
    state => state.userSearchResults,
    (searchResults) => {
        let userIDs = [];
        if (searchResults != null) {
            userIDs = Object.keys(searchResults);
            userIDs.sort();
        }
        return userIDs;
    }
)

const userIDsInSelectedPageSelector = createSelector(
    allSortedUserIDsInSearchResultsSelector,
    state => state.ui.users.selectedPage,
    (allSortedUserIDs, selectedPage) => {
        const startIndex = selectedPage * userIDsPerPage;
        const endIndex = Math.min(startIndex + userIDsPerPage, allSortedUserIDs.length)
        const visibleUserIDs = [];
        for (let i = startIndex; i < endIndex; ++i) {
            visibleUserIDs.push(allSortedUserIDs[i])
        }
        return visibleUserIDs;
    }
)

export const getUserSearchResultsTotal = createSelector(
    allSortedUserIDsInSearchResultsSelector,
    (allSortedUserIDs) => {
        return allSortedUserIDs.length;
    }
)

export const getUserIDsInSelectedPage = (state) => {
    return userIDsInSelectedPageSelector(state);
}

export const getUserDetails = (state, userID) => {
    let userDetails = state.userDetails[userID];
    return userDetails || null;
}

export const getUiUserDetails = (state, userID) => {
    let userDetails = state.ui.userDetails[userID];
    if (userDetails !== undefined) {
        if (!userDetails['aliveDirtyFlag']) {
            userDetails['aliveDirtyFlag'] = false;
        }
    }
    return userDetails || null;
}

export const getSelectedUserDetails = (state) => {
    let selectedUserID = state.ui.users.selectedUserID || '';
    if (selectedUserID == '') {
        return null;
    }
    return getUserDetails(state, selectedUserID);
}

export const getSelectedUiUserDetails = (state) => {
    let selectedUserID = state.ui.users.selectedUserID || '';
    if (selectedUserID == '') {
        return null;
    }
    return getUiUserDetails(state, selectedUserID);
}

export const getIsUserSelected = (state) => {
    let selectedUserID = state.ui.users.selectedUserID || '';
    return selectedUserID != '';
}

export const getSelectedUserID = (state) => {
    return state.ui.users.selectedUserID || '';
}

export const getDevices = (userDetails) => {
    if (userDetails == null) {
        return [];
    }
    return userDetails.devices || [];
}

export const getAnyUserDirtyFlagSet = (userDetails, uiUserDetails) => {
    if (!uiUserDetails) {
        return false;
    }
    const coinDelta = uiUserDetails.coinDelta;
    if (uiUserDetails.aliveDirtyFlag ||
        (coinDelta !== undefined && coinDelta !== null && coinDelta !== 0)) {
        return true;
    }
    const dailyBonusStatus = uiUserDetails.dailyBonusStatus;
    if (dailyBonusStatus !== undefined && dailyBonusStatus !== null) {
        if (dailyBonusStatus.streak !== userDetails.dailyBonusStatus.streak) {
            return true
        }
    }
    if (uiUserDetails.dailyBonusResetPending) {
        return true
    }
    return false;
}

export const getAnySelectedUserDirtyFlagSet = (state) => {
    return getAnyUserDirtyFlagSet(getSelectedUserDetails(state), getSelectedUiUserDetails(state));
}

export const getUserDirtyFlags = (state) => {
    let dirtyFlags = {};
    let potentialDirtyUserIDs = Object.keys(state.ui.userDetails || {});
    potentialDirtyUserIDs.forEach((userID, index, array) => {
        if (getAnyUserDirtyFlagSet(getUserDetails(state, userID), getUiUserDetails(state, userID))) {
            dirtyFlags[userID] = true;
        }
    });
    return dirtyFlags;
}

export const getAnyDirtyFlagSet = (state) => {
    const dirtyFlags = getUserDirtyFlags(state);
    return Object.keys(dirtyFlags).length > 0;
}
