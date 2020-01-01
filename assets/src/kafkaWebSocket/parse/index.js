import { types } from 'kafkaWebSocket/types'
import { util } from "generated/util/compiled";
import { teenpatti as teenPatti } from "generated/services/game/teen_patti/compiled";
import { matchmaking } from "generated/services/matchmaking/compiled";
import { kafkawebsocket as kafkaWebSocket } from "generated/services/kafka_websocket/compiled";

export const kafkaWebSocketTopic = "KAFKA_WEBSOCKET";

// Setup dataview prototype
DataView.prototype.getUint64 = function(byteOffset, littleEndian) {
    // split 64-bit number into two 32-bit parts
    const left =  this.getUint32(byteOffset, littleEndian);
    const right = this.getUint32(byteOffset+4, littleEndian);

    // combine the two 32-bit values
    const combined = littleEndian? left + 2**32*right : 2**32*left + right;

    if (!Number.isSafeInteger(combined))
        console.warn(combined, 'exceeds MAX_SAFE_INTEGER. Precision may be lost');

    return combined;
}

// Setup dataview prototype
DataView.prototype.getUint64BigInt = function(byteOffset, littleEndian) {
    // split 64-bit number into two 32-bit parts
    const left =  BigInt(this.getUint32(byteOffset, littleEndian));
    const right = BigInt(this.getUint32(byteOffset+4, littleEndian));

    // combine the two 32-bit values
    const combined = littleEndian? left + BigInt(2**32)*right : BigInt(2**32)*left + right;

    return combined;
}

function parseMessageBytes(bytes) {
    const view = new DataView(bytes.buffer);
    const type = view.getUint32(0, true);
    const data = bytes.slice(4);
    var msg = null;
    switch (type) {
    // Util
    case types.Util.Ping:
        msg = util.Ping.decode(data);
        break;
    // Teen Patti
    case types.TeenPatti.SideShowRequest:
        msg = teenPatti.SideShowRequest.decode(data);
        break;
    case types.TeenPatti.SideShowResponse:
        msg = teenPatti.SideShowResponse.decode(data);
        break;
    case types.TeenPatti.TableStatus:
        msg = teenPatti.TableStatus.decode(data);
        break;
    case types.TeenPatti.TableConfiguration:
        msg = teenPatti.TableConfiguration.decode(data);
        break;  
    case types.TeenPatti.UserAction:
        msg = teenPatti.UserAction.decode(data);
        break;  
    case types.TeenPatti.UserRequest:
        msg = teenPatti.UserRequest.decode(data);
        break;  
    case types.TeenPatti.UserResponse:
        msg = teenPatti.UserResponse.decode(data);
        break;  
    case types.TeenPatti.UserTurn:
        msg = teenPatti.UserTurn.decode(data);
        break;
    // Matchmaking
    case types.Matchmaking.MatchFound:
        msg = matchmaking.MatchFound.decode(data);
        break;
    case types.Matchmaking.JoinTable:
        msg = matchmaking.JoinTable.decode(data);
        break;
    // KafkaWebSocket
    case types.KafkaWebSocket.SubscriptionsUpdated:
        msg = kafkaWebSocket.SubscriptionsUpdated.decode(data);
        break;
    // Default
    default:
    }
    return {
        type: type,
        msg: msg,
    }
}

export function decodeWebSocketMessage(data, topicValueMap) {
    let bytes = new Uint8Array(data);
    const view = new DataView(bytes.buffer);
    let topicVal = view.getInt8(0);
    const senderIDBytes = bytes.slice(1, 17);
    const offset = view.getUint64(1+16, true);
    const unixTimestampNanoBigInt = view.getUint64BigInt(1+16+8, true);
    const msgBytes = bytes.slice(1+16+8+8);

    // Convert nano timestamp BigInt to millisecond Number
    const unixTimestampBigInt = unixTimestampNanoBigInt / BigInt(1e6);
    const unixTimestamp = Number(unixTimestampBigInt);

    // Lookup topic in value map
    const topic = topicVal === 0 ? kafkaWebSocketTopic : topicValueMap[topicVal];
    if (!topic) {
        throw `No topic mapped to value ${topicVal}`
    }

    // Check topic prefix to understand if this was a user message
    let truncatedMsgBytes = msgBytes;
    let sender = 'server';
    if (topic.startsWith('u2')) {
        sender = Buffer.from(senderIDBytes).toString('hex');
    }

    // Parse the message bytes
    const parsed = parseMessageBytes(truncatedMsgBytes)

    return {
        topic: topic,
        offset: offset,
        unixTimestamp: unixTimestamp,
        msgType: parsed.type,
        msg: parsed.msg,
        msgByteLength: bytes.length,
        sender: sender,
    }
}
