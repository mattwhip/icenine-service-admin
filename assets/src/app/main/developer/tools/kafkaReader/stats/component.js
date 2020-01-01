import React from 'react'

import styles from './styles.module.css'


class Stats extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
        };
    }

    render () {
        const { totalTopics, totalMessages, totalMessageBytesReceived } = this.props;
        const labelWidth = '200px';
        return (
            <div className={`container ${styles.statsContainer}`}>
                <div className="row no-gutters">
                    <div className={`col-sm-auto`} style={{width: labelWidth}}>
                        Total topics:
                    </div>
                    <div className={`col-sm-auto`}>
                        {totalTopics}
                    </div>
                    <div className={`col`}/>
                </div>
                <div className="row no-gutters">
                    <div className={`col-sm-auto`} style={{width: labelWidth}}>
                        Total messages:
                    </div>
                    <div className={`col-sm-auto`}>
                        {totalMessages}
                    </div>
                    <div className={`col`}/>
                </div>
                <div className="row no-gutters">
                    <div className={`col-sm-auto`} style={{width: labelWidth}}>
                        Total bytes received:
                    </div>
                    <div className={`col-sm-auto`}>
                        {totalMessageBytesReceived}
                    </div>
                    <div className={`col`}/>
                </div>
                <div className="row no-gutters">
                    <div className={`col ${styles.statsDescription}`}>
                        Stats are calculated on current topics and messages. Removed topics and their messages are ignored.
                    </div>
                </div>
            </div>
        )
    }
}

export default Stats
