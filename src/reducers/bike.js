import {
  INIT_BIKE,
  UPDATE_BIKE_POSITION,
  INCREASE_BIKE_VELOCITY,
  DECREASE_BIKE_VELOCITY,
} from '../actionTypes';

const initialState = {
  position: {
    back: [0, 0],
    front: [0, 0],
  },
  velocity: 1,
};

const velocityFactor = 0.5;

export default function bike(state = initialState, action) {
  let newVelocity;

  switch (action.type) {
    case UPDATE_BIKE_POSITION:
      // Convert to int
      const back = [
        parseInt(action.payload.position.back[0], 10),
        parseInt(action.payload.position.back[1], 10),
      ];

      const front = [
        parseInt(action.payload.position.front[0], 10),
        parseInt(action.payload.position.front[1], 10),
      ];

      return { ...state, position: { back, front } };
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
