import {
  UPDATE_CAMERA_OFFSET,
} from '../constants';

export function updateCameraOffset(offset) {
  return {
    type: UPDATE_CAMERA_OFFSET,
    payload: {
      offset,
    },
  };
}
