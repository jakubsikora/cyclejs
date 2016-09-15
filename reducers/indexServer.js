import { combineReducers } from 'redux';
import users from './users';
import games from './games';
import chat from './chat';

export default combineReducers({
  users,
  games,
  chat,
});
