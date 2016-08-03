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
      return {
        ...state,
        totalOffset: state.totalOffset + action.payload.offset,
        offset: action.payload.offset,
      };
    default:
      return state;
  }
}
