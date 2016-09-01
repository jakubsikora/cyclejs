import {
  ADD_ROOM,
  UPDATE_ROOMS,
} from '../actionTypes';

const room = (state, action) => {
  switch (action.type) {
    case ADD_ROOM:
      return {
        id: action.payload.id,
        name: action.payload.username,
        users: action.payload.users,
      };

    default:
      return state;
  }
};

const initialState = [];

const rooms = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ROOM:
      return [
        ...state,
        room(undefined, action),
      ];
    case UPDATE_ROOMS:
      return action.payload.rooms;
    default:
      return state;
  }
};

export default rooms;
