import Component from './component';

class CameraComponent extends Component {
  render(store) {
    const state = store.getState();

    this.ctx.translate(-state.camera.offset, 0);

    this.ctx.font = '12px Verdana';
    this.ctx.fillStyle = '#ff0000';
    this.ctx.fillText(
      `Total offset: ${state.camera.totalOffset}`,
      state.camera.totalOffset + 10, 50);
    this.ctx.fillText(
      `Current offset: ${state.camera.offset}`,
      state.camera.totalOffset + 10, 70);
  }
}

export default CameraComponent;
