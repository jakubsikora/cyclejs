import Component from './component';

class StageComponent extends Component {
  constructor(canvas) {
    super(canvas);

    // Set canvas dimensions
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;
  }

  render(store) {
    const state = store.getState();

    // Get last point of the track
    const endTrackPoint = state.track.points[state.track.points.length - 1].x1;

    // Wipe the canvas clean
    this.ctx.clearRect(0, 0, endTrackPoint, this.canvas.height);
  }
}

export default StageComponent;
