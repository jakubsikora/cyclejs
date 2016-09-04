import {
  ADD_GAME,
  UPDATE_GAMES,
} from '../actionTypes';

const game = (state, action) => {
  switch (action.type) {
    case ADD_GAME:
      return {
        id: action.payload.id,
        name: action.payload.username,
        users: action.payload.users,
      };

    default:
      return state;
  }
};

const initialState = [];

const games = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GAME:
      return [
        ...state,
        game(undefined, action),
      ];
    case UPDATE_GAMES:
      return action.payload.games;
    default:
      return state;
  }
};

export default games;
