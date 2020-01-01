import { createSelector } from 'reselect'

import requestStates from 'requestStates'


export const getRecentMatches = (state) => {
    let s = state.kafkaReader.recentMatches;
    return s || [];
}

export const getRecentMatchesState = (state) => {
    return state.kafkaReader.recentMatchesState || requestStates.INITIAL;
}

export const getRecentMatchesErrorText = (state) => {
    return state.kafkaReader.recentMatchesErrorText || "";
}

export const getSelectedTopic = (state) => {
    return state.ui.kafkaReader.selectedTopic || null;
}

export const getSelectedTopicMessages = (state) => {
    const selectedTopic = getSelectedTopic(state);
    if (!selectedTopic) {
        return [];
    }
    return state.kafkaWebSocket.topics[selectedTopic].messages || [];
}

export const getSelectedMessageOffset = (state) => {
    const selectedTopic = getSelectedTopic(state);
    if (!selectedTopic) {
        return -1;
    }
    const topicData = state.ui.kafkaReader.topics[selectedTopic];
    return topicData.selectedOffset;
}

export const getSelectedMessage = createSelector(
    getSelectedMessageOffset,
    getSelectedTopicMessages,
    (offset, messages) => {
        // TODO: implement binary search for offset (already sorted)
        for (let i = 0; i < messages.length; ++i) {
            if (messages[i].offset === offset) {
                return messages[i];
            }
        }
        return null;
    }
)
