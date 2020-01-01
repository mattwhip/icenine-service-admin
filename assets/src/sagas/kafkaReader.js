import { all, takeEvery, select } from 'redux-saga/effects'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

import * as types from 'types'
import selectors from 'selectors'


export default function* kafkaReaderSagas() {
    yield all([
        takeEvery(types.EXPORT_SELECTED_TOPIC, exportSelectedTopic),
        takeEvery(types.EXPORT_ALL_TOPICS, exportAllTopics),
    ])
}

function* exportSelectedTopic(action) {
    const state = yield select();
    const selectedTopic = selectors.kafkaReader.getSelectedTopic(state);
    const allTopics = selectors.kafkaWebSocket.getTopics(state);
    const selectedTopicData = allTopics[selectedTopic];
    if (!selectedTopicData) {
        console.log("WARN: no topic data found for selected topic");
        return;
    }
    exportTopics([selectedTopicData]);
}

function* exportAllTopics(action) {
    const state = yield select();
    const allTopics = selectors.kafkaWebSocket.getSortedTopics(state);
    exportTopics(allTopics);
}

function exportTopics(topicsArray) {
    const allTopics = topicsArray;
    let zip = new JSZip();
    let topics = zip.folder("topics");
    for(let i = 0; i < allTopics.length; ++i) {
        topics.file(`${allTopics[i].name}.json`, JSON.stringify(allTopics[i], null, 4));
    }
    zip.generateAsync({type:"blob"}).then(
        function (blob) {
            saveAs(blob, `kafka-${allTopics.length}-topic${allTopics.length > 1 ? 's' : ''}-${Math.ceil(
                new Date().getTime()/1000)}.zip`);
        });
}