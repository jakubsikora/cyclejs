import {
  ADD_MESSAGE,
  MESSAGE_LIMIT,
  UPDATE_MESSAGES,
} from '../constants';

const initialState = {
  messages: [],
};

const limitMessages = (messages) => {
  const currentLength = messages.length;
  const toDeleteLength = currentLength > MESSAGE_LIMIT
    ? currentLength - MESSAGE_LIMIT
    : 0;

  for (let i = 0; i < toDeleteLength; i++) {
    messages.shift();
  }

  return messages;
};

const message = (state, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        time: action.payload.message.time,
        sender: action.payload.message.sender,
        text: action.payload.message.text,
      };
    default:
      return state;
  }
};

const chat = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case ADD_MESSAGE:
      newState = {
        ...state,
        messages: [
          ...state.messages,
          message(undefined, action),
        ],
      };

      newState.messages = limitMessages(newState.messages);

      return newState;
    case UPDATE_MESSAGES:
      return {
        ...state,
        messages: action.payload.messages,
      };
    default:
      return state;
  }
};

export default chat;
