import {
  INIT_BIKE,
  UPDATE_THRUST,
  UPDATE_LEFT,
  UPDATE_RIGHT,
  UPDATE_BIKE,
} from '../actionTypes';

const initialState = {
  size: [0, 0],
  position: [0, 0],
  velocity: [0, 0],
  forward: [0, 0],
  thrust: false,
  left: false,
  right: false,
  angleVelocity: 0,
  angle: 0,
};

const FRICTION_FACTOR = 0.02;

const angleToVector = angle => [Math.cos(angle), Math.sin(angle)];

function updatePosition(state) {
  // Friction udpate
  const velocity = [
    state.velocity[0] * (1 - FRICTION_FACTOR),
    state.velocity[1] * (1 - FRICTION_FACTOR),
  ];

  // Angle updated by keys
  let angleVelocity = state.angleVelocity;
  const left = state.left;
  const right = state.right;
  const thrust = state.thrust;

  if (left) {
    angleVelocity = -0.07;
  }

  if (right) {
    angleVelocity = 0.07;
  }

  const angle = state.angle + angleVelocity;
  const forward = angleToVector(angle);

  if (thrust) {
    velocity[0] += forward[0] * 0.15;
    velocity[1] += forward[1] * 0.15;
  }

  const position = [
    state.position[0] + velocity[0],
    state.position[1] + velocity[1],
  ];

  return { ...state, position, forward, angle, velocity, right, left };
}

export default function bike(state = initialState, action) {
  switch (action.type) {
    case INIT_BIKE:
      return { ...state, ...action.bike };
    case UPDATE_THRUST:
      return updatePosition({ ...state, thrust: action.thrust });
    case UPDATE_LEFT:
      return updatePosition({ ...state, left: action.left });
    case UPDATE_RIGHT:
      return updatePosition({ ...state, right: action.right });
    case UPDATE_BIKE:
      return updatePosition(state);
    default:
      return state;
  }
}
