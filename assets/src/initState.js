export const initState = {
    ui: {
        login: {
            // isAuthorizing
        },
        users: {
            // isSearching
            // selectedUserID
            // currentPage
        },
        userDetails: {
            // map of userID to unsaved changed user details
        },
        serviceConfig: {
            // dailyBonus
        },
        kafkaReader: {
            // selectedTopic
        },
    },
    auth: {
        // jwt
        // isAuthorized
    },
    userSearchResults: {
        // map UserIDs to partial user data structure to display contextual search results
    },
    userDetails: {
        // map UserIDs to user data structure to display on details page
    },
    summary: {
        // system summary / stats
    },
    serviceConfig: {
        // service configuration
    },
    kafkaReader: {
        recentMatches: []
    },
    kafkaWebSocket: {
        // topics
        // webSocketState
    }
}
