import Component from './component';

// TODO move to store
let position = 0;

class TrackComponent extends Component {
  constructor(canvas) {
    super(canvas);

    this.track = [
      { x0: 0, y0: 20, x1: 1000, y1: 120 },
      { x0: 1000, y0: 120, x1: 1500, y1: 80 },
      { x0: 1500, y0: 80, x1: 25000, y1: 80 },
    ];
  }

  render() {
    position += 1;
    this.ctx.translate(-1, 0);

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

    console.log(boundries, point);

    this.ctx.fillStyle = '#FF0000';
    this.ctx.fillRect(point[0], this.canvas.height - point[1], 10, 10);
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
