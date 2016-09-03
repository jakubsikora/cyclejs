import { combineReducers } from 'redux';
import keys from './keys';
import bike from './bike';
import track from './track';
import camera from './camera';
import game from './game';
import users from './users';
import rooms from './rooms';

export default combineReducers({
  keys,
  bike,
  track,
  camera,
  game,
  users,
  rooms,
});
