import {
  INIT_BIKE,
  UPDATE_BIKE_POSITION,
  INCREASE_BIKE_VELOCITY,
  DECREASE_BIKE_VELOCITY,
  UPDATE_BIKE,
} from '../actionTypes';

import {
  BIKE_IDLE_VELOCITY,
  BIKE_MAX_VELOCITY,
} from '../constants';

const initialState = {
  position: {
    back: [0, 0],
    front: [0, 0],
  },
  velocity: BIKE_IDLE_VELOCITY,
  angle: 0,
};

const velocityFactor = 0.5;

export default function bike(state = initialState, action) {
  let velocity;

  switch (action.type) {
    case INCREASE_BIKE_VELOCITY:
      velocity = state.velocity;

      if (state.velocity < BIKE_MAX_VELOCITY) {
        velocity = state.velocity + velocityFactor;
      }

      return { ...state, velocity };
    case DECREASE_BIKE_VELOCITY:
      velocity = state.velocity;

      if (state.velocity > BIKE_IDLE_VELOCITY) {
        velocity = state.velocity - velocityFactor;
      }

      return { ...state, velocity };
    case UPDATE_BIKE:
      const back = [
        parseInt(action.payload.position.back[0], 10),
        parseInt(action.payload.position.back[1], 10),
      ];

      const front = [
        parseInt(action.payload.position.front[0], 10),
        parseInt(action.payload.position.front[1], 10),
      ];

      return { ...state,
        angle: action.payload.angle,
        position: {
          back, front
        }
      };
    default:
      return state;
  }
}
