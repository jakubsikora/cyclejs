import Component from './component';
import { updateBikePosition, updateBike } from '../actions/bike';
import { updateCameraOffset } from '../actions/camera';
import {
  METER_TO_PX,
  TRACK_SCREEN_OFFSET,
} from '../constants';

import {
  BIKE_WIDTH,
  BIKE_HEIGHT,
} from '../constants';

class BikeComponent extends Component {
  constructor(canvas) {
    super(canvas);

    this.bikeImage = new Image();
    this.bikeLoaded = false;

    this.bikeImage.onload = () => {
      this.bikeLoaded = true;
    };

    this.bikeImage.src = '/assets/img/bike.png';

    // Local state for the bike position x-axis
    this.x = 0;
  }

  renderStats(state) {
    const height = this.canvas.height - state.bike.position.front[1] - 30;

    this.ctx.font = '11px Verdana';
    this.ctx.fillStyle = '#2ec16e';
    this.ctx.fillText(
      `Velocity: ${state.bike.velocity}`,
      state.bike.position.back[0], height - 170);
    this.ctx.fillText(
      `Distance: ${parseInt(state.bike.position.front[0] / METER_TO_PX, 10)}m`,
      state.bike.position.back[0], height - 150);
    this.ctx.fillText(
      `Elevation: ${parseInt((state.bike.position.front[1] - TRACK_SCREEN_OFFSET) / METER_TO_PX, 10)}m`,
      state.bike.position.back[0], height - 130);
    this.ctx.fillText(
      `Back pos: ${state.bike.position.back[0]}, ${state.bike.position.back[1]}`,
      state.bike.position.back[0], height - 110);
    this.ctx.fillText(
      `Front pos: ${state.bike.position.front[0]}, ${state.bike.position.front[1]}`,
      state.bike.position.back[0], height - 90);
  }

  render(store) {
    if (!this.bikeLoaded) return;

    const state = store.getState();

    const imagePosition = [
      state.bike.position.back[0],
      this.canvas.height - state.bike.position.back[1] - BIKE_HEIGHT,
    ];

    this.ctx.save();
    this.ctx.translate(imagePosition[0], imagePosition[1] + BIKE_HEIGHT);
    this.ctx.rotate(state.bike.angle);
    this.ctx.translate(0, 0);
    this.ctx.drawImage(
      this.bikeImage,
      0,
      -80,
      BIKE_WIDTH,
      BIKE_HEIGHT
    );
    this.ctx.restore();

    this.x += state.bike.velocity;

    store.dispatch(updateBike(state.track.points, this.x));
    if (this.x > this.canvas.width / 2) {
      store.dispatch(updateCameraOffset(state.bike.velocity));
    }

    this.renderStats(state);
  }
}

export default BikeComponent;
