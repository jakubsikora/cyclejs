import {
  INCREASE_BIKE_VELOCITY,
  DECREASE_BIKE_VELOCITY,
  UPDATE_BIKE,
  USE_ENERGY_FUEL,
} from '../actionTypes';

import {
  BIKE_IDLE_VELOCITY,
  ENERGY_INITIAL,
  HR_INITIAL,
} from '../constants';

const initialState = {
  position: {
    back: [0, 0],
    front: [0, 0],
  },
  velocity: BIKE_IDLE_VELOCITY,
  angle: 0,
  force: 0,
  energy: ENERGY_INITIAL,
  energyFuel: 3,
  hr: HR_INITIAL,
};

export default function bike(state = initialState, action) {
  switch (action.type) {
    case INCREASE_BIKE_VELOCITY:
      return { ...state,
        velocity: action.payload.velocity,
      };
    case DECREASE_BIKE_VELOCITY:
      return { ...state,
        velocity: action.payload.velocity,
      };
    case UPDATE_BIKE:
      return { ...state,
        angle: action.payload.angle,
        position: {
          back: action.payload.position.back,
          front: action.payload.position.front,
        },
        force: action.payload.force,
        energy: action.payload.energy,
        velocity: action.payload.velocity,
      };
    case USE_ENERGY_FUEL:
      return { ...state,
        energyFuel: action.payload.energyFuel,
        energy: action.payload.energy,
      };
    default:
      return state;
  }
}
