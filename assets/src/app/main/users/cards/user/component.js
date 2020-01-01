import React from 'react'
import { Icon } from "react-icons-kit"
import { userCircleO } from 'react-icons-kit/fa/userCircleO'
import ToggleButton from 'react-toggle-button'
import { component as DirtyBox } from 'app/dirtyBox'

import formatting from 'formatting'
import cardStyles from 'app/main/users/cards/styles.module.css'
import styles from 'app/main/users/cards/user/styles.module.css'
import styling from 'styling/styles.module.css'


const borderRadiusStyle = { borderRadius: 2 }

class UserCard extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
        };

        this.toggleAlive = this.toggleAlive.bind(this);
        this.getDisplayAlive = this.getDisplayAlive.bind(this);
    }

    toggleAlive() {
        let newAlive = !this.getDisplayAlive();
        let newDirty = this.props.userDetails.alive !== newAlive;
        this.props.uiSetUserDetails(this.props.userID, {
            alive: newAlive,
            aliveDirtyFlag: newDirty,
        })
    }

    getDisplayAlive() {
        let displayAlive = false;
        if (this.props.uiUserDetails) {
            displayAlive = this.props.uiUserDetails.aliveDirtyFlag ? this.props.uiUserDetails.alive : this.props.userDetails.alive;
        } else {
            displayAlive = this.props.userDetails ? this.props.userDetails.alive : false;
        }
        return displayAlive;
    }

    render () {
        const { userID, userDetails, uiUserDetails, disabled } = this.props;
        let displayUserID = '';
        let createdDate = '';
        let displayAlive = this.getDisplayAlive();
        if (!disabled && userDetails) {
            displayUserID = formatting.dashedString(userID);
            createdDate = new Date(userDetails.createdAt * 1000);
        }
        let aliveDirtyFlag = userDetails && displayAlive != userDetails.alive;
        let hWidth = "60px";
        return (
            <div className={cardStyles.card}>
                <div className="container">
                    <div className="row no-gutters">
                        <div className="col-sm-auto col-xs">
                            <div className={cardStyles.cardIcon}>
                                <Icon icon={userCircleO} size={28}/>
                            </div>
                        </div>
                        <div className="col-sm col-xs">
                            <div className={cardStyles.cardTitle}>User</div>
                        </div>
                    </div>
                    <div className={cardStyles.cardSpacer}/>
                    <div className="row">
                        <div className="col">
                            <div className={cardStyles.cardBody}>
                                <div className={`container ${cardStyles.cardBodyContainer}`}>
                                    <div className="row no-gutters">
                                        <div className={`col-xs-auto ${cardStyles.cardBodyHeader}`} style={{width: hWidth}}>
                                            ID:
                                        </div>
                                        <div className="col">
                                            {disabled ? '' : displayUserID}
                                        </div>
                                    </div>
                                    <div className="row no-gutters">
                                        <div className={`col-xs-auto ${cardStyles.cardBodyHeader}`} style={{width: hWidth}}>
                                            Created:
                                        </div>
                                        <div className="col">
                                            {disabled ? '' : createdDate.toLocaleString()}
                                        </div>
                                    </div>
                                    <div className={`row no-gutters ${styling.floatCenterRow}`}>
                                        <div className={`col-xs-auto ${cardStyles.cardBodyHeader}`} style={{width: hWidth}}>
                                            Alive:
                                        </div>
                                        <div className="col">
                                            {disabled ? <div/> :
                                                <DirtyBox isDirty={aliveDirtyFlag} style={{paddingBottom: "5px"}}>
                                                    <ToggleButton
                                                        inactiveLabel={"no"}
                                                        activeLabel={"yes"}
                                                        value={displayAlive}
                                                        thumbStyle={borderRadiusStyle}
                                                        trackStyle={borderRadiusStyle}
                                                        onToggle={this.toggleAlive} />
                                                </DirtyBox>}
                                        </div>
                                        <div className="col"/>
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

export default UserCard
