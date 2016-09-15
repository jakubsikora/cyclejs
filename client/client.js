import clientView from './view/client';
import { startGame } from '../actions/game';
import {
  GAME_LIST_VIEW,
} from '../constants';

const socket = io();

export default class Client {
  constructor(store) {
    this.store = store;
    this.startTime = Date.now();
    this.latency = 0;

    this.setEventsHandler();
    this.callbacks = {};

    this.callbacks[GAME_LIST_VIEW] = this.joinGame;
  }

  setEventsHandler() {
    const createBtn = document.getElementById('create-game');
    const startGameBtn = document.getElementById('start-game');
    const sendMessageBtn = document.getElementById('send-message-btn');
    const sendMessage = document.getElementById('send-message');

    // TODO: move to separate methods
    createBtn.addEventListener('click', () => {
      this.createGame();
    });

    // TODO: refactor this
    startGameBtn.addEventListener('click', () => {
      this.store.dispatch(startGame());

      const lobby = document.getElementById(('lobby'));
      lobby.style.display = 'none';

      const canvas = document.getElementById(('canvas'));
      canvas.style.display = 'block';
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
    socket.on('dispatch', this.onSocketDispatch.bind(this));
    socket.on('pong', this.onPong);
  }

  onSocketConnect() {
    socket.emit(
      'adduser',
      {
        username: prompt('Enter username'),
      });

    setInterval(() => {
      this.startTime = Date.now();
      socket.emit('ping-client');
    }, 5000);
  }

  onSocketDispatch(action, viewType) {
    this.store.dispatch(action);
    clientView.render(viewType, action, this.store, this.callbacks[viewType]);
  }

  onPong() {
    this.latency = Date.now() - this.startTime;
    clientView.updateLatency(parseInt(this.latency, 10));
  }

  joinGame() {
    socket.emit('changegame', this.id);

    return false;
  }

  createGame() {
    // TODO: modal
    socket.emit(
      'creategame',
      {
        name: prompt('Enter game name:'),
      }
    );
  }

  sendChatMessage(message) {
    const state = this.store.getState();

    if (message) {
      socket.emit(
        'chatmessage', message, state.users.localUser.username);
    }
  }
}
