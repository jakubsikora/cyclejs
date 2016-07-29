import {
  PRESS_UP,
  RELEASE_UP,
  PRESS_DOWN,
  RELEASE_DOWN,
  PRESS_LEFT,
  RELEASE_LEFT,
  PRESS_RIGHT,
  RELEASE_RIGHT,
  INIT_BIKE,
  UPDATE_THRUST,
  UPDATE_LEFT,
  UPDATE_RIGHT,
  UPDATE_BIKE,
  UPDATE_TRACK_POSITION,
} from './actionTypes';

export function pressUp() {
  return {
    type: PRESS_UP,
  };
}

export function releaseUp() {
  return {
    type: RELEASE_UP,
  };
}

export function pressDown() {
  return {
    type: PRESS_DOWN,
  };
}

export function releaseDown() {
  return {
    type: RELEASE_DOWN,
  };
}

export function pressLeft() {
  return {
    type: PRESS_LEFT,
  };
}

export function releaseLeft() {
  return {
    type: RELEASE_LEFT,
  };
}

export function pressRight() {
  return {
    type: PRESS_RIGHT,
  };
}

export function releaseRight() {
  return {
    type: RELEASE_RIGHT,
  };
}

export function initBike(bike) {
  return {
    type: INIT_BIKE,
    bike,
  };
}

export function updateThrust(thrust) {
  return {
    type: UPDATE_THRUST,
    thrust,
  };
}

export function updateLeft(left) {
  return {
    type: UPDATE_LEFT,
    left,
  };
}

export function updateRight(right) {
  return {
    type: UPDATE_RIGHT,
    right,
  };
}

export function updateBike() {
  return {
    type: UPDATE_BIKE,
  };
}

export function updateTrackPosition(position) {
  return {
    type: UPDATE_TRACK_POSITION,
    position,
  };
}
