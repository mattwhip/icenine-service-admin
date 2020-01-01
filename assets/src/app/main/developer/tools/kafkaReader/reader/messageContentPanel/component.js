import React from 'react'

import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';

import * as kafkaWebSocketTypes from 'kafkaWebSocket/types'
import styles from './styles.module.css'


class MessageContentPanel extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
        };
    }

    render () {
        const { topic, message } = this.props;
        const labelWidth = '90px';
        let messageDate = null;
        if (message) {
            try {
                messageDate = new Date(message.unixTimestamp);
            } catch(e) {
                console.log(`WARN: failed to parse date: ${e}`);
            }
        }
        return (
            <div className={`container-fluid`}>
                <div className={`${styles.messageContentPanel}`}>
                    <div className={`row no-gutters`}>
                        <div className={`col-sm-auto ${styles.messageLabel}`} style={{width: labelWidth}}>
                            Topic:
                        </div>
                        <div className={`col ${styles.messageLabel}`}>
                            {topic && message ? ` ${topic}` : ''}
                        </div>
                    </div>
                    <div className={`row no-gutters`}>
                        <div className={`col-sm-auto ${styles.messageLabel}`} style={{width: labelWidth}}>
                            Timestamp:
                        </div>
                        <div className={`col ${styles.messageLabel}`}>
                           {message && messageDate ? ` ${messageDate.toLocaleString()}` : ''}
                        </div>
                    </div>
                    <div className={`row no-gutters`}>
                        <div className={`col-sm-auto ${styles.messageLabel}`} style={{width: labelWidth}}>
                            Offset:
                        </div>
                        <div className={`col ${styles.messageLabel}`}>
                           {message ? ` ${message.offset}` : ''}
                        </div>
                    </div>
                    <div className={`row no-gutters`}>
                        <div className={`col-sm-auto ${styles.messageLabel}`} style={{width: labelWidth}}>
                            Type:
                        </div>
                        <div className={`col ${styles.messageLabel}`}>
                            {message ? ` ${kafkaWebSocketTypes.toString(message.msgType)}` : ''}
                        </div>
                    </div>
                    <div className={`row no-gutters`}>
                        <div className={`col-sm-auto ${styles.messageLabel}`} style={{width: labelWidth}}>
                            Sender:
                        </div>
                        <div className={`col ${styles.messageLabel}`}>
                            {message ? ` ${message.sender}` : ''}
                        </div>
                    </div>
                    <div className={`row no-gutters`}>
                        <div className={`col`}>
                            <div className={styles.jsonContainer}>
                                <JSONInput
                                    id          = 'messageContentJSON'
                                    placeholder = {message ? message.msg : null}
                                    locale      = {locale}
                                    height      = '100%'
                                    width       = '100%'
                                    viewOnly    = {true}
                                    confirmGood = {false} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MessageContentPanel
