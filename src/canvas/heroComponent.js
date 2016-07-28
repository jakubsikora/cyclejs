import Component from './component';

class HeroComponent extends Component {
  constructor(canvas) {
    super(canvas);

    this.image = new Image();
    this.loaded = false;

    this.image.onload = () => {
      this.loaded = true;
    };

    this.image.src = '/assets/img/bike.png';
  }

  render(state) {
    if (!this.loaded) return;

    this.ctx.drawImage(
      this.image,
      100,
      100
    );
  }

  renderHeroDebug(state) {
    // function canvasArrow(context, fromx, fromy, tox, toy) {
    //   const headlen = 10;   // length of head in pixels
    //   const angle = Math.atan2(toy - fromy, tox - fromx);

    //   context.moveTo(fromx, fromy);
    //   context.lineTo(tox, toy);
    //   context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    //   context.moveTo(tox, toy);
    //   context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    // }

    // const cx = state.hero.position[0] + (state.hero.size[0] / 2);
    // const cy = state.hero.position[1] + (state.hero.size[1] / 2);

    // const x = cx + state.hero.velocity[0] * 20;
    // const y = cy + state.hero.velocity[1] * 20;

    // this.ctx.beginPath();
    // this.ctx.lineWidth = 1;
    // this.ctx.strokeStyle = '#6aff00';

    // canvasArrow(this.ctx, cx, cy, x, y);

    // this.ctx.stroke();
  }
}

export default HeroComponent;
