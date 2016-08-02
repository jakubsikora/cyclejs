import {
  INIT_BIKE,
  UPDATE_BIKE_POSITION,
  INCREASE_BIKE_VELOCITY,
  DECREASE_BIKE_VELOCITY,
} from '../actionTypes';

const initialState = {
  position: [0, 0],
  velocity: 1,
};

const velocityFactor = 0.5;

export default function bike(state = initialState, action) {
  let newVelocity;

  switch (action.type) {
    case INIT_BIKE:
      return { ...state, ...action.bike };
    case UPDATE_BIKE_POSITION:
      return { ...state, position: action.payload.position };
    case INCREASE_BIKE_VELOCITY:
      if (state.velocity < 10) {
        newVelocity = state.velocity + velocityFactor;
      } else {
        newVelocity = 10;
      }

      return { ...state, velocity: newVelocity };
    case DECREASE_BIKE_VELOCITY:
      if (state.velocity > 0) {
        newVelocity = state.velocity - velocityFactor;
      } else {
        newVelocity = 0;
      }

      return { ...state, velocity: newVelocity };
    default:
      return state;
  }
}
