import { 
    GET_RECEIPTS,
    ADD_RECEIPT,
} from '../actions/types.js';

const initialState = {
    receipts: [],
  };

export default function receipts(state = initialState, action) {
    switch (action.type) {
        case GET_RECEIPTS:
            return {
                ...state,
                receipts: action.payload,
            };
        case ADD_RECEIPT:
            return {
                ...state,
                receipts: [action.payload, ...state.receipts]
            };
        default: 
            return state;
    };
}