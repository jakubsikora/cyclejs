import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import reducer from './reducers/index';
import Keys from './keys';
import raf from 'raf';
import canvas from './canvas';
import StageComponent from './canvas/stageComponent';
import BikeComponent from './canvas/bikeComponent';
import TrackComponent from './canvas/trackComponent';
import { initBike } from './actions';
import { UPDATE_BIKE_POSITION } from './actionTypes';

class Game {
  constructor() {
    this.keys = new Keys();

    // Game state
    const logger = createLogger({
      predicate: (getState, action) =>
        action.type !== UPDATE_BIKE_POSITION,
    });

    this.store = createStore(
      reducer,
      applyMiddleware(logger)
    );

    this.stage = null;
    this.bike = null;
  }

  init() {
    console.log('Initializing game');

    // Set the canvas stage
    this.stage = new StageComponent(canvas);
    this.track = new TrackComponent(canvas);

    this.animate();

    this.setEventHandlers();

    // Initialize Hero
    this.initBike();
    this.bike = new BikeComponent(canvas);
  }

  initBike() {
    // TODO: for now i will use some random data
    this.store.dispatch(initBike({
      position: [this.stage.canvas.width / 2, this.stage.canvas.height / 2],
      size: [30, 30],
    }));
  }

  animate() {
    const animateCallback = () => {
      this.render();
    };

    raf(function tick() {
      animateCallback();

      raf(tick);
    });
  }

  render() {
    this.stage.render();
    this.bike.render(this.store);
    this.track.render(this.store);
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
