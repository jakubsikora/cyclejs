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
    const sendMessageBtn = document.getElementById('send-message-btn');
    const sendMessage = document.getElementById('send-message');

    // TODO: move to separate methods
    createBtn.addEventListener('click', () => {
      this.createRoom();
    });

    sendMessageBtn.addEventListener('click', () => {
      this.sendChatMessage(sendMessage.value);
      sendMessage.value = '';
      sendMessage.focus();
    });

    sendMessage.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        this.sendChatMessage(sendMessage.value);
        sendMessage.value = '';
        sendMessage.focus();
      }
    });

    socket.on('connect', this.onSocketConnect);
    socket.on('adduser', this.onAddUsers.bind(this));
    socket.on('updateusers', this.onUpdateUsers.bind(this));
    socket.on('addroom', this.onAddRoom.bind(this));
    socket.on('updaterooms', this.onUpdateRooms.bind(this));
    socket.on('dispatch', this.onSocketDispatch);
    socket.on('pong', this.onPong);
    socket.on('chatmessage', this.onChatMessage);
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
  }

  onUpdateRooms(rooms) {
    this.store.dispatch(updateRooms(rooms, this.room));

    lobbyView.renderRoomList(
      this.store.getState().rooms,
      this.room,
      this.username,
      this.joinRoom
    );
  }

  onSocketDispatch(data) {
    this.store.dispatch(data);
  }

  onPong() {
    this.latency = Date.now() - this.startTime;
    lobbyView.updateLatency(parseInt(this.latency, 10));
  }

  joinRoom() {
    socket.emit('joinroom', this.id);

    return false;
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

  sendChatMessage(message) {
    if (message) socket.emit('chatmessage', message);
  }

  onChatMessage(data) {
    // TODO: use redux
    lobbyView.addChatMessage(data);
  }
}
