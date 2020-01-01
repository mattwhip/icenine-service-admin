import React from 'react'
import { Icon } from "react-icons-kit"
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap'
import { alertCircled } from 'react-icons-kit/ionicons/alertCircled'
import { book } from 'react-icons-kit/icomoon/book'
import { refresh } from 'react-icons-kit/fa/refresh';

import cardStyles from 'app/main/dashboard/cards/styles.module.css'
import buttonStyles from 'app/buttons/styles.module.css'
import styles from 'app/main/dashboard/cards/summary/styles.module.css'

class SummaryCard extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            errorPopoverOpen: false,
        }

        this.handleRefresh = this.handleRefresh.bind(this);
        this.toggleErrorPopover = this.toggleErrorPopover.bind(this);
        this.soloToggleErrorPopover = this.soloToggleErrorPopover.bind(this);
    }

    componentDidMount() {
        if (!this.props.hasUpdated) {
            this.props.onUpdateSummary(false)
        }
    }

    handleRefresh(event) {
        event.preventDefault();
        this.props.onUpdateSummary(true)
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

    render () {
        const { aliveUsers, totalUsers, totalDevices, totalAccounts, lastUpdatedUnixTime, disabled, isUpdating, hasUpdated, errorText } = this.props;
        let lastUpdatedDate = new Date(lastUpdatedUnixTime * 1000);
        const hWidth = "110px";
        let errorEnabled = errorText !== undefined && errorText.length > 0;
        const dynamicHideErrorClass = !errorEnabled ? styles.hiddenIcon : '';
        // TODO: render div over text area with progress bar if isUpdating
        return (
            <div className={cardStyles.card}>
                <div className="container">
                    <div className="row no-gutters">
                        <div className="col-sm-auto col-xs">
                            <div className={cardStyles.cardIcon}>
                                <Icon icon={book} size={32}/>
                            </div>
                        </div>
                        <div className="col-sm-auto col-xs">
                            <div className={cardStyles.cardTitle}>Summary</div>
                        </div>
                        <div className={`col-sm-auto`} onClick={this.handleRefresh} id="summaryRefreshIcon">
                            <Icon className={`${buttonStyles.buttonIcon} ${styles.refreshIcon}`} icon={refresh} size={20}/>
                        </div>
                        <div className="col-sm">
                        </div>
                        <div className="col-sm-auto">
                            <div onClick={this.toggleErrorPopover}>
                                <div className={dynamicHideErrorClass}>
                                    <Icon id="summaryErrorIcon" className={`${buttonStyles.buttonIcon} ${buttonStyles.errorIcon} ${styles.errorIcon}`} icon={alertCircled} size={30}/>
                                </div>
                                <Popover placement="bottom-start" isOpen={this.state.errorPopoverOpen} target="summaryErrorIcon" toggle={this.soloToggleErrorPopover}>
                                    <PopoverHeader>Error Details</PopoverHeader>
                                    <PopoverBody>
                                        <div>
                                            <span>{errorText}</span>
                                        </div>
                                    </PopoverBody>
                                </Popover>
                            </div>
                        </div>
                    </div>
                    <div className={cardStyles.cardSpacer}/>
                    <div className="row">
                        <div className="col">
                            <div className={cardStyles.cardBody}>
                                <div className={`container ${cardStyles.cardBodyContainer}`}>
                                    <div className="row no-gutters">
                                        <div className={`col-xs-auto ${cardStyles.cardBodyHeader}`} style={{width: hWidth}}>
                                            Total Users:
                                        </div>
                                        <div className="col">
                                            {disabled || !hasUpdated ? '' : totalUsers}
                                        </div>
                                    </div>
                                    <div className="row no-gutters">
                                        <div className={`col-xs-auto ${cardStyles.cardBodyHeader}`} style={{width: hWidth}}>
                                            Alive Users:
                                        </div>
                                        <div className="col">
                                            {disabled || !hasUpdated ? '' : aliveUsers}
                                        </div>
                                    </div>
                                    <div className="row no-gutters">
                                        <div className={`col-xs-auto ${cardStyles.cardBodyHeader}`} style={{width: hWidth}}>
                                            Total Devices:
                                        </div>
                                        <div className="col">
                                            {disabled || !hasUpdated ? '' : totalDevices}
                                        </div>
                                    </div>
                                    <div className="row no-gutters">
                                        <div className={`col-xs-auto ${cardStyles.cardBodyHeader}`} style={{width: hWidth}}>
                                            Total Accounts:
                                        </div>
                                        <div className="col">
                                            {disabled || !hasUpdated ? '' : totalAccounts}
                                        </div>
                                    </div>
                                    <div className="row no-gutters">
                                        <div className={`col-xs-auto ${cardStyles.cardBodyHeader}`} style={{width: hWidth}}>
                                            Last Updated:
                                        </div>
                                        <div className="col">
                                            {disabled || !hasUpdated ? '' : lastUpdatedDate.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SummaryCard
