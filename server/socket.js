import { addMessage } from '../actions/chat';
import {
  CHAT_MESSAGE_VIEW,
} from '../constants';

export default class SocketBase {
  constructor(io) {
    // Socket server
    this.io = io;

    this.sockets = [];

    this.store = undefined;
  }

  setEventsHandler() {
    throw Error('You need to implement setEventsHandler()');
  }

  sendToClient(type, data, socket, view) {
    socket.emit(type, data, view);
  }

  sendToOthers(type, data, socket, view) {
    socket.broadcast.emit(type, data, view);
  }

  sendToAll(type, data, view) {
    this.io.sockets.emit(type, data, view);
  }

  dispatchToClient(action, socket, view) {
    this.sendToClient('dispatch', action, socket, view);
  }

  dispatchToOthers(action, socket, view) {
    this.sendToOthers('dispatch', action, socket, view);
  }

  dispatchToAll(action, view) {
    this.sendToAll('dispatch', action, view);
  }

  formatChatDate() {
    const date = new Date();
    const hours = date.getHours() < 10
      ? `0${date.getHours()}`
      : date.getHours();
    const minutes = date.getMinutes() < 10
      ? `0${date.getMinutes()}`
      : date.getMinutes();
    const seconds = date.getSeconds() < 10
      ? `0${date.getSeconds()}`
      : date.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
  }

  sendChatToClient(socket, text, sender) {
    const messageData = {
      time: this.formatChatDate(),
      sender,
      text,
    };

    this.store.dispatch(addMessage(messageData));
    this.dispatchToClient(addMessage(messageData), socket, CHAT_MESSAGE_VIEW);
  }

  sendChatToOthers(socket, text, sender) {
    const messageData = {
      time: this.formatChatDate(),
      sender,
      text,
    };

    this.store.dispatch(addMessage(messageData));
    this.dispatchToOthers(addMessage(messageData), socket, CHAT_MESSAGE_VIEW);
  }

  sendChatToAll(text, sender) {
    const messageData = {
      time: this.formatChatDate(),
      sender,
      text,
    };

    this.store.dispatch(addMessage(messageData));
    this.dispatchToAll(addMessage(messageData), CHAT_MESSAGE_VIEW);
  }
}
