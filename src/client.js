class Client {
  constructor() {
    this.socket = io();

    this.socket.on('connect', () => {
      this.socket.emit('adduser', prompt('Enter your name: '));
    });

    this.socket.on('updateusers', (users) => {
      console.log(users, room);
    });
  }
}

export default new Client();
