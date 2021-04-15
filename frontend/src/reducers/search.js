import { SEARCH_USER, SEND_REQUEST } from '../actions/types';

const initialState = {
    users: []
};

export default function search(state = initialState, action) {
    switch(action.type) {
        case SEARCH_USER:
            return {
                ...state,
                users: action.payload
            };
        case SEND_REQUEST:
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload)
            };
        default:
            return state;
    }
}