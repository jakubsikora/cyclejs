import {
  ADD_USER,
} from '../actionTypes';

export function addUser(socket) {
  socket.emit('adduser', `User${Math.floor(Math.random() * (1000 - 0 + 1))}`);

  return {
    type: ADD_USER,
    payload: {
      initialized: true,
    },
  };
}
