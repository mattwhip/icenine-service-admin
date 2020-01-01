import React from 'react'
import { Icon } from "react-icons-kit";
import { coins as ic_coins } from 'react-icons-kit/metrize/coins'
import { ic_exposure } from 'react-icons-kit/md/ic_exposure'
import { Input } from 'reactstrap'

import styles from 'app/main/users/cards/coins/styles.module.css'
import styling from 'styling/styles.module.css'
import cardStyles from 'app/main/users/cards/styles.module.css'
import { component as DirtyBox } from 'app/dirtyBox'


class CoinsCard extends React.Component {

    constructor (props) {
        super(props);

        this.handleCoinDeltaChanged = this.handleCoinDeltaChanged.bind(this);
    }

    handleCoinDeltaChanged(event) {
        this.props.setUiUserDetails(this.props.userID, {
            coinDelta: event.target.value,
        });
    }

    render () {
        const { userDetails, uiUserDetails, disabled } = this.props;
        let hWidth = "45px";
        let coins = userDetails ? (userDetails.coins !== undefined ? userDetails.coins : '0') : '';
        let displayCoinDelta = disabled ? '' : (uiUserDetails && uiUserDetails.coinDelta !== undefined ? uiUserDetails.coinDelta : '0');
        let displayCoinDeltaDirtyFlag = disabled ? false : (uiUserDetails && uiUserDetails.coinDelta !== undefined && new String(uiUserDetails.coinDelta).valueOf() !== new String('0').valueOf() ? true : false);
        return (
            <div className={cardStyles.card}>
                <div className="container">
                    <div className="row no-gutters">
                        <div className="col-sm-auto col-xs">
                            <div className={cardStyles.cardIcon}>
                                <Icon icon={ic_coins} size={28}/>
                            </div>
                        </div>
                        <div className="col-sm col-xs">
                            <div className={cardStyles.cardTitle}>Coins</div>
                        </div>
                    </div>
                    <div className={cardStyles.cardSpacer}/>
                    <div className="row">
                        <div className="col">
                            <div className={cardStyles.cardBody}>
                                <div className={`container ${cardStyles.cardBodyContainer}`}>
                                    <div className={`row no-gutters  ${styling.floatCenterRow}`}>
                                        <div className={`col-xs-auto ${cardStyles.cardBodyHeader}`} style={{width: hWidth}}>
                                            Coins:
                                        </div>
                                        <div className={`col-xs-auto`}>
                                            {disabled ? '' : coins}
                                        </div>
                                        <div className="col-sm">
                                        </div>
                                        <div className={`col-xs-auto`}>
                                            <Icon className={styles.plusIcon} icon={ic_exposure} size={22}/>
                                        </div>
                                        <div className={`col-xs-auto`}>
                                            <DirtyBox isDirty={displayCoinDeltaDirtyFlag} style={{paddingBottom: "5px"}}>
                                                <Input
                                                    type        = "number"
                                                    bsSize      = "sm"
                                                    name        = "coinDelta"
                                                    id          = "coinDelta"
                                                    className   = {styles.configTextField}
                                                    value       = {displayCoinDelta}
                                                    onChange    = {this.handleCoinDeltaChanged} />
                                            </DirtyBox>
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

export default CoinsCard
