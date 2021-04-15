import { RETURN_ALERT } from './types';

export const returnAlerts = (message, type, status) => {
    return {
      type: RETURN_ALERT,
      payload: { message, type, status },
    };
  };