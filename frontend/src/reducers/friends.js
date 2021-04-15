import { GET_FRIENDS, DELETE_FRIEND } from '../actions/types';

const initialState = {
    friends: []
};

export default function friends(state = initialState, action) {
    switch(action.type) {
        case GET_FRIENDS:
            return {
                ...state,
                friends: action.payload
            };
        case DELETE_FRIEND:
            return {
                ...state,
                friends: state.friends.filter((friend) => friend.id !== action.payload)
            }
        default:
            return state;
    }
}