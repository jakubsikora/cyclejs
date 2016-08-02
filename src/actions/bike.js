import {
  INIT_BIKE,
  UPDATE_BIKE_POSITION,
  INCREASE_BIKE_VELOCITY,
  DECREASE_BIKE_VELOCITY,
} from '../actionTypes';

export function initBike(bike) {
  return {
    type: INIT_BIKE,
    bike,
  };
}

export function updateBikePosition(position) {
  return {
    type: UPDATE_BIKE_POSITION,
    payload: {
      position,
    },
  };
}

export function increaseBikeVelocity() {
  return {
    type: INCREASE_BIKE_VELOCITY,
  };
}

export function decreaseBikeVelocity() {
  return {
    type: DECREASE_BIKE_VELOCITY,
  };
}
