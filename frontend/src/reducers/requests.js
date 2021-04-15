import { GET_REQUESTS, ACCEPT_REQUEST, REJECT_REQUEST } from '../actions/types';

const initialState = {
    requests: []
};

export default function requests(state = initialState, action) {
    switch(action.type) {
        case GET_REQUESTS:
            return {
                ...state,
                requests: action.payload
            };
        case ACCEPT_REQUEST:
            return {
                ...state,
                requests: state.requests.filter((request) => request.id !== action.payload)
            };
        case REJECT_REQUEST:
            return {
                ...state,
                requests: state.requests.filter((request) => request.id !== action.payload)
            };
        default:
            return state;
    }
}