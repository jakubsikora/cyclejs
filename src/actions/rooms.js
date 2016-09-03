import {
  ADD_ROOM,
  UPDATE_ROOMS,
} from '../actionTypes';

export function addRoom(room) {
  return {
    type: ADD_ROOM,
    payload: { ...room },
  };
}

export function updateRooms(rooms, localRoom) {
  const parsedRooms = rooms.map(room => (
    { ...room, isLocal: room.name === localRoom }
  ));

  return {
    type: UPDATE_ROOMS,
    payload: {
      rooms: parsedRooms,
    },
  };
}
