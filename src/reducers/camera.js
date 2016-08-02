import {
  UPDATE_CAMERA_OFFSET,
} from '../actionTypes';

const initialState = {
  totalOffset: 0,
  offset: 0,
};

export default function camera(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CAMERA_OFFSET:
      const newTotalOffset = state.totalOffset + action.payload.offset;

      return {
        ...state,
        totalOffset: newTotalOffset,
        offset: action.payload.offset,
      };
    default:
      return state;
  }
}
