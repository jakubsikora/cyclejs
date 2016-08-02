import {
  UPDATE_CAMERA_OFFSET,
} from '../actionTypes';

export function updateCameraOffset(offset) {
  return {
    type: UPDATE_CAMERA_OFFSET,
    payload: {
      offset,
    },
  };
}
