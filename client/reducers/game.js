import {
  UPDATE_GAME_TIME,
  START_GAME,
} from '../actionTypes';

const initialState = {
  started: false,
  dt: 0,
};

export default function game(state = initialState, action) {
  switch (action.type) {
    case UPDATE_GAME_TIME:
      return {
        ...state,
        dt: action.payload.dt,
      };
    case START_GAME:
      return {
        ...state,
        started: true,
      };
    default:
      return state;
  }
}
