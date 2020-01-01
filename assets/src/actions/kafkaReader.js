import * as types from 'types';
import { admin } from 'generated/services/admin/compiled';
import { createProtobufFormData } from './protobuf'

export const getRecentMatches = (limit) => ({
    type: types.GET_RECENT_MATCHES,
    request: {
        method: 'post',
        responseType: 'arraybuffer',
        url: '/api/topic_history/matches/recent',
        data: createProtobufFormData(admin.RecentMatchesRequest,
            {
                limit: limit,
            })
    }
})

export const setSelectedTopic = (topic) => ({
    type: types.SET_SELECTED_TOPIC,
    topic: topic,
})

export const setSelectedMessageOffset = (topic, offset) => ({
    type: types.SET_SELECTED_MESSAGE_OFFSET,
    topic: topic,
    offset: offset,
})

export const exportSelectedTopic = () => ({
    type: types.EXPORT_SELECTED_TOPIC,
})

export const exportAllTopics = () => ({
    type: types.EXPORT_ALL_TOPICS,
})
