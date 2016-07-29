import {
  UPDATE_TRACK_POSITION,
} from '../actionTypes';

const initialState = {
  position: [0, 0],
};

export default function track(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TRACK_POSITION:
      return { ...state, position: action.position };
    default:
      return state;
  }
}
