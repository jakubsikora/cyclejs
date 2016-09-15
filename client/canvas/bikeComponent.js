import Component from './component';
import Sprite from './sprite';
import { updateBike } from '../../actions/bike';
import { updateCameraOffset } from '../../actions/camera';
import {
  METER_TO_PX,
  TRACK_SCREEN_OFFSET,
  BIKE_TRACK_OFFSET,
  BIKE_HEIGHT,
  BIKE_SPRITESHEET_WIDTH,
  BIKE_SPRITESHEET_HEIGHT,
} from '../../constants';

class BikeComponent extends Component {
  constructor(canvas) {
    super(canvas);

    this.bikeImage = new Image();
    this.bikeLoaded = false;

    this.bikeImage.onload = () => {
      this.bikeLoaded = true;

      this.bikeSprite = new Sprite({
        ctx: this.ctx,
        width: BIKE_SPRITESHEET_WIDTH,
        height: BIKE_SPRITESHEET_HEIGHT,
        image: this.bikeImage,
        numberOfFrames: 8,
        ticksPerFrame: 8,
        spritesheet: this.bikeImage,
        x: 0,
        y: BIKE_TRACK_OFFSET,
      });
    };

    this.bikeImage.src = '/assets/img/bike/spritesheet.png';

    // Local state for the bike position x-axis
    this.x = 0;
  }

  renderStats(state) {
    const statsMap = [
      {
        label: 'Velocity',
        value: `${state.bike.velocity} px/s`,
      },
      {
        label: 'Distance',
        value: `${parseInt(state.bike.position.back[0], 10)} px`,
      },
      {
        label: 'Elevation',
        value: `${parseInt((state.bike.position.front[1] - TRACK_SCREEN_OFFSET), 10)} px`,
      },
      {
        label: 'Position',
        value: `[${parseInt(state.bike.position.back[0], 10)}, ${parseInt(state.bike.position.back[1], 10)}] -> ` +
        `[${parseInt(state.bike.position.front[0], 10)}, ${parseInt(state.bike.position.front[1], 10)}]`,
      },
      {
        label: 'Force',
        value: `${parseInt(state.bike.force, 10)} N`,
      },
      {
        label: 'Delta time',
        value: `${state.game.dt}s`,
      },
      {
        label: 'Energy',
        value: `${parseInt(state.bike.energy, 10)}%`,
      },
      {
        label: 'Energy bars',
        value: `${state.bike.energyFuel}`,
      },
    ];

    const height = this.canvas.height
      - state.bike.position.front[1]
      - BIKE_HEIGHT;

    this.ctx.font = '11px Verdana';
    this.ctx.fillStyle = '#2ec16e';

    statsMap.forEach((item, index) => {
      this.ctx.fillText(
        `${item.label}: ${item.value}`,
        state.bike.position.back[0],
        height - (index + 1) * 20
      );
    });
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

    this.bikeSprite.render();
    this.ctx.restore();

    this.x += state.bike.velocity * state.game.dt;

    store.dispatch(updateBike(
      state.track.points, state.bike.velocity, state.bike.energy, this.x));

    if (this.x > this.canvas.width / 2) {
      store.dispatch(updateCameraOffset(state.bike.velocity * state.game.dt));
    }

    const speed = parseInt(state.bike.velocity / 180, 10);
    this.bikeSprite.speed = speed || 1;
    this.bikeSprite.update(state.game.dt);

    this.renderStats(state);
  }
}

export default BikeComponent;
