import {
  PRESS_UP,
  RELEASE_UP,
  PRESS_DOWN,
  RELEASE_DOWN,
  PRESS_LEFT,
  RELEASE_LEFT,
  PRESS_RIGHT,
  RELEASE_RIGHT,
  INIT_HERO,
  UPDATE_THRUST,
  UPDATE_LEFT,
  UPDATE_RIGHT,
  UPDATE_HERO,
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

export function initHero(hero) {
  return {
    type: INIT_HERO,
    hero,
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

export function updateHero() {
  return {
    type: UPDATE_HERO,
  };
}
