import * as types from 'types';


export const connect = () => ({
    type: types.KAFKA_WEBSOCKET_CONNECT,
})

export const connected = () => ({
    type: types.KAFKA_WEBSOCKET_CONNECTED,
})

export const close = () => ({
    type: types.KAFKA_WEBSOCKET_CLOSE,
})

export const closed = () => ({
    type: types.KAFKA_WEBSOCKET_CLOSED,
})

export const error = (error) => ({
    type: types.KAFKA_WEBSOCKET_ERROR,
    error: error,
})

export const addTopics = (topicOffsetMap) => ({
    type: types.KAFKA_WEBSOCKET_ADD_TOPICS,
    topicOffsetMap: topicOffsetMap,
})

export const removeTopics = (topics) => ({
    type: types.KAFKA_WEBSOCKET_REMOVE_TOPICS,
    topics: topics,
})

export const messageReceived = (kafkaMessage) => ({
    type: types.KAFKA_WEBSOCKET_MESSAGE_RECEIVED,
    kafkaMessage: kafkaMessage,
})
