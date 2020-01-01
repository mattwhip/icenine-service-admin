import * as types from 'types';
import { admin } from 'generated/services/admin/compiled';
import { createProtobufFormData } from './protobuf'

export const getSystemSummary = (forceUpdate) => ({
    type: types.GET_SYSTEM_SUMMARY,
    request: {
        method: 'post',
        responseType: 'arraybuffer',
        url: '/api/summary',
        data: createProtobufFormData(admin.SummaryRequest,
            {
                forceUpdate: forceUpdate,
            })
    }
})
