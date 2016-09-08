import {
  PRESS_UP,
  RELEASE_UP,
  PRESS_DOWN,
  RELEASE_DOWN,
  PRESS_LEFT,
  RELEASE_LEFT,
  PRESS_RIGHT,
  RELEASE_RIGHT,
} from '../actionTypes';

const initialState = { up: false, down: false, right: false, left: false };

export default function keys(state = initialState, action) {
  switch (action.type) {
    case PRESS_UP:
      return { ...state, up: true };
    case RELEASE_UP:
      return { ...state, up: false };
    case PRESS_DOWN:
      return { ...state, down: true };
    case RELEASE_DOWN:
      return { ...state, down: false };
    case PRESS_LEFT:
      return { ...state, left: true };
    case RELEASE_LEFT:
      return { ...state, left: false };
    case PRESS_RIGHT:
      return { ...state, right: true };
    case RELEASE_RIGHT:
      return { ...state, right: false };
    default:
      return state;
  }
}
