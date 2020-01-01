import * as types from 'types'
import * as webSocketStates from 'kafkaWebSocket/states'
import { updateObject } from 'state'


const topicInitState = {
    name: "",
    latestOffset: -1,
    messages: [],
};
const kafkaWebSocketInitState = {
    topics: {},
    webSocketState: webSocketStates.INITIAL,
    webSocketError: "",
};
const kafkaWebSocketReducer = (state = kafkaWebSocketInitState, action) => {
    switch (action.type) {
        case types.KAFKA_WEBSOCKET_CONNECT:
        {
            let newWebSocketState = state.webSocketState;
            if (state.webSocketState === webSocketStates.INITIAL ||
                state.webSocketState === webSocketStates.CLOSED ||
                state.webSocketState === webSocketStates.ERROR) {
                newWebSocketState = webSocketStates.CONNECTING;
            }
            return updateObject(state, {
                webSocketState: newWebSocketState,
            })
        }
        case types.KAFKA_WEBSOCKET_CONNECTED:
        {
            let newTopics = {};
            newTopics["KAFKA_WEBSOCKET"] = updateObject(topicInitState, {
                name: "KAFKA_WEBSOCKET",
            });
            const updatedTopics = updateObject(state.topics, newTopics);
            return updateObject(state, {
                webSocketState: webSocketStates.OPEN,
                topics: updatedTopics,
            })
        }
        case types.KAFKA_WEBSOCKET_ERROR:
        {
            return updateObject(state, {
                webSocketState: webSocketStates.ERROR,
                webSocketError: `${action.error}`,
            })
        }
        case types.KAFKA_WEBSOCKET_ADD_TOPICS:
        {
            // Check existing topics, add initial data for any new topics
            const existingTopics = state.topics;
            const newTopicNames = Object.keys(action.topicOffsetMap);
            let newTopics = {};
            for (let i = 0; i < newTopicNames.length; ++i) {
                if (!existingTopics[newTopicNames[i]]) {
                    newTopics[newTopicNames[i]] = updateObject(topicInitState, {
                        name: newTopicNames[i],
                    });
                }
            }
            const updatedTopics = updateObject(existingTopics, newTopics);
            return updateObject(state, {
                topics: updatedTopics,
            });
        }
        case types.KAFKA_WEBSOCKET_REMOVE_TOPICS:
        {
            // Copy all existing topics except desired remove list
            let newTopicMap = {};
            for(var topicName in state.topics) {
                let remove = false;
                for (let i = 0; i < action.topics.length; ++i) {
                    if (topicName === action.topics[i]) {
                        remove = true;
                        break;
                    }
                }
                if (!remove) {
                    newTopicMap[topicName] = state.topics[topicName];
                }
            }
            return updateObject(state, {
                topics: newTopicMap,
            });
        }
        case types.KAFKA_WEBSOCKET_CLOSE:
        {
            let newWebSocketState = state.webSocketState;
            if (state.webSocketState === webSocketStates.OPEN) {
                newWebSocketState = webSocketStates.CLOSING;
            }
            return updateObject(state, {
                webSocketState: newWebSocketState,
            })
        }
        case types.KAFKA_WEBSOCKET_CLOSED:
        {
            return updateObject(state, {
                webSocketState: webSocketStates.CLOSED,
            })
        }
        case types.KAFKA_WEBSOCKET_MESSAGE_RECEIVED:
        {
            const kafkaMessage = action.kafkaMessage;
            const topicName = kafkaMessage.topic;
            const topic = state.topics[kafkaMessage.topic];
            if (topic) {
                let messages = topic.messages.slice();
                let latestOffset = topic.latestOffset;
                if (kafkaMessage.offset > topic.latestOffset) {
                    messages.push(kafkaMessage)
                    latestOffset = kafkaMessage.offset;
                } else if (kafkaMessage.offset != topic.latestOffset) {
                    console.log("WARNING: received message at offset < latest existing offset (equal is okay on resume)")
                }
                let newTopics = {};
                const updatedTopic = updateObject(topic, {
                    latestOffset: latestOffset,
                    messages: messages,
                })
                newTopics[topicName] = updatedTopic;
                const updatedTopics = updateObject(state.topics, newTopics);
                return updateObject(state, {
                    topics: updatedTopics,
                })
            } else {
                return state;
            }
        }
        default:
            return state;
    }
}

export default { kafkaWebSocketReducer }
