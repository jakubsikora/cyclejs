import lobbyView from './view/lobby';
import { updateUsers } from './actions/users';
import { updateRooms } from './actions/rooms';

const socket = io();

export default class Lobby {
  constructor(store) {
    this.store = store;
    this.username = null;
    this.room = null;
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
    socket.on('updateusers', this.onUpdateUsers.bind(this));
    socket.on('addroom', this.onAddRoom.bind(this));
    socket.on('updaterooms', this.onUpdateRooms.bind(this));
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
    this.username = user.username;
  }

  onAddRoom(room) {
    this.room = room.name;
  }

  onUpdateUsers(users) {
    this.store.dispatch(updateUsers(users, this.username));

    lobbyView.updatePlayersList(
      this.store.getState().users,
      this.username
    );
  }

  onUpdateRooms(rooms) {
    this.store.dispatch(updateRooms(rooms, this.room));

    lobbyView.updateRoomsList(
      this.store.getState().rooms,
      this.room
    );
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
