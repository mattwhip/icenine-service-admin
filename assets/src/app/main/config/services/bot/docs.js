import React from 'react'
import { Input} from 'reactstrap';
import { Icon } from "react-icons-kit";
import { ic_content_copy } from 'react-icons-kit/md/ic_content_copy'
import Collapsible from 'react-collapsible';

import buttonStyles from 'app/buttons/styles.module.css'
import styles from 'app/main/config/services/bot/styles.module.css'
import styling from 'styling/styles.module.css'

const templateMap = {
    'ExitAfterRounds': {
        type: 'ExitAfterRounds',
        config: {
            maxRounds: '5',
            minRounds: '1',
        }
    },
    'ExitAfterDuration': {
        type: 'ExitAfterDuration',
        config: {
            maxSeconds: '300',
            minSeconds: '30',
        }
    },
    'RandomActionOnTurn': {
        type: 'RandomActionOnTurn',
        config: {
            doubleWeight: '1',
            equalWeight: '1',
            maxDelayMs: '5000',
            minDelayMs: '1000',
            packWeight: '1',
        }
    },
    'RandomSeeCards': {
        type: 'RandomSeeCards',
        config: {
            blindAfterDealWeight: '1',
            seeAfterDealWeight: '1',
            blindAfterPlayerActionWeight: '5',
            seeAfterPlayerActionWeight: '1',
            minSeeRequestDelayMs: '500',
            maxSeeRequestDelayMs: '4000',
        }
    },
    'RandomSideShow': {
        type: 'RandomSideShow',
        config: {
            initiateSideShowWeight: '1',
            stayIdleWeight: '10',
            acceptSideShowRequestWeight: '2',
            rejectSideShowRequestWeight: '1',
            minResponseDelayMs: '500',
            maxResponseDelayMs: '4000',
            minActionDelayMs: '1000',
            maxActionDelayMs: '5000',
        }
    },
    'Reaper': {
        type: 'Reaper',
        config: {
            exitWhenLastUser: 'true',
            enableWatchdogTimer: 'true',
            watchdogTimerMs: '30000',
        }
    },
};

function getComponentTemplate(component) {
    let template = templateMap[component];
    return template ? JSON.stringify(template) : '';
}

function copyToClipboard(text) {
    let container = document.getElementById("botConfigCopy");
    container.value = text;
    container.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
}

