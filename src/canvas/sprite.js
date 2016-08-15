export default class Sprite {
  constructor(options) {
    this.frameIndex = options.frameIndex || 0;
    this.ticksPerFrame = options.ticksPerFrame || 0;
    this.spritesheet = options.spritesheet;
    this.ctx = options.ctx;
    this.width = options.width;
    this.height = options.height;
    this.numberOfFrames = options.numberOfFrames || 1;
    this.tickCount = 0;
    this.angle = options.angle || 0;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.speed = options.speed || 1;
  }

  update(dt) {
    this.tickCount += this.speed * dt;

    if (this.tickCount > (this.ticksPerFrame * dt)) {
      this.tickCount = 0;

      // If the current frame index is in range
      if (this.frameIndex < this.numberOfFrames - 1) {
        // Go to the next frame
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
  }

  render() {
    this.ctx.drawImage(
      this.spritesheet,
      this.frameIndex * this.width / this.numberOfFrames,
      0,
      this.width / this.numberOfFrames,
      this.height,
      this.x,
      this.y,
      this.width / this.numberOfFrames,
      this.height
    );
  }
}
