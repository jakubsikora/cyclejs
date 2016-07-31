import {
  increaseBikeVelocity,
  decreaseBikeVelocity,
} from './actions';

class Keys {
  down(event, store) {
    switch (event.code) {
      case 'ArrowUp':
        break;

      case 'ArrowDown':
        break;

      case 'ArrowLeft':
        store.dispatch(decreaseBikeVelocity());
        break;

      case 'ArrowRight':
        store.dispatch(increaseBikeVelocity());
        break;

      default:
    }
  }

  up(event, store) {
    switch (event.code) {
      case 'ArrowUp':
        break;

      case 'ArrowDown':
        break;

      case 'ArrowLeft':
        break;

      case 'ArrowRight':
        break;

      default:
    }
  }
}

export default Keys;
