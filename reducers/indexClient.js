import { combineReducers } from 'redux';
import keys from './keys';
import bike from './bike';
import track from './track';
import camera from './camera';
import game from './game';
import users from './users';
import games from './games';
import chat from './chat';

export default combineReducers({
  keys,
  bike,
  track,
  camera,
  game,
  users,
  games,
  chat,
});
