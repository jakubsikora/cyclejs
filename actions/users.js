import {
  ADD_USER,
  UPDATE_USERS,
  REMOVE_USER,
} from '../constants';

export function addUser(user) {
  return {
    type: ADD_USER,
    payload: {
      user,
    },
  };
}

export function updateUsers(users) {
  return {
    type: UPDATE_USERS,
    payload: {
      users,
    },
  };
}

export function removeUser(userId, gameName) {
  return {
    type: REMOVE_USER,
    payload: {
      userId,
      gameName,
    },
  };
}
