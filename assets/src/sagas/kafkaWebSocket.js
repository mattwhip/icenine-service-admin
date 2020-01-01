import { take, call, race, select, put } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'

import * as types from 'types'
import * as wsParse from 'kafkaWebSocket/parse'
import * as wsTypes from 'kafkaWebSocket/types'
import { updateObject } from 'state'
import selectors from 'selectors'
import actions from 'actions'
import { kafkawebsocket as kafkaWebSocket } from "generated/services/kafka_websocket/compiled"; 

const webSocketPort = "7080"

var webSocket = null;
var topicValueMap = {};

function initWebsocket(initialTopicOffsetMap, adminJWT) {
    return eventChannel((emitter) => {
        // Build url query for topics at earlies offset with format:
        // ?topic_0=some_topic&offset_0=-1&topic_1=some_other_topic
        let queryParams = []
        const initialTopics = Object.keys(initialTopicOffsetMap);
        queryParams.push(`?token=${adminJWT}`)
        for (let i = 0; i < initialTopics.length; ++i) {
            const topic = initialTopics[i];
            queryParams.push(`&topic_${i}=${topic}&offset_${i}=${initialTopicOffsetMap[topic]}`)
        }
        // Create websocket and connect
        let currentProtocol = window.location.href.split("://")[0];
        let wsProtocol = "wss";
        if(currentProtocol === "http") {
            wsProtocol = "ws";
        }
        webSocket = new WebSocket(`${wsProtocol}://${window.location.hostname}:${webSocketPort}/admin/${queryParams.join('')}`);
        webSocket.binaryType = "arraybuffer";
        webSocket.onopen = () => {
            emitter(actions.kafkaWebSocket.connected())
        };
        webSocket.onerror = (error) => {
            emitter(actions.kafkaWebSocket.error(error))
        };
        webSocket.onclose = () => {
            emitter(actions.kafkaWebSocket.closed())
        }
        webSocket.onmessage = (e) => {
            let kafkaMessage = null;
            try {
                kafkaMessage = wsParse.decodeWebSocketMessage(e.data, topicValueMap);
            } catch(exc) {
                console.error(`Error decoding binary websocket message [${JSON.stringify(e)}], exception: ${exc}`);
            }
            if (kafkaMessage) {
                // Update topic value map whenever SubscriptionsUpdated message is received
                if (kafkaMessage.msgType === wsTypes.types.KafkaWebSocket.SubscriptionsUpdated) {
                    let newTopicMap = {};
                    const topics = kafkaMessage.msg.topics;
                    Object.keys(topics).forEach(function(topic) {
                        // Topics map to a 1-length byte array for protobuf protocol
                        const topicValue = topics[topic][0];
                        newTopicMap[topicValue] = topic;
                    });
                    topicValueMap = newTopicMap;
                }
                return emitter(actions.kafkaWebSocket.messageReceived(kafkaMessage));
            }
        };
        // unsubscribe function invoked when channel.close() is called
        return () => {
            if (webSocket && webSocket.readyState === 1) {
                webSocket.close();
            }
        }
    })
}

