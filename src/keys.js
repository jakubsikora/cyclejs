import {
  increaseBikeVelocity,
  decreaseBikeVelocity,
  useEnergyFuel,
} from './actions/bike';

class Keys {
  down(event, store) {
    const state = store.getState();

    switch (event.code) {
      case 'ArrowUp':
        break;

      case 'ArrowDown':
        break;

      case 'ArrowLeft':
        store.dispatch(decreaseBikeVelocity(state.bike.velocity));
        break;

      case 'ArrowRight':
        store.dispatch(increaseBikeVelocity(state.bike.velocity));
        break;

      case 'KeyE':
        store.dispatch(useEnergyFuel(state.bike.energyFuel, state.bike.energy));
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
