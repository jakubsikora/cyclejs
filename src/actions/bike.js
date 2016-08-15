import {
  INIT_BIKE,
  INCREASE_BIKE_VELOCITY,
  DECREASE_BIKE_VELOCITY,
  UPDATE_BIKE,
} from '../actionTypes';

import {
  BIKE_WIDTH,
  BIKE_MAX_VELOCITY,
  BIKE_VELOCITY_FACTOR,
  BIKE_IDLE_VELOCITY,
} from '../constants';

export function initBike(bike) {
  return {
    type: INIT_BIKE,
    bike,
  };
}

export function increaseBikeVelocity(velocity) {
  let newVelocity = velocity;

  if (velocity < BIKE_MAX_VELOCITY) {
    newVelocity = velocity + BIKE_VELOCITY_FACTOR;
  }

  return {
    type: INCREASE_BIKE_VELOCITY,
    payload: {
      velocity: newVelocity,
    },
  };
}

export function decreaseBikeVelocity(velocity) {
  let newVelocity = velocity;

  if (velocity > BIKE_IDLE_VELOCITY) {
    newVelocity = velocity - BIKE_VELOCITY_FACTOR;
  }

  return {
    type: DECREASE_BIKE_VELOCITY,
    payload: {
      velocity: newVelocity,
    },
  };
}

function getBoundries(points, currentX) {
  const trackPart = points.filter(item =>
    item.x0 <= currentX && item.x1 > currentX
  )[0];

  const index = points.indexOf(trackPart);

  return points[index];
}

function calculateCrossingPoint(x0, y0, x1, y1, x) {
  const y = y0 - y1;
  const a = (y / (x1 - x0));

  return [x, (a * Math.abs(x - x0) + y0)];
}

function getPosition(trackPoints, x) {
  const boundries = getBoundries(trackPoints, x);

  return calculateCrossingPoint(
    boundries.x1,
    boundries.y1,
    boundries.x0,
    boundries.y0,
    x
  );
}

function calculateTrackAngle(frontPosition, backPosition) {
  // Calculate length between points
  const x = Math.pow((frontPosition[0] - backPosition[0]), 2);
  const y = Math.pow((frontPosition[1] - backPosition[1]), 2);
  const pointsLength = Math.sqrt(x + y);

  // Calculate base length
  const baseX = Math.pow((frontPosition[0] - backPosition[0]), 2);
  const baseY = Math.pow((backPosition[1] - backPosition[1]), 2);
  const baseLength = Math.sqrt(baseX + baseY);

  // Calculate cosinus between these 2 lengths
  const cosinus = baseLength / pointsLength;

  let angleRadians = Math.acos(cosinus);

  // Depends of level decide how the angle should be represent
  if ((frontPosition[1] - backPosition[1]) > 0) {
    angleRadians = -angleRadians;
  }

  return angleRadians;
}

function calculateStamina(stamina, force, velocity) {
  // TODO: recovering
  // if (velocity === BIKE_IDLE_VELOCITY) return stamina;

  const foo = force * 0.001;
  return stamina + foo;
}

export function updateBike(trackPoints, velocity, stamina, x) {
  const back = getPosition(trackPoints, x);
  const front = getPosition(trackPoints, x + BIKE_WIDTH);
  const angle = calculateTrackAngle(front, back);

  // TODO: mass
  const G = 86 * 10;
  const force = G * Math.sin(angle);

  const updatedStamina = calculateStamina(stamina, force, velocity);

  return {
    type: UPDATE_BIKE,
    payload: {
      angle,
      position: {
        back,
        front,
      },
      force,
      stamina: updatedStamina,
    },
  };
}
