import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from "react-icons-kit";
import { ic_search } from 'react-icons-kit/md/ic_search'
import { ic_help_outline } from 'react-icons-kit/md/ic_help_outline'
import { alertCircled } from 'react-icons-kit/ionicons/alertCircled'
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import ReactPaginate from 'react-paginate';

import styles from './styles.module.css'
import buttonStyles from 'app/buttons/styles.module.css'
import { container as CoinsCard } from 'app/main/users/cards/coins'
import { container as UserCard } from 'app/main/users/cards/user'
import { container as DevicesCard } from 'app/main/users/cards/devices'
import { container as DailyBonusCard } from 'app/main/users/cards/dailyBonus'
import formatting from 'formatting'
import requestStates from 'requestStates'
import { component as EditPanel } from 'app/editPanel'


class Users extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            searchText: '',
            helpPopoverOpen: false,
            searchTime: null,
            errorPopoverOpen: false,
        };
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleCommentsChanged = this.handleCommentsChanged.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.createSearchStatusText = this.createSearchStatusText.bind(this);
        this.handleSearchTextChanged = this.handleSearchTextChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectSearchResult = this.handleSelectSearchResult.bind(this);
        this.toggleHelpPopover = this.toggleHelpPopover.bind(this);
        this.soloToggleHelpPopover = this.soloToggleHelpPopover.bind(this);
        this.toggleErrorPopover = this.toggleErrorPopover.bind(this);
        this.soloToggleErrorPopover = this.soloToggleErrorPopover.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handleRefresh() {
        this.props.onGetUserDetails(this.props.selectedUserDetails.userID);
    }

    handleCommentsChanged(event) {
        let userID = this.props.selectedUserDetails.userID;
        this.props.onSetUiUserDetails(userID, {
            comments: event.target.value
        });
    }

    handleCancel() {
        let userID = this.props.selectedUserDetails.userID;
        this.props.onSetUiUserDetails(userID, {
            aliveDirtyFlag: false,
            dailyBonusStreakDirtyFlag: false,
            alive: this.props.selectedUserDetails.alive,
            comments: "",
            coinDelta: 0,
            dailyBonusResetPending: false,
            dailyBonusStatus: {
                streak: this.props.selectedUserDetails.dailyBonusStatus.streak,
                isAvailable: this.props.selectedUserDetails.dailyBonusStatus.isAvailable,
                secondsUntilAvailable: this.props.selectedUserDetails.dailyBonusStatus.secondsUntilAvailable,
            }
        });
    }

    handleSave() {
        // alive
        let newAlive = this.props.selectedUiUserDetails.aliveDirtyFlag ? this.props.selectedUiUserDetails.alive : this.props.selectedUserDetails.alive;
        let setAlive = this.props.selectedUserDetails.alive !== newAlive;

        // coins/coinDelta
        let coinDelta = this.props.selectedUiUserDetails.coinDelta ? this.props.selectedUiUserDetails.coinDelta : 0;

        // daily bonus
        let newDailyBonusStreak = this.props.selectedUiUserDetails.dailyBonusStreakDirtyFlag ? this.props.selectedUiUserDetails.dailyBonusStatus.streak : this.props.selectedUserDetails.dailyBonusStatus.streak;
        let setDailyBonusStreak = this.props.selectedUserDetails.dailyBonusStatus.streak !== newDailyBonusStreak;
        let setRefreshDailyBonus = this.props.selectedUiUserDetails.dailyBonusResetPending;

        // Send set user details request
        this.props.onSetUserDetails({
            userID: this.props.selectedUserDetails.userID,

            setAlive: setAlive,
            newAlive: newAlive,

            coinDelta: coinDelta,

            setDailyBonusStreak: setDailyBonusStreak,
            newDailyBonusStreak: newDailyBonusStreak,

            setRefreshDailyBonus: setRefreshDailyBonus,
        })
    }

    handleSearchTextChanged(event) {
        this.setState({
            searchText: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.searchText.length >= 3) {
            this.props.onSearch(this.state.searchText);
        }
    }

    toggleHelpPopover(event) {
        event.preventDefault();
        this.setState({
            helpPopoverOpen: !this.state.helpPopoverOpen
        });
    }

    toggleErrorPopover(event) {
        event.preventDefault();
        this.setState({
            errorPopoverOpen: !this.state.errorPopoverOpen
        });
    }

    soloToggleErrorPopover() {
        this.setState({
            errorPopoverOpen: !this.state.errorPopoverOpen
        });
    }

    soloToggleHelpPopover() {
        this.setState({
            helpPopoverOpen: !this.state.helpPopoverOpen
        });
    }

    handleSelectSearchResult(event, userID) {
        event.preventDefault();
        this.props.onSelectUser(userID);
    }

    createSearchResultListItems(startingIndex, usersInSelectedPage, match, location, userDirtyFlags) {
        const searchHandlerOwner = this;
        const searchResultItems = usersInSelectedPage.map(function(userID, index) {
            let positionClasses = [];
            if (index == 0 && usersInSelectedPage.length == 1) {
                positionClasses.push(styles.onlyResult);
            } else if (index == 0) {
                positionClasses.push(styles.firstResult);
            } else if (index == usersInSelectedPage.length - 1) {
                positionClasses.push(styles.lastResult);
            }
            if (location.pathname == `${match.path}/${userID}`) {
                positionClasses.push(styles.active);
            }
            let classesStr = positionClasses.join(' ');
            let dashedUserID = formatting.dashedString(userID);
            return (
                <li key={index} onClick={(e) => {searchHandlerOwner.handleSelectSearchResult(e, userID)}}>
                    <Link to={`${match.url}/${userID}`} className={classesStr}>
                        <div>
                            {`${startingIndex + index + 1}. ${dashedUserID}${userDirtyFlags[userID] ? ' *' : ''}`}
                        </div>
                    </Link>
                </li>
                
            );
        });
        return searchResultItems;
    }

    createSearchStatusText(searchResultCount, resultsReceivedAt, searchErrorText) {
        let statusText = "Search for users";
        if (searchErrorText !== undefined && searchErrorText.length > 0) {
            statusText = `Error occurred at ${resultsReceivedAt.toLocaleString()}`
        } else if (resultsReceivedAt instanceof Date) {
            statusText = `Search returned ${searchResultCount} user${searchResultCount == 1 ? '' : 's'} at ${resultsReceivedAt.toLocaleString()}`
        }
        return statusText;
    }

    createUserDetailsStatusText(selectedUserDetails, uiSelectedUserDetails) {
        if (selectedUserDetails === undefined || selectedUserDetails === null) {
            return ''
        }
        let state = selectedUserDetails.state;
        let stateTime = selectedUserDetails.stateTime;
        let statusText = '';
        switch (state) {
            case requestStates.INITIAL:
                break;
            case requestStates.GETTING:
                statusText = "Retrieving user details...";
                break;
            case requestStates.GET_SUCCESS:
                statusText = `Successfully retrieved user details at ${stateTime.toLocaleString()}`;
                break;
            case requestStates.GET_ERROR:
                statusText = `Error encountered retrieving user details at ${stateTime.toLocaleString()}`;
                break;
            case requestStates.SETTING:
                statusText = "Saving user details...";
                break;
            case requestStates.SET_SUCCESS:
                statusText = `Successfully saved user details at ${stateTime.toLocaleString()}`;
                break;
            case requestStates.SET_ERROR:
                statusText = `Error encountered saving user details at ${stateTime.toLocaleString()}`;
                break;
            default:
                statusText = "Status unknown";
        }
        return statusText;
    }

    handlePageClick = (data) => {
        let selectedPage = data.selected;
        this.props.onSelectPage(selectedPage);
    };

    render () {
        const { resultsReceivedAt, usersInSelectedPage, searchResultCount, pageCount, selectedPage, usersPerPage,
            match, location, searchErrorText, selectedUserDetails, selectedUiUserDetails,
            anySelectedUserDirtyFlagSet, userDirtyFlags } = this.props;

        const searchResultItems = this.createSearchResultListItems(
            selectedPage * usersPerPage, usersInSelectedPage, match, location, userDirtyFlags);
        const searchStatusText = this.createSearchStatusText(searchResultCount, resultsReceivedAt, searchErrorText);
        const errorEnabled = searchErrorText !== undefined && searchErrorText.length > 0;
        
        const selectedUserDetailsStatusText = this.createUserDetailsStatusText(selectedUserDetails, selectedUiUserDetails);
        const saveDisabled = selectedUserDetails ? selectedUserDetails.state == requestStates.SETTING : true;
        const selectedUserErrorText = selectedUiUserDetails ? selectedUiUserDetails.errorText : '';
        const selectedUserComments = selectedUiUserDetails && selectedUiUserDetails.comments ? selectedUiUserDetails.comments : '';

        const dynamicHideErrorClass = !errorEnabled ? styles.hiddenIcon : '';
        const dynamicUserDetailsHideClass = selectedUserDetails ? '' : styles.hidden;

        return (
        <div className={`container-fluid ${styles.users}`}>
            <div className="row">

                {/* Search column */}
                <div className={`col-md-auto ${styles.searchCol}`}>
                    <div className="row no-gutters">
                        {/* Search text */}
                        <div className="col">
                            <form onSubmit={this.handleSubmit}>
                                <input
                                    className={styles.searchArea}
                                    id="searchText"
                                    type="text"
                                    value={this.state.searchText}
                                    onChange={this.handleSearchTextChanged}/>
                            </form>
                        </div>
                        <div className="col" onClick={this.handleSubmit}>
                            <Icon className={`${styles.searchBarIcon} ${buttonStyles.buttonIcon}`} icon={ic_search} size={24}/>
                        </div>
                        <div className="col" onClick={this.toggleHelpPopover}>
                            <Icon id="helpIcon" className={`${styles.searchBarIcon} ${buttonStyles.buttonIcon}`} icon={ic_help_outline} size={24}/>
                            <Popover placement="top-end" isOpen={this.state.helpPopoverOpen} target="helpIcon" toggle={this.soloToggleHelpPopover}>
                                <PopoverHeader>Help: Search Users</PopoverHeader>
                                <PopoverBody>
                                    <div>
                                        Users can be searched by supplying one or more space-separated items:
                                        <ul>
                                            <li>Three or more characters of a hexadecimal User ID</li>
                                            <li>One of the following flags, optionally preceded by '!':
                                                <ul>
                                                    <li>alive</li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <span>In the future, the search will be expanded to include devices, accounts, user data, and more.</span>
                                    </div>
                                </PopoverBody>
                            </Popover>
                        </div>
                    </div>
                    <div className="row">
                        <div className={`col-xs-auto ${styles.searchStatus}`}>
                            {searchStatusText}
                        </div>
                        <div className={`col-xs`}>
                        </div>
                        <div className={`col-xs-auto`}>
                            <div onClick={this.toggleErrorPopover}>
                                <div className={dynamicHideErrorClass}>
                                    <Icon id="userSearchErrorIcon" className={`${buttonStyles.buttonIcon} ${buttonStyles.errorIcon} ${styles.errorIcon}`} icon={alertCircled} size={20}/>
                                </div>
                                <Popover placement="top-end" isOpen={this.state.errorPopoverOpen} target="userSearchErrorIcon" toggle={this.soloToggleErrorPopover}>
                                    <PopoverHeader>Error Details</PopoverHeader>
                                    <PopoverBody>
                                        <div>
                                            <span>{searchErrorText}</span>
                                        </div>
                                    </PopoverBody>
                                </Popover>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <ul className={styles.searchResults}>
                                {searchResultItems}
                            </ul>
                        </div>
                    </div>
                    <div className={`row ${pageCount < 2 ? styles.paginationHidden : ''}`}>
                        <div className="col">
                            <ReactPaginate previousLabel={"previous"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={pageCount}
                                forcePage={selectedPage}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={`${styles.paginationContainer}`}
                                pageClassName={styles.paginationPage}
                                activeClassName={styles.paginationActivePage}
                                disabledClassName={styles.paginationDisabledPage}
                                previousLinkClassName={styles.paginationPrevLink}
                                nextLinkClassName={styles.paginationNextLink} />
                        </div>
                    </div>
                </div>

                {/* User details column */}
                <div className={`col ${styles.userDetailsContainer} ${dynamicUserDetailsHideClass}`}>
                    <EditPanel
                        id="userDetails"
                        title={`User Details${anySelectedUserDirtyFlagSet ? ' *' : ''}`}
                        onRefresh={this.handleRefresh}
                        onCancel={this.handleCancel}
                        onSave={this.handleSave}
                        onCommentsChanged={this.handleCommentsChanged}
                        saveDisabled={saveDisabled}
                        anyDirtyFlagSet={anySelectedUserDirtyFlagSet}
                        statusText={selectedUserDetailsStatusText}
                        errorText={selectedUserErrorText}
                        comments={selectedUserComments}>
                        <div className={`container ${styles.userDetailsEditPanelContent}`}>
                            <div className="row">
                                <div className="col">
                                    <div className="row">
                                        <div className="col">
                                            <UserCard/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <CoinsCard/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <DailyBonusCard/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col"> 
                                    <div className="row">
                                        <div className="col">
                                            <DevicesCard/>
                                        </div>
                                    </div>
                                </div>    
                                <div className="col"/>
                            </div>
                        </div>
                    </EditPanel>
                </div>
            </div>
        </div>
        )
    }
}

export default Users
