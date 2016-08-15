import {
  UPDATE_GAME_TIME,
} from '../actionTypes';

const initialState = {
  dt: 0,
};

export default function game(state = initialState, action) {
  switch (action.type) {
    case UPDATE_GAME_TIME:
      return {
        ...state,
        dt: action.payload.dt,
      };
    default:
      return state;
  }
}
