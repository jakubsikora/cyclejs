import Component from './component';
import { updateBikePosition } from '../actions/bike';
import { updateCameraOffset } from '../actions/camera';

class BikeComponent extends Component {
  constructor(canvas) {
    super(canvas);

    this.image = new Image();
    this.loaded = false;

    this.image.onload = () => {
      this.loaded = true;
    };

    this.image.src = '/assets/img/bike.png';

    // Local state for the bike position x-axis
    this.backX = 0;
    this.frontX = 0;
  }

  getBoundries(points, currentX) {
    const trackPart = points.filter(item =>
      item.x0 <= currentX && item.x1 > currentX
    )[0];

    const index = points.indexOf(trackPart);

    return points[index];
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

  calculatePosition(velocity, store) {
    if (this.backX > this.canvas.width / 3) {
      this.backX += velocity;
      store.dispatch(updateCameraOffset(velocity));
    } else {
      // Idle till the middle of the screen
      this.backX += 1;
    }
  }

  calculateTrackAngle(frontPoint, backPoint) {
    // Calculate length between points
    const x = Math.pow((frontPoint[0] - backPoint[0]), 2);
    const y = Math.pow((frontPoint[1] - backPoint[1]), 2);
    const pointsLength = Math.sqrt(x + y);

    // Calculate base length
    const baseX = Math.pow((frontPoint[0] - backPoint[0]), 2);
    const baseY = Math.pow((backPoint[1] - backPoint[1]), 2);
    const baseLength = Math.sqrt(baseX + baseY);

    // Calculate cosinus between these 2 lengths
    const cosinus = baseLength / pointsLength;

    let angleRadians = Math.acos(cosinus);

    // Depends of level decide how the angle should be represent
    if ((frontPoint[1] - backPoint[1]) > 0) {
      angleRadians = -angleRadians;
    }

    return angleRadians;
  }

  calculateCrossingPoint(x0, y0, x1, y1, x) {
    const y = y0 - y1;
    const a = (y / (x1 - x0));

    return [x, (a * Math.abs(x - x0) + y0)];
  }

  renderStats(state) {
    const height = this.canvas.height - state.bike.position.front[1] - 30;

    this.ctx.font = '11px Verdana';
    this.ctx.fillStyle = '#2ec16e';
    this.ctx.fillText(
      `Velocity: ${state.bike.velocity}`,
      state.bike.position.back[0], height - 150);
    this.ctx.fillText(
      `Back pos: ${state.bike.position.back[0]}, ${state.bike.position.back[1]}`,
      state.bike.position.back[0], height - 130);
    this.ctx.fillText(
      `Front pos: ${state.bike.position.front[0]}, ${state.bike.position.front[1]}`,
      state.bike.position.back[0], height - 110);
  }

  render(store) {
    if (!this.loaded) return;

    const size = {
      width: 96,
      height: 57,
    };

    const state = store.getState();

    this.calculatePosition(state.bike.velocity, store);

    this.frontX = this.backX + size.width - 25;

    const imagePosition = [
      state.bike.position.back[0],
      this.canvas.height - state.bike.position.back[1] - size.height - 2,
    ];

    const backPoint = this.getPoint(state.track.points, this.backX);
    const frontPoint = this.getPoint(state.track.points, this.frontX);
    const angle = this.calculateTrackAngle(frontPoint, backPoint);

    this.ctx.save();
    this.ctx.translate(imagePosition[0], imagePosition[1] + size.height);
    this.ctx.rotate(angle);
    this.ctx.translate(0, 0);
    this.ctx.drawImage(
      this.image,
      0,
      -80,
      size.width,
      size.height
    );
    this.ctx.restore();

    store.dispatch(updateBikePosition({
      back: backPoint,
      front: frontPoint,
    }));

    this.renderStats(state);
  }
}

export default BikeComponent;
