import {
  METER_TO_PX,
  TRACK_SCREEN_OFFSET,
} from './constants';

export function generateTrack(data) {
  const trackPoints = [];
  let currentX = 0;
  let currentY = TRACK_SCREEN_OFFSET;

  data.forEach(item => {
    const x = parseInt(item.length * METER_TO_PX + currentX, 10);

    // Calculate elevation in degrees
    const angleDegree = Math.atan(item.elevation / 100);
    const b = x - currentX;

    const y = b * Math.tan(angleDegree) + currentY;

    trackPoints.push({
      x0: currentX,
      y0: currentY,
      x1: x,
      y1: y,
    });

    currentX = x;
    currentY = y;
  });

  return trackPoints;
}
