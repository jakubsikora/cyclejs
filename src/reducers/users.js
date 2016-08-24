import {
  ADD_USERS,
} from '../actionTypes';

const initialState = {};

export default function users(state = initialState, action) {
  switch (action.type) {
    case ADD_USERS:
      return { ...state, ...action.payload.users };
    default:
      return state;
  }
}
