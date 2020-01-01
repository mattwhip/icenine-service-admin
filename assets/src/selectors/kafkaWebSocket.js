import { createSelector } from 'reselect'

import * as webSocketStates from 'kafkaWebSocket/states'


export const getWebSocketState = (state) => {
    return state.kafkaWebSocket.webSocketState || webSocketStates.INITIAL;
}

export const getWebSocketError = (state) => {
    return state.kafkaWebSocket.webSocketError || '';
}

// topic selectors
export const getTopics = (state) => {
    return state.kafkaWebSocket.topics || {};
}
export const getSortedTopics = createSelector(
    getTopics,
    (topics) => {
        let topicNames = Object.keys(topics);
        topicNames.sort();
        let sortedTopics = [];
        for (let i = 0; i < topicNames.length; ++i) {
            sortedTopics.push(topics[topicNames[i]]);
        }
        return sortedTopics;
    }
)
export const getTopic = (state, topic) => {
    return state.kafkaWebSocket.topics[topic] || null;
}
export const getLatestOffset = (topic) => {
    if (!topic) {
        return -1;
    }
    return topic.latestOffset;
}
export const getMessages = (topic) => {
    if (!topic) {
        return [];
    }
    return topic.messages;
}

// stats
export const getTotalTopics = createSelector(
    getSortedTopics,
    (sortedTopics) => {
        return sortedTopics.length
    }
)
export const getTotalMessages = createSelector(
    getSortedTopics,
    (sortedTopics) => {
        return sortedTopics.reduce((accumulator, topic) => {
            return accumulator + topic.messages.length;
        }, 0);
    }
)
export const getTotalMessageBytesReceived = createSelector(
    getSortedTopics,
    (sortedTopics) => {
        return sortedTopics.reduce((accumulator, topic) => {
            return accumulator + topic.messages.reduce((accumulator, message) => {
                return accumulator + message.msgByteLength
            }, 0);
        }, 0);
    }
)
