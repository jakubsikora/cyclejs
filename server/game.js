import { applyMiddleware, createStore } from 'redux';
import createNodeLogger from 'redux-node-logger';
import SocketBase from './socket';
import reducers from '../reducers/indexServer';
import { addUser, updateUsers, removeUser } from '../actions/users';
import { addMessage, updateMessages } from '../actions/chat';
import { addGame, addGameUser, updateGames, leaveGame } from '../actions/games';
import {
  SERVER,
  DEFAULT_ROOM,
  GAME_LIST_VIEW,
  CHAT_MESSAGE_VIEW,
  CHAT_MESSAGES_VIEW,
} from '../constants';

class Game extends SocketBase {
  constructor(io) {
    super(io);

    this.gameRooms = [];

    this.store = createStore(
      reducers
      // applyMiddleware(createNodeLogger())
    );

    this.sockets = [];

    this.initGame(DEFAULT_ROOM);
  }

  setEventsHandler(socket) {
    this.sockets.push(socket);

    const addUserHandler = this.addUser.bind(this, socket);
    const disconnectHandler = this.disconnect.bind(this, socket);
    const createGameHandler = this.createGame.bind(this, socket);
    const changeGameHandler = this.changeGame.bind(this, socket);
    const pingHandler = this.ping.bind(this, socket);
    const addChatMessageHandler = this.sendChatToAll.bind(this);

    socket.on('adduser', addUserHandler);
    socket.on('disconnect', disconnectHandler);
    socket.on('creategame', createGameHandler);
    socket.on('changegame', changeGameHandler);
    socket.on('ping-client', pingHandler);
    socket.on('chatmessage', addChatMessageHandler);
    // this.socket.on('dispatch', onDispatch);
  }

  initGame(name) {
    this.store.dispatch(addGame({
      name,
      users: [],
    }));
  }

  addUser(socket, data) {
    const user = {
      id: socket.id,
      username: data.username,
    };

    // Add user to the sender socket
    socket.user = user;

    this.store.dispatch(addUser(user));

    let state = this.store.getState();

    this.dispatchToClient(addUser(user), socket);
    this.dispatchToAll(updateUsers(state.users.users));

    // Create initial game
    this.dispatchToClient(addGame({ name: DEFAULT_ROOM, users: [] }), socket);

    this.joinGame(DEFAULT_ROOM, socket, true);

    state = this.store.getState();

    this.dispatchToClient(
      updateMessages(state.chat.messages), socket, CHAT_MESSAGES_VIEW);
  }

  createGame(socket, data) {
    // Leave current game
    this.leaveGame(socket);

    // Add new game
    this.store.dispatch(addGame({
      name: data.name,
      users: [],
    }));

    this.dispatchToClient(addGame({ name: data.name, users: [] }), socket);
    this.sendChatToOthers(
      socket, `${socket.user.username} created ${data.name}`, SERVER);

    // Join the game
    this.joinGame(data.name, socket);
  }

  joinGame(name, socket) {
    let state = this.store.getState();

    state.games.list.some(game => {
      if (game.name === name) {
        this.store.dispatch(addGameUser(name, socket.user));

        socket.join(name);
        socket.game = name;

        return true;
      }

      return false;
    });

    this.dispatchToClient(addGameUser(name, socket.user), socket);

    state = this.store.getState();

    this.dispatchToAll(updateGames(state.games.list), GAME_LIST_VIEW);

    this.sendChatToOthers(
      socket, `${socket.user.username} joined ${name}`, SERVER);
  }

  changeGame(socket, name) {
    // Leave current game
    this.leaveGame(socket);

    // Join the game
    this.joinGame(name, socket);
  }

  leaveGame(socket) {
    const state = this.store.getState();

    socket.leave(socket.game);

    state.games.list.some(game => {
      if (game.name === socket.game) {
        game.users.some(user => {
          if (user.id === socket.user.id) {
            this.store.dispatch(leaveGame(user.id, game.name));
            this.dispatchToAll(leaveGame(user.id, game.name));
            this.sendChatToOthers(
              socket, `${socket.user.username} left ${game.name}`, SERVER);

            return true;
          }

          return false;
        });

        return true;
      }

      return false;
    });
  }

  ping(socket) {
    this.sendToClient('pong', null, socket);
  }

  disconnect(socket) {
    this.store.dispatch(removeUser(socket.user.id, socket.game));
    this.dispatchToAll(removeUser(socket.user.id, socket.game), GAME_LIST_VIEW);
    this.sendChatToAll(`${socket.user.username} disconnected`, SERVER);
  }
}

export default Game;
