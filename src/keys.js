import {
  updateThrust,
  updateLeft,
  updateRight,
} from './actions';

class Keys {
  down(event, store) {
    switch (event.code) {
      case 'ArrowUp':
        store.dispatch(updateThrust(true));
        break;

      case 'ArrowDown':
        break;

      case 'ArrowLeft':
        store.dispatch(updateLeft(true));
        break;

      case 'ArrowRight':
        store.dispatch(updateRight(true));
        break;

      default:
    }
  }

  up(event, store) {
    switch (event.code) {
      case 'ArrowUp':
        store.dispatch(updateThrust(false));
        break;

      case 'ArrowDown':
        break;

      case 'ArrowLeft':
        store.dispatch(updateLeft(false));
        break;

      case 'ArrowRight':
        store.dispatch(updateRight(false));
        break;

      default:
    }
  }
}

export default Keys;
