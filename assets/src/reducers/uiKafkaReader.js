import * as types from 'types'
import * as webSocketStates from 'kafkaWebSocket/states'
import { updateObject } from 'state'


const uiTopicInitState = {
    selectedOffset: -1,
};
const uiKafkaReaderInitState = {
    selectedTopic: '',
    topics: {},
};
const uiKafkaReaderReducer = (state = uiKafkaReaderInitState, action) => {
    switch (action.type) {
        case types.SET_SELECTED_TOPIC:
        {
            let newTopics = {};
            if (!state.topics[action.topic]) {
                newTopics[action.topic] = uiTopicInitState;
            }
            let updatedTopics = updateObject(state.topics, newTopics);
            return updateObject(state, {
                selectedTopic: action.topic,
                topics: updatedTopics,
            })
        }
        case types.SET_SELECTED_MESSAGE_OFFSET:
        {
            const topicState = state.topics[action.topic];
            if (topicState) {
                let updatedTopics = {};
                updatedTopics[action.topic] = updateObject(topicState, {
                    selectedOffset: action.offset,
                });
                return updateObject(state, {
                    topics: updateObject(state.topics, updatedTopics),
                })
            } else {
                return state;
            }
        }
        case types.KAFKA_WEBSOCKET_REMOVE_TOPICS:
        {
            // Copy all existing topics except desired remove list
            let newTopicMap = {};
            let newSelectedTopic = state.selectedTopic;
            for(var topicName in state.topics) {
                let remove = false;
                for (let i = 0; i < action.topics.length; ++i) {
                    if (topicName === action.topics[i]) {
                        remove = true;
                        if (topicName === state.selectedTopic) {
                            newSelectedTopic = '';
                        }
                        break;
                    }
                }
                if (!remove) {
                    newTopicMap[topicName] = state.topics[topicName];
                }
            }
            return updateObject(state, {
                topics: newTopicMap,
                selectedTopic: newSelectedTopic,
            });
        }
        default:
            return state;
    }
}

export default { uiKafkaReaderReducer }
