import Component from './component';

class StageComponent extends Component {
  constructor(canvas) {
    super(canvas);

    // Set canvas dimensions
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;
  }

  render() {
    // Wipe the canvas clean
    this.ctx.clearRect(0, 0, 20000, this.canvas.height);
  }
}

export default StageComponent;
