import { applyMiddleware, createStore } from 'redux';
import createNodeLogger from 'redux-node-logger';
import SocketBase from './socket';
import reducers from '../reducers/indexServer';
import { addUser, updateUsers, removeUser } from '../actions/users';
import { addGame, addGameUser, updateGames } from '../actions/games';
import { DEFAULT_ROOM } from '../constants';

class Game extends SocketBase {
  constructor(io) {
    super(io);

    this.gameRooms = [];

    this.store = createStore(
      reducers,
      applyMiddleware(createNodeLogger())
    );

    this.sockets = [];

    this.createGame(DEFAULT_ROOM);
  }

  setEventsHandler(socket) {
    this.sockets.push(socket);

    const addUserHandler = this.addUser.bind(this, socket);
    const disconnectHandler = this.disconnect.bind(this, socket);

    socket.on('adduser', addUserHandler);
    socket.on('disconnect', disconnectHandler);
    // this.socket.on('creategame', onCreateGame);
    // this.socket.on('joingame', onJoinGame);
    // this.socket.on('dispatch', onDispatch);
    // this.socket.on('ping-client', onPing);
    // this.socket.on('chatmessage', onChatMessage);
  }

  createGame(name) {
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

    const state = this.store.getState();

    this.sendToClient('dispatch', addUser(user), socket);
    this.sendToAll('dispatch', updateUsers(state.users.users));

    // Create initial game
    this.sendToClient('dispatch', addGame({
      name: DEFAULT_ROOM,
      users: [],
    }), socket);

    this.joinGame(DEFAULT_ROOM, socket);
  }

  joinGame(name, socket) {
    const state = this.store.getState();

    state.games.list.some(game => {
      if (game.name === name) {
        this.store.dispatch(addGameUser(name, socket.user));

        socket.join(name);
        socket.game = name;

        return true;
      }

      return false;
    });

    this.sendToClient('dispatch', addGameUser(name, socket.user), socket);
    this.sendToAll('dispatch', updateGames(state.games.list));
  }

  disconnect(socket) {
    this.store.dispatch(removeUser(socket.user.id, socket.game));
    this.sendToAll('dispatch', removeUser(socket.user.id, socket.game));
  }
}

export default Game;
