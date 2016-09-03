import {
  ADD_USER,
  UPDATE_USERS,
} from '../actionTypes';

const user = (state, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        id: action.payload.id,
        username: action.payload.username,
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
    case UPDATE_USERS:
      return action.payload.users;
    default:
      return state;
  }
};

export default users;
