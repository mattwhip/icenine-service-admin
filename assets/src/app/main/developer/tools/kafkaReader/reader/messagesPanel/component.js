import React from 'react'
import { Form, Input, Button } from 'reactstrap'
import { Icon } from "react-icons-kit"
import { remove } from 'react-icons-kit/fa/remove'
import { stop2 } from 'react-icons-kit/icomoon/stop2'
import { play3 } from 'react-icons-kit/icomoon/play3'
import ReactTable from "react-table"
import "react-table/react-table.css"

import * as kafkaWebSocketTypes from 'kafkaWebSocket/types'
import * as webSocketStates from 'kafkaWebSocket/states'
import styles from './styles.module.css'
import buttonStyles from 'app/buttons/styles.module.css'


class MessagesPanel extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
        };
        this.createMessagesTableHeader = this.createMessagesTableHeader.bind(this);
        this.createMessagesTableColumns = this.createMessagesTableColumns.bind(this);
        this.selectMessage = this.selectMessage.bind(this);
    }

    createMessagesTableHeader(topic, messages) {
        return (
            <div className={`container`}>
                <div className={`row no-gutters`}>
                    <div className={`col`}>
                        {topic && topic.length > 0 ? topic : 'Select a topic' }
                    </div>
                </div>
                <div className={`row no-gutters`}>
                    <div className="col">
                        {`(${messages.length}) messages`}
                    </div>
                </div>
            </div>
        );
    }

    createMessagesTableColumns(topic, messages) {
        return (
            [
                {
                    Header: "Type",
                    accessor: (i) => kafkaWebSocketTypes.toString(i.msgType),
                    id: "messagesTypeColumn",
                },
                {
                    Header: "Bytes",
                    accessor: "msgByteLength",
                    maxWidth: 100,
                },
                {
                    Header: "Offset",
                    accessor: "offset",
                    maxWidth: 100,
                },
            ]
        );
    }

    selectMessage(offset) {
        this.props.setSelectedOffset(this.props.topic, offset);
    }

    render () {
        const { topic, messages, selectedMessageOffset } = this.props;
        const messageTableData = messages;
        const messagesPanel = this;
        return (
            <div className={`${styles.messagesPanel}`}>
                <div className={`row no-gutters`}>
                    <div className={`col-sm-auto ${styles.messagesTable}`}>
                        <ReactTable
                            data={messageTableData}
                            columns={[
                                {
                                    Header: this.createMessagesTableHeader(topic, messages),
                                    columns: this.createMessagesTableColumns(topic, messages),
                                }
                            ]}
                            defaultPageSize={5}
                            showPageSizeOptions={false}
                            noDataText="No messages"
                            previousText="<"
                            nextText=">"
                            pageText="Page"
                            className="-striped -highlight"
                            getTdProps={(state, rowInfo, column, instance) => {
                                return {
                                    onClick: (e, handleOriginal) => {
                                        if (rowInfo) {
                                            messagesPanel.selectMessage(state.data[rowInfo.index].offset);
                                        }
                                        if (handleOriginal) {
                                            handleOriginal();
                                        }
                                    }
                                };
                            }}
                            getTrProps={(state, rowInfo, column) => {
                                if (rowInfo && rowInfo.row.offset === selectedMessageOffset) {
                                    return {
                                        style: {
                                            background: "#094771",
                                        }
                                    };
                                }
                                return {};
                            }} />
                    </div>
                    <div className="col"/>
                </div>
            </div>
        )
    }
}

export default MessagesPanel
