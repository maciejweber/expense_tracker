import axios from 'axios';
import { tokenConfig } from './auth';
import { GET_BALANCE, RESET_BALANCE } from './types';
import { createMessage } from '../actions/message';
import { getReceipts } from '../actions/receipts';

export const getBalance = () => (dispatch, getState) => {
    axios
    .get(`http://127.0.0.1:8000/api/balance/`,tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: GET_BALANCE,
            payload: res.data
        });
    });
};

export const resetBalance = (id) => (dispatch, getState) => {
    axios
    .delete(`http://127.0.0.1:8000/api/balance/${id}/`, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: RESET_BALANCE,
            payload: res.data
        });
        dispatch(createMessage("Reset success", "success", true));
        dispatch(getReceipts());
    });
};
