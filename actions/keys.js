import {
  PRESS_UP,
  RELEASE_UP,
  PRESS_DOWN,
  RELEASE_DOWN,
  PRESS_LEFT,
  RELEASE_LEFT,
  PRESS_RIGHT,
  RELEASE_RIGHT,
} from '../constants';

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
