import Component from './component';

class TrackComponent extends Component {
  render(store) {
    const state = store.getState();
    const TRACK_WIDTH = 70;

    state.track.points.forEach(item => {
      this.ctx.beginPath();
      this.ctx.moveTo(item.x0, this.canvas.height - item.y0);
      this.ctx.lineTo(item.x1, this.canvas.height - item.y1);
      this.ctx.stroke();
    });

    state.track.points.forEach(item => {
      this.ctx.beginPath();
      this.ctx.moveTo(item.x0, this.canvas.height - item.y0 - TRACK_WIDTH);
      this.ctx.lineTo(item.x1, this.canvas.height - item.y1 - TRACK_WIDTH);
      this.ctx.stroke();
    });
  }
}

export default TrackComponent;
