import {
  ADD_USER,
  UPDATE_USERS,
} from '../actionTypes';

export function addUser(user) {
  return {
    type: ADD_USER,
    payload: {
      username: user.username,
    },
  };
}

export function updateUsers(users, localUsername) {
  const parsedUsers = users.map(user => (
    { ...user, isLocal: user.username === localUsername }
  ));

  return {
    type: UPDATE_USERS,
    payload: {
      users: parsedUsers,
    },
  };
}
