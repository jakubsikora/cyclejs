import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import reducer from './reducers/index';
import Keys from './keys';
import raf from 'raf';
import canvas from './canvas';
import StageComponent from './canvas/stageComponent';
import BikeComponent from './canvas/bikeComponent';
import TrackComponent from './canvas/trackComponent';
import CameraComponent from './canvas/cameraComponent';
import { initBike } from './actions/bike';
import {
  UPDATE_BIKE_POSITION,
  UPDATE_CAMERA_OFFSET,
} from './actionTypes';

class Game {
  constructor() {
    this.keys = new Keys();

    // Game state
    const logger = createLogger({
      predicate: (getState, action) =>
        action.type !== UPDATE_BIKE_POSITION
        && action.type !== UPDATE_CAMERA_OFFSET,
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
    // Set the canvas components
    this.stage = new StageComponent(canvas);
    this.track = new TrackComponent(canvas);
    this.camera = new CameraComponent(canvas);
    this.bike = new BikeComponent(canvas);

    this.animate();
    this.setEventHandlers();
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
