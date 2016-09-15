import {
  UPDATE_GAME_TIME,
  START_GAME,
} from '../constants';

export function updateGameTime(dt) {
  return {
    type: UPDATE_GAME_TIME,
    payload: {
      dt,
    },
  };
}

export function startGame() {
  return {
    type: START_GAME,
  };
}
