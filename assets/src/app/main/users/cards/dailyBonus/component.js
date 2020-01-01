import React from 'react'
import { Icon } from "react-icons-kit"
import { ic_wb_sunny } from 'react-icons-kit/md/ic_wb_sunny'
import { Button, Input } from 'reactstrap'

import styles from 'app/main/users/cards/dailyBonus/styles.module.css'
import styling from 'styling/styles.module.css'
import cardStyles from 'app/main/users/cards/styles.module.css'
import { updateObject } from 'state'
import { __esModule } from 'react-icons-kit/md/ic_search'
import { component as DirtyBox } from 'app/dirtyBox'


class DailyBonusCard extends React.Component {

    constructor (props) {
        super(props);

        this.msToTime = this.msToTime.bind(this);
        this.sToTime = this.sToTime.bind(this);
        this.handleDailyBonusStreakChanged = this.handleDailyBonusStreakChanged.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    msToTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
      
        return hrs + ':' + mins + ':' + secs + '.' + ms;
    }
    
    sToTime(s) {
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
      
        return hrs + ':' + mins + ':' + secs;
    }

    handleDailyBonusStreakChanged(event) {
        let newDirty = this.props.userDetails.dailyBonusStatus.streak !== event.target.value;
        this.props.setUiUserDetails(this.props.userID, {
            dailyBonusStreakDirtyFlag: newDirty,
            dailyBonusStatus: updateObject(this.props.uiUserDetails.dailyBonusStatus, {
                streak: event.target.value,
            }),
        });
    }

    handleReset(event) {
        this.props.setUiUserDetails(this.props.userID, {
            dailyBonusResetPending: true,
        });
    }

    render () {
        const { userDetails, uiUserDetails, disabled } = this.props;
        let dailyBonusStatus = userDetails ? userDetails.dailyBonusStatus : null;
        let displayDailyBonusStreak = !disabled ? (dailyBonusStatus ? dailyBonusStatus.streak : '') : '';
        if (uiUserDetails && uiUserDetails.dailyBonusStreakDirtyFlag) {
            displayDailyBonusStreak = uiUserDetails.dailyBonusStatus.streak;
        }
        let streakDirtyFlag = dailyBonusStatus && displayDailyBonusStreak != dailyBonusStatus.streak;
        let displayIsAvailable = !disabled ? (dailyBonusStatus ? dailyBonusStatus.isAvailable : false) : false;
        let displaySecondsUntilAvailable = !disabled ? (dailyBonusStatus ? dailyBonusStatus.secondsUntilAvailable : 0) : 0;
        if (uiUserDetails && uiUserDetails.dailyBonusResetPending) {
            displayIsAvailable = true;
            displaySecondsUntilAvailable = 0;
        }
        const hWidth = "70px";
        const dynamicHiddenResetClass = disabled ? styles.hidden : '';
        const dynamicDisabledResetClass = disabled || displayIsAvailable || (uiUserDetails && uiUserDetails.dailyBonusResetPending) ? true : false;
        const dailyBonusResetPending = uiUserDetails && uiUserDetails.dailyBonusResetPending;
        return (
        <div className={cardStyles.card}>
            <div className="container">
                <div className="row no-gutters">
                    <div className="col-sm-auto col-xs">
                        <div className={cardStyles.cardIcon}>
                            <Icon icon={ic_wb_sunny} size={28}/>
                        </div>
                    </div>
                    <div className="col-sm col-xs">
                        <div className={cardStyles.cardTitle}>Daily Bonus</div>
                    </div>
                    <div className="col-sm-auto col-xs">
                        <div disabled={disabled} className={cardStyles.cardSettings}>
                            {/* <Icon icon={ic_settings} size={24}/> */}
                        </div>
                    </div>
                </div>
                <div className={cardStyles.cardSpacer}/>
                <div className="row">
                    <div className="col">
                        <div className={cardStyles.cardBody}>
                            <div className={`container ${cardStyles.cardBodyContainer}`}>
                                <div className={`row no-gutters  ${styles.dailyBonusRow} ${styling.floatCenterRow}`}>
                                    <div className={`col-xs-auto ${cardStyles.cardBodyHeader} ${styles.dailyBonus}`} style={{width: hWidth}}>
                                        Streak:
                                    </div>
                                    <div className={`col-xs-auto`}>
                                        {disabled ? '' :
                                            <DirtyBox isDirty={streakDirtyFlag} style={{paddingBottom: "5px"}}>
                                                <Input
                                                    type        = "number"
                                                    min         = "0"
                                                    max         = "5"
                                                    bsSize      = "sm"
                                                    name        = "dailyBonusStreak"
                                                    id          = "dailyBonusStreak"
                                                    className   = {styles.configTextField}
                                                    value       = {displayDailyBonusStreak}
                                                    onChange    = {this.handleDailyBonusStreakChanged} />
                                            </DirtyBox>}
                                    </div>
                                    <div className="col-sm">
                                    </div>
                                </div>
                                <div className={`row no-gutters  ${styles.dailyBonusRow} ${styling.floatCenterRow}`}>
                                    <div className={`col-xs-auto ${cardStyles.cardBodyHeader} ${styles.dailyBonus}`} style={{width: hWidth}}>
                                        Available:
                                    </div>
                                    <div className={`col-xs-auto ${styles.dailyBonus}`}>
                                        {disabled ? '' : (
                                            <DirtyBox isDirty={dailyBonusResetPending} style={{paddingBottom: "5px"}}>
                                                {displayIsAvailable ? 'Now' : this.sToTime(displaySecondsUntilAvailable)}
                                            </DirtyBox>)}
                                    </div>
                                    <div className="col-sm">
                                    </div>
                                    <div className={`col-xs-auto ${dynamicHiddenResetClass}`}>
                                        <Button size="sm" color="secondary" disabled={dynamicDisabledResetClass} onClick={this.handleReset}>
                                            Reset
                                        </Button>
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

export default DailyBonusCard
