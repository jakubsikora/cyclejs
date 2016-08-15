import {
  UPDATE_GAME_TIME,
} from '../actionTypes';

export function updateGameTime(dt) {
  return {
    type: UPDATE_GAME_TIME,
    payload: {
      dt,
    },
  };
}
