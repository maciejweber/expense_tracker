import { GET_BALANCE, RESET_BALANCE } from '../actions/types';

const initialState = {
    balance: [],
    
};

export default function balance(state = initialState, action){
    switch(action.type){
        case GET_BALANCE:
            return {
                ...state,
                balance: action.payload
            };
        case RESET_BALANCE:
            return {
                ...state,
                balance: action.payload
            }
        default:
            return state;
    }
}
