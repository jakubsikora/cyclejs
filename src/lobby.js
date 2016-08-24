import lobbyView from './view/lobby';

export default class Lobby {
  constructor(store) {
    this.store = store;
    this.socket = io();
    this.username = null;

    this.setEventsHandler();
  }

  setEventsHandler() {
    const createBtn = document.getElementById('create_room');

    createBtn.addEventListener('click', () => {
      this.createRoom();
    });

    this.socket.on('connect', this.onSocketConnect);
    this.socket.on('updateusers', this.onUpdateUsers);
    this.socket.on('updaterooms', this.onUpdateRooms);
    this.socket.on('dispatch', this.onSocketDispatch);
  }

  onSocketConnect() {
    this.socket.emit(
      'adduser', `User${Math.floor(Math.random() * (1000 - 0 + 1))}`);
  }

  onUpdateUsers(data) {
    // Update current user
    if (data.currentUser) {
      this.username = data.currentUser;
    }

    lobbyView.updatePlayersList(data.users);
  }

  onUpdateRooms(data) {
    lobbyView.updateRoomsList(data.rooms);
  }

  onSocketDispatch(data) {
    this.store.dispatch(data);
  }

  createRoom() {
    // TODO: modal
    this.socket.emit(
      'createroom', `Room${Math.floor(Math.random() * (1000 - 0 + 1))}`);
  }
}
