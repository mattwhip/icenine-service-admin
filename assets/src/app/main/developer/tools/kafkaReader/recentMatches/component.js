import React from 'react'
import { Button, ButtonGroup } from 'reactstrap';
import Collapsible from 'react-collapsible';
import { Icon } from "react-icons-kit";
import { refresh } from 'react-icons-kit/fa/refresh';

import requestStates from 'requestStates'
import styles from './styles.module.css'
import buttonStyles from 'app/buttons/styles.module.css'
import styling from 'styling/styles.module.css'


class RecentMatches extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
        };
        // this.createRecentMatchesStatusBar = this.createRecentMatchesStatusBar.bind(this);
        // this.onRefresh = this.onRefresh.bind(this);
        this.onAddTopics = this.onAddTopics.bind(this);
    }

    // componentDidMount() {
    //     if (this.props.recentMatchesState === requestStates.INITIAL) {
    //         // TODO: take limit from possible ui-based selection?
    //         this.props.getRecentMatches(100);
    //     }
    // }

    // onRefresh() {
    //     this.props.getRecentMatches(100);
    // }

    // createRecentMatchesStatusBar(recentMatches, recentMatchesState, recentMatchesErrorText) {
    //     let statusText = "";
    //     let showRefresh = false;
    //     switch (recentMatchesState) {
    //         case requestStates.GETTING:
    //             statusText = "Retreiving...";
    //             break;
    //         case requestStates.GET_SUCCESS:
    //             statusText = `Up to 100 recent matches (found ${recentMatches.length})`;
    //             showRefresh = true;
    //             break;
    //         case requestStates.GET_ERROR:
    //             statusText = `Error retrieving recent matches: ICON TBD`;
    //             showRefresh = true;
    //             break;
    //         default:
    //             statusText= "";
    //     }
    //     return (
    //         <div className={`container ${styles.recentMatchesStatusBar}`}>
    //             <div className={`row no-gutters`}>
    //                 <div className={`col-sm-auto`}>
    //                     {statusText}
    //                 </div>
    //                 {showRefresh ?
    //                 <div className={`col-sm-auto`} onClick={this.onRefresh} id={`$recentMatchesRefreshIcon`}>
    //                     <Icon className={`${styles.recentMatchesRefreshIcon} ${buttonStyles.buttonIcon}`} icon={refresh} size={20}/>
    //                 </div> : <div/>}
    //                 <div className={`col`}>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    onAddTopics(topics) {
        let topicOffsetMap = {};
        for (let i = 0; i < topics.length; ++i) {
            topicOffsetMap[topics[i]] = -1;
        }
        this.props.addTopics(topicOffsetMap);
    }

    createRecentMatchesViewer() {
        // const recentMatchesComponent = this;
        // const recentMatchesItems = recentMatches.map(function(recentMatch, index) {
        //     const createdDate = new Date(recentMatch.createdAtUnix * 1000);
        //     var recentMatchJSON = JSON.stringify(recentMatch, null, 2);
        //     return (
        //         <li key={index}>
        //             <Collapsible
        //                 trigger={`${index+1}. ${createdDate.toLocaleString()}`}
        //                 transitionTime={100}
        //                 className={styling.collapsibleHeaderClosed}
        //                 openedClassName={styling.collapsibleHeaderOpened}
        //                 triggerClassName={styling.collapsibleTrigger}
        //                 triggerOpenedClassName={styling.collapsibleTrigger}>
        //                 <div className={styling.collapsibleContent}>
        //                     <div className={`row no-gutters`}>
        //                         <div className={`col`}>
        //                             <pre className={`${styling.collapsibleContent} ${styles.recentMatchContent}`}>{recentMatchJSON}</pre>
        //                         </div>
        //                     </div>
        //                     <div className={`row no-gutters`}>
        //                         <div className={`col ${styles.recentMatchButtonsHeader}`}>
        //                             Start read:
        //                         </div>
        //                     </div>
        //                     <div className={`row no-gutters`}>
        //                         <div className={`col-sm-auto ${styles.recentMatchButton}`}>
        //                             <Button color="secondary" size="sm"
        //                                 onClick={e => {
        //                                     let allTopics = [];
        //                                     // Direct topics
        //                                     for (var userID in recentMatch.userDirectTopics) {
        //                                         allTopics.push(recentMatch.userDirectTopics[userID]);
        //                                     }
        //                                     // ServerToSpectators
        //                                     allTopics.push(recentMatch.serverToSpectatorsTopic);
        //                                     // ServerToTable
        //                                     allTopics.push(recentMatch.serverToTableTopic);
        //                                     // UsersToTable
        //                                     allTopics.push(recentMatch.usersToTableTopic);
        //                                     recentMatchesComponent.onAddTopics(allTopics);
        //                                 }}>
        //                                 All
        //                             </Button>
        //                         </div>
        //                         <div className={`col-sm-auto ${styles.recentMatchButton}`}>
        //                             <Button color="secondary" size="sm"
        //                                 onClick={e => {
        //                                     recentMatchesComponent.onAddTopics([recentMatch.serverToSpectatorsTopic]);
        //                                 }}>
        //                                 ServerToSpectators
        //                             </Button>
        //                         </div>
        //                         <div className={`col-sm-auto ${styles.recentMatchButton}`}>
        //                             <Button color="secondary" size="sm"
        //                                 onClick={e => {
        //                                     recentMatchesComponent.onAddTopics([recentMatch.serverToTableTopic]);
        //                                 }}>
        //                                 ServerToTable
        //                             </Button>
        //                         </div>
        //                     </div>
        //                     <div className={`row no-gutters`}>
        //                         <div className={`col-sm-auto ${styles.recentMatchButton}`}>
        //                             <Button color="secondary" size="sm"
        //                                 onClick={e => {
        //                                     recentMatchesComponent.onAddTopics([recentMatch.usersToTableTopic]);
        //                                 }}>
        //                                 UsersToTable
        //                             </Button>
        //                         </div>
        //                         <div className={`col-sm-auto ${styles.recentMatchButton}`}>
        //                             <Button color="secondary" size="sm"
        //                                 onClick={e => {
        //                                     let directTopics = [];
        //                                     for (var userID in recentMatch.userDirectTopics) {
        //                                         directTopics.push(recentMatch.userDirectTopics[userID]);
        //                                     }
        //                                     recentMatchesComponent.onAddTopics(directTopics);
        //                                 }}>
        //                                 Direct to Users
        //                             </Button>
        //                         </div>
        //                     </div>
        //                     <div className={`row no-gutters`}>
                                
        //                     </div>
        //                 </div>
        //             </Collapsible>
        //         </li>
        //     )
        // });
        return (
            <ul className={styles.recentMatches}>
                Topic history has been removed from the system and will be reimplemented later with stack driver logs in cloud only.
                {/* {recentMatchesItems} */}
            </ul>
        )
    }

    render () {
        const { } = this.props;
        return (
            <div className={`container ${styles.recentMatchesContainer}`}>
                <div className="row no-gutters">
                    <div className="col-sm-auto">
                        {/* {this.createRecentMatchesStatusBar(recentMatches, recentMatchesState, recentMatchesErrorText)} */}
                        {this.createRecentMatchesViewer()}
                    </div>
                </div>
            </div>
        )
    }
}

export default RecentMatches
