import { CREATE_MESSAGE } from './types';

export const createMessage = (msg, type, open) => {
    return {
        type: CREATE_MESSAGE,
        payload: { msg, type, open}
    }
}