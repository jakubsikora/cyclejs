import { SERVER } from '../constants';

export default class SocketBase {
  constructor(io) {
    // Socket server
    this.io = io;

    this.sockets = [];
  }

  setEventsHandler() {
    throw Error('You need to implement setEventsHandler()');
  }

  sendToClient(type, data, socket) {
    socket.emit(type, data);
  }

  sendToOthers(type, data, socket) {
    socket.broadcast.emit(type, data);
  }

  sendToAll(type, data) {
    this.io.sockets.emit(type, data);
  }

  sendChatMessage(data) {
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
    const timeText = `${hours}:${minutes}:${seconds}`;

    this.sendToAll('chatmessage', {
      message: data.message,
      user: data.user,
      time: timeText,
      server: data.user === SERVER,
    });
  }
}
