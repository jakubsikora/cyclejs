import canvas from './canvas';

class Sprite {
  constructor() {
    this.ctx = canvas.getContext('2d');
    this.collisions = {
      canvas: false,
    };
  }

  collisions() {
    this.canvasCollisions();
  }

  canvasCollisions() {
    if (!this.collisions.canvas) {
      if (this.pos[0] > canvas.width) {
        this.pos[0] = this.pos[0] % canvas.width;
      } else if (this.pos[0] < 0) {
        this.pos[0] = canvas.width + (this.pos[0] % canvas.width);
      }

      if (this.pos[1] > canvas.height) {
        this.pos[1] = this.pos[1] % canvas.height;
      } else if (this.pos[1] < 0) {
        this.pos[1] = canvas.height + (this.pos[1] % canvas.height);
      }
    }
  }
}

export default Sprite;
