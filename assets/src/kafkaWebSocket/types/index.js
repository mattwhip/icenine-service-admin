export const types = {
    Util: {
        Ping: 1,
    },
    TeenPatti: {
        SideShowRequest:    2000,
        SideShowResponse:   2001,
        TableStatus:        2002,
        TableConfiguration: 2003,
        UserAction:         2004,
        UserRequest:        2005,
        UserResponse:       2006,
        UserTurn:           2007,
    },
    Matchmaking: {
        MatchFound: 3000,
        JoinTable:  3001,
    },
    KafkaWebSocket: {
        SubscriptionsUpdated: 4001,
        Subscribe:            4002,
        Unsubscribe:          4003,
    },
}

export const toString = function(type) {
    switch (type) {
    // Core
    case types.Util.Ping:
        return "Util.Ping";
    // TeenPatti
    case types.TeenPatti.SideShowRequest:
        return "TeenPatti.SideShowRequest";
    case types.TeenPatti.SideShowResponse:
        return "TeenPatti.SideShowResponse";
    case types.TeenPatti.TableStatus:
        return "TeenPatti.TableStatus";
    case types.TeenPatti.TableConfiguration:
        return "TeenPatti.TableConfiguration";
    case types.TeenPatti.UserAction:
        return "TeenPatti.UserAction";
    case types.TeenPatti.UserRequest:
        return "TeenPatti.UserRequest";
    case types.TeenPatti.UserResponse:
        return "TeenPatti.UserResponse";
    case types.TeenPatti.UserTurn:
        return "TeenPatti.UserTurn";
    // Matchmaking
    case types.Matchmaking.MatchFound:
        return "Matchmaking.MatchFound";
    case types.Matchmaking.JoinTable:
        return "Matchmaking.JoinTable";
    // KafkaWebSocket
    case types.KafkaWebSocket.SubscriptionsUpdated:
        return "KafkaWebSocket.SubscriptionsUpdated";
    // Unknown
    default:
        return "UNKNOWN_TYPE";    
    }
}