function createComponentDocumentation() {
    return (
        <div>
            <Collapsible trigger="ExitAfterDuration"
                transitionTime={100}
                className={styling.collapsibleHeaderClosed}
                openedClassName={styling.collapsibleHeaderOpened}
                triggerClassName={styling.collapsibleTrigger}
                triggerOpenedClassName={styling.collapsibleTrigger}>
                <div className={styling.collapsibleContent}>
                <p>An ExitAfterDuration component will cause the bot to exit the table after a duration.</p>
                    Config:
                    <ul>
                        <li><strong>minSeconds</strong>: int32 minimum seconds to wait before exiting the table</li>
                        <li><strong>maxSeconds</strong>: int32 maximum seconds to wait before exiting the table</li>
                    </ul>
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col-sm-auto">
                                Copy template to clipboard:
                            </div>
                            <div className="col-sm-auto">
                                <div onClick={() => {copyToClipboard(getComponentTemplate("ExitAfterDuration"))}}>
                                    <Icon className={`${buttonStyles.buttonIcon} ${styles.componentCopyIcon}`} icon={ic_content_copy} size={24}/>
                                </div>
                            </div>
                            <div className="col"/>
                        </div>
                    </div>
                </div>
            </Collapsible>
            <div className={styling.collapsibleSpacer}/>
            <Collapsible trigger="ExitAfterRounds"
                transitionTime={100}
                className={styling.collapsibleHeaderClosed}
                openedClassName={styling.collapsibleHeaderOpened}
                triggerClassName={styling.collapsibleTrigger}
                triggerOpenedClassName={styling.collapsibleTrigger}>
                <div className={styling.collapsibleContent}>
                    <p>An ExitAfterRounds component will cause the bot to exit the table after a number of rounds.</p>
                    Config:
                    <ul>
                        <li><strong>minRounds</strong>: int32 minimum rounds to wait before exiting the table</li>
                        <li><strong>maxRounds</strong>: int32 maximum rounds to wait before exiting the table</li>
                    </ul>
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col-sm-auto">
                                Copy template to clipboard:
                            </div>
                            <div className="col-sm-auto">
                                <div onClick={() => {copyToClipboard(getComponentTemplate("ExitAfterRounds"))}}>
                                    <Icon className={`${buttonStyles.buttonIcon} ${styles.componentCopyIcon}`} icon={ic_content_copy} size={24}/>
                                </div>
                            </div>
                            <div className="col"/>
                        </div>
                    </div>
                </div>
            </Collapsible>
            <div className={styling.collapsibleSpacer}/>
            <Collapsible trigger="RandomActionOnTurn"
                transitionTime={100}
                className={styling.collapsibleHeaderClosed}
                openedClassName={styling.collapsibleHeaderOpened}
                triggerClassName={styling.collapsibleTrigger}
                triggerOpenedClassName={styling.collapsibleTrigger}>
                <div className={styling.collapsibleContent}>
                    <p>A RandomActionOnTurn component will cause the bot to take a random action each turn after a random delay. To deactivate an action, use a negative or zero weight.</p>
                    Config:
                    <ul>
                        <li><strong>minDelayMs</strong>: int64 minimum milliseconds to wait before taking action after turn begins</li>
                        <li><strong>maxDelayMs</strong>: int64 maximum milliseconds to wait before taking action after turn begins</li>
                        <li><strong>packWeight</strong>: int64 weight for random pack action</li>
                        <li><strong>equalWeight</strong>: int64 weight for random equal action</li>
                        <li><strong>doubleWeight</strong>: int64 weight for random double action</li>
                    </ul>
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col-sm-auto">
                                Copy template to clipboard:
                            </div>
                            <div className="col-sm-auto">
                                <div onClick={() => {copyToClipboard(getComponentTemplate("RandomActionOnTurn"))}}>
                                    <Icon className={`${buttonStyles.buttonIcon} ${styles.componentCopyIcon}`} icon={ic_content_copy} size={24}/>
                                </div>
                            </div>
                            <div className="col"/>
                        </div>
                    </div>
                </div>
            </Collapsible>
            <div className={styling.collapsibleSpacer}/>
            <Collapsible trigger="RandomSeeCards"
                transitionTime={100}
                className={styling.collapsibleHeaderClosed}
                openedClassName={styling.collapsibleHeaderOpened}
                triggerClassName={styling.collapsibleTrigger}
                triggerOpenedClassName={styling.collapsibleTrigger}>
                <div className={styling.collapsibleContent}>
                    <p>A RandomSeeCards component will cause the bot to see its cards after a set of configurable random conditions are met.</p>
                    Config:
                    <ul>
                        <li><strong>blindAfterDealWeight</strong>: int64 sample weight to not activate SeeCards after deal (round start)</li>
                        <li><strong>seeAfterDealWeight</strong>: int64 sample weight to activate SeeCards after deal</li>
                        <li><strong>blindAfterPlayerActionWeight</strong>: int64 sample weight to not activate SeeCards after each player action</li>
                        <li><strong>seeAfterPlayerActionWeight</strong>: int64 sample weight to activate SeeCards after each player action</li>
                        <li><strong>minSeeRequestDelayMs</strong>: int64 minimum random time to delay before SeeCards after decision to see is made</li>
                        <li><strong>maxSeeRequestDelayMs</strong>: int64 maximum random time to delay before SeeCards after decision to see is made</li>
                    </ul>
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col-sm-auto">
                                Copy template to clipboard:
                            </div>
                            <div className="col-sm-auto">
                                <div onClick={() => {copyToClipboard(getComponentTemplate("RandomSeeCards"))}}>
                                    <Icon className={`${buttonStyles.buttonIcon} ${styles.componentCopyIcon}`} icon={ic_content_copy} size={24}/>
                                </div>
                            </div>
                            <div className="col"/>
                        </div>
                    </div>
                </div>
            </Collapsible>
            <div className={styling.collapsibleSpacer}/>
            <Collapsible trigger="RandomSideShow"
                transitionTime={100}
                className={styling.collapsibleHeaderClosed}
                openedClassName={styling.collapsibleHeaderOpened}
                triggerClassName={styling.collapsibleTrigger}
                triggerOpenedClassName={styling.collapsibleTrigger}>
                <div className={styling.collapsibleContent}>
                    <p>A RandomSideShow component will cause the bot to randomly initiate and respond to side shows.</p>
                    Config:
                    <ul>
                        <li><strong>initiateSideShowWeight</strong>: int64 sample weight to initiate a side show on user turn</li>
                        <li><strong>stayIdleWeight</strong>: int64 sample weight to stay idle on user turn</li>
                        <li><strong>acceptSideShowRequestWeight</strong>: int64 sample weight to accept a side show when a request is received</li>
                        <li><strong>rejectSideShowRequestWeight</strong>: int64 sample weight to decline a side show when a request is recevied</li>
                        <li><strong>minResponseDelayMs</strong>: int64 minimum random milliseconds to wait before sending a response</li>
                        <li><strong>maxResponseDelayMs</strong>: int64 maximum random milliseconds to wait before sending a response</li>
                        <li><strong>minActionDelayMs</strong>: int64 minimum random milliseconds to wait before initiating a side show on user turn</li>
                        <li><strong>maxActionDelayMs</strong>: int64 maximum random milliseconds to wait before initiating a side show on user turn</li>
                    </ul>
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col-sm-auto">
                                Copy template to clipboard:
                            </div>
                            <div className="col-sm-auto">
                                <div onClick={() => {copyToClipboard(getComponentTemplate("RandomSideShow"))}}>
                                    <Icon className={`${buttonStyles.buttonIcon} ${styles.componentCopyIcon}`} icon={ic_content_copy} size={24}/>
                                </div>
                            </div>
                            <div className="col"/>
                        </div>
                    </div>
                </div>
            </Collapsible>
            <div className={styling.collapsibleSpacer}/>
            <Collapsible trigger="Reaper"
                transitionTime={100}
                className={styling.collapsibleHeaderClosed}
                openedClassName={styling.collapsibleHeaderOpened}
                triggerClassName={styling.collapsibleTrigger}
                triggerOpenedClassName={styling.collapsibleTrigger}>
                <div className={styling.collapsibleContent}>
                    <p>A Reaper component is responsible for cleaning up the bot under configurable conditions.</p>
                    Config:
                    <ul>
                        <li><strong>exitWhenLastUser</strong>: boolean enable to immediately exit when the bot is the last user at the table</li>
                        <li><strong>enableWatchdogTimer</strong>: boolean enable to clean up the bot when no game events are received by the controller for a duration</li>
                        <li><strong>watchdogTimerMs</strong>: int64 milliseconds for watchdog timer if enabled</li>
                    </ul>
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col-sm-auto">
                                Copy template to clipboard:
                            </div>
                            <div className="col-sm-auto">
                                <div onClick={() => {copyToClipboard(getComponentTemplate("Reaper"))}}>
                                    <Icon className={`${buttonStyles.buttonIcon} ${styles.componentCopyIcon}`} icon={ic_content_copy} size={24}/>
                                </div>
                            </div>
                            <div className="col"/>
                        </div>
                    </div>
                </div>
            </Collapsible>
            <Input type="textarea" id="botConfigCopy" className={styles.copy}/>
        </div>
    )
}

export default { createComponentDocumentation }
