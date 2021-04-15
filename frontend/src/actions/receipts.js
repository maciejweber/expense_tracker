import axios from 'axios';
import { tokenConfig } from './auth';
import { GET_RECEIPTS, ADD_RECEIPT } from './types';
import { createMessage } from '../actions/message';
import { getBalance } from '../actions/balance';

export const getReceipts = () => (dispatch, getState) => {
    axios
    .get(`http://127.0.0.1:8000/api/receipts/`, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: GET_RECEIPTS,
            payload: res.data,
        });
    })
}

export const addReceipt = (receipt) => (dispatch, getState) => {
    axios
    .post(`http://127.0.0.1:8000/api/receipts/`, receipt, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: ADD_RECEIPT,
            payload: res.data
        });
        dispatch(createMessage("Receipt added", "success", true));
        dispatch(getReceipts());
        dispatch(getBalance());
    })
};
