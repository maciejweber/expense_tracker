import axios from 'axios';
import { tokenConfig } from './auth';
import { GET_REQUESTS, ACCEPT_REQUEST, REJECT_REQUEST } from './types';
import { createMessage } from '../actions/message';

export const getRequests = () => (dispatch, getState) => {
    axios
    .get(`http://127.0.0.1:8000/api/requests/`, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: GET_REQUESTS,
            payload: res.data
        });
    });
};

export const acceptRequest = (id) => (dispatch, getState) => {
    axios
    .delete(`http://127.0.0.1:8000/api/accept_request/${id}/`, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: ACCEPT_REQUEST,
            payload: id
        });
        dispatch(createMessage("Request accepted", "success", true));
    })
};

export const rejectRequest = (id) => (dispatch, getState) => {
    axios
    .delete(`http://127.0.0.1:8000/api/reject_request/${id}/`, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: REJECT_REQUEST,
            payload: id
        });
        dispatch(createMessage("Request rejected", "success", true));
    })
};



