// Login
export const LOGIN = 'LOGIN';

// Summary
export const GET_SYSTEM_SUMMARY = 'GET_SYSTEM_SUMMARY';

// Activity
export const GET_SYSTEM_ACTIVITY = 'GET_SYSTEM_ACTIVITY';
export const START_POLL_ACTIVITY = 'START_POLL_ACTIVITY';
export const STOP_POLL_ACTIVITY = 'STOP_POLL_ACTIVITY';

// Users
export const SEARCH_USERS = 'SEARCH_USERS';
export const SELECT_USER = 'SELECT_USER';
export const SELECT_USER_PAGE = 'SELECT_USER_PAGE';
export const GET_USER_DETAILS = 'GET_USER_DETAILS';
export const SET_USER_DETAILS = 'SET_USER_DETAILS';

// Service config
export const GET_BOT_CONFIG = 'GET_BOT_CONFIG';
export const SET_BOT_CONFIG = 'SET_BOT_CONFIG';
export const GET_MATCHMAKING_PROCESSOR_CONFIG = 'GET_MATCHMAKING_PROCESSOR_CONFIG';
export const SET_MATCHMAKING_PROCESSOR_CONFIG = 'SET_MATCHMAKING_PROCESSOR_CONFIG';
export const GET_DAILY_BONUS_CONFIG = 'GET_DAILY_BONUS_CONFIG';
export const SET_DAILY_BONUS_CONFIG = 'SET_DAILY_BONUS_CONFIG';
export const GET_USER_ACCOUNTS_CONFIG = 'GET_USER_ACCOUNTS_CONFIG';
export const SET_USER_ACCOUNTS_CONFIG = 'SET_USER_ACCOUNTS_CONFIG';
export const GET_USER_DATA_CONFIG = 'GET_USER_DATA_CONFIG';
export const SET_USER_DATA_CONFIG = 'SET_USER_DATA_CONFIG';
// Service config UI
export const SET_UI_BOT_CONFIG = 'SET_UI_BOT_CONFIG';
export const SET_UI_DAILY_BONUS_CONFIG = 'SET_UI_DAILY_BONUS_CONFIG';
export const SET_UI_MATCHMAKING_PROCESSOR_CONFIG = 'SET_UI_MATCHMAKING_PROCESSOR_CONFIG';
export const SET_UI_USER_ACCOUNTS_CONFIG = 'SET_UI_USER_ACCOUNTS_CONFIG';
export const SET_UI_USER_DATA_CONFIG = 'SET_UI_USER_DATA_CONFIG';
export const SET_UI_USER_DETAILS = 'SET_UI_USER_DETAILS';

// Kafka reader
export const GET_RECENT_MATCHES = 'GET_RECENT_MATCHES';
export const EXPORT_SELECTED_TOPIC = 'EXPORT_SELECTED_TOPIC';
export const EXPORT_ALL_TOPICS = 'EXPORT_ALL_TOPICS';
// Kafka reader UI
export const SET_SELECTED_TOPIC = 'SET_SELECTED_TOPIC';
export const SET_SELECTED_MESSAGE_OFFSET = 'SET_SELECTED_MESSAGE_OFFSET';

// Kafka WebSocket
export const KAFKA_WEBSOCKET_CONNECT = 'KAFKA_WEBSOCKET_CONNECT';
export const KAFKA_WEBSOCKET_CONNECTED = 'KAFKA_WEBSOCKET_CONNECTED';
export const KAFKA_WEBSOCKET_ERROR = 'KAFKA_WEBSOCKET_ERROR';
export const KAFKA_WEBSOCKET_ADD_TOPICS = 'KAFKA_WEBSOCKET_ADD_TOPICS';
export const KAFKA_WEBSOCKET_REMOVE_TOPICS = 'KAFKA_WEBSOCKET_REMOVE_TOPICS';
export const KAFKA_WEBSOCKET_SUBSCRIPTIONS_UPDATED = 'KAFKA_WEBSOCKET_SUBSCRIPTIONS_UPDATED';
export const KAFKA_WEBSOCKET_MESSAGE_RECEIVED = 'KAFKA_WEBSOCKET_MESSAGE_RECEIVED';
export const KAFKA_WEBSOCKET_CLOSE = 'KAFKA_WEBSOCKET_CLOSE';
export const KAFKA_WEBSOCKET_CLOSED = 'KAFKA_WEBSOCKET_CLOSED';