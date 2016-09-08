import {
  ADD_GAME,
  UPDATE_GAMES,
  ADD_GAME_USER,
} from '../constants';

export function addGame(game) {
  return {
    type: ADD_GAME,
    payload: {
      game,
    },
  };
}

export function updateGames(list) {
  return {
    type: UPDATE_GAMES,
    payload: {
      list,
    },
  };
}

export function addGameUser(name, user) {
  return {
    type: ADD_GAME_USER,
    payload: {
      name,
      user,
    },
  };
}