export default function* webSocketSagas() {
    while (true) {
        const [connect, addTopics] = yield race([
            take(types.KAFKA_WEBSOCKET_CONNECT),
            take(types.KAFKA_WEBSOCKET_ADD_TOPICS),
        ]);
        // Create initial list of topics from list of previously subscribed topics (before disconnect) and their latest offsets
        const state = yield select();
        const existingTopics = selectors.kafkaWebSocket.getTopics(state);
        let initialTopics = {};
        for (var topic in existingTopics) {
            if (topic !== "KAFKA_WEBSOCKET") {
                const topicData = existingTopics[topic];
                const latestOffset = selectors.kafkaWebSocket.getLatestOffset(topicData);
                initialTopics[topic] = latestOffset;
            }
        }
        // Add to existing list using addTopics data
        if (addTopics) {
            initialTopics = updateObject(addTopics.topicOffsetMap, initialTopics);
        }
        // Connect to WebSocket
        const channel = yield call(initWebsocket, initialTopics, state.auth.jwt);
        let connected = true;
        // Loop while connected, processing actions to update connection state and subscriptions
        while (connected) {
            // Snapshot state before the next salient action is received
            const currentState = yield select();
            // Process whichever salient action is seen first
            const [
                channelAction,
                addTopicsAction,
                removeTopicsAction,
                closeAction,
            ] = yield race([
                take(channel),
                take(types.KAFKA_WEBSOCKET_ADD_TOPICS),
                take(types.KAFKA_WEBSOCKET_REMOVE_TOPICS),
                take(types.KAFKA_WEBSOCKET_CLOSE),
            ]);
            if (channelAction) {
                yield put(channelAction);
                if (channelAction.type === types.KAFKA_WEBSOCKET_CLOSED ||
                    channelAction.type === types.KAFKA_WEBSOCKET_ERROR) {
                    channel.close();
                    connected = false;
                }
            } else if (addTopicsAction) {
                // Ensure the WebSocket is currently in the OPEN state and ready to communicate
                if (webSocket.readyState === WebSocket.OPEN) {
                    sendSubscribeMessage(addTopicsAction.topicOffsetMap, currentState);
                } else {
                    console.log(`WARN: add topics attempted in webSocket state ${webSocket.readyState}`)
                }
            } else if (removeTopicsAction) {
                // Ensure the WebSocket is currently in the OPEN state and ready to communicate
                if (webSocket.readyState === WebSocket.OPEN) {
                    sendUnsubscribeMessage(removeTopicsAction.topics, currentState);
                } else {
                    console.log(`WARN: remove topics attempted in webSocket state ${webSocket.readyState}`)
                }
            } else if (closeAction) {
                // Ensure the WebSocket is currently in the OPEN state and ready to be closed
                if (webSocket.readyState === WebSocket.OPEN) {
                    // Close the WebSocket, causing the WebSocket event channel emmitter to eventually emmit a closed action
                    webSocket.close();
                } else {
                    console.log(`WARN: close attempted in webSocket state ${webSocket.readyState}`)
                }
            }
        }
    }
}

const sendSubscribeMessage = (topicOffsetMap, currentState) => {
    const topics = selectors.kafkaWebSocket.getTopics(currentState);
    const topicsToAdd = Object.keys(topicOffsetMap);
    const newTopicsOffsetMap = {};
    let newTopicFound = false;
    for(let i = 0; i < topicsToAdd.length; ++i) {
        if (!topics[topicsToAdd[i]]) {
            newTopicsOffsetMap[topicsToAdd[i]] = topicOffsetMap[topicsToAdd[i]];
            newTopicFound = true;
        }
    }
    if (newTopicFound) {
        // Create protobuf object
        let message = kafkaWebSocket.Subscribe.create({
            topicOffsetMap: newTopicsOffsetMap,
        });
        // Encode protobuf to Uint8Array
        let buffer  = kafkaWebSocket.Subscribe.encode(message).finish();
        // Prepend message type byte
        let payload = new Uint8Array(1+buffer.length);
        payload[0] = 2;
        payload.set(buffer, 1);
        // Send serialized protobuf bytes over WebSocket
        webSocket.send(payload)
    }
}

const sendUnsubscribeMessage = (topics, currentState) => {
     // Send Unsubscribe message for each topic that is in the subscribed list and matches the action data
     const topicsState = selectors.kafkaWebSocket.getTopics(currentState);
     const topicsToRemove = topics;
     let sanitizedTopics = [];
     for(let i = 0; i < topicsToRemove.length; ++i) {
         if (topicsState[topicsToRemove[i]] && topicsToRemove[i] !== "KAFKA_WEBSOCKET") {
            sanitizedTopics.push(topicsToRemove[i]);
         }
     }
     if (sanitizedTopics.length > 0) {
        // Create protobuf object
        let message = kafkaWebSocket.Unsubscribe.create({
            topics: sanitizedTopics,
        });
        // Encode protobuf to Uint8Array
        let buffer  = kafkaWebSocket.Unsubscribe.encode(message).finish();
        // Prepend message type byte
        let payload = new Uint8Array(1+buffer.length);
        payload[0] = 3;
        payload.set(buffer, 1);
        // Send serialized protobuf bytes over WebSocket
        webSocket.send(payload);
     }
}
