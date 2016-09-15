import {
  ADD_MESSAGE,
  UPDATE_MESSAGES,
} from '../constants';

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    payload: {
      message,
    },
  };
}

export function updateMessages(messages) {
  return {
    type: UPDATE_MESSAGES,
    payload: {
      messages,
    },
  };
}
