import React from 'react'
import { Form, Input, Button } from 'reactstrap'
import { Icon } from "react-icons-kit"
import { remove } from 'react-icons-kit/fa/remove'
import { stop2 } from 'react-icons-kit/icomoon/stop2'
import { play3 } from 'react-icons-kit/icomoon/play3'
import { circle } from 'react-icons-kit/fa/circle'
import ReactTable from "react-table"
import "react-table/react-table.css"

import * as webSocketStates from 'kafkaWebSocket/states'
import styles from './styles.module.css'
import buttonStyles from 'app/buttons/styles.module.css'


var noOffsetRegex = new RegExp(/[a-zA-Z0-9\.]+$/);
var withOffsetRegex = new RegExp(/[a-zA-Z0-9\.]+\[-?[0-9]+\]$/);

class TopicsPanel extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            addCustomTopicText: '',
        };
        this.createTopicsTableHeader = this.createTopicsTableHeader.bind(this);
        this.createTopicsTableColumns = this.createTopicsTableColumns.bind(this);
        this.removeTopics = this.removeTopics.bind(this);
        this.connectOrResume = this.connectOrResume.bind(this);
        this.closeWebSocket = this.closeWebSocket.bind(this);
        this.addCustomTopic = this.addCustomTopic.bind(this);
        this.selectTopic = this.selectTopic.bind(this);
    }

    createTopicsTableHeader(sortedTopics, webSocketState, webSocketError) {
        const reader = this;
        let statusText = '';
        let playEnabled = false;
        let stopEnabled = false;
        let statusIconClass = styles.statusIconIdle;
        switch (webSocketState) {
        case webSocketStates.INITIAL:
            statusText = 'Idle';
            playEnabled = true;
            break;
        case webSocketStates.CONNECTING:
            statusText = 'Connecting...';
            statusIconClass = styles.statusIconConnecting;
            break;
        case webSocketStates.OPEN:
            statusText = `Reading from (${sortedTopics.length}) topics`;
            stopEnabled = true;
            statusIconClass = styles.statusIconOpen;
            break;
        case webSocketStates.CLOSING:
            statusText = 'Closing...';
            statusIconClass = styles.statusIconClosing;
            break;
        case webSocketStates.CLOSED:
            statusText = 'Idle';
            playEnabled = true;
            break;
        case webSocketStates.ERROR:
            statusText = `Error: ${webSocketError}`;
            playEnabled = true;
            statusIconClass = styles.statusIconError;
            break;
        }
        return (
            <div className={`container`}>
                <div className={`row no-gutters`}>
                    <div className={`col`}>
                        <Icon
                            className={`${styles.kafkaReaderIcon} ${statusIconClass}`}
                            icon={circle}
                            size={10}/>
                        {statusText}
                    </div>
                </div>
                <div className={`row no-gutters`}>
                    <div className="col"/>
                    <div className={`col-sm-auto`}
                        onClick={playEnabled ? () => {reader.connectOrResume()} : null}>
                        <Icon className={`${styles.kafkaReaderIcon} ${playEnabled ? buttonStyles.playIcon : styles.disabledIcon}`}
                            icon={play3} size={16}/>
                    </div>
                    <div className={`col-sm-auto`}
                        onClick={stopEnabled ? () => {reader.closeWebSocket()} : null}>
                        <Icon className={`${styles.kafkaReaderIcon} ${stopEnabled ? buttonStyles.stopIcon : styles.disabledIcon}`}
                            icon={stop2} size={16}/>
                    </div>
                    <div className="col"/>
                </div>
            </div>
        )
    }

    createTopicsTableColumns(sortedTopics) {
        const reader = this;
        let allTopicsForRemoval = [];
        for (let i = 0; i < sortedTopics.length; ++i) {
            if (sortedTopics[i].name !== 'KAFKA_WEBSOCKET') {
                allTopicsForRemoval.push(sortedTopics[i].name);
            }
        }
        return (
            [
                {
                    Header: "Topic",
                    accessor: "name",
                },
                {
                    Header: "Messages",
                    accessor: "messages.length",
                    maxWidth: 100,
                },
                {
                    Header:
                        <div style={{paddingLeft: '5px', paddingRight: '5px'}}
                            onClick={() => {reader.removeTopics(allTopicsForRemoval)}}>
                            <Icon className={`${styles.kafkaReaderIcon} ${buttonStyles.stopIcon}`} icon={remove} size={16}/>    
                        </div>,
                    id: "topicClearColumn",
                    accessor: (i) => i.name,
                    maxWidth: 50,
                    sortable: false,
                    resizable: false,
                    Cell: row => {
                        if (row.value === 'KAFKA_WEBSOCKET') {
                            return <div/>
                        }
                        return (
                            <div style={{paddingLeft: '5px', paddingRight: '5px'}}
                                onClick={() => {reader.removeTopics([row.value])}}>
                                <Icon className={`${styles.kafkaReaderIcon} ${buttonStyles.stopIcon}`} icon={remove} size={16}/>
                            </div>
                        )
                    }
                },
            ]
        )
    }

    removeTopics(topics) {
        this.props.removeTopics(topics);
    }

    connectOrResume() {
        this.props.connectWebSocket();
    }

    closeWebSocket() {
        this.props.closeWebSocket();
    }

    addCustomTopic() {
        const topicText = this.state.addCustomTopicText;
        if (noOffsetRegex.test(topicText)) {
            let topicOffsetMap = {};
            topicOffsetMap[topicText] = -1;
            this.props.addTopics(topicOffsetMap);
            this.setState({
                addCustomTopicText: '',
            });
        } else if (withOffsetRegex.test(topicText)) {
            const splits = topicText.split('[');
            const topic = splits[0];
            const offsetWithBracket = splits[1];
            const offsetStr = offsetWithBracket.slice(0, offsetWithBracket.length-1);
            const offset = Number(offsetStr);
            if (offset >= -2) {
                let topicOffsetMap = {};
                topicOffsetMap[topic] = offset;
                this.props.addTopics(topicOffsetMap);
                this.setState({
                    addCustomTopicText: '',
                });
            }
        } else {
            // TODO: Error in text, display something
            console.log("WARN: topic regex does mot match")
        }
    }

    selectTopic(topic) {
        this.props.setSelectedTopic(topic);
    }

    render () {
        const { sortedTopics, webSocketState, webSocketError, selectedTopic } = this.props;
        const subscribedTopicsTableData = sortedTopics;
        const reader = this;
        return (
            <div className={`${styles.topicBrowser}`}>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    reader.addCustomTopic();
                    }} >
                    <div className={`row no-gutters`}>
                        <div className={`col ${styles.customTopicText}`}>
                            <Input
                                type="text"
                                bsSize="sm"
                                placeholder="add.a.topic.at.optional.offset[-1]"
                                value={this.state.addCustomTopicText}
                                onChange={(e) => {
                                    reader.setState({addCustomTopicText: e.target.value})
                                }} />
                        </div>
                        <div className="col-sm-auto">
                            <Button size="sm" color="secondary"
                                onClick={() => {
                                    reader.addCustomTopic()
                                }} >
                                +
                            </Button>
                        </div>
                    </div>
                </Form>
                <div className={`row`}>
                    <div className={`col-sm-auto ${styles.topicTable}`}>
                        <ReactTable
                            data={subscribedTopicsTableData}
                            columns={[
                                {
                                    Header: this.createTopicsTableHeader(sortedTopics, webSocketState, webSocketError),
                                    columns: this.createTopicsTableColumns(sortedTopics),
                                }
                            ]}
                            defaultPageSize={5}
                            showPageSizeOptions={false}
                            noDataText="No topics"
                            previousText="<"
                            nextText=">"
                            pageText="Page"
                            className="-striped -highlight"
                            getTdProps={(state, rowInfo, column, instance) => {
                                return {
                                    onClick: (e, handleOriginal) => {
                                        // Don't select a row on click if it is the "remove topic" button row
                                        if (rowInfo && column.id !== 'topicClearColumn') {
                                            reader.selectTopic(state.data[rowInfo.index].name);
                                        }
                                        if (handleOriginal) {
                                            handleOriginal();
                                        }
                                    }
                                };
                            }}
                            getTrProps={(state, rowInfo, column) => {
                                if (rowInfo && rowInfo.row.name === selectedTopic) {
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

export default TopicsPanel
