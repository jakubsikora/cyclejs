import Component from './component';
import { TRACK_WIDTH } from '../constants';

class TrackComponent extends Component {
  constructor(canvas) {
    super(canvas);

    this.roadImageLoaded = true;
  }

  fillTrack(trackPoints) {
    if (this.roadImageLoaded) {
      const linePoints = [];

      trackPoints.forEach(item => {
        linePoints.push([item.x0, this.canvas.height - item.y0]);
      });

      trackPoints.reverse().forEach(item => {
        linePoints.push([item.x0, this.canvas.height - item.y0 - TRACK_WIDTH]);
      });

      this.ctx.fillStyle = '#ccc';
      this.ctx.beginPath();
      this.ctx.moveTo(linePoints[0][0], linePoints[0][1]);

      for (let i = 1; i < linePoints.length; i++) {
        this.ctx.lineTo(linePoints[i][0], linePoints[i][1]);
      }

      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  renderRoad(trackPoints) {
    this.ctx.strokeStyle = '#9e9995';

    trackPoints.forEach(item => {
      this.ctx.beginPath();
      this.ctx.moveTo(item.x0, this.canvas.height - item.y0);
      this.ctx.lineTo(item.x1, this.canvas.height - item.y1);
      this.ctx.lineWidth = 5;
      this.ctx.stroke();
    });

    trackPoints.forEach(item => {
      this.ctx.beginPath();
      this.ctx.moveTo(item.x0, this.canvas.height - item.y0 - TRACK_WIDTH);
      this.ctx.lineTo(item.x1, this.canvas.height - item.y1 - TRACK_WIDTH);
      this.ctx.lineWidth = 5;
      this.ctx.stroke();
    });

    this.ctx.strokeStyle = '#fff';
  }

  render(store) {
    const state = store.getState();

    this.renderRoad(state.track.points);
  }
}

export default TrackComponent;
