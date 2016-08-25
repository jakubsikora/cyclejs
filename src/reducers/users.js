import {
  ADD_USER,
} from '../actionTypes';

const user = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        username: action.payload.username,
        isLocal: action.payload.isLocal,
        room: action.payload.room,
      };

    default:
      return state;
  }
};

const initialState = [];

const users = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return [
        ...state,
        user(undefined, action),
      ];
    default:
      return state;
  }
};

export default users;
