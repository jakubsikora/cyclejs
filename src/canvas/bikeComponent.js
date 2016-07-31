import Component from './component';
import { updateBikePosition } from '../actions';

// TODO move to store
let rearPosition = 0;
let frontPosition = 0;

class BikeComponent extends Component {
  constructor(canvas) {
    super(canvas);

    this.image = new Image();
    this.loaded = false;

    this.image.onload = () => {
      this.loaded = true;
    };

    this.image.src = '/assets/img/bike.png';
  }

  render(store) {
    if (!this.loaded) return;

    const size = {
      width: 96,
      height: 57,
    };

    const state = store.getState();

    rearPosition += 1;
    frontPosition = rearPosition + size.width - 25;

    this.ctx.translate(-state.bike.velocity, 0);


    const imagePosition = [
      state.bike.position[0],
      this.canvas.height - state.bike.position[1] - size.height - 2,
    ];


    const rearPoint = this.getPoint(state.track.points, rearPosition);
    const frontPoint = this.getPoint(state.track.points, frontPosition);
    const angle = this.calculateTrackAngle(frontPoint, rearPoint);

    this.ctx.font = '12px Arial';
    this.ctx.fillText(`${rearPoint[0]}, ${rearPoint[1]}`, 0, 50);
    this.ctx.fillText(`${frontPoint[0]}, ${frontPoint[1]}`, 0, 70);
    this.ctx.fillText(`${state.bike.velocity}`, 0, 90);

    this.ctx.save();
    this.ctx.translate(imagePosition[0], imagePosition[1] + size.height);
    this.ctx.rotate(angle);

    this.ctx.translate(0, - size.height);

    this.ctx.drawImage(
      this.image,
      0,
      -30,
      size.width,
      size.height
    );

    this.ctx.restore();


    store.dispatch(updateBikePosition(rearPoint));
  }

  calculateTrackAngle(frontPoint, rearPoint) {
    // Calculate length between points
    const x = Math.pow((frontPoint[0] - rearPoint[0]), 2);
    const y = Math.pow((frontPoint[1] - rearPoint[1]), 2);
    const pointsLength = Math.sqrt(x + y);

    // Calculate base length
    const baseX = Math.pow((frontPoint[0] - rearPoint[0]), 2);
    const baseY = Math.pow((rearPoint[1] - rearPoint[1]), 2);
    const baseLength = Math.sqrt(baseX + baseY);

    // Calculate cosinus between these 2 lengths
    const cosinus = baseLength / pointsLength;

    let angleRadians = Math.acos(cosinus);

    // Depends of level decide how the angle should be represent
    if ((frontPoint[1] - rearPoint[1]) > 0) {
      angleRadians = -angleRadians;
    }

    return angleRadians;
  }

  getPoint(trackPoints, position) {
    const boundries = this.getBoundries(trackPoints, position);

    return this.calculateCrossingPoint(
      boundries.x1,
      boundries.y1,
      boundries.x0,
      boundries.y0,
      position
    );
  }

  calculateCrossingPoint(x0, y0, x1, y1, x) {
    const y = y0 - y1;
    const a = (y / (x1 - x0));

    return [x, (a * Math.abs(x - x0) + y0)];
  }

  getBoundries(points, currentX) {
    const trackPart = points.filter(item =>
      item.x0 <= currentX && item.x1 > currentX
    )[0];

    const index = points.indexOf(trackPart);

    return points[index];
  }
}

export default BikeComponent;
