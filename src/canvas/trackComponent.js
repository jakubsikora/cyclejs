import Component from './component';
import { updateTrackPosition } from '../actions';

// TODO move to store
let position = 0;

class TrackComponent extends Component {
  constructor(canvas) {
    super(canvas);

    this.track = [
      { x0: 0, y0: 20, x1: 1000, y1: 20 },
      { x0: 1000, y0: 20, x1: 1500, y1: 300 },
      { x0: 1500, y0: 300, x1: 2500, y1: 320 },
      { x0: 2500, y0: 320, x1: 4500, y1: 80 },
      { x0: 4500, y0: 80, x1: 25000, y1: 80 },
    ];
  }

  render(store) {
    position += 2;
    this.ctx.translate(-2, 0);

    this.track.forEach(item => {
      this.ctx.beginPath();
      this.ctx.moveTo(item.x0, this.canvas.height - item.y0);
      this.ctx.lineTo(item.x1, this.canvas.height - item.y1);
      this.ctx.stroke();
    });

    this.ctx.font = '12px Arial';
    this.ctx.fillText(`${parseInt(position, 10)} m`, position + 10, 50);

    const boundries = this.getBoundries(position);
    const point = this.calculateCrossingPoint(
      boundries.x1,
      boundries.y1,
      boundries.x0,
      boundries.y0,
      position
    );

    store.dispatch(updateTrackPosition(point));
  }

  calculateCrossingPoint(x0, y0, x1, y1, x) {
    const y = y0 - y1;
    const a = (y / (x1 - x0));

    return [x, (a * Math.abs(x - x0) + y0)];
  }

  getBoundries(currentX) {
    const trackPart = this.track.filter(item =>
      item.x0 <= currentX && item.x1 > currentX
    )[0];

    const index = this.track.indexOf(trackPart);

    return this.track[index];
  }
}

export default TrackComponent;
