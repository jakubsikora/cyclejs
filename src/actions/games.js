import {
  ADD_GAME,
  UPDATE_GAMES,
} from '../actionTypes';

export function addGame(game) {
  return {
    type: ADD_GAME,
    payload: { ...game },
  };
}

export function updateGames(games, localGame) {
  const parsedGames = games.map(game => (
    { ...game, isLocal: game.name === localGame }
  ));

  return {
    type: UPDATE_GAMES,
    payload: {
      games: parsedGames,
    },
  };
}
