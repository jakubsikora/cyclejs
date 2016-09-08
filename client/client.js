import lobbyView from './view/lobby';
import { startGame } from './actions/game';

const socket = io();

export default class Client {
  constructor(store) {
    this.store = store;
    // this.username = null;
    this.game = null;
    this.startTime = Date.now();
    this.latency = 0;

    this.setEventsHandler();
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
    socket.on('adduser', this.onAddUsers.bind(this));
    socket.on('updateusers', this.onUpdateUsers.bind(this));
    socket.on('addgame', this.onAddGame.bind(this));
    socket.on('updategames', this.onUpdateGames.bind(this));
    socket.on('dispatch', this.onSocketDispatch.bind(this));
    socket.on('pong', this.onPong);
    socket.on('chatmessage', this.onChatMessage);
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
    }, 2000);
  }

  onAddUsers(user) {
    console.log('user', user);
    this.username = user.username;
  }

  onAddGame(game) {
    this.game = game.name;
  }

  onUpdateUsers(users) {
    console.log('onUpdateUsers', users);
    this.store.dispatch(updateUsers(users, this.username));
  }

  onUpdateGames(games) {
    this.store.dispatch(updateGames(games, this.game));

    lobbyView.renderGamesList(
      this.store.getState().games,
      this.game,
      this.username,
      this.joinGame
    );
  }

  onSocketDispatch(action, type) {
    this.store.dispatch(action);
    lobbyView.render(type);
  }

  onPong() {
    this.latency = Date.now() - this.startTime;
    lobbyView.updateLatency(parseInt(this.latency, 10));
  }

  joinGame() {
    socket.emit('joingame', this.id);

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
    if (message) socket.emit('chatmessage', message);
  }

  onChatMessage(data) {
    lobbyView.addChatMessage(data);
  }
}
