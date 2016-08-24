import {
  ADD_USERS,
} from '../actionTypes';

export function addUser(users, localUsername) {
  const newUsers = {};

  users.forEach(user => {
    newUsers[user.username] = {
      username: user.username,
      isLocal: user.username === localUsername,
    };
  });

  console.log(newUsers);

  return {
    type: ADD_USERS,
    payload: {
      users: newUsers,
    },
  };
}
