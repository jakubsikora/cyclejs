import Component from './component';

const TRACK_WIDTH = 90;

class TrackComponent extends Component {
  constructor(canvas) {
    super(canvas);

    this.roadImage = new Image();
    this.roadImageLoaded = false;

    this.roadImage.onload = () => {
      this.roadImageLoaded = true;
    };

    this.roadImage.src = '/assets/img/road2.jpg';
  }

  generatePolygon(points) {
    if (this.roadImageLoaded) {
      const pattern = this.ctx.createPattern(this.roadImage, 'repeat');
      const linePoints = [];


      points.forEach(item => {
        linePoints.push([item.x0, this.canvas.height - item.y0]);
      });

      points.reverse().forEach(item => {
        linePoints.push([item.x0, this.canvas.height - item.y0 - TRACK_WIDTH]);
      });

      this.ctx.fillStyle = pattern;
      this.ctx.beginPath();
      this.ctx.moveTo(linePoints[0][0], linePoints[0][1]);

      for (let i = 1; i < linePoints.length; i++) {
        this.ctx.lineTo(linePoints[i][0], linePoints[i][1]);
      }

      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  render(store) {
    const state = store.getState();

    this.ctx.strokeStyle = '#9e9995';

    state.track.points.forEach(item => {
      this.ctx.beginPath();
      this.ctx.moveTo(item.x0, this.canvas.height - item.y0);
      this.ctx.lineTo(item.x1, this.canvas.height - item.y1);
      this.ctx.lineWidth = 15;
      this.ctx.stroke();
    });

    state.track.points.forEach(item => {
      this.ctx.beginPath();
      this.ctx.moveTo(item.x0, this.canvas.height - item.y0 - TRACK_WIDTH);
      this.ctx.lineTo(item.x1, this.canvas.height - item.y1 - TRACK_WIDTH);
      this.ctx.lineWidth = 15;
      this.ctx.stroke();
    });

    this.ctx.strokeStyle = '#fff';

    this.generatePolygon(state.track.points);
  }
}

export default TrackComponent;
