import React from 'react'
import { Icon } from "react-icons-kit"
import { book_2 } from 'react-icons-kit/ikons/book_2'
import { ic_menu } from 'react-icons-kit/md/ic_menu'
import "react-table/react-table.css"

import styles from './styles.module.css'
import buttonStyles from 'app/buttons/styles.module.css'
import { container as TopicsPanel } from 'app/main/developer/tools/kafkaReader/reader/topicsPanel'
import { container as MessagesPanel } from 'app/main/developer/tools/kafkaReader/reader/messagesPanel'
import { container as MessageContentPanel } from 'app/main/developer/tools/kafkaReader/reader/messageContentPanel'


class Reader extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
        };
    }

    render () {
        const { onOpenSidebar } = this.props;
        return (
            <div className={`container-fluid ${styles.readerContainer}`}>
                <div className={`row no-gutters ${styles.readerHeader}`}>
                    <div className={`col-sm-auto`}>
                        <Icon className={`${styles.kafkaReaderIcon}`} icon={book_2} size={24}/>
                    </div>
                    <div className={`col-sm-auto`}>
                        Kafka Reader
                    </div>
                    <div className="col"></div>
                    <div className={`col-sm-auto ${buttonStyles.buttonIcon} ${styles.menuIcon}`}
                        onClick={() => {onOpenSidebar()}}>
                        <Icon icon={ic_menu} size={24}/>
                    </div>
                </div>
                <div className={styles.readerContents}>
                    <div className={`row no-gutters`}>
                        <div className={`col-sm-auto`}>
                            <div className={`row no-gutters`}>
                                <div className={`col-sm-auto`}>
                                    <TopicsPanel/>
                                </div>
                            </div>
                            <div className={`row no-gutters`}>
                                <div className={`col-sm-auto`}>
                                    <MessagesPanel/>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <MessageContentPanel/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reader
