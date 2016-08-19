import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import client from './client.js';
import reducer from './reducers/index';
import Keys from './keys';
import raf from 'raf';
import canvas from './canvas';
import StageComponent from './canvas/stageComponent';
import BikeComponent from './canvas/bikeComponent';
import TrackComponent from './canvas/trackComponent';
import CameraComponent from './canvas/cameraComponent';
import {
  UPDATE_BIKE,
  UPDATE_CAMERA_OFFSET,
  UPDATE_GAME_TIME,
} from './actionTypes';
import { updateGameTime } from './actions/game';

class Game {
  constructor() {
    this.keys = new Keys();

    // Game state
    const logger = createLogger({
      predicate: (getState, action) =>
        action.type !== UPDATE_BIKE
        && action.type !== UPDATE_CAMERA_OFFSET
        && action.type !== UPDATE_GAME_TIME,
    });

    this.store = createStore(
      reducer,
      applyMiddleware(logger)
    );

    this.stage = null;
    this.bike = null;
    this.camera = null;
  }

  init() {
    const state = this.store.getState();

    this.setEventHandlers();

    if (state.game.started) {
      // Set the canvas components
      this.stage = new StageComponent(canvas);
      this.track = new TrackComponent(canvas);
      this.camera = new CameraComponent(canvas);
      this.bike = new BikeComponent(canvas);

      this.animate();
    }
  }

  animate() {
    const animateCallback = () => {
      this.render();
    };

    let lastTime;
    let dt;
    const that = this;

    raf(function tick() {
      const now = Date.now();
      dt = (now - lastTime) / 1000;

      that.store.dispatch(updateGameTime(dt));

      animateCallback();

      lastTime = now;
      raf(tick);
    });
  }

  render() {
    this.stage.render(this.store);
    this.camera.render(this.store);
    this.track.render(this.store);
    this.bike.render(this.store);
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
