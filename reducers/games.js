import {
  ADD_GAME,
  UPDATE_GAMES,
  ADD_GAME_USER,
  REMOVE_USER,
  LEAVE_GAME,
  DEFAULT_ROOM,
} from '../constants';

// Check if the game is ready to be removed
const gameNeeded = (state) => (
  {
    ...state,
    list: state.list.filter(g => (g.users.length || g.name === DEFAULT_ROOM)),
  }
);

const game = (state, action) => {
  switch (action.type) {
    case ADD_GAME:
      return {
        name: action.payload.game.name,
        users: [],
      };

    case ADD_GAME_USER:
      if (state.name !== action.payload.name) {
        return state;
      }

      const users = state.users.map(user => user);
      users.push(action.payload.user);

      return {
        ...state,
        users,
      };
    case REMOVE_USER:
      if (state.name !== action.payload.gameName) {
        return state;
      }

      return {
        ...state,
        users: state.users.filter(u => u.id !== action.payload.userId),
      };

    case LEAVE_GAME:
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
  let newState;

  switch (action.type) {
    case ADD_GAME:
      return {
        ...state,
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
        localGame: action.payload.name,
        list: state.list.map(g => game(g, action)),
      };
    case REMOVE_USER:
      newState = {
        ...state,
        list: state.list.map(g => game(g, action)),
      };

      return gameNeeded(newState);
    case LEAVE_GAME:
      newState = {
        ...state,
        list: state.list.map(g => game(g, action)),
      };

      return gameNeeded(newState);
    default:
      return state;
  }
};

export default games;
