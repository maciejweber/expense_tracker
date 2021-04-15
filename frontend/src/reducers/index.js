import { combineReducers } from 'redux';
import auth from './auth';
import receipts from './receipts';
import friends from './friends';
import requests from './requests';
import users from './search';
import balance from './balance';
import message from './message';
import alerts from './alerts';

export default combineReducers({
    auth,
    receipts,
    friends,
    requests,
    users,
    balance,
    message,
    alerts
});