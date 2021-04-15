import axios from 'axios';
import { tokenConfig } from './auth';
import { GET_FRIENDS, DELETE_FRIEND } from './types';
import { createMessage } from '../actions/message';

export const getFriends = () => (dispatch, getState) => {
    axios
    .get(`http://127.0.0.1:8000/api/friends/`, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: GET_FRIENDS,
            payload: res.data,
        });
    })
}

export const deleteFriend = (id) => (dispatch, getState) => {
    axios
    .delete(`http://127.0.0.1:8000/api/friend/${id}/` ,tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: DELETE_FRIEND,
            payload: id,
        })
        dispatch(createMessage("Friend deleted", "success", true));
    })
}
