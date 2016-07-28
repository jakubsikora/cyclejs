class Component {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  render() {
    throw new Error('Your component need to implement render() method');
  }
}

export default Component;
