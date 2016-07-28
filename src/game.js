import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import reducer from './reducers/index';
import Keys from './keys';
import raf from 'raf';
import canvas from './canvas';
import StageComponent from './canvas/stageComponent';
import HeroComponent from './canvas/heroComponent';
import TrackComponent from './canvas/trackComponent';
import { initHero, updateHero } from './actions';
import { UPDATE_HERO } from './actionTypes';

class Game {
  constructor() {
    this.keys = new Keys();

    // Game state
    const logger = createLogger({
      predicate: (getState, action) => action.type !== UPDATE_HERO,
    });

    this.store = createStore(
      reducer,
      applyMiddleware(logger)
    );

    this.stage = null;
    this.hero = null;
  }

  init() {
    console.log('Initializing game');

    // Set the canvas stage
    this.stage = new StageComponent(canvas);
    this.track = new TrackComponent(canvas);

    this.animate();

    this.setEventHandlers();

    // Initialize Hero
    this.initHero();
    this.hero = new HeroComponent(canvas);
  }

  initHero() {
    // TODO: for now i will use some random data
    this.store.dispatch(initHero({
      position: [this.stage.canvas.width / 2, this.stage.canvas.height / 2],
      size: [30, 30],
    }));
  }

  animate() {
    const animateCallback = () => {
      this.store.dispatch(updateHero());
      this.render();
    };

    raf(function tick() {
      animateCallback();

      raf(tick);
    });
  }

  render() {
    this.stage.render();
    // this.hero.render(this.store.getState());
    this.track.render(this.store.getState());
  }

  setEventHandlers() {
    window.addEventListener('keydown', (e) => {
      this.keys.down(e, this.store);
    }, false);

    window.addEventListener('keyup', (e) => {
      this.keys.up(e, this.store);
    }, false);
  }
}

export default new Game();
