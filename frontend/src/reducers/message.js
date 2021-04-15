import { CREATE_MESSAGE } from '../actions/types';

const initialState = {
    msg: "",
    type: "",
    open: false
}

export default function message(state = initialState, action){
    switch(action.type) {
        case CREATE_MESSAGE:
            return {
                msg: action.payload.msg,
                type: action.payload.type,
                open: action.payload.open
            }
        default:
            return state;
    }
}