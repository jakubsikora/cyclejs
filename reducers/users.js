import {
  ADD_USER,
  UPDATE_USERS,
  REMOVE_USER,
} from '../constants';

const initialState = {
  localUser: undefined,
  users: [],
};

const user = (state, action) => {
  switch (action.type) {
    case ADD_USER:
      return action.payload.user;
    default:
      return state;
  }
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        localUser: action.payload.user,
        users: [
          ...state.users,
          user(undefined, action),
        ],
      };
    case UPDATE_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter(u => u.id !== action.payload.userId),
      };
    default:
      return state;
  }
};

export default users;
