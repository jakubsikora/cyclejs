import lobbyView from './view/lobby';
import { addUser } from './actions/users';

const socket = io();

export default class Lobby {
  constructor(store) {
    this.store = store;
    this.username = null;
    this.startTime = Date.now();
    this.latency = 0;

    this.setEventsHandler();
  }

  setEventsHandler() {
    const createBtn = document.getElementById('create_room');

    createBtn.addEventListener('click', () => {
      this.createRoom();
    });

    socket.on('connect', this.onSocketConnect);
    socket.on('adduser', this.onAddUsers.bind(this));
    socket.on('updaterooms', this.onUpdateRooms);
    socket.on('dispatch', this.onSocketDispatch);
    socket.on('pong', this.onPong);
  }

  onSocketConnect() {
    socket.emit(
      'adduser',
      {
        username: `User${Math.floor(Math.random() * (1000 - 0 + 1))}`,
      });

    setInterval(() => {
      this.startTime = Date.now();
      socket.emit('ping-client');
    }, 2000);
  }

  onAddUsers(user) {
    // Update current user
    if (user.isLocal) {
      this.username = user.username;
    }

    this.store.dispatch(addUser(user));

    lobbyView.updatePlayersList(
      this.store.getState().users,
      this.username
    );
  }

  onUpdateRooms(data) {
    lobbyView.updateRoomsList(data.rooms);
  }

  onSocketDispatch(data) {
    this.store.dispatch(data);
  }

  onPong() {
    this.latency = Date.now() - this.startTime;
    lobbyView.updateLatency(parseInt(this.latency, 10));
  }

  createRoom() {
    // TODO: modal
    socket.emit(
      'createroom',
      {
        name: `Room${Math.floor(Math.random() * (1000 - 0 + 1))}`,
      }
    );
  }
}
