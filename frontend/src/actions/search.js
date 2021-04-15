import axios from 'axios';
import { tokenConfig } from './auth';
import { SEARCH_USER, SEND_REQUEST } from './types';
import { createMessage } from '../actions/message';

export const searchUser = (username) => (dispatch, getState) => {
    axios
    .get(`http://127.0.0.1:8000/api/search_friend/${username}/`, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: SEARCH_USER,
            payload: res.data
        })
    })
}

export const sendRequest = (id) => (dispatch, getState) => {
    axios
    .delete(`http://127.0.0.1:8000/api/send_request/${id}/`, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: SEND_REQUEST,
            payload: id
        })
        dispatch(createMessage("Request sent", "success", true));
    });
};