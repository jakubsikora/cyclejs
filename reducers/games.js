import {
  ADD_GAME,
  UPDATE_GAMES,
  ADD_GAME_USER,
  REMOVE_USER,
} from '../constants';

const game = (state, action) => {
  switch (action.type) {
    case ADD_GAME:
      return {
        name: action.payload.game.name,
        users: action.payload.game.users,
      };
    case ADD_GAME_USER:
      if (state.name !== action.payload.name) {
        return state;
      }

      state.users.push(action.payload.user);

      return state;
    case REMOVE_USER:
      if (state.name !== action.payload.gameName) {
        return state;
      }

      return {
        ...state,
        users: state.users.filter(u => u.id !== action.payload.userId),
      };
    default:
      return state;
  }
};

const initialState = {
  localGame: undefined,
  list: [],
};

const games = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GAME:
      return {
        ...state,
        localGame: action.payload.game.name,
        list: [
          ...state.list,
          game(undefined, action),
        ],
      };
    case UPDATE_GAMES:
      return {
        ...state,
        list: action.payload.list,
      };
    case ADD_GAME_USER:
      return {
        ...state,
        list: state.list.map(g => game(g, action)),
      };
    case REMOVE_USER:
      return {
        ...state,
        list: state.list.map(g => game(g, action)),
      };
    default:
      return state;
  }
};

export default games;
