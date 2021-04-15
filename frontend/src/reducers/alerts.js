import { RETURN_ALERT } from '../actions/types';

const initialState = {
  message: "",
  type: "",
  status: null
};

export default function alerts(state = initialState, action) {
  switch (action.type) {
    case RETURN_ALERT:
      return {
        message: action.payload.message,
        type: action.payload.type,
        status: action.payload.status,
      };
    default:
      return state;
  }
}